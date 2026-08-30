import { useState, useEffect, useRef } from "react";

export function ParallaxImg({ src, alt, style = {}, factor = 0.12 }) {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * factor);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [factor]);

  return (
    <div ref={ref} style={{ overflow: "hidden", ...style }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `translateY(${offset}px) scale(1.12)`,
          willChange: "transform",
          transition: "transform .05s linear",
        }}
      />
    </div>
  );
}
