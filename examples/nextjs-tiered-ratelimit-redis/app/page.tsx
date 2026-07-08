"use client";

import { useState } from "react";

type Plan = "free" | "pro" | "enterprise";

const PLAN_CONFIG: Record<Plan, { limit: number; color: string }> = {
  free:       { limit: 10,   color: "#6b7280" },
  pro:        { limit: 100,  color: "#2563eb" },
  enterprise: { limit: 1000, color: "#7c3aed" },
};

interface Result {
  status: number;
  limit: number;
  remaining: number;
  message?: string;
  error?: string;
}

export default function Home() {
  const [plan, setPlan] = useState<Plan>("free");
  const [userId, setUserId] = useState("user-123");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendRequest() {
    setLoading(true);
    try {
      const res = await fetch(`/api/data?userId=${encodeURIComponent(userId)}&plan=${plan}`);
      const data = await res.json();
      const limit = Number(res.headers.get("X-RateLimit-Limit") ?? PLAN_CONFIG[plan].limit);
      const remaining = Number(res.headers.get("X-RateLimit-Remaining") ?? 0);
      setResults((prev) => [{ status: res.status, limit, remaining, ...data }, ...prev].slice(0, 20));
    } finally {
      setLoading(false);
    }
  }

  const cfg = PLAN_CONFIG[plan];

  return (
    <main>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 4 }}>
        Tiered Rate Limiting with Upstash Redis
      </h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>
        Test free (10/min), pro (100/min), and enterprise (1000/min) rate limits — each user gets their own sliding window bucket.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
        <label>
          <span style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: 4 }}>User ID</span>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: "0.875rem", boxSizing: "border-box" }}
          />
        </label>

        <label>
          <span style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: 4 }}>Plan</span>
          <div style={{ display: "flex", gap: 8 }}>
            {(["free", "pro", "enterprise"] as Plan[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlan(p)}
                style={{
                  flex: 1, padding: "8px 0", borderRadius: 6, border: "2px solid",
                  borderColor: plan === p ? PLAN_CONFIG[p].color : "#d1d5db",
                  background: plan === p ? PLAN_CONFIG[p].color : "white",
                  color: plan === p ? "white" : "#374151",
                  fontWeight: 600, cursor: "pointer", textTransform: "capitalize",
                }}
              >
                {p}
                <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 400 }}>
                  {PLAN_CONFIG[p].limit}/min
                </span>
              </button>
            ))}
          </div>
        </label>
      </div>

      <button
        onClick={sendRequest}
        disabled={loading}
        style={{
          width: "100%", padding: "10px 0", borderRadius: 6, border: "none",
          background: cfg.color, color: "white", fontWeight: 700, fontSize: "1rem",
          cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
          marginBottom: 24,
        }}
      >
        {loading ? "Sending…" : "Send Request"}
      </button>

      {results.length > 0 && (
        <div>
          <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 12 }}>Results (latest first)</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {results.map((r, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 14px", borderRadius: 6, fontSize: "0.875rem",
                  background: r.status === 200 ? "#f0fdf4" : "#fef2f2",
                  border: `1px solid ${r.status === 200 ? "#bbf7d0" : "#fecaca"}`,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}
              >
                <span style={{ fontWeight: 600, color: r.status === 200 ? "#15803d" : "#dc2626" }}>
                  {r.status === 200 ? "200 OK" : "429 Too Many Requests"}
                </span>
                <span style={{ color: "#6b7280" }}>
                  {r.remaining} / {r.limit} remaining
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
