import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollEngine - Ported from 3d-animated-website
 * Creates the pinned ScrollTrigger that drives the frame-sequence animation.
 * Also manages the GSAP timeline that syncs content transitions with frame changes.
 */
export function ScrollEngine({ children }) {
  const containerRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = document.querySelector('.sections-wrapper');
      if (!wrapper) return;

      const sections = gsap.utils.toArray('.story-section');

      // Create a master frame-based state machine timeline
      const tl = gsap.timeline({ paused: true });
      tlRef.current = tl;

      // Pinning ScrollTrigger that drives everything
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: '+=2000%',
        pin: true,
        onUpdate: (self) => {
          window.dispatchEvent(new CustomEvent('scrollProgress', { detail: self.progress }));
        }
      });

      // Force timeline to map 0 to 149 units (frames 1 to 150)
      tl.to({}, { duration: 149 });

      // --- FRAME RULES (from 3d-animated-website page.tsx) ---
      if (sections[0]) {
        // Frame 1-49: Football
        tl.fromTo(sections[0].querySelectorAll('.shop-animate-item'),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 2, stagger: 0.5 }, 0);
        tl.to(sections[0].querySelector('.content-inner'),
          { opacity: 0, y: -50, duration: 2 }, 46);
      }

      if (sections[1]) {
        tl.to(wrapper, { y: '-100vh', duration: 4, ease: 'power2.inOut' }, 46);
        // Reveal content-inner container perfectly aligned
        tl.to(sections[1].querySelector('.content-inner'),
          { opacity: 1, duration: 1 }, 49);
        // Volleyball fades in
        tl.fromTo(sections[1].querySelectorAll('.shop-animate-item'),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 2, stagger: 0.5, immediateRender: false }, 49);
        tl.to(sections[1].querySelector('.content-inner'),
          { opacity: 0, y: -50, duration: 2 }, 115);
      }

      if (sections[2]) {
        tl.to(wrapper, { y: '-200vh', duration: 4, ease: 'power2.inOut' }, 115);
        // Reveal content-inner container perfectly aligned
        tl.to(sections[2].querySelector('.content-inner'),
          { opacity: 1, duration: 1 }, 118);
        // Badminton fades in
        tl.fromTo(sections[2].querySelectorAll('.shop-animate-item'),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 2, stagger: 0.5, immediateRender: false }, 118);
        tl.to(sections[2].querySelector('.content-inner'),
          { opacity: 0, y: -50, duration: 2 }, 134);
      }

      if (sections[3]) {
        tl.to(wrapper, { y: '-300vh', duration: 4, ease: 'power2.inOut' }, 134);
        // First reveal the content-inner container
        tl.to(sections[3].querySelector('.content-inner'),
          { opacity: 1, duration: 1 }, 137);
        // Cricket fades in
        tl.fromTo(sections[3].querySelectorAll('.shop-animate-item'),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 2, stagger: 0.5, immediateRender: false }, 137);
      }

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Sync timeline position with frame changes
  useEffect(() => {
    const handleFrameChange = (e) => {
      if (tlRef.current) {
        tlRef.current.time(e.detail - 1);
      }
    };
    window.addEventListener('frameChange', handleFrameChange);
    return () => window.removeEventListener('frameChange', handleFrameChange);
  }, []);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}
