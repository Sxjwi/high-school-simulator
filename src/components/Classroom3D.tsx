import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Season } from '../store/gameStore';

interface Classroom3DProps {
  season: Season;
  day: number;
  grades: number;
  isWeekend: boolean;
}

function SimpleClassroom() {
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

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#F5DEB3" />
      </mesh>

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

      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.08, 0.7]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>

      <mesh position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.25]} />
        <meshStandardMaterial color="#FFDAB9" />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.8, 4, 8]} />
        <meshStandardMaterial color="#2F4F4F" />
      </mesh>
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="text-center">
        <div className="text-4xl mb-4">🏫</div>
        <div className="text-xl text-blue-800">加载教室场景中...</div>
      </div>
    </div>
  );
}

export default function Classroom3D({ season, day, grades, isWeekend }: Classroom3DProps) {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl bg-gray-100">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas shadows dpr={[1, 1.5]}>
          <SimpleClassroom />
        </Canvas>
      </Suspense>
    </div>
  );
}
