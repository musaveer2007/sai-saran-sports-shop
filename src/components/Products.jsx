import { useState, useEffect } from "react";
import { useReveal } from "../hooks/useReveal";
import { CATS } from "../data/constants";
import { TiltCard } from "./Common/TiltCard";
import { DragCarousel } from "./Common/DragCarousel";
import { MagBtn } from "./Common/MagBtn";
import { WordReveal } from "./Common/Reveal";
import { supabase } from "../lib/supabase";
import { useCartStore } from "../store/useCartStore";

export function Products() {
  useReveal();
  const [active, setActive] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        console.log("Fetching products...");
        const { data, error } = await supabase
          .from('ss_products')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error("Supabase error:", error);
          setErrorMsg(error.message || JSON.stringify(error));
        } else if (data) {
          console.log("Fetched products count:", data.length);
          setProducts(data);
        }
      } catch (err) {
        console.error("Exception during fetchProducts:", err);
        setErrorMsg(err.message || JSON.stringify(err));
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filtered = active === "All" ? products : products.filter((p) => p.category === active || p.cat === active);

  return (
    <section id="products" className="sec" style={{ background: "var(--cream)" }}>
      <div className="cont">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 50 }}>
          <div>
            <div className="rv" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 22, height: 1.5, background: "var(--red)" }} />
              <span style={{ fontFamily: "var(--dm)", fontSize: 11, fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--red)" }}>
                Our Products
              </span>
            </div>
            <h2 className="rv" style={{ fontFamily: "var(--play)", fontSize: "clamp(36px,5vw,58px)", fontWeight: 400, lineHeight: 1.0, color: "var(--ink)" }}>
              Gear Up for
              <br />
              <em style={{ fontStyle: "italic", color: "var(--red)" }}>Every Sport</em>
            </h2>
          </div>
          <div className="rv" style={{ flex: "1 1 320px", minWidth: 260, maxWidth: 400 }}>
            <WordReveal
              text="Curated for performance durability and value — every product we stock is one we stand behind."
              delay={0.08}
              style={{ fontFamily: "var(--dm)", fontSize: 14, color: "var(--mid)", lineHeight: 1.82, display: "block" }}
            />
          </div>
        </div>
        
        {/* Filters */}
        <div className="rv" style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              style={{
                padding: "7px 18px", borderRadius: 999, cursor: "pointer", transition: "all .22s",
                fontFamily: "var(--dm)", fontSize: 13, fontWeight: 400,
                background: active === c ? "var(--red)" : "var(--white)",
                color: active === c ? "#fff" : "var(--mid)",
                border: `1.5px solid ${active === c ? "var(--red)" : "var(--border)"}`,
                boxShadow: active === c ? "var(--sh-r)" : "var(--sh-sm)",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {errorMsg ? (
        <div style={{ textAlign: 'center', padding: '100px 0', fontFamily: 'var(--dm)', color: 'var(--red)' }}>
          Error loading products: {errorMsg}
        </div>
      ) : loading ? (
        <div style={{ textAlign: 'center', padding: '100px 0', fontFamily: 'var(--dm)', color: 'var(--dim)' }}>
          Loading latest collections...
        </div>
      ) : (
        <DragCarousel>
          {filtered.map((p) => (
            <TiltCard key={p.id} className="pc" style={{ flexShrink: 0, width: 288 }}>
              <div className="iw">
                <img src={p.thumbnail_url || p.img} alt={p.title} loading="lazy" />
                {p.tag && (
                  <span
                    style={{
                      position: "absolute", top: 12, left: 12, padding: "4px 11px", background: "var(--red)",
                      color: "#fff", borderRadius: 999, fontFamily: "var(--dm)", fontSize: 10, fontWeight: 600,
                      letterSpacing: ".04em", boxShadow: "var(--sh-r)", animation: "tagPop .4s ease both"
                    }}
                  >
                    {p.tag}
                  </span>
                )}
              </div>
              <div style={{ padding: "18px 20px 20px" }}>
                <div style={{ fontFamily: "var(--dm)", fontSize: 10, color: "var(--dim)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 5 }}>
                  {p.sport || 'General'} · {p.category || p.cat}
                </div>
                <h3 style={{ fontFamily: "var(--play)", fontSize: 20, fontWeight: 500, color: "var(--ink)", marginBottom: 6, lineHeight: 1.2 }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: "var(--dm)", fontSize: 13, color: "var(--mid)", lineHeight: 1.65, marginBottom: 16 }}>
                  {p.description || p.desc}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--play)", fontSize: 26, fontWeight: 500, color: "var(--red)" }}>
                    ₹{p.price}
                  </span>
                  <button
                    onClick={() => {
                      addToCart(p, 1, '', '');
                      alert('Added to cart!');
                    }}
                    style={{
                      padding: "7px 14px", background: "transparent", border: "1.5px solid var(--border)",
                      borderRadius: 6, fontFamily: "var(--dm)", fontSize: 11, fontWeight: 500, color: "var(--ink2)",
                      cursor: "pointer", transition: "all .2s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--ink)";
                      e.currentTarget.style.borderColor = "var(--ink)";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--ink2)";
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '60px', textAlign: 'center', width: '100%', color: 'var(--dim)', fontFamily: 'var(--dm)' }}>
              No items available in this category yet.
            </div>
          )}
        </DragCarousel>
      )}
      
      {!loading && filtered.length > 0 && (
        <div style={{ textAlign: "center", marginTop: -14, marginBottom: 6 }}>
          <span style={{ fontFamily: "var(--dm)", fontSize: 10, color: "var(--dim)", letterSpacing: ".1em" }}>
            ← drag to browse →
          </span>
        </div>
      )}
      <div className="cont" style={{ paddingTop: 44 }}>
        <div className="rv" style={{ textAlign: "center" }}>
          <MagBtn href="#contact" className="btn-ol">
            Request Full Catalogue <span>→</span>
          </MagBtn>
        </div>
      </div>
    </section>
  );
}
