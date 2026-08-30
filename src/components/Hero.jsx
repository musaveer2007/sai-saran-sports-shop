import { useState, useEffect, useMemo } from "react";
import { MagBtn } from "./Common/MagBtn";
import { CharReveal, WordReveal } from "./Common/Reveal";

export function Hero() {
  const [typed, setTyped] = useState("");
  const [wi, setWi] = useState(0);
  const [ph, setPh] = useState("type");
  const words = useMemo(() => ["Football", "Cricket", "Volleyball", "Basketball", "Your Sport"], []);

  useEffect(() => {
    const w = words[wi];
    let t;
    if (ph === "type") {
      if (typed.length < w.length)
        t = setTimeout(() => setTyped(w.slice(0, typed.length + 1)), 88);
      else t = setTimeout(() => setPh("hold"), 2000);
    } else if (ph === "hold") {
      t = setTimeout(() => setPh("erase"), 500);
    } else {
      if (typed.length > 0)
        t = setTimeout(() => setTyped(typed.slice(0, -1)), 48);
      else {
        setWi((wi + 1) % words.length);
        setPh("type");
      }
    }
    return () => clearTimeout(t);
  }, [typed, ph, wi, words]);

  return (
    <section id="home" className="hero-grid">
      {/* Left red split panel */}
      <div className="hero-left">
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=900&q=60&auto=format&fit=crop"
            alt="Football background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.18,
              animation: "imgZoom 16s ease-in-out infinite alternate",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            backgroundImage: "radial-gradient(circle,rgba(255,255,255,.7) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Floating product cards - Hidden on mobile via inline media check or just CSS if preferred */}
        <div
          className="hero-float"
          style={{
            position: "absolute",
            top: "22%",
            right: "-28px",
            zIndex: 3,
            animation: "float 6s ease-in-out infinite",
          }}
        >

          <div
            style={{
              background: "rgba(255,255,255,.92)",
              backdropFilter: "blur(8px)",
              borderRadius: 8,
              padding: "9px 13px",
              marginTop: 8,
              boxShadow: "var(--sh-sm)",
            }}
          >
          </div>
        </div>

        <div
          className="hero-float"
          style={{
            position: "absolute",
            top: "56%",
            right: "10%",
            zIndex: 3,
            animation: "floatB 7.5s ease-in-out infinite 1.2s",
          }}
        >

        </div>

        <div
          style={{
            position: "absolute",
            bottom: 44,
            left: 40,
            zIndex: 2,
            animation: "slideL .7s ease .9s both",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 20, height: 1.5, background: "rgba(255,255,255,.5)" }} />
            <span
              style={{
                fontFamily: "var(--dm)",
                fontSize: 10,
                fontWeight: 500,
                color: "rgba(255,255,255,.6)",
                letterSpacing: ".14em",
                textTransform: "uppercase",
              }}
            >
              Ponneri, Tamil Nadu
            </span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["⚽", "🏏", "🏐", "🎽", "👟"].map((ic, i) => (
              <span key={i} style={{ fontSize: 18, opacity: 0.55, animation: `fadeIn .4s ease ${0.9 + i * 0.09}s both` }}>
                {ic}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div style={{ maxWidth: 520, position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 26,
              animation: "fadeUp .5s ease .25s both",
            }}
          >
            <div
              style={{
                width: 28,
                height: 1.5,
                background: "var(--red)",
                animation: "lineGrow .55s ease .15s both",
              }}
            />
            <span
              style={{
                fontFamily: "var(--dm)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "var(--red)",
              }}
            >
              Ponneri's Premier Sports Shop
            </span>
          </div>

          <h1
            className="hero-h"
            style={{
              fontFamily: "var(--play)",
              fontSize: "clamp(46px, 5vw, 76px)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "-.01em",
              color: "var(--ink)",
              marginBottom: 4,
            }}
          >
            <CharReveal text="Sai Saran" delay={0.45} style={{ display: "block" }} />
            <CharReveal text="Sports" delay={0.66} style={{ display: "block", color: "var(--red)", fontStyle: "italic" }} />
          </h1>

          <p
            style={{
              fontFamily: "var(--dm)",
              fontSize: 17,
              color: "var(--mid)",
              lineHeight: 1.6,
              marginTop: 20,
              marginBottom: 8,
              animation: "fadeUp .6s ease .88s both",
            }}
          >
            All equipment for{" "}
            <span style={{ color: "var(--ink)", fontWeight: 600, minWidth: 148, display: "inline-block" }}>
              {typed}
              <span style={{ animation: "blink .8s step-end infinite", color: "var(--mid)" }}>|</span>
            </span>
          </p>
          <div style={{ animation: "fadeUp .6s ease 1s both" }}>
            <WordReveal
              text="Premium sports equipment and custom jersey printing — trusted by 150+ teams and schools across Tamil Nadu since 2010."
              delay={0.06}
              style={{
                fontFamily: "var(--dm)",
                fontSize: 14,
                color: "var(--mid)",
                lineHeight: 1.82,
                display: "block",
                maxWidth: 450,
                marginBottom: 36,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              animation: "fadeUp .6s ease 1.08s both",
            }}
          >
            <MagBtn href="#products" className="btn-dk">
              Explore Products <span>→</span>
            </MagBtn>
            <MagBtn href="#printing" className="btn-ol">
              Customize Jersey
            </MagBtn>
          </div>

          <div
            style={{
              display: "flex",
              gap: 28,
              marginTop: 46,
              paddingTop: 26,
              borderTop: "1px solid var(--border)",
              flexWrap: "wrap",
              animation: "fadeUp .6s ease 1.18s both",
            }}
          >
            {[
              ["2,500+", "Jerseys"],
              ["150+", "Teams"],
              ["4.9★", "Rating"],
              ["15 Yrs", "Service"],
            ].map(([n, l]) => (
              <div key={l}>
                <div
                  style={{
                    fontFamily: "var(--play)",
                    fontSize: 26,
                    fontWeight: 500,
                    color: "var(--red)",
                    lineHeight: 1.1,
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontFamily: "var(--dm)",
                    fontSize: 11,
                    color: "var(--dim)",
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    marginTop: 2,
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 44,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          animation: "fadeIn 1s 1.8s both",
          zIndex: 5,
        }}
      >
        <span
          style={{
            fontFamily: "var(--dm)",
            fontSize: 9,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "var(--dim)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 34,
            background: "linear-gradient(to bottom,var(--mid),transparent)",
          }}
        />
      </div>
    </section>
  );
}
