"use client";

import { useState } from "react";

type Plan = "free" | "paid";

interface ApiResponse {
  text?: string;
  plan?: string;
  userId?: string;
  prompt?: string;
  error?: string;
  retryAfter?: number;
}

interface RequestResult {
  status: number;
  data: ApiResponse;
  remaining: string | null;
  reset: string | null;
  timestamp: string;
  source: "middleware" | "handler";
}

export default function Home() {
  const [plan, setPlan] = useState<Plan>("free");
  const [userId, setUserId] = useState("user-123");
  const [prompt, setPrompt] = useState("Tell me something interesting");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<RequestResult[]>([]);

  async function handleGenerate() {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, userId, prompt }),
      });

      let data: ApiResponse;
      const ct = res.headers.get("content-type") ?? "";
      if (ct.includes("application/json")) {
        data = await res.json();
      } else {
        data = { error: await res.text() };
      }

      // If the middleware blocked it (no retryAfter in body), read from header
      if (res.status === 429 && data.retryAfter == null) {
        const ra = res.headers.get("Retry-After");
        data.retryAfter = ra ? parseInt(ra, 10) : undefined;
      }

      setResults((prev) =>
        [
          {
            status: res.status,
            data,
            remaining: res.headers.get("X-RateLimit-Remaining"),
            reset: res.headers.get("X-RateLimit-Reset"),
            timestamp: new Date().toLocaleTimeString(),
            // The middleware 429 won't have a plan field in the body
            source: data.plan ? "handler" : "middleware",
          } satisfies RequestResult,
          ...prev,
        ].slice(0, 8)
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <h1 style={styles.h1}>AI Rate Limiting Demo</h1>
        <p style={styles.subtitle}>
          Built with{" "}
          <a href="https://upstash.com/docs/redis/sdks/ratelimit-ts/overview" style={styles.link}>
            @upstash/ratelimit
          </a>{" "}
          +{" "}
          <a href="https://upstash.com/docs/redis/overall/getstarted" style={styles.link}>
            Upstash Redis
          </a>
          . Two enforcement layers:
        </p>
        <ul style={styles.list}>
          <li>
            <strong>Middleware</strong> — global IP-based sliding window (10 req / min)
          </li>
          <li>
            <strong>Route handler</strong> — per-user tier limits (free: 20 req/day ·
            paid: 500 req/hr)
          </li>
        </ul>
      </div>

      <div style={styles.card}>
        <h2 style={styles.h2}>Try it out</h2>

        <div style={styles.field}>
          <label style={styles.label}>User ID</label>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={styles.input}
            placeholder="user-123"
          />
          <span style={styles.hint}>
            Rate limits are tracked per user ID (use different IDs to get separate counters)
          </span>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Plan</label>
          <div style={{ display: "flex", gap: 8 }}>
            {(["free", "paid"] as Plan[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlan(p)}
                style={{
                  ...styles.planBtn,
                  background: plan === p ? "#00dc82" : "#efefef",
                  color: plan === p ? "#000" : "#555",
                  fontWeight: plan === p ? 700 : 400,
                }}
              >
                {p === "free" ? "Free — 20 req/day" : "Paid — 500 req/hr"}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Prompt</label>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={styles.input}
            placeholder="Ask the AI something..."
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{ ...styles.generateBtn, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Generating…" : "Generate"}
        </button>
      </div>

      {results.length > 0 && (
        <div style={styles.card}>
          <h2 style={styles.h2}>Results</h2>
          {results.map((r, i) => {
            const ok = r.status === 200;
            return (
              <div
                key={i}
                style={{
                  ...styles.result,
                  borderColor: ok ? "#00dc82" : "#f87171",
                  background: ok ? "#f0fff8" : "#fff5f5",
                }}
              >
                <div style={styles.resultHeader}>
                  <span
                    style={{
                      fontWeight: 700,
                      color: ok ? "#008c50" : "#c00",
                    }}
                  >
                    {ok ? "✓ 200 OK" : `✗ ${r.status} — ${r.source}`}
                  </span>
                  <span style={styles.ts}>{r.timestamp}</span>
                </div>

                {ok ? (
                  <p style={{ margin: "6px 0 0" }}>{r.data.text}</p>
                ) : (
                  <p style={{ margin: "6px 0 0", color: "#c00" }}>
                    {r.data.error ?? "Rate limited."}{" "}
                    {r.data.retryAfter != null &&
                      `Retry in ${r.data.retryAfter}s.`}
                  </p>
                )}

                <div style={styles.meta}>
                  Remaining:{" "}
                  <code>{r.remaining ?? "—"}</code> · Reset:{" "}
                  <code>
                    {r.reset
                      ? new Date(Number(r.reset)).toLocaleTimeString()
                      : "—"}
                  </code>
                  {r.data.plan && (
                    <>
                      {" "}
                      · Plan: <code>{r.data.plan}</code>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    maxWidth: 700,
    margin: "0 auto",
    padding: "2rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "1.5rem",
  },
  h1: {
    margin: "0 0 0.5rem",
    fontSize: "1.5rem",
  },
  h2: {
    margin: "0 0 1rem",
    fontSize: "1.1rem",
  },
  subtitle: {
    margin: "0 0 0.5rem",
    color: "#555",
    fontSize: 14,
  },
  list: {
    margin: "0.5rem 0 0",
    paddingLeft: "1.25rem",
    color: "#555",
    fontSize: 14,
    lineHeight: 1.8,
  },
  link: {
    color: "#00a060",
  },
  field: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    fontWeight: 600,
    fontSize: 13,
    marginBottom: 6,
    color: "#333",
  },
  hint: {
    display: "block",
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  input: {
    width: "100%",
    padding: "0.5rem 0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 14,
  },
  planBtn: {
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 13,
    transition: "background 0.15s",
  },
  generateBtn: {
    width: "100%",
    padding: "0.75rem",
    background: "#00dc82",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    marginTop: 4,
  },
  result: {
    border: "1px solid",
    borderRadius: 8,
    padding: "0.875rem 1rem",
    marginBottom: "0.75rem",
    fontSize: 14,
  },
  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ts: {
    fontSize: 12,
    color: "#999",
  },
  meta: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
  },
};
