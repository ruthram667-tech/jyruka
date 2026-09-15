import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ConnectingNodes({ count = 28 }) {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  // Generate random node positions representing clients (cyan) and freelancers (indigo/violet)
  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi) * 0.7; // slight flattening for depth
      
      const isClient = i % 2 === 0;
      const color = isClient ? '#06b6d4' : '#818cf8';
      const size = 0.12 + Math.random() * 0.14;
      
      arr.push({ pos: new THREE.Vector3(x, y, z), color, size, speed: 0.2 + Math.random() * 0.3 });
    }
    return arr;
  }, [count]);

  // Pre-calculate line connections between close nodes
  const lineSegments = useMemo(() => {
    const points = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].pos.distanceTo(nodes[j].pos);
        if (dist < 2.0) {
          points.push(nodes[i].pos.clone());
          points.push(nodes[j].pos.clone());
        }
      }
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [nodes]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Mouse interaction interpolation
    const targetX = state.pointer.x * 0.6;
    const targetY = state.pointer.y * 0.4;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, targetX, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, targetY, 0.05);

    // Dynamic rotation reacting to mouse and time
    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.rotation.x = mouse.current.y * 0.5;
    groupRef.current.rotation.z = mouse.current.x * 0.3;
  });

  return (
    <group ref={groupRef}>
      {/* Central connection core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#4338ca"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting client and freelancer nodes */}
      {nodes.map((node, idx) => (
        <mesh key={idx} position={node.pos}>
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      ))}

      {/* Dynamic connection lines */}
      <lineSegments geometry={lineSegments}>
        <lineBasicMaterial color="#6366f1" transparent opacity={0.25} />
      </lineSegments>

      {/* Outer ambient holographic ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[3.8, 0.012, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function Hero3DScene() {
  return (
    <div className="w-full h-full min-h-[380px] lg:min-h-[500px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.4} />
        <pointLight position={[-10, -10, -5]} color="#06b6d4" intensity={2} />
        <pointLight position={[5, 5, 5]} color="#6366f1" intensity={2.5} />
        
        <ConnectingNodes />
      </Canvas>

      {/* Subtle overlay glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#090d16] via-transparent to-transparent pointer-events-none opacity-80" />
    </div>
  );
}
