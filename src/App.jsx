import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "./components/Common/Loader";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { AdminLayout } from "./layouts/AdminLayout";
import { DashboardHome } from "./pages/admin/DashboardHome";
import { ProductsAdmin } from "./pages/admin/ProductsAdmin";
import { ProductForm } from "./pages/admin/ProductForm";
import { PlaceholderAdmin } from "./pages/admin/PlaceholderAdmin";
import { PlaceholderAdmin } from "./pages/admin/PlaceholderAdmin";
import { PublicLayout } from "./layouts/PublicLayout";

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return show ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="back-to-top"
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 980,
        width: 44,
        height: 44,
        background: "var(--red)",
        border: "none",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "var(--sh-r)",
        animation: "fadeIn .3s ease both",
        transition: "transform .22s,background .2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--red2)";
        e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--red)";
        e.currentTarget.style.transform = "none";
      }}
      aria-label="Back to top"
    >
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  ) : null;
}

// Protected Route Component
function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, role, loading } = useAuthStore();
  
  if (loading) return <Loader done={false} />;
  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && role !== 'admin') return <Navigate to="/" replace />;
  
  return children;
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const { loading: authLoading } = useAuthStore();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1900);
    return () => clearTimeout(t);
  }, []);

  const isReady = loaded && !authLoading;

  return (
    <>
      <Loader done={isReady} />
      {isReady && (
        <>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminLayout />
                </ProtectedRoute>
              } 
            >
              <Route index element={<Navigate to="products" replace />} />
              <Route path="products" element={<ProductsAdmin />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="products/:id/edit" element={<ProductForm />} />
            </Route>
          </Routes>
          <BackToTop />
        </>
      )}
    </>
  );
}
