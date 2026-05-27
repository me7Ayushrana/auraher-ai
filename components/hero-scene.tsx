"use client"

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Float } from '@react-three/drei'
import * as THREE from 'three'

function GlowingOrb({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 32, 32]} position={position} scale={scale}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
          roughness={0.2}
          metalness={0.1}
        />
      </Sphere>
    </Float>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 100
  
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02
    }
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#e8b4d8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffd4e8" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#d4b8ff" />
        
        <GlowingOrb position={[-3, 2, 0]} color="#ffb6d9" scale={0.8} />
        <GlowingOrb position={[3, -1, -2]} color="#d4b8ff" scale={0.6} />
        <GlowingOrb position={[0, 3, -3]} color="#ffe4d4" scale={0.5} />
        <GlowingOrb position={[-2, -2, -1]} color="#e8d4ff" scale={0.4} />
        <GlowingOrb position={[4, 1, -4]} color="#ffd4e8" scale={0.7} />
        
        <FloatingParticles />
      </Canvas>
    </div>
  )
}

export function AIOrb() {
  return (
    <div className="relative w-32 h-32 md:w-48 md:h-48">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-rose/20 to-lavender/30 animate-pulse-glow" />
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-soft-pink via-lavender to-peach opacity-80" />
      <div className="absolute inset-4 rounded-full glass flex items-center justify-center">
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-rose animate-pulse" />
      </div>
      <div className="absolute -inset-4 rounded-full border border-primary/20 animate-ping opacity-20" />
    </div>
  )
}
