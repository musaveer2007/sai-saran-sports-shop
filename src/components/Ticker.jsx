import React from "react";

export function Ticker() {
  const items = [
    "Football Jerseys",
    "Cricket Kits",
    "Volleyball Sets",
    "Custom Printing",
    "Bulk Orders",
    "Team Uniforms",
    "Sports Shoes",
    "Premium Balls",
    "Cricket Bats",
    "Sports Gloves",
  ];
  return (
    <div className="ticker-bar">
      <div className="ticker-inner">
        {[...items, ...items].map((t, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 14, margin: "0 28px" }}>
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "rgba(255,255,255,.5)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--play)",
                letterSpacing: "3px",
                color: "#fff",
                fontSize: 13,
                fontWeight: 400,
              }}
            >
              {t}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
