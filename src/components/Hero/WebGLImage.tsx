import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { DistortionMaterial } from './DistortionMaterial';

interface WebGLImageProps {
  url: string;
  position?: [number, number, number];
  scale?: [number, number, number];
}

const WebGLImage = ({ url, position = [0, 0, 0], scale = [1, 1, 1] }: WebGLImageProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const texture = useTexture(url);
  
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uTexture = texture;
    }
  }, [texture]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uMouse.x = state.mouse.x;
      materialRef.current.uMouse.y = state.mouse.y;
      materialRef.current.uResolution.set(state.size.width, state.size.height);
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <distortionMaterial ref={materialRef} transparent />
    </mesh>
  );
};

export default WebGLImage;