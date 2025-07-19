import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} position={[2, 0, 0]}>
      <meshStandardMaterial
        color="#3b82f6"
        transparent
        opacity={0.6}
        wireframe
      />
    </Sphere>
  );
}

function FloatingCubes() {
  const cubes = Array.from({ length: 20 }, (_, i) => (
    <Cube key={i} position={[
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    ]} />
  ));
  
  return <>{cubes}</>;
}

function Cube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial
        color="#8b5cf6"
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

export function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      style={{ height: '100%', width: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedSphere />
      <FloatingCubes />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}