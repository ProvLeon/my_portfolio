"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// --- Dynamic 3D Centerpiece ---
const HeroObject = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window === "undefined") return;
      targetMouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      meshRef.current.position.x = mouseRef.current.x * 0.8;
      meshRef.current.position.y = mouseRef.current.y * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.2}>
        <torusKnotGeometry args={[1.5, 0.45, 128, 32, 2, 3]} />
        <meshPhysicalMaterial
          color="#000000"
          emissive="#000000"
          roughness={0.1}
          metalness={1.0}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.0}
          thickness={0.0}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
};

// --- Ambient Shader Background ---
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  
  float dist = distance(st, vec2(0.5));
  float vignette = smoothstep(0.8, 0.2, dist);
  
  vec3 color1 = vec3(0.01, 0.01, 0.01);
  vec3 color2 = vec3(0.04, 0.04, 0.05);
  
  vec3 finalColor = mix(color1, color2, sin(uTime * 0.15 + dist * 2.5) * 0.5 + 0.5);
  gl_FragColor = vec4(finalColor * vignette, 1.0);
}
`;

const AmbientBackground = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(
          typeof window !== "undefined" ? window.innerWidth : 1200,
          typeof window !== "undefined" ? window.innerHeight : 800
        ),
      },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[30, 20]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
};

export default function WebGLCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#030303]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          alpha: false,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#22d3ee" />
        <pointLight position={[0, 0, 2]} intensity={1} color="#ffffff" />
        
        <HeroObject />
        <Sparkles count={40} scale={10} size={1.5} speed={0.1} opacity={0.2} color="#ffffff" />
        <AmbientBackground />
      </Canvas>
    </div>
  );
}


