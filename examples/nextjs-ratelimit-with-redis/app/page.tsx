"use client";

import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState<
    { status: number; body: Record<string, unknown>; remaining?: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  async function sendRequest() {
    setLoading(true);
    const res = await fetch("/api/data");
    const body = await res.json();
    const remaining = res.headers.get("X-RateLimit-Remaining") ?? undefined;
    setResults((prev) => [{ status: res.status, body, remaining }, ...prev]);
    setLoading(false);
  }

  return (
    <main style={{ fontFamily: "monospace", maxWidth: 600, margin: "60px auto", padding: "0 16px" }}>
      <h1>Per-IP Rate Limiting Demo</h1>
      <p>
        Each IP is limited to <strong>5 requests per 10 seconds</strong> via a
        sliding window backed by Upstash Redis. Click the button rapidly to
        trigger a 429.
      </p>
      <button
        onClick={sendRequest}
        disabled={loading}
        style={{ padding: "8px 20px", cursor: "pointer", marginBottom: 24 }}
      >
        {loading ? "Sending…" : "Send GET /api/data"}
      </button>

      {results.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", paddingBottom: 4 }}>Status</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", paddingBottom: 4 }}>Remaining</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", paddingBottom: 4 }}>Body</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i} style={{ color: r.status === 429 ? "crimson" : "green" }}>
                <td style={{ padding: "4px 0" }}>{r.status}</td>
                <td style={{ padding: "4px 0" }}>{r.remaining ?? "—"}</td>
                <td style={{ padding: "4px 0" }}>{JSON.stringify(r.body)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
