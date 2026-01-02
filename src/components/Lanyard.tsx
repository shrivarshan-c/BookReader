/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer, Text } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return <div className="relative z-0 w-full h-screen flex justify-center items-center bg-blue-100 animate-pulse" />;
  }

  return (
    <div className="relative z-0 w-full h-full flex justify-center items-start">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band isMobile={isMobile} />
          </Physics>
        </Suspense>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="black"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: 'dynamic' as RigidBodyProps['type'],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  // Create a simple card geometry instead of loading GLB
  const cardGeometry = new THREE.BoxGeometry(2.0, 2.8, 0.03);
  const clipGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.4, 8);
  const cardMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 'white',
    roughness: 0.1,
    metalness: 0.8,
    clearcoat: isMobile ? 0 : 1,
    clearcoatRoughness: 0.15
  });
  const metalMaterial = new THREE.MeshStandardMaterial({ 
    color: '#888888',
    roughness: 0.3,
    metalness: 1
  });

  // Create lanyard texture
  const texture = new THREE.Texture();
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(0);
  const genres = ['Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Thriller'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGenre((prev) => (prev + 1) % genres.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [genres.length]);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      if (band.current?.geometry) {
        band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      }
      if (card.current) {
        ang.copy(card.current.angvel());
        rot.copy(card.current.rotation());
        card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
      }
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <group position={[0, 8, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
        <RigidBody position={[0, -3, 0]} ref={j1} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -6, 0]} ref={j2} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -9, 0]} ref={j3} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[0, -12, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? ('kinematicPosition' as RigidBodyProps['type']) : ('dynamic' as RigidBodyProps['type'])}
        >
          <CuboidCollider args={[1.0, 1.4, 0.015]} />
          <group
            scale={2.0}
            position={[0, -1.4, -0.02]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={cardGeometry} material={cardMaterial} />
            <Text
              position={[0, 0.6, 0.02]}
              fontSize={0.15}
              color="black"
              anchorX="center"
              anchorY="middle"
              maxWidth={1}
            >
              Fiction
            </Text>
            <Text
              position={[0, 0.3, 0.02]}
              fontSize={0.15}
              color="black"
              anchorX="center"
              anchorY="middle"
              maxWidth={1}
            >
              Mystery
            </Text>
            <Text
              position={[0, 0, 0.02]}
              fontSize={0.15}
              color="black"
              anchorX="center"
              anchorY="middle"
              maxWidth={1}
            >
              Romance
            </Text>
            <Text
              position={[0, -0.3, 0.02]}
              fontSize={0.15}
              color="black"
              anchorX="center"
              anchorY="middle"
              maxWidth={1}
            >
              Sci-Fi
            </Text>
            <Text
              position={[0, -0.6, 0.02]}
              fontSize={0.15}
              color="black"
              anchorX="center"
              anchorY="middle"
              maxWidth={1}
            >
              Fantasy
            </Text>
            <Text
              position={[0, -0.9, 0.02]}
              fontSize={0.15}
              color="black"
              anchorX="center"
              anchorY="middle"
              maxWidth={1}
            >
              Thriller
            </Text>
            {/* Back side animated elements */}
            {/* Floating circles for book stats */}
            <mesh position={[-0.3, 0.3, -0.02]}>
              <circleGeometry args={[0.08]} />
              <meshBasicMaterial color="#4f46e5" opacity={0.8} transparent />
            </mesh>
            <mesh position={[0.3, 0.1, -0.02]}>
              <circleGeometry args={[0.06]} />
              <meshBasicMaterial color="#06b6d4" opacity={0.7} transparent />
            </mesh>
            <mesh position={[-0.2, -0.1, -0.02]}>
              <circleGeometry args={[0.05]} />
              <meshBasicMaterial color="#10b981" opacity={0.6} transparent />
            </mesh>
            <mesh position={[0.2, -0.3, -0.02]}>
              <circleGeometry args={[0.07]} />
              <meshBasicMaterial color="#f59e0b" opacity={0.8} transparent />
            </mesh>
            <mesh position={[0, -0.5, -0.02]}>
              <circleGeometry args={[0.04]} />
              <meshBasicMaterial color="#ef4444" opacity={0.7} transparent />
            </mesh>
            <mesh geometry={clipGeometry} material={metalMaterial} position={[0, 1.4, 0.02]} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          lineWidth={8}
        />
      </mesh>
    </>
  );
}