import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, PerspectiveCamera, Environment, ContactShadows, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Season } from '../store/gameStore';

interface Classroom3DProps {
  season: Season;
  day: number;
  grades: number;
  isWeekend: boolean;
}

function Desk({ position, rotation, color = '#8B4513' }: { position: [number, number, number]; rotation?: [number, number, number]; color?: string }) {
  return (
    <group position={position} rotation={rotation || [0, 0, 0]}>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.08, 0.7]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.5, -0.2, -0.25]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 1.2, 0.08]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      <mesh position={[0.5, -0.2, -0.25]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 1.2, 0.08]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      <mesh position={[-0.5, -0.2, 0.25]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 1.2, 0.08]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      <mesh position={[0.5, -0.2, 0.25]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 1.2, 0.08]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
    </group>
  );
}

function Chair({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation || [0, 0, 0]}>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.45, 0.05, 0.45]} />
        <meshStandardMaterial color="#6D4C41" />
      </mesh>
      <mesh position={[0, 0.6, -0.18]} castShadow receiveShadow>
        <boxGeometry args={[0.45, 0.5, 0.05]} />
        <meshStandardMaterial color="#6D4C41" />
      </mesh>
      <mesh position={[-0.18, -0.25, -0.18]} castShadow receiveShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.9]} />
        <meshStandardMaterial color="#4E342E" />
      </mesh>
      <mesh position={[0.18, -0.25, -0.18]} castShadow receiveShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.9]} />
        <meshStandardMaterial color="#4E342E" />
      </mesh>
      <mesh position={[-0.18, -0.25, 0.18]} castShadow receiveShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.9]} />
        <meshStandardMaterial color="#4E342E" />
      </mesh>
      <mesh position={[0.18, -0.25, 0.18]} castShadow receiveShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.9]} />
        <meshStandardMaterial color="#4E342E" />
      </mesh>
    </group>
  );
}

function Blackboard() {
  return (
    <group position={[0, 2, -5.5]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[5, 2.5, 0.15]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[4.6, 2.1]} />
        <meshStandardMaterial color="#2E7D32" />
      </mesh>
      <Text
        position={[-1.5, 0.6, 0.12]}
        fontSize={0.2}
        color="#FFF"
      >
        今日课程
      </Text>
      <Text
        position={[-1.8, 0.2, 0.12]}
        fontSize={0.15}
        color="#FFEB3B"
      >
        • 数学
      </Text>
      <Text
        position={[-1.8, -0.1, 0.12]}
        fontSize={0.15}
        color="#FFEB3B"
      >
        • 语文
      </Text>
      <Text
        position={[-1.8, -0.4, 0.12]}
        fontSize={0.15}
        color="#FFEB3B"
      >
        • 英语
      </Text>
    </group>
  );
}

function Window({ position, season }: { position: [number, number, number]; season: Season }) {
  const skyColors = {
    spring: '#87CEEB',
    summer: '#00BFFF',
    autumn: '#FFB347',
    winter: '#B0C4DE'
  };

  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 2.5, 0.1]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[1.8, 2.3]} />
        <meshStandardMaterial color={skyColors[season]} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[0.05, 2.3]} />
        <meshStandardMaterial color="#8D6E63" />
      </mesh>
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[1.8, 0.05]} />
        <meshStandardMaterial color="#8D6E63" />
      </mesh>
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#F5DEB3" />
    </mesh>
  );
}

function Walls() {
  return (
    <group>
      <mesh position={[0, 2.5, -6]} receiveShadow>
        <planeGeometry args={[14, 5]} />
        <meshStandardMaterial color="#FFF8E1" />
      </mesh>
      <mesh position={[-7, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[12, 5]} />
        <meshStandardMaterial color="#FFF8E1" />
      </mesh>
      <mesh position={[7, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[12, 5]} />
        <meshStandardMaterial color="#FFF8E1" />
      </mesh>
    </group>
  );
}

function CeilingLight({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);

  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>
      <pointLight
        ref={lightRef}
        intensity={1.5}
        distance={8}
        decay={2}
        color="#FFF9C4"
        castShadow
      />
    </group>
  );
}

function SeasonalDecorations({ season, grades }: { season: Season; grades: number }) {
  if (season === 'spring') {
    return (
      <group>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[-5, 3, 3]}>
            <sphereGeometry args={[0.15]} />
            <meshStandardMaterial color="#FFB6C1" />
          </mesh>
          <mesh position={[-4.5, 3.2, 2.5]}>
            <sphereGeometry args={[0.12]} />
            <meshStandardMaterial color="#FFC0CB" />
          </mesh>
          <mesh position={[5, 2.8, 3.2]}>
            <sphereGeometry args={[0.14]} />
            <meshStandardMaterial color="#FFB6C1" />
          </mesh>
        </Float>
      </group>
    );
  }

  if (season === 'summer') {
    return (
      <Sparkles count={30} scale={14} size={2} speed={0.4} opacity={0.5} color="#FFD700" />
    );
  }

  if (season === 'autumn') {
    return (
      <group>
        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
          <mesh position={[-4, 3.5, 2]} rotation={[0.5, 0.3, 0]}>
            <coneGeometry args={[0.15, 0.3, 8]} />
            <meshStandardMaterial color="#FF8C00" />
          </mesh>
          <mesh position={[4, 3, 2.5]} rotation={[-0.3, 0.8, 0.2]}>
            <coneGeometry args={[0.12, 0.25, 8]} />
            <meshStandardMaterial color="#DAA520" />
          </mesh>
        </Float>
      </group>
    );
  }

  if (season === 'winter') {
    return (
      <Sparkles count={50} scale={14} size={1.5} speed={0.2} opacity={0.7} color="#FFFFFF" />
    );
  }

  return null;
}

function StudentAvatar({ grades, isWeekend }: { grades: number; isWeekend: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  const faceColor = grades > 70 ? '#FFDAB9' : grades > 50 ? '#FFE4C4' : '#FFF0F5';
  const uniformColor = isWeekend ? '#4169E1' : '#2F4F4F';

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      <mesh ref={headRef} position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.25]} />
        <meshStandardMaterial color={faceColor} />
      </mesh>
      <mesh position={[-0.08, 1.55, 0.22]}>
        <sphereGeometry args={[0.04]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.08, 1.55, 0.22]}>
        <sphereGeometry args={[0.04]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0, 1.35, 0.22]} rotation={[0.2, 0, 0]}>
        < torusGeometry args={[0.08, 0.03, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#E91E63" />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.8, 4, 8]} />
        <meshStandardMaterial color={uniformColor} />
      </mesh>
      <mesh position={[-0.1, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.6]} />
        <meshStandardMaterial color="#1A1A2E" />
      </mesh>
      <mesh position={[0.1, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.6]} />
        <meshStandardMaterial color="#1A1A2E" />
      </mesh>
    </group>
  );
}

function ClassroomScene({ season, day, grades, isWeekend }: Classroom3DProps) {
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);

  useMemo(() => {
    if (ambientLightRef.current) {
      const seasonLight = {
        spring: 0.6,
        summer: 0.8,
        autumn: 0.5,
        winter: 0.4
      };
      ambientLightRef.current.intensity = seasonLight[season];
    }
  }, [season]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 3, 6]} fov={50} />
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2 - 0.1}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        enableZoom={true}
      />

      <ambientLight ref={ambientLightRef} intensity={0.6} />
      <directionalLight
        ref={directionalLightRef}
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      <Floor />
      <Walls />

      <Blackboard />

      <Desk position={[0, 0, 0]} color="#A0522D" />
      <Chair position={[0, 0, 0.8]} rotation={[0, Math.PI, 0]} />
      <StudentAvatar grades={grades} isWeekend={isWeekend} />

      {[[-3, 0, -1], [3, 0, -1], [-3, 0, -2.5], [3, 0, -2.5], [0, 0, -2]].map((pos, i) => (
        <React.Fragment key={i}>
          <Desk position={pos as [number, number, number]} />
          <Chair position={[pos[0], pos[1], pos[2] + 0.8]} rotation={[0, Math.PI, 0]} />
        </React.Fragment>
      ))}

      <Window position={[-6, 2.5, -2]} season={season} />
      <Window position={[-6, 2.5, 2]} season={season} />
      <Window position={[6, 2.5, -2]} season={season} />
      <Window position={[6, 2.5, 2]} season={season} />

      <CeilingLight position={[0, 4.5, -1]} />
      <CeilingLight position={[-4, 4.5, 1]} />
      <CeilingLight position={[4, 4.5, 1]} />

      <SeasonalDecorations season={season} grades={grades} />

      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={4.5} />
      <Environment preset="city" />
    </>
  );
}

export default function Classroom3D({ season, day, grades, isWeekend }: Classroom3DProps) {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl">
      <Canvas shadows dpr={[1, 2]}>
        <ClassroomScene season={season} day={day} grades={grades} isWeekend={isWeekend} />
      </Canvas>
    </div>
  );
}
