import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * CanvasSequence - Ported from 3d-animated-website
 * Renders frame-sequence animation as a fixed background canvas.
 * Dispatches 'frameChange' and 'scrollProgress' custom events for sync.
 */
export function CanvasSequence({ totalFrames = 150, onSportChange }) {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const frameRef = useRef({ current: 1 });
  const lastSportRef = useRef(null);
  const lastDrawnIndexRef = useRef(-1);

  // Determine active sport from frame number
  const getSportFromFrame = useCallback((frame) => {
    if (frame >= 138) return 'Cricket';
    if (frame >= 119) return 'Badminton';
    if (frame >= 50) return 'Volleyball';
    return 'Football';
  }, []);

  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    // Check if we are on mobile to load smaller frames (prevent iOS memory crash)
    const isMobile = window.innerWidth <= 768;
    const folder = isMobile ? 'frames-mobile' : 'frames';

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, '0');
      img.src = `/${folder}/ezgif-frame-${frameNumber}.webp`;

      img.onload = () => {
        loadedCount++;
        
        // If this newly loaded image is the frame we are currently trying to look at, draw it immediately!
        // This fixes the issue where scrolling before images are loaded leaves a blank screen until you scroll again.
        if (i === Math.floor(frameRef.current.current)) {
          // Reset the cached index so it forces a redraw
          lastDrawnIndexRef.current = -1;
          drawFrame(frameRef.current.current);
        }
        
        // When all finish loading, you can trigger a full ready state if needed
        if (loadedCount === totalFrames) {
          console.log("All frames loaded");
        }
      };
      loadedImages.push(img);
    }

    setImages(loadedImages);

    return () => {
      loadedImages.forEach(img => { img.src = ''; });
    };
  }, [totalFrames]);

  const setCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(frameRef.current.current);
  };

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let safeIndex = Math.floor(index) - 1;
    if (safeIndex < 0) safeIndex = 0;
    if (safeIndex >= images.length) safeIndex = images.length - 1;

    // PERFORMANCE FIX: Don't redraw if it's the exact same frame!
    if (lastDrawnIndexRef.current === safeIndex) return;

    const img = images[safeIndex];
    if (!img) return;

    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (img.complete && img.naturalWidth > 0) {
      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      
      // Successfully drew the frame, now cache the index so we don't redraw it
      lastDrawnIndexRef.current = safeIndex;
    }

    // Dispatch frame change event for other components to sync
    window.dispatchEvent(new CustomEvent('frameChange', { detail: index }));

    // Fire sport change callback
    if (onSportChange) {
      const sport = getSportFromFrame(index);
      if (sport !== lastSportRef.current) {
        lastSportRef.current = sport;
        onSportChange(sport);
      }
    }
  };

  useEffect(() => {
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    return () => window.removeEventListener('resize', setCanvasSize);
  }, [images]);

  useEffect(() => {
    if (images.length === 0) return;

    let animationFrameId;

    const handleScrollProgress = (e) => {
      const progress = e.detail;
      const frame = 1 + progress * (totalFrames - 1);
      frameRef.current.current = frame;
      
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        drawFrame(frameRef.current.current);
      });
    };

    window.addEventListener('scrollProgress', handleScrollProgress);
    return () => {
      window.removeEventListener('scrollProgress', handleScrollProgress);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [images, totalFrames]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: '#000',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {/* Dark overlay for better text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.40)', // mixBlendMode removed for massive performance boost
        }}
      />
    </div>
  );
}
