import { useState } from "react";

// 3D Background Components (ported from 3d-animated-website)
import { CanvasSequence } from "../components/Background/CanvasSequence";
import { EffectsLayer } from "../components/Background/EffectsLayer";
import { ScrollEngine } from "../components/Background/ScrollEngine";
import { SportNav } from "../components/Background/SportNav";
import { SportShowcase } from "../components/Background/SportShowcase";

// Existing Sai Saran Components (reused)
import { Ticker } from "../components/Ticker";
import { StatsBar } from "../components/StatsBar";
import { Products } from "../components/Products";
import { JerseyPrinting } from "../components/JerseyPrinting";
import { WhyUs } from "../components/WhyUs";
import { Contact } from "../components/Contact";

/**
 * Home - Merged flagship page
 * 
 * ARCHITECTURE:
 * 1. The 3D frame-sequence animation plays as a fixed background (z-index 0)
 * 2. 3D particle effects float above that (z-index 1)
 * 3. The sport-specific product sections scroll through as glassmorphism overlays,
 *    synchronized with the frame animation (z-index 2)
 * 4. After the 3D experience completes, the rest of the Sai Saran shop
 *    appears below with glassmorphism styling over the final frame.
 */
export function Home() {
  const [activeSport, setActiveSport] = useState("Football");

  return (
    <main>
      {/* ═══════════════════════════════════════════════
          LAYER 0: Fixed 3D Frame-Sequence Background
          ═══════════════════════════════════════════════ */}
      <CanvasSequence totalFrames={150} onSportChange={setActiveSport} />

      {/* ═══════════════════════════════════════════════
          LAYER 1: 3D Particle Effects + Color Vignette
          ═══════════════════════════════════════════════ */}
      <EffectsLayer />

      {/* ═══════════════════════════════════════════════
          LAYER 2: Sport Category Navigation Dots
          ═══════════════════════════════════════════════ */}
      <SportNav />

      {/* ═══════════════════════════════════════════════
          LAYER 3: Scroll-Synced Sport Showcases
          (Glassmorphism foreground over 3D background)
          ═══════════════════════════════════════════════ */}
      <ScrollEngine>
        <div
          className="sections-wrapper"
          style={{
            position: 'relative',
            zIndex: 20,
            width: '100%',
          }}
        >
          {/* Section 1: Football */}
          <section
            className="story-section"
            style={{
              width: '100%',
              height: '100dvh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <div className="content-inner" style={{ width: '100%' }}>
              <SportShowcase sport="Football" align="left" />
            </div>
          </section>

          {/* Section 2: Volleyball */}
          <section
            className="story-section"
            style={{
              width: '100%',
              height: '100dvh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <div className="content-inner" style={{ width: '100%', opacity: 0 }}>
              <SportShowcase sport="Volleyball" align="left" />
            </div>
          </section>

          {/* Section 3: Badminton */}
          <section
            className="story-section"
            style={{
              width: '100%',
              height: '100dvh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <div className="content-inner" style={{ width: '100%', opacity: 0 }}>
              <SportShowcase sport="Badminton" align="left" />
            </div>
          </section>

          {/* Section 4: Cricket */}
          <section
            className="story-section"
            style={{
              width: '100%',
              height: '100dvh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="content-inner" style={{ width: '100%', opacity: 0 }}>
              <SportShowcase sport="Cricket" align="center" />
            </div>
          </section>

          {/* Spacer for scroll completion */}
          <div style={{ height: '50vh', width: '100%' }} />
        </div>
      </ScrollEngine>

      {/* ═══════════════════════════════════════════════
          LAYER 4: Rest of the Sai Saran Sports Shop
          (Below the 3D experience, with glassmorphism overlay)
          ═══════════════════════════════════════════════ */}
      <div
        className="shop-content-below"
        style={{
          position: 'relative',
          zIndex: 25,
        }}
      >
        {/* Gradient transition from 3D experience to shop */}
        <div
          style={{
            height: 120,
            background: 'linear-gradient(to bottom, transparent, var(--cream))',
            position: 'relative',
            zIndex: 25,
          }}
        />
        <Ticker />
        <StatsBar />
        <Products />
        <JerseyPrinting />
        <WhyUs />
        <Contact />
      </div>
    </main>
  );
}
