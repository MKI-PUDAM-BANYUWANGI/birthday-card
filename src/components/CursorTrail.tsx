import React, { useEffect, useRef } from 'react';

const CursorTrail: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Array<{
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        color: string;
        life: number;
    }>>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const colors = ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FFF0F5', '#FFD700'];

        const handleMouseMove = (e: MouseEvent) => {
            // Add new particles
            for (let i = 0; i < 3; i++) {
                particles.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 4 + 1,
                    speedX: Math.random() * 2 - 1,
                    speedY: Math.random() * 2 - 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 1.0
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.current.forEach((p, index) => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.life -= 0.02;
                p.size *= 0.95;

                if (p.life <= 0) {
                    particles.current.splice(index, 1);
                } else {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.life;
                    ctx.fill();
                }
            });

            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
        />
    );
};

export default CursorTrail;
