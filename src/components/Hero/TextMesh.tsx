import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Text } from 'troika-three-text';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

interface TextMeshProps {
  text: string;
  position?: [number, number, number];
  fontSize?: number;
}

const TextMesh: React.FC<TextMeshProps> = ({ 
  text, 
  position = [0, 0, 0],
  fontSize = 1
}) => {
  const meshRef = useRef<THREE.Mesh>();

  useEffect(() => {
    if (!meshRef.current) return;

    const textMesh = new Text();
    textMesh.text = text;
    textMesh.fontSize = fontSize;
    textMesh.font = '/fonts/GeneralSans-Light.woff';
    textMesh.position.set(...position);
    textMesh.color = 0x1A1A1A;
    textMesh.anchorX = 'center';
    textMesh.anchorY = 'middle';
    textMesh.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uResolution: { value: new THREE.Vector2() },
        uTexture: { value: null }
      },
      transparent: true
    });

    textMesh.sync();

    meshRef.current.add(textMesh);

    return () => {
      textMesh.dispose();
    };
  }, [text, position, fontSize]);

  return <mesh ref={meshRef} />;
};

export default TextMesh;