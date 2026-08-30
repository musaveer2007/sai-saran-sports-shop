import { useReveal } from "../hooks/useReveal";
import { MagBtn } from "./Common/MagBtn";
import { WordReveal } from "./Common/Reveal";

export function JerseyPrinting() {
  useReveal();

  return (
    <section id="printing" style={{ background: "var(--ink)", position: "relative", overflow: "hidden" }} className="sec">
      <div
        style={{
          position: "absolute",
          right: "-8%",
          top: "10%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(181,48,42,.12) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "-5%",
          bottom: "5%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(255,255,255,.03) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="cont" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="rv" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ width: 22, height: 1.5, background: "var(--red)" }} />
            <span
              style={{
                fontFamily: "var(--dm)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.4)",
              }}
            >
              Custom Printing
            </span>
            <div style={{ width: 22, height: 1.5, background: "var(--red)" }} />
          </div>
          <h2
            className="rv"
            style={{
              fontFamily: "var(--play)",
              fontSize: "clamp(36px,5vw,64px)",
              fontWeight: 400,
              lineHeight: 1.0,
              color: "#fff",
            }}
          >
            Design Your
            <br />
            <em style={{ fontStyle: "italic", color: "var(--red)" }}>Perfect Jersey</em>
          </h2>
          <div className="rv" style={{ maxWidth: 500, margin: "18px auto 0" }}>
            <WordReveal
              text="Full sublimation printing with permanent colours. Any design any team completely your way."
              delay={0.08}
              style={{ fontFamily: "var(--dm)", fontSize: 15, color: "rgba(255,255,255,.48)", lineHeight: 1.8, display: "block" }}
            />
          </div>
        </div>

        <div className="g2" style={{ gap: 68, marginBottom: 80 }}>
          <div className="rv-l">
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.09)",
                boxShadow: "var(--sh-xl)",
                background: "var(--ink2)",
              }}
            >
              <div style={{ height: 365, overflow: "hidden", position: "relative" }}>
                <img
                  src="/images/printing_shop.jpeg"
                  alt="Printing Shop"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "42%",
                    background: "linear-gradient(to top,rgba(28,25,23,.92),transparent)",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="rv-r">
            {[
              { n: "01", t: "Full Sublimation", d: "Permanent colour across the full panel — won't peel or fade after 200+ washes." },
              { n: "02", t: "Name & Number", d: "Unique player name and squad number on every jersey. Multiple clean font styles." },
              { n: "03", t: "Logo & Sponsor", d: "Club badge, title sponsor, sleeve logos — pixel-perfect every time." },
              { n: "04", t: "Bulk Pricing", d: "10–50 jerseys: 15% off  ·  50+: 25% off  ·  100+: custom academy pricing." },
            ].map((f, i) => (
              <div
                key={f.n}
                style={{
                  display: "flex",
                  gap: 20,
                  padding: "20px 0",
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,.07)" : "none",
                  transition: "transform .22s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(5px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              >
                <span style={{ fontFamily: "var(--play)", fontSize: 17, color: "var(--red)", opacity: 0.65, flexShrink: 0, width: 26, paddingTop: 1 }}>
                  {f.n}
                </span>
                <div>
                  <h4 style={{ fontFamily: "var(--dm)", fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 6 }}>{f.t}</h4>
                  <p style={{ fontFamily: "var(--dm)", fontSize: 13, color: "rgba(255,255,255,.42)", lineHeight: 1.72 }}>{f.d}</p>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
              <MagBtn href="#contact" className="btn-r">
                Create Your Jersey
              </MagBtn>
              <MagBtn href="#contact" className="btn-ol" style={{ borderColor: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.6)" }}>
                Bulk Quote
              </MagBtn>
            </div>
          </div>
        </div>

        <div className="rv">
          <div style={{ padding: "36px 40px", background: "rgba(255,255,255,.04)", borderRadius: 14, border: "1px solid rgba(255,255,255,.07)" }}>
            <div
              style={{
                fontFamily: "var(--dm)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.26)",
                textAlign: "center",
                marginBottom: 34,
              }}
            >
              How It Works
            </div>
            <div className="steps-grid">
              <div className="steps-line" style={{ position: "absolute", top: 19, left: "12.5%", right: "12.5%", height: 1, background: "rgba(181,48,42,.28)", zIndex: 0 }} />
              {[
                ["Order", "Call, WhatsApp, or visit."],
                ["Design", "Your design or a template."],
                ["Print", "48-hour turnaround."],
                ["Deliver", "Pickup or city delivery."],
              ].map(([t, d], i) => (
                <div key={t} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      border: "1px solid rgba(181,48,42,0.45)",
                      background: "var(--ink)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 14px",
                      fontFamily: "var(--play)",
                      fontSize: 16,
                      color: "var(--red)",
                      fontWeight: 400,
                      transition: "all .25s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--red)";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--ink)";
                      e.currentTarget.style.color = "var(--red)";
                    }}
                  >
                    0{i + 1}
                  </div>
                  <div style={{ fontFamily: "var(--dm)", fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 5 }}>{t}</div>
                  <div style={{ fontFamily: "var(--dm)", fontSize: 12, color: "rgba(255,255,255,.33)", lineHeight: 1.6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
