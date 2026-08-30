import { useState, useEffect } from "react";

export function Loader({ done }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setP((v) => {
        if (v >= 100) {
          clearInterval(id);
          return 100;
        }
        return v + 2.2;
      });
    }, 28);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`ld${done ? " done" : ""}`}>
      <div style={{ textAlign: "center" }}>
        <div style={{ position: "relative", width: 52, height: 52, margin: "0 auto 24px" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              border: "1.5px solid rgba(255,255,255,0.1)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              border: "1.5px solid transparent",
              borderTopColor: "var(--red)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--play)",
              fontSize: 20,
              color: "var(--red)",
              fontWeight: 400,
            }}
          >
            S
          </div>
        </div>
        <div
          style={{
            fontFamily: "var(--play)",
            fontSize: 20,
            letterSpacing: ".1em",
            color: "#fff",
            marginBottom: 18,
          }}
        >
          Sai Saran Sports Wear
        </div>
        <div
          style={{
            width: 180,
            height: 1.5,
            background: "rgba(255,255,255,0.1)",
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${p}%`,
              background: "var(--red)",
              transition: "width .04s linear",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "var(--dm)",
            fontSize: 11,
            color: "rgba(255,255,255,0.4)",
            marginTop: 9,
            letterSpacing: ".06em",
          }}
        >
          {Math.round(p)}%
        </div>
      </div>
    </div>
  );
}
