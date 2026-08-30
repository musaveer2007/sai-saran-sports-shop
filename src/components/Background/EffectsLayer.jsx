import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * ParticleCloud - Ported from 3d-animated-website EffectsLayer
 * 3D particle system that changes color based on active sport category.
 */
function ParticleCloud({ color }) {
  const ref = useRef(null);
  const particleCount = 800;

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  const materialRef = useRef(null);
  const targetColor = new THREE.Color(color);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
    if (materialRef.current) {
      materialRef.current.color.lerp(targetColor, 0.05);
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        ref={materialRef}
        transparent
        color={color}
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/**
 * EffectsLayer - Ported from 3d-animated-website
 * Renders floating 3D particles + colored vignette that syncs with the active sport.
 */
export function EffectsLayer() {
  const [themeColor, setThemeColor] = useState('#10b981');

  useEffect(() => {
    const handleFrameChange = (e) => {
      const frame = e.detail;
      if (frame < 47) setThemeColor('#10b981');       // Football Green
      else if (frame >= 47 && frame < 110) setThemeColor('#3b82f6'); // Volleyball Blue
      else if (frame >= 110 && frame < 130) setThemeColor('#6366f1'); // Badminton Indigo
      else setThemeColor('#ef4444');                    // Cricket Red
    };

    window.addEventListener('frameChange', handleFrameChange);
    return () => window.removeEventListener('frameChange', handleFrameChange);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        transition: 'all 1s',
      }}
    >
      {/* Dynamic Colored Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          transition: 'all 1s',
          mixBlendMode: 'color',
          background: `radial-gradient(circle at center, transparent 30%, ${themeColor} 150%)`,
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <ParticleCloud color={themeColor} />
      </Canvas>
    </div>
  );
}
