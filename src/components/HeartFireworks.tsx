import React, { useEffect, useRef } from 'react';

const HeartFireworks: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);
        resize();

        // Firework particle class
        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            alpha: number;
            color: string;
            size: number;
            decay: number;

            constructor(x: number, y: number, color: string) {
                this.x = x;
                this.y = y;
                // Explosion velocity
                const angle = Math.random() * Math.PI * 2;
                const velocity = Math.random() * 3 + 1;
                this.vx = Math.cos(angle) * velocity;
                this.vy = Math.sin(angle) * velocity;

                this.alpha = 1;
                this.color = color;
                this.size = Math.random() * 5 + 4; // Much larger hearts
                this.decay = Math.random() * 0.015 + 0.005;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.05; // Gravity
                this.alpha -= this.decay;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;

                // Draw heart shape
                ctx.translate(this.x, this.y);
                ctx.beginPath();
                const topCurveHeight = this.size * 0.3;
                ctx.moveTo(0, topCurveHeight);
                ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
                ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, this.size, 0, this.size);
                ctx.bezierCurveTo(0, this.size, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
                ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
                ctx.fill();
                ctx.restore();
            }
        }

        // Rocket class
        class Rocket {
            x: number;
            y: number;
            vx: number;
            vy: number;
            color: string;
            exploded: boolean;

            constructor() {
                this.x = Math.random() * width;
                this.y = height;
                this.vx = (Math.random() - 0.5) * 4;
                this.vy = -(Math.random() * 5 + 10);
                this.color = `hsl(${Math.random() * 50 + 330}, 70%, 70%)`; // Pinks/Reds/Oranges
                this.exploded = false;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.15; // Gravity

                if (this.vy >= -2 && !this.exploded) {
                    this.explode();
                    return false; // Remove rocket
                }
                return true; // Keep rocket
            }

            explode() {
                this.exploded = true;
                for (let i = 0; i < 40; i++) {
                    particles.push(new Particle(this.x, this.y, this.color));
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, 2, 8);
            }
        }

        let rockets: Rocket[] = [];
        let particles: Particle[] = [];

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trail effect
            ctx.clearRect(0, 0, width, height);

            // Randomly launch rockets
            if (Math.random() < 0.03) {
                rockets.push(new Rocket());
            }

            // Update rockets
            rockets = rockets.filter(rocket => {
                rocket.draw(ctx);
                return rocket.update();
            });

            // Update particles
            particles = particles.filter(particle => {
                particle.draw(ctx);
                particle.update();
                return particle.alpha > 0;
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

export default HeartFireworks;
