'use client';

import { Canvas } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { Suspense } from 'react';

function AbstractShape() {
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function SceneContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, -10, -10]} intensity={0.5} />
      <Environment preset="city" />
      <AbstractShape />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas>
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
