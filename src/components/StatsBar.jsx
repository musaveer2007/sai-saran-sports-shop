import React from "react";
import { useReveal } from "../hooks/useReveal";
import { STATS } from "../data/constants";

export function StatsBar() {
  useReveal();
  return (
    <div style={{ background: "var(--ink)" }}>
      <div className="gs cont">
        {STATS.map((s, i) => (
          <div
            key={s.l}
            className="rv"
            style={{
              padding: "32px 36px",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,.09)" : "none",
              transitionDelay: `${i * 0.07}s`,
              transition: "background .22s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div
              style={{
                fontFamily: "var(--play)",
                fontSize: 38,
                fontWeight: 400,
                color: "#fff",
                lineHeight: 1,
                marginBottom: 6,
              }}
            >
              {s.n}
            </div>
            <div
              style={{
                fontFamily: "var(--dm)",
                fontSize: 11,
                color: "rgba(255,255,255,.38)",
                letterSpacing: ".1em",
                textTransform: "uppercase",
              }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
