import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

const WebGLBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create mesh with custom shader material
    const geometry = new THREE.PlaneGeometry(2, 2, 256, 256); // Increased resolution
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0.0 }
      },
      vertexShader,
      fragmentShader,
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.z = 1;

    // Enhanced mouse interaction
    const mouse = new THREE.Vector2(0.5, 0.5);
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    let isMouseOver = false;
    
    const handleMouseMove = (event: MouseEvent) => {
      targetMouse.x = event.clientX / window.innerWidth;
      targetMouse.y = 1 - (event.clientY / window.innerHeight);
    };

    const handleMouseEnter = () => {
      isMouseOver = true;
      gsap.to(material.uniforms.uHover, {
        value: 1,
        duration: 1,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      gsap.to(material.uniforms.uHover, {
        value: 0,
        duration: 1,
        ease: "power2.out"
      });
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    // Smooth animation
    const clock = new THREE.Clock();
    let previousTime = 0;
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;
      
      // Smooth mouse movement with dynamic easing
      const ease = isMouseOver ? 0.15 : 0.1;
      mouse.x += (targetMouse.x - mouse.x) * ease;
      mouse.y += (targetMouse.y - mouse.y) * ease;
      material.uniforms.uMouse.value = mouse;
      
      // Update time uniform with smooth delta
      material.uniforms.uTime.value += deltaTime;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Enhanced resize handling
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-10" />;
};

export default WebGLBackground;