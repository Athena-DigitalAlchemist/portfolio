import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from './shaders/distortionVertex.glsl';
import fragmentShader from './shaders/distortionFragment.glsl';

const DistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uTexture: null,
    uHover: 0,
    uResolution: new THREE.Vector2(1, 1),
  },
  vertexShader,
  fragmentShader
);

extend({ DistortionMaterial });

export { DistortionMaterial };