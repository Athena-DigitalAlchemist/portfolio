import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const TextDistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uHover: 0,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uHover;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      float dist = length(uv - uMouse);
      float wave = sin(dist * 10.0 - uTime) * 0.1 * uHover;
      
      pos.z += wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uHover;

    void main() {
      vec3 color = vec3(0.0);
      float wave = sin(vUv.x * 10.0 + uTime) * 0.05 * uHover;
      
      gl_FragColor = vec4(vec3(1.0 + wave), 1.0);
    }
  `
);

extend({ TextDistortionMaterial });

const TextDistortion = ({ children }) => {
  const ref = useRef();
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const hoverRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1 - (e.clientY / window.innerHeight);
    };

    const handleMouseEnter = () => {
      gsap.to(hoverRef, {
        current: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(hoverRef, {
        current: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    const element = ref.current;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useFrame((state) => {
    if (ref.current.material) {
      ref.current.material.uniforms.uTime.value = state.clock.elapsedTime;
      ref.current.material.uniforms.uMouse.value = mouseRef.current;
      ref.current.material.uniforms.uHover.value = hoverRef.current;
    }
  });

  return (
    <div ref={ref} className="relative">
      {children}
    </div>
  );
};

export default TextDistortion;