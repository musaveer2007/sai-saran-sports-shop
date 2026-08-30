import { useState, useEffect, useRef } from "react";

export function Counter({ end, suffix = "", dec = 0 }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          io.disconnect();
          let f = 0;
          const tot = 80;
          const tick = () => {
            f++;
            const p = 1 - Math.pow(1 - f / tot, 3);
            setV(+(end * p).toFixed(dec));
            if (f < tot) requestAnimationFrame(tick);
            else setV(end);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [end, dec]);

  return (
    <span ref={ref}>
      {v.toFixed(dec)}
      {suffix}
    </span>
  );
}
