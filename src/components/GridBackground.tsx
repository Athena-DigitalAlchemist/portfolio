import { useEffect, useRef } from 'react';

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gridSize = 40;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#f0f0f0';
      ctx.lineWidth = 0.5;

      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          const distX = (Math.sin(time + y * 0.01) * 2);
          const distY = (Math.cos(time + x * 0.01) * 2);

          ctx.beginPath();
          ctx.arc(x + distX, y + distY, 1, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      time += 0.005;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none opacity-50"
      style={{ zIndex: -1 }}
    />
  );
};

export default GridBackground;