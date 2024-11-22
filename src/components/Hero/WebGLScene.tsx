import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import WebGLImage from './WebGLImage';

const WebGLScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <Suspense fallback={null}>
          <WebGLImage 
            url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"
            position={[0, 0, 0]}
            scale={[2, 1.2, 1]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default WebGLScene;