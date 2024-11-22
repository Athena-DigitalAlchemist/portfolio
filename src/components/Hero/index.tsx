import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SplitType from 'split-type';
import gsap from 'gsap';
import * as THREE from 'three';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const text = new SplitType(titleRef.current, { 
      types: 'lines, chars',
      lineClass: 'overflow-hidden'
    });

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" }
    });

    text.lines?.forEach((line, index) => {
      const chars = line.querySelectorAll('.char');
      
      tl.fromTo(chars,
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.02,
        },
        index * 0.1
      );
    });

    return () => {
      text.revert();
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create geometry
    const geometry = new THREE.PlaneGeometry(10, 10, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(pos.x * 5.0 + uTime) * 0.1;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        
        void main() {
          vec3 color = vec3(0.95, 0.95, 0.95);
          float noise = sin(vUv.x * 10.0 + uTime) * 0.1;
          gl_FragColor = vec4(color + noise, 1.0);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height, false);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation loop
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    const animate = () => {
      requestAnimationFrame(animate);
      
      material.uniforms.uTime.value += 0.01;
      material.uniforms.uMouse.value.set(mouseX, mouseY);
      
      mesh.rotation.x = mouseY * 0.1;
      mesh.rotation.y = mouseX * 0.1;
      
      renderer.render(scene, camera);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-8 py-32 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 w-full h-full"
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-xl font-light">Digital Designer & Developer</p>
        </motion.div>
        
        <h1 
          ref={titleRef}
          className="text-[clamp(3rem,12vw,10rem)] font-light leading-[0.9] tracking-[-0.02em] mb-12"
        >
          Crafting Digital
          <br />
          Experiences with
          <br />
          Purpose
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex justify-between items-end"
        >
          <div className="space-y-2">
            <p className="text-lg font-light">Creating meaningful digital solutions</p>
            <p className="text-lg font-light">that inspire and engage</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;