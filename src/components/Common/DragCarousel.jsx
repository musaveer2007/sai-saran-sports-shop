import { useRef, useCallback } from "react";

export function DragCarousel({ children }) {
  const ref = useRef(null);
  const s = useRef({
    down: false,
    startX: 0,
    scrollL: 0,
    vx: 0,
    lastX: 0,
    lastT: 0,
    raf: null,
  });

  const momentum = useCallback(() => {
    const t = ref.current;
    if (!t) return;
    s.current.vx *= 0.92;
    t.scrollLeft -= s.current.vx;
    if (Math.abs(s.current.vx) > 0.3) s.current.raf = requestAnimationFrame(momentum);
  }, []);

  const onDown = (e) => {
    if (s.current.raf) cancelAnimationFrame(s.current.raf);
    s.current = {
      ...s.current,
      down: true,
      startX: e.pageX - ref.current.offsetLeft,
      scrollL: ref.current.scrollLeft,
      vx: 0,
      lastX: e.pageX,
      lastT: Date.now(),
    };
    ref.current.classList.add("grabbing");
  };

  const onMove = (e) => {
    if (!s.current.down) return;
    e.preventDefault();
    const dt = Date.now() - s.current.lastT;
    if (dt > 0) s.current.vx = ((e.pageX - s.current.lastX) / dt) * 14;
    s.current.lastX = e.pageX;
    s.current.lastT = Date.now();
    ref.current.scrollLeft =
      s.current.scrollL - (e.pageX - ref.current.offsetLeft - s.current.startX);
  };

  const onUp = () => {
    s.current.down = false;
    ref.current?.classList.remove("grabbing");
    momentum();
  };

  return (
    <div
      ref={ref}
      className="drag-track"
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
    >
      {children}
    </div>
  );
}
