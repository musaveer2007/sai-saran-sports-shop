import { useRef, useEffect } from "react";

export function TiltCard({ children, className = "", style = {} }) {
  const el = useRef(null);
  const s = useRef({ rx: 0, ry: 0, vx: 0, vy: 0, tx: 0, ty: 0, raf: null });

  useEffect(() => {
    const dom = el.current;
    if (!dom) return;
    const st = s.current;

    const onMove = (e) => {
      const r = dom.getBoundingClientRect();
      st.tx = ((e.clientX - r.left) / r.width - 0.5) * 8;
      st.ty = ((e.clientY - r.top) / r.height - 0.5) * 8;
    };

    const onLeave = () => {
      st.tx = 0;
      st.ty = 0;
    };

    const tick = () => {
      st.vx += (st.tx - st.rx) * 0.09;
      st.vy += (st.ty - st.ry) * 0.09;
      st.vx *= 0.82;
      st.vy *= 0.82;
      st.rx += st.vx;
      st.ry += st.vy;
      const z = Math.abs(st.rx) + Math.abs(st.ry) > 0.4 ? 10 : 0;
      dom.style.transform = `perspective(900px) rotateX(${-st.ry}deg) rotateY(${st.rx}deg) translateZ(${z}px)`;
      st.raf = requestAnimationFrame(tick);
    };

    dom.addEventListener("mousemove", onMove);
    dom.addEventListener("mouseleave", onLeave);
    st.raf = requestAnimationFrame(tick);

    return () => {
      dom.removeEventListener("mousemove", onMove);
      dom.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(st.raf);
    };
  }, []);

  return (
    <div
      ref={el}
      className={className}
      style={{ ...style, willChange: "transform", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
