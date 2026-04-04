'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedBlob = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Subtle manual rotation to compliment the Float animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.2}>
        <MeshDistortMaterial
          color="#6366f1" // Tailwind primary indigo
          envMapIntensity={1.5}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          metalness={0.2}
          roughness={0.1}
          distort={0.4} // Level of distortion
          speed={3}     // Speed of the morphing
        />
      </Sphere>
    </Float>
  );
};

export default function FloatingShape() {
  return (
    <div className="w-full h-[60vh] lg:h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ec4899" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#8b5cf6" />
        
        {/* Environment for shiny reflections */}
        <Environment preset="city" />
        
        <AnimatedBlob />
        
        {/* Soft shadow underneath the floating object */}
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
}