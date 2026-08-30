import { useRef, useEffect } from "react";

export function MagBtn({ children, tag = "a", href = "#", className = "", style = {}, onClick }) {
  const el = useRef(null);
  const v = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: null });

  useEffect(() => {
    const dom = el.current;
    if (!dom) return;
    const vel = v.current;

    const onMove = (e) => {
      const r = dom.getBoundingClientRect();
      vel.tx = (e.clientX - r.left - r.width / 2) * 0.28;
      vel.ty = (e.clientY - r.top - r.height / 2) * 0.28;
    };

    const onLeave = () => {
      vel.tx = 0;
      vel.ty = 0;
    };

    const tick = () => {
      vel.x += (vel.tx - vel.x) * 0.12;
      vel.y += (vel.ty - vel.y) * 0.12;
      dom.style.transform = `translate(${vel.x}px, ${vel.y}px)`;
      vel.raf = requestAnimationFrame(tick);
    };

    dom.addEventListener("mousemove", onMove);
    dom.addEventListener("mouseleave", onLeave);
    vel.raf = requestAnimationFrame(tick);

    return () => {
      dom.removeEventListener("mousemove", onMove);
      dom.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(vel.raf);
    };
  }, []);

  const handleClick = (e) => {
    const dom = el.current;
    if (!dom) return;
    const rip = document.createElement("span");
    rip.className = "rip";
    const r = dom.getBoundingClientRect();
    const sz = Math.max(r.width, r.height) * 1.5;
    rip.style.cssText = `left:${e.clientX - r.left}px;top:${e.clientY - r.top}px;width:${sz}px;height:${sz}px;margin-left:${-sz / 2}px;margin-top:${-sz / 2}px;`;
    dom.appendChild(rip);
    setTimeout(() => rip.remove(), 600);
    onClick && onClick(e);
  };

  const Tag = tag;
  return (
    <Tag
      ref={el}
      href={href}
      className={className}
      onClick={handleClick}
      style={{
        ...style,
        willChange: "transform",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        textDecoration: "none",
      }}
    >
      {children}
    </Tag>
  );
}
