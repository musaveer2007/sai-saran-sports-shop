import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { MagBtn } from "./Common/MagBtn";

export function Contact() {
  useReveal();
  const [form, setForm] = useState({ name: "", phone: "", sport: "", msg: "" });
  const [sent, setSent] = useState(false);

  const send = () => {
    if (!form.name || !form.phone) return;
    setSent(true);
    setForm({ name: "", phone: "", sport: "", msg: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const wa = encodeURIComponent(
    "Hi! I'd like to enquire about sports equipment and custom jersey printing from Sai Saran Sports Wear."
  );

  return (
    <section id="contact" className="sec" style={{ background: "var(--cream)" }}>
      <div className="cont">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
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
              Get In Touch
            </span>
            <div style={{ width: 22, height: 1.5, background: "var(--red)" }} />
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
            Order Now or
            <br />
            <em style={{ fontStyle: "italic", color: "var(--red)" }}>Visit the Shop</em>
          </h2>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="rv" style={{ display: "flex", flexDirection: "column", gap: 0, width: "100%", maxWidth: 600 }}>
            {/* WhatsApp */}
            <a
              href={`https://wa.me/919003444955?text=${wa}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "22px 24px",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: 14,
                textDecoration: "none",
                marginBottom: 14,
                boxShadow: "var(--sh-sm)",
                transition: "all .25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(34,197,94,.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "var(--sh-sm)";
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "#22c55e",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width={24} height={24} viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--dm)",
                    fontSize: 11,
                    fontWeight: 500,
                    color: "#15803d",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    marginBottom: 2,
                  }}
                >
                  Chat on WhatsApp
                </div>
                <div style={{ fontFamily: "var(--play)", fontSize: 21, fontWeight: 500, color: "#166534" }}>
                  +91 90034 44955
                </div>
                <div style={{ fontFamily: "var(--dm)", fontSize: 12, color: "#16a34a" }}>Typically replies in minutes</div>
              </div>
            </a>

            {[
              { ico: "📞", l: "Phone", v: "+91 90034 44955" },
              {
                ico: "📍",
                l: "Address",
                v: "No.65/1, Hariharan Bazaar St, near Theradi, NGO Nagar Extension, Ponneri, Tamil Nadu 601204",
              },
            ].map((info) => (
              <div
                key={info.l}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "20px 22px",
                  background: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  marginBottom: 12,
                  boxShadow: "var(--sh-sm)",
                  transition: "all .22s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "var(--sh-md)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "var(--sh-sm)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <span style={{ fontSize: 19, flexShrink: 0 }}>{info.ico}</span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--dm)",
                      fontSize: 10,
                      fontWeight: 500,
                      color: "var(--dim)",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      marginBottom: 4,
                    }}
                  >
                    {info.l}
                  </div>
                  <div style={{ fontFamily: "var(--dm)", fontSize: 14, color: "var(--ink2)", lineHeight: 1.6 }}>
                    {info.v}
                  </div>
                </div>
              </div>
            ))}

            <div
              style={{
                padding: "20px 22px",
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                boxShadow: "var(--sh-sm)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--dm)",
                  fontSize: 10,
                  fontWeight: 500,
                  color: "var(--dim)",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Store Hours
              </div>
              {[
                ["Monday – Saturday", "9:00 am – 8:30 pm", "var(--red)"],
                ["Sunday", "10:00 am – 5:00 pm", "var(--mid)"],
              ].map(([d, h, c]) => (
                <div
                  key={d}
                  style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)" }}
                >
                  <span style={{ fontFamily: "var(--dm)", fontSize: 13, color: "var(--ink2)" }}>{d}</span>
                  <span style={{ fontFamily: "var(--dm)", fontSize: 13, fontWeight: 500, color: c }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
