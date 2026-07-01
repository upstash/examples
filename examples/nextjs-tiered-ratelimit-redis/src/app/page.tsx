"use client";

import { useState, useCallback } from "react";

type Tier = "anonymous" | "free" | "paid";

interface LogEntry {
  id: number;
  status: number;
  tier: string;
  remaining: number | null;
  limit: number | null;
  error?: string;
}

const TIER_CONFIG: Record<Tier, { label: string; userId: string | null; plan: string | null; cap: number }> = {
  anonymous: { label: "Anonymous (10 req/min)", userId: null, plan: null, cap: 10 },
  free:      { label: "Free (60 req/min)",      userId: "user_free_123", plan: "free", cap: 60 },
  paid:      { label: "Paid (500 req/min)",     userId: "user_paid_456", plan: "paid", cap: 500 },
};

let logCounter = 0;

export default function Home() {
  const [tier, setTier] = useState<Tier>("free");
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState<{ limit: number | null; remaining: number | null }>({
    limit: null,
    remaining: null,
  });

  const sendRequest = useCallback(async () => {
    setLoading(true);
    const cfg = TIER_CONFIG[tier];
    const params = new URLSearchParams();
    if (cfg.userId) params.set("userId", cfg.userId);
    if (cfg.plan)   params.set("plan",   cfg.plan);

    try {
      const res = await fetch(`/api/data?${params}`);
      const data = await res.json();
      const entry: LogEntry = {
        id: ++logCounter,
        status: res.status,
        tier: data.tier ?? tier,
        remaining: data.remaining ?? null,
        limit: data.limit ?? null,
        error: res.ok ? undefined : data.error,
      };
      setLog((prev) => [entry, ...prev].slice(0, 50));
      setStats({ limit: entry.limit, remaining: entry.remaining });
    } catch {
      setLog((prev) => [
        { id: ++logCounter, status: 0, tier, remaining: null, limit: null, error: "Network error" },
        ...prev,
      ].slice(0, 50));
    } finally {
      setLoading(false);
    }
  }, [tier]);

  const cfg = TIER_CONFIG[tier];

  return (
    <div className="card">
      <h1>Tiered Rate Limiting</h1>
      <p className="subtitle">One Upstash Redis database · three sliding-window limiters · zero dedicated servers</p>

      <div className="tier-selector">
        {(Object.keys(TIER_CONFIG) as Tier[]).map((t) => (
          <button
            key={t}
            className={`tier-btn${tier === t ? " active" : ""}`}
            onClick={() => {
              setTier(t);
              setStats({ limit: null, remaining: null });
            }}
          >
            {TIER_CONFIG[t].label}
          </button>
        ))}
      </div>

      <button className="send-btn" onClick={sendRequest} disabled={loading}>
        {loading ? "Sending…" : "Send Request"}
      </button>

      <div className="stats">
        <div className="stat">
          <div className="stat-label">Tier</div>
          <div className="stat-value" style={{ fontSize: "1rem", marginTop: "0.4rem" }}>{tier}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Limit</div>
          <div className="stat-value">{stats.limit ?? cfg.cap}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Remaining</div>
          <div className="stat-value" style={{ color: stats.remaining === 0 ? "#f87171" : "#00e599" }}>
            {stats.remaining ?? "—"}
          </div>
        </div>
      </div>

      <div className="log">
        {log.length === 0 && <span style={{ color: "#555" }}>Responses will appear here…</span>}
        {log.map((e) => (
          <div key={e.id} className="log-entry">
            <span className={`status ${e.status === 200 ? "ok" : "err"}`}>
              {e.status === 200 ? "200" : e.status === 429 ? "429" : "ERR"}
            </span>
            <span>
              {e.error
                ? <span className="err">{e.error}</span>
                : <span>remaining <strong>{e.remaining}</strong> / {e.limit}</span>}
            </span>
            <span className="meta">· {e.tier}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
