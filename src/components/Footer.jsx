import React from "react";

export function Footer() {
  const cols = {
    Shop: ["Home", "Products", "Custom Printing", "About", "Contact"],
    Sports: ["Football", "Cricket", "Volleyball", "Basketball", "Athletics"],
    Services: ["Jersey Printing", "Team Orders", "Bulk Supply", "Equipment", "Repairs"],
  };

  return (
    <footer style={{ position: "relative", zIndex: 30, background: "var(--ink2)", borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 58 }}>
      <div className="cont">
        <div className="gf" style={{ marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: "var(--red)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(181,48,42,.28)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--play)",
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: 500,
                    fontStyle: "italic",
                  }}
                >
                  S
                </span>
              </div>
              <div>
                <div style={{ fontFamily: "var(--play)", fontSize: 17, color: "#fff", letterSpacing: ".05em" }}>
                  Sai Saran Sports Wear
                </div>
                <div
                  style={{
                    fontFamily: "var(--dm)",
                    fontSize: 9,
                    color: "rgba(255,255,255,.28)",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                  }}
                >
                  Est. 2010 · Ponneri, Tamil Nadu
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: "var(--dm)",
                fontSize: 13,
                color: "rgba(255,255,255,.38)",
                lineHeight: 1.85,
                maxWidth: 260,
                marginBottom: 24,
              }}
            >
              Premium sports equipment and custom jersey printing — trusted by 150+ teams since 2010.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                {
                  c: "#E1306C",
                  svg: (
                    <svg
                      width={14}
                      height={14}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ),
                },
                {
                  c: "#1877F2",
                  svg: (
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  ),
                },
                {
                  c: "#FF0000",
                  svg: (
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98" fill="var(--ink2)" />
                    </svg>
                  ),
                },
                {
                  c: "#25D366",
                  svg: (
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  ),
                },
              ].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: 34,
                    height: 34,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 6,
                    border: "1px solid rgba(255,255,255,.09)",
                    color: "rgba(255,255,255,.36)",
                    textDecoration: "none",
                    transition: "all .2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = s.c;
                    e.currentTarget.style.color = s.c;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,.09)";
                    e.currentTarget.style.color = "rgba(255,255,255,.36)";
                  }}
                  aria-label="Social link"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(cols).map(([h, items]) => (
            <div key={h}>
              <div
                style={{
                  fontFamily: "var(--dm)",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.22)",
                  marginBottom: 18,
                }}
              >
                {h}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    style={{
                      fontFamily: "var(--dm)",
                      fontSize: 13,
                      color: "rgba(255,255,255,.38)",
                      textDecoration: "none",
                      transition: "color .18s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#fff")}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,.38)")}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: "rgba(255,255,255,.07)", marginBottom: 22 }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 26,
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <span style={{ fontFamily: "var(--dm)", fontSize: 12, color: "rgba(255,255,255,.22)" }}>
            © 2024 Sai Saran Sports Wear. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy", "Terms", "Returns"].map((t) => (
              <a
                key={t}
                href="#"
                style={{
                  fontFamily: "var(--dm)",
                  fontSize: 12,
                  color: "rgba(255,255,255,.22)",
                  textDecoration: "none",
                  transition: "color .18s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "rgba(255,255,255,.6)")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,.22)")}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
