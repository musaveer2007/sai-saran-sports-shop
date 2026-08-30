import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";
import { User, LogOut, LayoutDashboard, ShoppingCart } from "lucide-react";
import { MagBtn } from "./Common/MagBtn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [inShopZone, setInShopZone] = useState(false);
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { user, role, signOut } = useAuthStore();
  const { items } = useCartStore();

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 44);
      // Detect if we've scrolled past the 3D experience into the shop zone
      const shopContent = document.querySelector('.shop-content-below');
      if (shopContent) {
        const rect = shopContent.getBoundingClientRect();
        setInShopZone(rect.top < 80);
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Dynamic navbar styling: glassmorphism dark when over 3D, cream when over shop
  const isDarkMode = !inShopZone;

  const links = [
    ["home", "Home"],
    ["products", "Products"],
    ["printing", "Printing"],
    ["why", "About"],
    ["contact", "Contact"],
  ];

  const totalCartItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const navBg = isDarkMode
    ? (scrolled ? "rgba(0,0,0,0.65)" : "transparent")
    : (scrolled ? "rgba(246,240,232,.96)" : "transparent");

  const textColor = isDarkMode ? "#fff" : "var(--ink)";
  const dimColor = isDarkMode ? "rgba(255,255,255,0.6)" : "var(--mid)";
  const borderColor = isDarkMode
    ? (scrolled ? "rgba(255,255,255,0.08)" : "transparent")
    : (scrolled ? "1px solid var(--border)" : "1px solid transparent");

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 990,
          padding: scrolled ? "13px 48px" : "22px 48px",
          background: navBg,
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: borderColor,
          transition: "all .36s cubic-bezier(.4,0,.2,1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="/#home"
          style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none" }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div
            style={{
              width: 34,
              height: 34,
              background: "var(--red)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(181,48,42,.28)",
            }}
          >
            <span style={{ fontFamily: "var(--play)", fontSize: 18, color: "#fff", fontWeight: 500, fontStyle: "italic" }}>
              S
            </span>
          </div>
          <div>
            <div style={{ fontFamily: "var(--play)", fontSize: 16, color: textColor, letterSpacing: ".05em", lineHeight: 1.1, transition: "color 0.3s" }}>
              Sai Saran Sports Wear
            </div>
            <div style={{ fontFamily: "var(--dm)", fontSize: 9.5, color: dimColor, letterSpacing: ".12em", textTransform: "uppercase", transition: "color 0.3s" }}>
              Est. 2010 · Ponneri
            </div>
          </div>
        </a>
        
        <div className="desktop-nav" style={{ display: "flex", gap: 38, alignItems: "center" }}>
          {links.map(([id, lbl]) => (
            <a
              key={id}
              href={`/#${id}`}
              style={{
                fontFamily: "var(--dm)",
                fontSize: 13,
                fontWeight: 400,
                color: dimColor,
                textDecoration: "none",
                letterSpacing: ".03em",
                transition: "color .2s",
                position: "relative",
                paddingBottom: 3,
              }}
              onMouseEnter={(e) => e.target.style.color = textColor}
              onMouseLeave={(e) => e.target.style.color = dimColor}
            >
              {lbl}
            </a>
          ))}
          
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginLeft: "12px" }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", position: "relative", color: textColor, transition: "color 0.3s" }}>
              <ShoppingCart size={20} />
              {totalCartItems > 0 && (
                <span style={{
                  position: "absolute", top: "-8px", right: "-8px", background: "var(--red)", color: "white",
                  fontSize: "10px", width: "16px", height: "16px", borderRadius: "50%", display: "flex",
                  alignItems: "center", justifyContent: "center", fontWeight: "bold"
                }}>
                  {totalCartItems}
                </span>
              )}
            </button>

            <div style={{ position: "relative" }}>
              {user ? (
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", color: textColor }}
                >
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: isDarkMode ? "rgba(255,255,255,0.1)" : "var(--cream2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <User size={16} />
                  </div>
                </button>
              ) : (
                <Link to="/login" style={{ color: textColor }}>
                  <User size={20} />
                </Link>
              )}

              {showDropdown && user && (
                <div style={{
                  position: "absolute", top: "100%", right: 0, marginTop: "8px", background: "var(--white)",
                  borderRadius: "8px", boxShadow: "var(--sh-md)", border: "1px solid var(--border)", width: "180px",
                  overflow: "hidden", display: "flex", flexDirection: "column", zIndex: 1000
                }}>
                  <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", fontSize: "13px", color: "var(--dim)" }}>
                    {user.email}
                  </div>
                  {role === 'admin' && (
                    <Link to="/admin" onClick={() => setShowDropdown(false)} style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px", color: "var(--ink)", textDecoration: "none", fontSize: "14px" }}>
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => { signOut(); setShowDropdown(false); }}
                    style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px", color: "var(--red)", background: "none", border: "none", cursor: "pointer", fontSize: "14px", textAlign: "left", width: "100%" }}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
            
            <MagBtn href="/#contact" className="btn-r" style={{ padding: "9px 22px", fontSize: 12, borderRadius: 6 }}>
              Get a Quote
            </MagBtn>
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="hamburger"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: textColor }}
        >
          {open ? (
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          ) : (
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="15" y2="17" />
            </svg>
          )}
        </button>
      </nav>

      <div className={`mob-nav${open ? " open" : ""}`}>
        {links.map(([id, lbl]) => (
          <a key={id} href={`/#${id}`} onClick={() => setOpen(false)}>
            {lbl}
          </a>
        ))}
        {user ? (
          <>
            {role === 'admin' && <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>}
            <button onClick={() => { signOut(); setOpen(false); }} style={{ background: 'none', border: 'none', fontSize: '42px', fontFamily: 'var(--play)', color: 'var(--red)' }}>Logout</button>
          </>
        ) : (
          <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
        )}
        <MagBtn href="/#contact" className="btn-r" onClick={() => setOpen(false)} style={{ marginTop: 8 }}>
          Get a Quote
        </MagBtn>
      </div>
    </>
  );
}
