import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SportNav - Ported from 3d-animated-website Navigation component.
 * Fixed right-side dot navigation for sport categories, synced with frame animation.
 */
export function SportNav() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleFrameChange = (e) => {
      const frame = e.detail;
      let index = 0;
      if (frame >= 138) index = 3;
      else if (frame >= 119) index = 2;
      else if (frame >= 50) index = 1;
      setActiveSection(index);
    };

    window.addEventListener('frameChange', handleFrameChange);
    return () => window.removeEventListener('frameChange', handleFrameChange);
  }, []);

  const handleNavClick = (index) => {
    const triggers = ScrollTrigger.getAll();
    const pinTrigger = triggers.find(t => t.pin && t.trigger?.classList.contains('sections-wrapper'));
    let pinDistance = document.body.scrollHeight - window.innerHeight;

    if (pinTrigger) {
      pinDistance = pinTrigger.end - pinTrigger.start;
    }

    let targetFrame = 1;
    if (index === 1) targetFrame = 55;
    if (index === 2) targetFrame = 124;
    if (index === 3) targetFrame = 144;

    const progress = (targetFrame - 1) / 149;
    const targetScroll = progress * pinDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const navItems = [
    { label: 'Football', color: '#10b981', glow: 'rgba(16,185,129,0.5)' },
    { label: 'Volleyball', color: '#3b82f6', glow: 'rgba(59,130,246,0.5)' },
    { label: 'Badminton', color: '#6366f1', glow: 'rgba(99,102,241,0.5)' },
    { label: 'Cricket', color: '#ef4444', glow: 'rgba(239,68,68,0.5)' },
  ];

  return (
    <div
      className="sport-nav-wrapper"
      style={{
        position: 'fixed',
        right: 32,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {navItems.map((item, index) => (
        <div
          key={index}
          onClick={() => handleNavClick(index)}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            cursor: 'pointer',
          }}
          className="sport-nav-dot"
        >
          {/* Label */}
          <span
            style={{
              position: 'absolute',
              right: 40,
              padding: '4px 12px',
              borderRadius: 6,
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: '#fff',
              fontSize: 13,
              fontFamily: 'var(--dm)',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              opacity: activeSection === index ? 1 : 0,
              transform: activeSection === index ? 'translateX(0)' : 'translateX(16px)',
              transition: 'all 0.3s ease',
              pointerEvents: 'none',
            }}
          >
            {item.label}
          </span>

          {/* Dot */}
          <div
            style={{
              width: activeSection === index ? 14 : 10,
              height: activeSection === index ? 14 : 10,
              borderRadius: '50%',
              background: activeSection === index ? item.color : 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              boxShadow: activeSection === index ? `0 0 15px ${item.glow}` : 'none',
            }}
          />
        </div>
      ))}
    </div>
  );
}
