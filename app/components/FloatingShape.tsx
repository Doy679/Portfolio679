'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedBlob = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smoothly interpolate towards the mouse position
    const targetRotationX = state.mouse.y * 0.5;
    const targetRotationY = state.mouse.x * 0.5;
    
    // Lerp for smooth movement
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX + state.clock.getElapsedTime() * 0.2, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY + state.clock.getElapsedTime() * 0.3, 0.05);
    
    // Subtle float/pulse effect on scale
    const s = 1 + Math.sin(state.clock.getElapsedTime()) * 0.05;
    meshRef.current.scale.set(2.2 * s, 2.2 * s, 2.2 * s);
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, isMobile ? 32 : 64, isMobile ? 32 : 64]} scale={2.2}>
        <MeshDistortMaterial
          color="#6366f1" // Tailwind primary indigo
          envMapIntensity={1.5}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          metalness={0.2}
          roughness={0.1}
          distort={0.4} // Level of distortion
          speed={isMobile ? 1.5 : 3}     // Speed of the morphing
        />
      </Sphere>
    </Float>
  );
};

export default function FloatingShape() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) return null;

  return (
    <div className="w-full h-[60vh] lg:h-full cursor-grab active:cursor-grabbing pointer-events-none lg:pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        dpr={[1, isMobile ? 1 : 2]}
        gl={{ 
          powerPreference: "high-performance",
          antialias: true,
          alpha: true,
          stencil: false,
          depth: true
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ec4899" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#8b5cf6" />
        
        {/* Environment for shiny reflections */}
        <Environment preset="city" />
        
        <AnimatedBlob />
        
        {/* Soft shadow underneath the floating object */}
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} resolution={isMobile ? 128 : 256} />
      </Canvas>
    </div>
  );
}