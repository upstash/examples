"use client";

import { useState, useRef } from "react";

// In a real app this would come from auth; hardcoded here for the demo.
const USER_ID = "demo-user-1";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  async function sendPrompt() {
    if (!prompt.trim() || loading) return;

    const userPrompt = prompt.trim();
    setPrompt("");
    setLoading(true);
    setOutput((prev) => [...prev, `> ${userPrompt}\n`]);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID, prompt: userPrompt }),
      });

      if (!res.ok || !res.body) {
        setOutput((prev) => [...prev, `[error ${res.status}]\n`]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let chunk = "";

      setOutput((prev) => [...prev, ""]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunk += decoder.decode(value, { stream: true });
        setOutput((prev) => {
          const next = [...prev];
          next[next.length - 1] = chunk;
          return next;
        });
        outputRef.current?.scrollTo(0, outputRef.current.scrollHeight);
      }

      setOutput((prev) => [...prev, "\n"]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ display: "flex", flexDirection: "column", height: "100vh", maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
        Stateful Agent — Upstash Box + Redis
      </h1>
      <p style={{ fontSize: 12, color: "#888", marginBottom: 24 }}>
        Your workspace persists across sessions. The agent remembers files, installed packages, and git history.
      </p>

      <div
        ref={outputRef}
        style={{
          flex: 1,
          overflowY: "auto",
          background: "#1a1a1a",
          border: "1px solid #333",
          borderRadius: 6,
          padding: 16,
          fontSize: 13,
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
          marginBottom: 16,
        }}
      >
        {output.length === 0 && (
          <span style={{ color: "#555" }}>
            Send a prompt to start — e.g. "scaffold an Express app with a /health route"
          </span>
        )}
        {output.map((line, i) => (
          <span key={i} style={{ color: line.startsWith(">") ? "#7dd3fc" : "#e5e5e5" }}>
            {line}
          </span>
        ))}
        {loading && <span style={{ color: "#888" }}>▌</span>}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendPrompt();
            }
          }}
          placeholder="Describe what you want the agent to build or change…"
          disabled={loading}
          rows={3}
          style={{
            flex: 1,
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: 6,
            color: "#e5e5e5",
            fontSize: 13,
            padding: "10px 12px",
            resize: "none",
            outline: "none",
          }}
        />
        <button
          onClick={sendPrompt}
          disabled={loading || !prompt.trim()}
          style={{
            background: loading ? "#333" : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "0 20px",
            fontSize: 13,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "…" : "Send"}
        </button>
      </div>
      <p style={{ fontSize: 11, color: "#555", marginTop: 8 }}>
        Enter to send · Shift+Enter for newline · user: <code>{USER_ID}</code>
      </p>
    </main>
  );
}
