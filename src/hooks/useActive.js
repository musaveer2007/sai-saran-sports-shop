import { useState, useEffect } from "react";

export function useActive() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = ["home", "products", "printing", "why", "contact"];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return active;
}
