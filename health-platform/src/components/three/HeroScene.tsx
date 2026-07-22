"use client";

import { Component, Suspense, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroSceneProps {
  /** Static image shown when 3D is unavailable, disabled, or fails. Required — see docs/design/accessibility-rules.md §7. */
  fallback: ReactNode;
  className?: string;
}

const LOW_FPS_THRESHOLD = 45;
const LOW_FPS_GRACE_MS = 2000;

function OrganicBlob({ onSustainedLowFps }: { onSustainedLowFps: () => void }) {
  const meshRef = useRef<Mesh>(null);
  const lowFpsSince = useRef<number | null>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }

    const fps = 1 / delta;
    const now = state.clock.elapsedTime * 1000;
    if (fps < LOW_FPS_THRESHOLD) {
      if (lowFpsSince.current === null) lowFpsSince.current = now;
      if (now - lowFpsSince.current > LOW_FPS_GRACE_MS) {
        onSustainedLowFps();
      }
    } else {
      lowFpsSince.current = null;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 8]} />
        <MeshDistortMaterial
          color="#3d4bd6"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
    </Float>
  );
}

// Class component required: React error boundaries have no hook equivalent yet.
class SceneErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("HeroScene render failed, falling back to static image.", error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/**
 * Hero 3D object — floats and reacts, per docs/motion/interaction-catalog.md #2/#3.
 * Degrades to the provided static `fallback` on low-end devices, WebGL failure,
 * reduced-motion preference, or sustained low FPS (docs/motion/performance-budget.md).
 */
export function HeroScene({ fallback, className }: HeroSceneProps) {
  const capability = useDeviceCapability();
  const prefersReducedMotion = useReducedMotion();
  const [degraded, setDegraded] = useState(false);

  const shouldUseStatic =
    prefersReducedMotion || capability === "static" || capability === "checking" || degraded;

  if (shouldUseStatic) {
    return <div className={className}>{fallback}</div>;
  }

  const dpr: [number, number] = capability === "reduced" ? [1, 1] : [1, 2];

  return (
    <div className={className}>
      <SceneErrorBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          <Canvas dpr={dpr} camera={{ position: [0, 0, 4], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 2, 2]} intensity={1.2} />
            <OrganicBlob onSustainedLowFps={() => setDegraded(true)} />
          </Canvas>
        </Suspense>
      </SceneErrorBoundary>
    </div>
  );
}
