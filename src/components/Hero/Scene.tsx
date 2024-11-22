import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import TextMesh from './TextMesh';

const Scene = () => {
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const targetMouseRef = useRef<THREE.Vector2>(new THREE.Vector2());

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // Smooth mouse movement
    mouseRef.current.lerp(targetMouseRef.current, 0.1);

    // Update uniforms
    const materials = state.scene.children
      .map(child => child.children)
      .flat()
      .map(child => child?.material)
      .filter(Boolean);

    materials.forEach(material => {
      if (material.uniforms) {
        material.uniforms.uTime.value += delta;
        material.uniforms.uMouse.value = mouseRef.current;
        material.uniforms.uResolution.value = new THREE.Vector2(
          state.size.width,
          state.size.height
        );
      }
    });
  });

  return (
    <>
      <TextMesh 
        text="Creative Developer" 
        position={[0, 0.5, 0]} 
        fontSize={2} 
      />
      <TextMesh 
        text="& Designer" 
        position={[0, -0.5, 0]} 
        fontSize={2} 
      />
    </>
  );
};

export default Scene;