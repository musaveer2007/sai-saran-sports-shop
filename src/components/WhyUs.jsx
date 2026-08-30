import React from "react";
import { useReveal } from "../hooks/useReveal";
import { WHY } from "../data/constants";
import { TiltCard } from "./Common/TiltCard";
import { WordReveal } from "./Common/Reveal";

export function WhyUs() {
  useReveal();
  return (
    <section id="why" className="sec" style={{ background: "var(--cream2)" }}>
      <div className="cont">
        <div className="g2" style={{ marginBottom: 60, alignItems: "end" }}>
          <div>
            <div className="rv" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 22, height: 1.5, background: "var(--red)" }} />
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
                Why Choose Us
              </span>
            </div>
            <h2
              className="rv"
              style={{
                fontFamily: "var(--play)",
                fontSize: "clamp(36px,5vw,58px)",
                fontWeight: 400,
                lineHeight: 1.0,
                color: "var(--ink)",
              }}
            >
              The Sai Saran
              <br />
              <em style={{ fontStyle: "italic", color: "var(--red)" }}>Advantage</em>
            </h2>
          </div>
          <div className="rv" style={{ paddingBottom: 6 }}>
            <WordReveal
              text="We are not just a sports shop — we are your team's partner from planning to match day."
              delay={0.06}
              style={{ fontFamily: "var(--dm)", fontSize: 14, color: "var(--ink2)", lineHeight: 1.85, display: "block" }}
            />
          </div>
        </div>

        <div className="g3" style={{ marginBottom: 68 }}>
          {WHY.map((w, i) => (
            <TiltCard key={w.title} className="wc rv" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div style={{ fontSize: 18, color: w.col, marginBottom: 18, opacity: 0.7 }}>{w.ico}</div>
              <h3 style={{ fontFamily: "var(--dm)", fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 10 }}>
                {w.title}
              </h3>
              <p style={{ fontFamily: "var(--dm)", fontSize: 13, color: "var(--ink2)", lineHeight: 1.82 }}>{w.body}</p>
              <div style={{ marginTop: 22, height: 1.5, width: 32, background: "var(--red)", borderRadius: 1, opacity: 0.45 }} />
            </TiltCard>
          ))}
        </div>

        {/* Store Praise Section */}
        <div className="rv" style={{ marginBottom: 68, display: "flex", gap: 44, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px", borderRadius: 18, overflow: "hidden", boxShadow: "var(--sh-lg)", border: "1px solid rgba(0,0,0,0.05)" }}>
            <img 
              src="/images/store_interior.jpeg" 
              alt="Sai Saran Sports Wear Showroom" 
              style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", transform: "scale(1.02)" }} 
            />
          </div>
          <div style={{ flex: "1 1 320px" }}>
            <h3 style={{ fontFamily: "var(--play)", fontSize: "clamp(28px, 3vw, 36px)", color: "var(--ink)", marginBottom: 18, lineHeight: 1.15 }}>
              A True Haven for <br/><em style={{fontStyle: "italic", color: "var(--red)"}}>Sports Enthusiasts</em>
            </h3>
            <p style={{ fontFamily: "var(--dm)", fontSize: 15, color: "var(--ink2)", lineHeight: 1.8, marginBottom: 18 }}>
              Step into our expansive Ponneri showroom and experience the difference of a truly dedicated sports shop. We pride ourselves on maintaining a meticulously organized space stocked with premium, professional-grade equipment.
            </p>
            <p style={{ fontFamily: "var(--dm)", fontSize: 15, color: "var(--ink2)", lineHeight: 1.8 }}>
              From a massive display of handcrafted English willow bats, to custom-tailored apparel and top-tier accessories, every item on our shelves is hand-selected. Our knowledgeable staff is as passionate about the game as you are, and always ready to help you find exactly what you need to dominate the field.
            </p>
          </div>
        </div>

        {/* Machine Section */}
        <div className="rv" style={{ marginBottom: 84, display: "flex", gap: 44, alignItems: "center", flexWrap: "wrap-reverse" }}>
          <div style={{ flex: "1 1 320px" }}>
            <h3 style={{ fontFamily: "var(--play)", fontSize: "clamp(28px, 3vw, 36px)", color: "var(--ink)", marginBottom: 18, lineHeight: 1.15 }}>
              Precision <em style={{fontStyle: "italic", color: "var(--red)"}}>Racket Stringing</em>
            </h3>
            <p style={{ fontFamily: "var(--dm)", fontSize: 16, fontWeight: 500, color: "var(--ink)", lineHeight: 1.6, marginBottom: 18, borderLeft: "3px solid var(--red)", paddingLeft: 18, background: "rgba(220, 38, 38, 0.04)", padding: "12px 12px 12px 16px", borderRadius: "0 8px 8px 0" }}>
              This state-of-the-art machine is only available in this shop in whole Thiruvallur district.
            </p>
            <p style={{ fontFamily: "var(--dm)", fontSize: 15, color: "var(--ink2)", lineHeight: 1.8 }}>
              Experience unparalleled tension accuracy and consistency for your badminton and tennis rackets. We house the advanced Orbit X 8800 electronic stringing machine to ensure that every racket is meticulously tuned to professional tournament standards. Whether you need explosive power or pinpoint control, our expert stringing service guarantees the perfect sweet spot to elevate your game.
            </p>
          </div>
          <div style={{ flex: "1 1 400px", borderRadius: 18, overflow: "hidden", boxShadow: "var(--sh-lg)", border: "1px solid rgba(0,0,0,0.05)" }}>
            <img 
              src="/images/stringing_machine.jpeg" 
              alt="Orbit X 8800 Professional Stringing Machine" 
              style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", transform: "scale(1.02)" }} 
            />
          </div>
        </div>

        {/* Testimonials */}
        <div className="rv">
          <div
            style={{
              background: "var(--ink)",
              borderRadius: 18,
              padding: "48px 52px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "var(--sh-xl)",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--red)" }} />
            {/* Large quote mark */}
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 40,
                fontFamily: "var(--play)",
                fontSize: 140,
                color: "rgba(255,255,255,.04)",
                lineHeight: 1,
                userSelect: "none",
                fontStyle: "italic",
              }}
            >
              "
            </div>
            <div className="g2" style={{ gap: 52 }}>
              {[
                {
                  i: "R",
                  n: "Ravi Kumar",
                  r: "FC Warriors · Captain",
                  c: "var(--red)",
                  q: "Got 30 custom jerseys in 2 days. The colours are vivid, stitching is perfect. Sai Saran Sports Wear is our team's permanent partner.",
                },
                {
                  i: "A",
                  n: "Arjun Sharma",
                  r: "District Cricket · Player",
                  c: "#ca8a04",
                  q: "Best cricket equipment in the district. My Kashmir willow bat and custom kit — quality I didn't expect at that price. Highly recommended.",
                },
              ].map((t) => (
                <div key={t.n}>
                  <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width={14} height={14} viewBox="0 0 24 24" fill="#ca8a04">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--play)",
                      fontSize: 18,
                      fontWeight: 400,
                      lineHeight: 1.76,
                      color: "rgba(246,240,232,.78)",
                      fontStyle: "italic",
                      marginBottom: 24,
                    }}
                  >
                    "{t.q}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: `${t.c}22`,
                        border: `1px solid ${t.c}44`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--play)",
                        fontSize: 19,
                        color: t.c,
                        fontWeight: 500,
                      }}
                    >
                      {t.i}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--dm)", fontSize: 14, fontWeight: 600, color: "#fff" }}>{t.n}</div>
                      <div style={{ fontFamily: "var(--dm)", fontSize: 11, color: "rgba(255,255,255,.33)" }}>{t.r}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
