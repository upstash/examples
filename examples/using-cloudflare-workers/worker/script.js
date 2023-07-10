!(function (e) {
  const t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    const s = t[r] === { i: r, l: !1, exports: {} };
    return e[r].call(s.exports, s, s.exports, n), s.l === !0, s.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function (e) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && e === n(e), 8 & t)) return e;
      if (4 & t && "object" === typeof e && e && e.__esModule) return e;
      const r = Object.create(null);
      if ((n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" !== typeof e))
        for (const s in e)
          n.d(
            r,
            s,
            function (t) {
              return e[t];
            }.bind(null, s),
          );
      return r;
    }),
    (n.n = function (e) {
      const t = e?.__esModule
        ? function () {
            return e.default;
          }
        : function () {
            return e;
          };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n(n.s === 0);
})([
  function (e, t, n) {
    "use strict";
    n.r(t);
    const r = Object.defineProperty;
    const s = Object.getOwnPropertySymbols;
    const c = Object.prototype.hasOwnProperty;
    const i = Object.prototype.propertyIsEnumerable;
    const u = (e, t, n) =>
      t in e ? r(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] === n;
    const h = class extends Error {
      constructor(e) {
        super(e), (this.name = "UpstashError");
      }
    };
    function o(e) {
      try {
        return (function e(t) {
          const n = Array.isArray(t)
            ? t.map((t) => {
                try {
                  return e(t);
                } catch {
                  return t;
                }
              })
            : JSON.parse(t);
          return "number" === typeof n && n.toString() !== t ? t : n;
        })(e);
      } catch {
        return e;
      }
    }
    const a = class {
      constructor(e, t) {
        let n;
        (this.command = e.map((e) => ("string" === typeof e ? e : JSON.stringify(e)))),
          (this.deserialize = null != (n === (null == t ? void 0 : t.deserialize)) ? n : o);
      }
      async exec(e) {
        const { result: t, error: n } = await e.request({ body: this.command });
        if (n) throw new h(n);
        if (void 0 === t) throw new Error("Request did not return a result");
        return this.deserialize(t);
      }
    };
    const l = class extends a {
      constructor(e, t) {
        super(["append", e, t]);
      }
    };
    const p = class extends a {
      constructor(e, t, n) {
        const r = ["bitcount", e];
        "number" === typeof t && r.push(t), "number" === typeof n && r.push(n), super(r);
      }
    };
    const x = class extends a {
      constructor(e, t, n, ...r) {
        super(["bitop", e, t, n, ...r]);
      }
    };
    const w = class extends a {
      constructor(e, t, n) {
        super(["bitpos", e, t, n]);
      }
    };
    const d = class extends a {
      constructor() {
        super(["dbsize"]);
      }
    };
    const m = class extends a {
      constructor(e) {
        super(["decr", e]);
      }
    };
    const b = class extends a {
      constructor(e, t) {
        super(["decrby", e, t]);
      }
    };
    const f = class extends a {
      constructor(...e) {
        super(["del", ...e]);
      }
    };
    const g = class extends a {
      constructor(e) {
        super(["echo", e]);
      }
    };
    const y = class extends a {
      constructor(...e) {
        super(["exists", ...e]);
      }
    };
    const z = class extends a {
      constructor(e, t) {
        super(["expire", e, t]);
      }
    };
    const v = class extends a {
      constructor(e, t) {
        super(["expireat", e, t]);
      }
    };
    const S = class extends a {
      constructor(e) {
        const t = ["flushall"];
        (null == e ? void 0 : e.async) && t.push("async"), super(t);
      }
    };
    const O = class extends a {
      constructor(e) {
        const t = ["flushdb"];
        (null == e ? void 0 : e.async) && t.push("async"), super(t);
      }
    };
    const k = class extends a {
      constructor(e) {
        super(["get", e]);
      }
    };
    const E = class extends a {
      constructor(e, t) {
        super(["getbit", e, t]);
      }
    };
    const _ = class extends a {
      constructor(e, t, n) {
        super(["getrange", e, t, n]);
      }
    };
    const j = class extends a {
      constructor(e, t) {
        super(["getset", e, t]);
      }
    };
    const T = class extends a {
      constructor(e, t) {
        super(["hdel", e, t]);
      }
    };
    const P = class extends a {
      constructor(e, t) {
        super(["hexists", e, t]);
      }
    };
    const R = class extends a {
      constructor(e, t) {
        super(["hget", e, t]);
      }
    };
    const U = class extends a {
      constructor(e) {
        super(["hgetall", e], {
          deserialize: (e) =>
            (function (e) {
              if (0 === e.length) return null;
              const t = {};
              while (e.length >= 2) {
                const n = e.shift();
                const r = e.shift();
                try {
                  t[n] = JSON.parse(r);
                } catch {
                  t[n] = r;
                }
              }
              return t;
            })(e),
        });
      }
    };
    const A = class extends a {
      constructor(e, t, n) {
        super(["hincrby", e, t, n]);
      }
    };
    const M = class extends a {
      constructor(e, t, n) {
        super(["hincrbyfloat", e, t, n]);
      }
    };
    const N = class extends a {
      constructor(e) {
        super(["hkeys", e]);
      }
    };
    const H = class extends a {
      constructor(e) {
        super(["hlen", e]);
      }
    };
    const I = class extends a {
      constructor(e, ...t) {
        super(["hmget", e, ...t], {
          deserialize: (e) =>
            (function (e, t) {
              if (0 === t.length || t.every((e) => null === e)) return null;
              const n = {};
              for (let r = 0; r < e.length; r++)
                try {
                  n[e[r]] = JSON.parse(t[r]);
                } catch {
                  n[e[r]] = t[r];
                }
              return n;
            })(t, e),
        });
      }
    };
    const D = class extends a {
      constructor(e, t) {
        super(["hmset", e, ...Object.entries(t).flatMap(([e, t]) => [e, t])]);
      }
    };
    const q = class extends a {
      constructor(e, t, n) {
        const r = ["hscan", e, t];
        (null == n ? void 0 : n.match) && r.push("match", n.match),
          "number" === typeof (null == n ? void 0 : n.count) && r.push("count", n.count),
          super(r);
      }
    };
    const J = class extends a {
      constructor(e, t) {
        super(["hset", e, ...Object.entries(t).flatMap(([e, t]) => [e, t])]);
      }
    };
    const L = class extends a {
      constructor(e, t, n) {
        super(["hsetnx", e, t, n]);
      }
    };
    const $ = class extends a {
      constructor(e, t) {
        super(["hstrlen", e, t]);
      }
    };
    const K = class extends a {
      constructor(e) {
        super(["hvals", e]);
      }
    };
    const C = class extends a {
      constructor(e) {
        super(["incr", e]);
      }
    };
    const B = class extends a {
      constructor(e, t) {
        super(["incrby", e, t]);
      }
    };
    const W = class extends a {
      constructor(e, t) {
        super(["incrbyfloat", e, t]);
      }
    };
    const F = class extends a {
      constructor(e) {
        super(["keys", e]);
      }
    };
    const G = class extends a {
      constructor(e, t) {
        super(["lindex", e, t]);
      }
    };
    const Q = class extends a {
      constructor(e, t, n, r) {
        super(["linsert", e, t, n, r]);
      }
    };
    const V = class extends a {
      constructor(e) {
        super(["llen", e]);
      }
    };
    const X = class extends a {
      constructor(e) {
        super(["lpop", e]);
      }
    };
    const Y = class extends a {
      constructor(e, ...t) {
        super(["lpush", e, ...t]);
      }
    };
    const Z = class extends a {
      constructor(e, ...t) {
        super(["lpushx", e, ...t]);
      }
    };
    const ee = class extends a {
      constructor(e, t, n) {
        super(["lrange", e, t, n]);
      }
    };
    const te = class extends a {
      constructor(e, t, n) {
        super(["lrem", e, t, n]);
      }
    };
    const ne = class extends a {
      constructor(e, t, n) {
        super(["lset", e, n, t]);
      }
    };
    const re = class extends a {
      constructor(e, t, n) {
        super(["ltrim", e, t, n]);
      }
    };
    const se = class extends a {
      constructor(...e) {
        super(["mget", ...e]);
      }
    };
    const ce = class extends a {
      constructor(e) {
        super(["mset", ...Object.entries(e).flatMap(([e, t]) => [e, t])]);
      }
    };
    const ie = class extends a {
      constructor(e) {
        super(["msetnx", ...Object.entries(e).flatMap((e) => e)]);
      }
    };
    const ue = class extends a {
      constructor(e) {
        super(["persist", e]);
      }
    };
    const he = class extends a {
      constructor(e, t) {
        super(["pexpire", e, t]);
      }
    };
    const oe = class extends a {
      constructor(e, t) {
        super(["pexpireat", e, t]);
      }
    };
    const ae = class extends a {
      constructor(e) {
        const t = ["ping"];
        void 0 !== e && t.push(e), super(t);
      }
    };
    const le = class extends a {
      constructor(e, t, n) {
        super(["psetex", e, t, n]);
      }
    };
    const pe = class extends a {
      constructor(e) {
        super(["pttl", e]);
      }
    };
    const xe = class extends a {
      constructor() {
        super(["randomkey"]);
      }
    };
    const we = class extends a {
      constructor(e, t) {
        super(["rename", e, t]);
      }
    };
    const de = class extends a {
      constructor(e, t) {
        super(["renamenx", e, t]);
      }
    };
    const me = class extends a {
      constructor(e) {
        super(["rpop", e]);
      }
    };
    const be = class extends a {
      constructor(e, ...t) {
        super(["rpush", e, ...t]);
      }
    };
    const fe = class extends a {
      constructor(e, ...t) {
        super(["rpushx", e, ...t]);
      }
    };
    const ge = class extends a {
      constructor(e, ...t) {
        super(["sadd", e, ...t]);
      }
    };
    const ye = class extends a {
      constructor(e, t) {
        const n = ["scan", e];
        (null == t ? void 0 : t.match) && n.push("match", t.match),
          "number" === typeof (null == t ? void 0 : t.count) && n.push("count", t.count),
          super(n);
      }
    };
    const ze = class extends a {
      constructor(e) {
        super(["scard", e]);
      }
    };
    const ve = class extends a {
      constructor(e, ...t) {
        super(["sdiff", e, ...t]);
      }
    };
    const Se = class extends a {
      constructor(e, ...t) {
        super(["sdiffstore", e, ...t]);
      }
    };
    const Oe = class extends a {
      constructor(e, t, n) {
        const r = ["set", e, t];
        n &&
          ("ex" in n && "number" === typeof n.ex
            ? r.push("ex", n.ex)
            : "px" in n && "number" === typeof n.px && r.push("px", n.px),
          "nx" in n && n.nx ? r.push("nx") : "xx" in n && n.xx && r.push("xx")),
          super(r);
      }
    };
    const ke = class extends a {
      constructor(e, t, n) {
        super(["setbit", e, t, n]);
      }
    };
    const Ee = class extends a {
      constructor(e, t, n) {
        super(["setex", e, t, n]);
      }
    };
    const _e = class extends a {
      constructor(e, t) {
        super(["setnx", e, t]);
      }
    };
    const je = class extends a {
      constructor(e, t, n) {
        super(["setrange", e, t, n]);
      }
    };
    const Te = class extends a {
      constructor(e, ...t) {
        super(["sinter", e, ...t]);
      }
    };
    const Pe = class extends a {
      constructor(e, t, ...n) {
        super(["sinterstore", e, t, ...n]);
      }
    };
    const Re = class extends a {
      constructor(e, t) {
        super(["sismember", e, t]);
      }
    };
    const Ue = class extends a {
      constructor(e) {
        super(["smembers", e]);
      }
    };
    const Ae = class extends a {
      constructor(e, t, n) {
        super(["smove", e, t, n]);
      }
    };
    const Me = class extends a {
      constructor(e, t) {
        const n = ["spop", e];
        "number" === typeof t && n.push(t), super(n);
      }
    };
    const Ne = class extends a {
      constructor(e, t) {
        const n = ["srandmember", e];
        "number" === typeof t && n.push(t), super(n);
      }
    };
    const He = class extends a {
      constructor(e, ...t) {
        super(["srem", e, ...t]);
      }
    };
    const Ie = class extends a {
      constructor(e, t, n) {
        const r = ["sscan", e, t];
        (null == n ? void 0 : n.match) && r.push("match", n.match),
          "number" === typeof (null == n ? void 0 : n.count) && r.push("count", n.count),
          super(r);
      }
    };
    const De = class extends a {
      constructor(e) {
        super(["strlen", e]);
      }
    };
    const qe = class extends a {
      constructor(e, ...t) {
        super(["sunion", e, ...t]);
      }
    };
    const Je = class extends a {
      constructor(e, t, ...n) {
        super(["sunionstore", e, t, ...n]);
      }
    };
    const Le = class extends a {
      constructor() {
        super(["time"]);
      }
    };
    const $e = class extends a {
      constructor(...e) {
        super(["touch", ...e]);
      }
    };
    const Ke = class extends a {
      constructor(e) {
        super(["ttl", e]);
      }
    };
    const Ce = class extends a {
      constructor(e) {
        super(["type", e]);
      }
    };
    const Be = class extends a {
      constructor(...e) {
        super(["unlink", ...e]);
      }
    };
    const We = class extends a {
      constructor(e, t, ...n) {
        const r = ["zadd", e];
        "nx" in t && t.nx ? r.push("nx") : "xx" in t && t.xx && r.push("xx"),
          "ch" in t && t.ch && r.push("ch"),
          "incr" in t && t.incr && r.push("incr"),
          "score" in t && "member" in t && r.push(t.score, t.member),
          r.push(...n.flatMap(({ score: e, member: t }) => [e, t])),
          super(r);
      }
    };
    const Fe = class extends a {
      constructor(e) {
        super(["zcard", e]);
      }
    };
    const Ge = class extends a {
      constructor(e, t, n) {
        super(["zcount", e, t, n]);
      }
    };
    const Qe = class extends a {
      constructor(e, t, n) {
        super(["zincrby", e, t, n]);
      }
    };
    const Ve = class extends a {
      constructor(e, t, n, r) {
        const s = ["zinterstore", e, t];
        Array.isArray(n) ? s.push(...n) : s.push(n),
          r &&
            ("weights" in r && r.weights
              ? s.push("weights", ...r.weights)
              : "weight" in r && "number" === typeof r.weight && s.push("weights", r.weight),
            "aggregate" in r && s.push("aggregate", r.aggregate)),
          super(s);
      }
    };
    const Xe = class extends a {
      constructor(e, t, n) {
        super(["zlexcount", e, t, n]);
      }
    };
    const Ye = class extends a {
      constructor(e, t) {
        const n = ["zpopmax", e];
        "number" === typeof t && n.push(t), super(n);
      }
    };
    const Ze = class extends a {
      constructor(e, t) {
        const n = ["zpopmin", e];
        "number" === typeof t && n.push(t), super(n);
      }
    };
    const et = class extends a {
      constructor(e, t, n, r) {
        const s = ["zrange", e, t, n];
        (null == r ? void 0 : r.withScores) && s.push("withscores"), super(s);
      }
    };
    const tt = class extends a {
      constructor(e, t) {
        super(["zrank", e, t]);
      }
    };
    const nt = class extends a {
      constructor(e, ...t) {
        super(["zrem", e, ...t]);
      }
    };
    const rt = class extends a {
      constructor(e, t, n) {
        super(["zremrangebylex", e, t, n]);
      }
    };
    const st = class extends a {
      constructor(e, t, n) {
        super(["zremrangebyrank", e, t, n]);
      }
    };
    const ct = class extends a {
      constructor(e, t, n) {
        super(["zremrangebyscore", e, t, n]);
      }
    };
    const it = class extends a {
      constructor(e, t) {
        super(["zrevrank", e, t]);
      }
    };
    const ut = class extends a {
      constructor(e, t, n) {
        const r = ["zscan", e, t];
        (null == n ? void 0 : n.match) && r.push("match", n.match),
          "number" === typeof (null == n ? void 0 : n.count) && r.push("count", n.count),
          super(r);
      }
    };
    const ht = class extends a {
      constructor(e, t) {
        super(["zscore", e, t]);
      }
    };
    const ot = class extends a {
      constructor(e, t, n, r) {
        const s = ["zunionstore", e, t];
        Array.isArray(n) ? s.push(...n) : s.push(n),
          r &&
            ("weights" in r && r.weights
              ? s.push("weights", ...r.weights)
              : "weight" in r && "number" === typeof r.weight && s.push("weights", r.weight),
            "aggregate" in r && s.push("aggregate", r.aggregate)),
          super(s);
      }
    };
    const at = class extends class {
      constructor(e) {
        this.client = e;
      }
      pipeline() {
        return new (class {
          constructor(e) {
            (this.client = e), (this.commands = []);
          }
          async exec() {
            if (0 === this.commands.length) throw new Error("Pipeline is empty");
            return (
              await this.client.request({
                path: ["pipeline"],
                body: Object.values(this.commands).map((e) => e.command),
              })
            ).map(({ error: e, result: t }, n) => {
              if (e) throw new h(`Command ${n + 1} [ ${this.commands[n].command[0]} ] failed: ${e}`);
              return this.commands[n].deserialize(t);
            });
          }
          chain(e) {
            return this.commands.push(e), this;
          }
          append(...e) {
            return this.chain(new l(...e));
          }
          bitcount(...e) {
            return this.chain(new p(...e));
          }
          bitop(e, t, n, ...r) {
            return this.chain(new x(e, t, n, ...r));
          }
          bitpos(...e) {
            return this.chain(new w(...e));
          }
          dbsize() {
            return this.chain(new d());
          }
          decr(...e) {
            return this.chain(new m(...e));
          }
          decrby(...e) {
            return this.chain(new b(...e));
          }
          del(...e) {
            return this.chain(new f(...e));
          }
          echo(...e) {
            return this.chain(new g(...e));
          }
          exists(...e) {
            return this.chain(new y(...e));
          }
          expire(...e) {
            return this.chain(new z(...e));
          }
          expireat(...e) {
            return this.chain(new v(...e));
          }
          flushall(...e) {
            return this.chain(new S(...e));
          }
          flushdb(...e) {
            return this.chain(new O(...e));
          }
          get(...e) {
            return this.chain(new k(...e));
          }
          getbit(...e) {
            return this.chain(new E(...e));
          }
          getrange(...e) {
            return this.chain(new _(...e));
          }
          getset(e, t) {
            return this.chain(new j(e, t));
          }
          hdel(...e) {
            return this.chain(new T(...e));
          }
          hexists(...e) {
            return this.chain(new P(...e));
          }
          hget(...e) {
            return this.chain(new R(...e));
          }
          hgetall(...e) {
            return this.chain(new U(...e));
          }
          hincrby(...e) {
            return this.chain(new A(...e));
          }
          hincrbyfloat(...e) {
            return this.chain(new M(...e));
          }
          hkeys(...e) {
            return this.chain(new N(...e));
          }
          hlen(...e) {
            return this.chain(new H(...e));
          }
          hmget(...e) {
            return this.chain(new I(...e));
          }
          hmset(e, t) {
            return this.chain(new D(e, t));
          }
          hscan(...e) {
            return this.chain(new q(...e));
          }
          hset(e, t) {
            return this.chain(new J(e, t));
          }
          hsetnx(e, t, n) {
            return this.chain(new L(e, t, n));
          }
          hstrlen(...e) {
            return this.chain(new $(...e));
          }
          hvals(...e) {
            return this.chain(new K(...e));
          }
          incr(...e) {
            return this.chain(new C(...e));
          }
          incrby(...e) {
            return this.chain(new B(...e));
          }
          incrbyfloat(...e) {
            return this.chain(new W(...e));
          }
          keys(...e) {
            return this.chain(new F(...e));
          }
          lindex(...e) {
            return this.chain(new G(...e));
          }
          linsert(e, t, n, r) {
            return this.chain(new Q(e, t, n, r));
          }
          llen(...e) {
            return this.chain(new V(...e));
          }
          lpop(...e) {
            return this.chain(new X(...e));
          }
          lpush(e, ...t) {
            return this.chain(new Y(e, ...t));
          }
          lpushx(e, ...t) {
            return this.chain(new Z(e, ...t));
          }
          lrange(...e) {
            return this.chain(new ee(...e));
          }
          lrem(e, t, n) {
            return this.chain(new te(e, t, n));
          }
          lset(e, t, n) {
            return this.chain(new ne(e, t, n));
          }
          ltrim(...e) {
            return this.chain(new re(...e));
          }
          mget(...e) {
            return this.chain(new se(...e));
          }
          mset(e) {
            return this.chain(new ce(e));
          }
          msetnx(e) {
            return this.chain(new ie(e));
          }
          persist(...e) {
            return this.chain(new ue(...e));
          }
          pexpire(...e) {
            return this.chain(new he(...e));
          }
          pexpireat(...e) {
            return this.chain(new oe(...e));
          }
          ping(...e) {
            return this.chain(new ae(...e));
          }
          psetex(e, t, n) {
            return this.chain(new le(e, t, n));
          }
          pttl(...e) {
            return this.chain(new pe(...e));
          }
          randomkey() {
            return this.chain(new xe());
          }
          rename(...e) {
            return this.chain(new we(...e));
          }
          renamenx(...e) {
            return this.chain(new de(...e));
          }
          rpop(...e) {
            return this.chain(new me(...e));
          }
          rpush(e, ...t) {
            return this.chain(new be(e, ...t));
          }
          rpushx(e, ...t) {
            return this.chain(new fe(e, ...t));
          }
          sadd(e, ...t) {
            return this.chain(new ge(e, ...t));
          }
          scan(...e) {
            return this.chain(new ye(...e));
          }
          scard(...e) {
            return this.chain(new ze(...e));
          }
          sdiff(...e) {
            return this.chain(new ve(...e));
          }
          sdiffstore(...e) {
            return this.chain(new Se(...e));
          }
          set(e, t, n) {
            return this.chain(new Oe(e, t, n));
          }
          setbit(...e) {
            return this.chain(new ke(...e));
          }
          setex(e, t, n) {
            return this.chain(new Ee(e, t, n));
          }
          setnx(e, t) {
            return this.chain(new _e(e, t));
          }
          setrange(...e) {
            return this.chain(new je(...e));
          }
          sinter(...e) {
            return this.chain(new Te(...e));
          }
          sinterstore(...e) {
            return this.chain(new Pe(...e));
          }
          sismember(e, t) {
            return this.chain(new Re(e, t));
          }
          smembers(...e) {
            return this.chain(new Ue(...e));
          }
          smove(e, t, n) {
            return this.chain(new Ae(e, t, n));
          }
          spop(...e) {
            return this.chain(new Me(...e));
          }
          srandmember(...e) {
            return this.chain(new Ne(...e));
          }
          srem(e, ...t) {
            return this.chain(new He(e, ...t));
          }
          sscan(...e) {
            return this.chain(new Ie(...e));
          }
          strlen(...e) {
            return this.chain(new De(...e));
          }
          sunion(...e) {
            return this.chain(new qe(...e));
          }
          sunionstore(...e) {
            return this.chain(new Je(...e));
          }
          time() {
            return this.chain(new Le());
          }
          touch(...e) {
            return this.chain(new $e(...e));
          }
          ttl(...e) {
            return this.chain(new Ke(...e));
          }
          type(...e) {
            return this.chain(new Ce(...e));
          }
          unlink(...e) {
            return this.chain(new Be(...e));
          }
          zadd(e, t, ...n) {
            return this.chain(new We(e, t, ...n));
          }
          zcard(...e) {
            return this.chain(new Fe(...e));
          }
          zcount(...e) {
            return this.chain(new Ge(...e));
          }
          zincrby(e, t, n) {
            return this.chain(new Qe(e, t, n));
          }
          zinterstore(...e) {
            return this.chain(new Ve(...e));
          }
          zlexcount(...e) {
            return this.chain(new Xe(...e));
          }
          zpopmax(...e) {
            return this.chain(new Ye(...e));
          }
          zpopmin(...e) {
            return this.chain(new Ze(...e));
          }
          zrange(...e) {
            return this.chain(new et(...e));
          }
          zrank(e, t) {
            return this.chain(new tt(e, t));
          }
          zrem(e, ...t) {
            return this.chain(new nt(e, ...t));
          }
          zremrangebylex(...e) {
            return this.chain(new rt(...e));
          }
          zremrangebyrank(...e) {
            return this.chain(new st(...e));
          }
          zremrangebyscore(...e) {
            return this.chain(new ct(...e));
          }
          zrevrank(e, t) {
            return this.chain(new it(e, t));
          }
          zscan(...e) {
            return this.chain(new ut(...e));
          }
          zscore(e, t) {
            return this.chain(new ht(e, t));
          }
          zunionstore(...e) {
            return this.chain(new ot(...e));
          }
        })(this.client);
      }
      append(...e) {
        return new l(...e).exec(this.client);
      }
      bitcount(...e) {
        return new p(...e).exec(this.client);
      }
      bitop(e, t, n, ...r) {
        return new x(e, t, n, ...r).exec(this.client);
      }
      bitpos(...e) {
        return new w(...e).exec(this.client);
      }
      dbsize() {
        return new d().exec(this.client);
      }
      decr(...e) {
        return new m(...e).exec(this.client);
      }
      decrby(...e) {
        return new b(...e).exec(this.client);
      }
      del(...e) {
        return new f(...e).exec(this.client);
      }
      echo(...e) {
        return new g(...e).exec(this.client);
      }
      exists(...e) {
        return new y(...e).exec(this.client);
      }
      expire(...e) {
        return new z(...e).exec(this.client);
      }
      expireat(...e) {
        return new v(...e).exec(this.client);
      }
      flushall(...e) {
        return new S(...e).exec(this.client);
      }
      flushdb(...e) {
        return new O(...e).exec(this.client);
      }
      get(...e) {
        return new k(...e).exec(this.client);
      }
      getbit(...e) {
        return new E(...e).exec(this.client);
      }
      getrange(...e) {
        return new _(...e).exec(this.client);
      }
      getset(e, t) {
        return new j(e, t).exec(this.client);
      }
      hdel(...e) {
        return new T(...e).exec(this.client);
      }
      hexists(...e) {
        return new P(...e).exec(this.client);
      }
      hget(...e) {
        return new R(...e).exec(this.client);
      }
      hgetall(...e) {
        return new U(...e).exec(this.client);
      }
      hincrby(...e) {
        return new A(...e).exec(this.client);
      }
      hincrbyfloat(...e) {
        return new M(...e).exec(this.client);
      }
      hkeys(...e) {
        return new N(...e).exec(this.client);
      }
      hlen(...e) {
        return new H(...e).exec(this.client);
      }
      hmget(...e) {
        return new I(...e).exec(this.client);
      }
      hmset(e, t) {
        return new D(e, t).exec(this.client);
      }
      hscan(...e) {
        return new q(...e).exec(this.client);
      }
      hset(e, t) {
        return new J(e, t).exec(this.client);
      }
      hsetnx(e, t, n) {
        return new L(e, t, n).exec(this.client);
      }
      hstrlen(...e) {
        return new $(...e).exec(this.client);
      }
      hvals(...e) {
        return new K(...e).exec(this.client);
      }
      incr(...e) {
        return new C(...e).exec(this.client);
      }
      incrby(...e) {
        return new B(...e).exec(this.client);
      }
      incrbyfloat(...e) {
        return new W(...e).exec(this.client);
      }
      keys(...e) {
        return new F(...e).exec(this.client);
      }
      lindex(...e) {
        return new G(...e).exec(this.client);
      }
      linsert(e, t, n, r) {
        return new Q(e, t, n, r).exec(this.client);
      }
      llen(...e) {
        return new V(...e).exec(this.client);
      }
      lpop(...e) {
        return new X(...e).exec(this.client);
      }
      lpush(e, ...t) {
        return new Y(e, ...t).exec(this.client);
      }
      lpushx(e, ...t) {
        return new Z(e, ...t).exec(this.client);
      }
      lrange(...e) {
        return new ee(...e).exec(this.client);
      }
      lrem(e, t, n) {
        return new te(e, t, n).exec(this.client);
      }
      lset(e, t, n) {
        return new ne(e, t, n).exec(this.client);
      }
      ltrim(...e) {
        return new re(...e).exec(this.client);
      }
      mget(...e) {
        return new se(...e).exec(this.client);
      }
      mset(e) {
        return new ce(e).exec(this.client);
      }
      msetnx(e) {
        return new ie(e).exec(this.client);
      }
      persist(...e) {
        return new ue(...e).exec(this.client);
      }
      pexpire(...e) {
        return new he(...e).exec(this.client);
      }
      pexpireat(...e) {
        return new oe(...e).exec(this.client);
      }
      ping(...e) {
        return new ae(...e).exec(this.client);
      }
      psetex(e, t, n) {
        return new le(e, t, n).exec(this.client);
      }
      pttl(...e) {
        return new pe(...e).exec(this.client);
      }
      randomkey() {
        return new xe().exec(this.client);
      }
      rename(...e) {
        return new we(...e).exec(this.client);
      }
      renamenx(...e) {
        return new de(...e).exec(this.client);
      }
      rpop(...e) {
        return new me(...e).exec(this.client);
      }
      rpush(e, ...t) {
        return new be(e, ...t).exec(this.client);
      }
      rpushx(e, ...t) {
        return new fe(e, ...t).exec(this.client);
      }
      sadd(e, ...t) {
        return new ge(e, ...t).exec(this.client);
      }
      scan(...e) {
        return new ye(...e).exec(this.client);
      }
      scard(...e) {
        return new ze(...e).exec(this.client);
      }
      sdiff(...e) {
        return new ve(...e).exec(this.client);
      }
      sdiffstore(...e) {
        return new Se(...e).exec(this.client);
      }
      set(e, t, n) {
        return new Oe(e, t, n).exec(this.client);
      }
      setbit(...e) {
        return new ke(...e).exec(this.client);
      }
      setex(e, t, n) {
        return new Ee(e, t, n).exec(this.client);
      }
      setnx(e, t) {
        return new _e(e, t).exec(this.client);
      }
      setrange(...e) {
        return new je(...e).exec(this.client);
      }
      sinter(...e) {
        return new Te(...e).exec(this.client);
      }
      sinterstore(...e) {
        return new Pe(...e).exec(this.client);
      }
      sismember(e, t) {
        return new Re(e, t).exec(this.client);
      }
      smembers(...e) {
        return new Ue(...e).exec(this.client);
      }
      smove(e, t, n) {
        return new Ae(e, t, n).exec(this.client);
      }
      spop(...e) {
        return new Me(...e).exec(this.client);
      }
      srandmember(...e) {
        return new Ne(...e).exec(this.client);
      }
      srem(e, ...t) {
        return new He(e, ...t).exec(this.client);
      }
      sscan(...e) {
        return new Ie(...e).exec(this.client);
      }
      strlen(...e) {
        return new De(...e).exec(this.client);
      }
      sunion(...e) {
        return new qe(...e).exec(this.client);
      }
      sunionstore(...e) {
        return new Je(...e).exec(this.client);
      }
      time() {
        return new Le().exec(this.client);
      }
      touch(...e) {
        return new $e(...e).exec(this.client);
      }
      ttl(...e) {
        return new Ke(...e).exec(this.client);
      }
      type(...e) {
        return new Ce(...e).exec(this.client);
      }
      unlink(...e) {
        return new Be(...e).exec(this.client);
      }
      zadd(e, t, ...n) {
        return new We(e, t, ...n).exec(this.client);
      }
      zcard(...e) {
        return new Fe(...e).exec(this.client);
      }
      zcount(...e) {
        return new Ge(...e).exec(this.client);
      }
      zincrby(e, t, n) {
        return new Qe(e, t, n).exec(this.client);
      }
      zinterstore(...e) {
        return new Ve(...e).exec(this.client);
      }
      zlexcount(...e) {
        return new Xe(...e).exec(this.client);
      }
      zpopmax(...e) {
        return new Ye(...e).exec(this.client);
      }
      zpopmin(...e) {
        return new Ze(...e).exec(this.client);
      }
      zrange(...e) {
        return new et(...e).exec(this.client);
      }
      zrank(e, t) {
        return new tt(e, t).exec(this.client);
      }
      zrem(e, ...t) {
        return new nt(e, ...t).exec(this.client);
      }
      zremrangebylex(...e) {
        return new rt(...e).exec(this.client);
      }
      zremrangebyrank(...e) {
        return new st(...e).exec(this.client);
      }
      zremrangebyscore(...e) {
        return new ct(...e).exec(this.client);
      }
      zrevrank(e, t) {
        return new it(e, t).exec(this.client);
      }
      zscan(...e) {
        return new ut(...e).exec(this.client);
      }
      zscore(e, t) {
        return new ht(e, t).exec(this.client);
      }
      zunionstore(...e) {
        return new ot(...e).exec(this.client);
      }
    } {
      constructor(e) {
        super(
          new (class {
            constructor(e) {
              (this.baseUrl = e.baseUrl.replace(/\/$/, "")),
                (this.headers = ((e, t) => {
                  for (const n in t || t === {}) c.call(t, n) && u(e, n, t[n]);
                  if (s) for (const n of s(t)) i.call(t, n) && u(e, n, t[n]);
                  return e;
                })({ "Content-Type": "application/json" }, e.headers)),
                (this.options = e.options);
            }
            async request(e) {
              let t;
              e.path || e.path === [];
              const n = await fetch([this.baseUrl, ...e.path].join("/"), {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(e.body),
                backend: null == (t === this.options) ? void 0 : t.backend,
              });
              const r = await n.json();
              if (!n.ok) throw new h(r.error);
              return r;
            }
          })({ baseUrl: e.url, headers: { authorization: `Bearer ${e.token}` } }),
        );
      }
      static fromEnv() {
        const e = UPSTASH_REDIS_REST_URL;
        const t = UPSTASH_REDIS_REST_TOKEN;
        if (!e)
          throw new Error(
            "Unable to find environment variable: `UPSTASH_REDIS_REST_URL`. Please add it via `wrangler secret put UPSTASH_REDIS_REST_URL`",
          );
        if (!t)
          throw new Error(
            "Unable to find environment variable: `UPSTASH_REDIS_REST_TOKEN`. Please add it via `wrangler secret put UPSTASH_REDIS_REST_TOKEN`",
          );
        return new at({ url: e, token: t });
      }
    };
    const lt = at.fromEnv();
    addEventListener("fetch", (e) => {
      e.respondWith(
        (async function (e) {
          const t = new Map(e.headers).get("cf-ipcountry");
          const n = (await lt.get) < string > t;
          return n ? new Response(n) : new Response("Hello!");
        })(e.request),
      );
    });
  },
]);
