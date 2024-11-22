import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { motion } from "framer-motion-3d";
import { animate, useMotionValue } from 'framer-motion';
import { vertex, fragment } from './shaders';
import { useTexture, useAspect } from '@react-three/drei';
import { Project } from './data';

interface Props {
    activeProject: number | null;
    projects: Project[];
}

export default function ImageDistortion({ activeProject, projects }: Props) {
    const plane = useRef<THREE.Mesh>();
    const { viewport } = useThree();
    const mouse = useRef({ x: 0, y: 0 });
    const opacity = useMotionValue(0);
    const textures = projects.map(project => useTexture(project.src));
    const { width, height } = textures[0].image;
    
    const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

    // Reduced scale factor from 0.8 to 0.6 for smaller images
    const scale = useAspect(width, height, 0.6);
    
    const smoothMouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = {
                x: e.clientX,
                y: e.clientY
            };
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        // Set initial opacity to 1 for the first image
        if (activeProject === 0) {
            animate(opacity, 1, { duration: 0.5 });
        }
    }, []);

    useEffect(() => {
        if (activeProject !== null && plane.current) {
            plane.current.material.uniforms.uTexture.value = textures[activeProject];
            animate(opacity, 1, {
                duration: 0.2,
                onUpdate: latest => {
                    if (plane.current) {
                        plane.current.material.uniforms.uAlpha.value = latest;
                    }
                }
            });
        } else if (plane.current) {
            animate(opacity, 0, {
                duration: 0.2,
                onUpdate: latest => {
                    if (plane.current) {
                        plane.current.material.uniforms.uAlpha.value = latest;
                    }
                }
            });
        }
    }, [activeProject, textures, opacity]);

    const uniforms = useRef({
        uDelta: { value: { x: 0, y: 0 } },
        uAmplitude: { value: 0.0005 },
        uTexture: { value: textures[0] },
        uAlpha: { value: 0 }
    });

    useFrame(() => {
        if (!plane.current) return;

        const smoothX = smoothMouse.x.get();
        const smoothY = smoothMouse.y.get();
        const { x, y } = mouse.current;

        if (Math.abs(x - smoothX) > 1) {
            smoothMouse.x.set(lerp(smoothX, x, 0.1));
            smoothMouse.y.set(lerp(smoothY, y, 0.1));
            
            plane.current.material.uniforms.uDelta.value = {
                x: x - smoothX,
                y: -1 * (y - smoothY)
            };
        }
    });

    return (
        <motion.mesh
            position={[0, 0, 0]}
            ref={plane}
            scale={scale}
        >
            <planeGeometry args={[1, 1, 15, 15]} />
            <shaderMaterial
                vertexShader={vertex}
                fragmentShader={fragment}
                uniforms={uniforms.current}
                transparent={true}
            />
        </motion.mesh>
    );
}
