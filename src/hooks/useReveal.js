import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv, .rv-l, .rv-r, .rv-s");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -44px 0px" }
    );
    
    els.forEach((el) => io.observe(el));
    
    return () => io.disconnect();
  }, []); // Added dependency array
}
