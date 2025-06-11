'use client';
/*
    Thank you to https://cursify.vercel.app/ for the inspiration!
*/


import React, { useEffect } from 'react';

interface FollowCursorProps {
    color?: string;
    zIndex?: number;
}

const FollowCursor: React.FC<FollowCursorProps> = ({ color = '#ffffff', zIndex = 3000 }) => {
    useEffect(() => {
        let canvas: HTMLCanvasElement;
        let context: CanvasRenderingContext2D | null;
        let animationFrame: number;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let cursor = { x: width / 2, y: height / 2 };
        let isHovering = false;
        let hoverType = '';
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        );

        // The visual representation of the cursor
        class Dot {
            position: { x: number; y: number };
            width: number;
            lag: number;

            constructor(x: number, y: number, width: number, lag: number) {
                this.position = { x, y };
                this.width = width;
                this.lag = lag;
            }

            moveTowards(x: number, y: number, context: CanvasRenderingContext2D) {
                this.position.x += (x - this.position.x) / this.lag;
                this.position.y += (y - this.position.y) / this.lag;

                // Determine color and size based on hover state
                let currentColor = color;

                if (isHovering) {
                    switch (hoverType) {
                        case 'link':
                            currentColor = '#1ced23';
                            break;
                        default:
                            currentColor = color;
                    }
                }

                context.fillStyle = currentColor;
                context.beginPath();
                context.arc(
                    this.position.x,
                    this.position.y,
                    this.width,
                    0,
                    2 * Math.PI
                );
                context.fill();
                context.closePath();
            }
        }

        // The cursor itself
        const dot = new Dot(width / 2, height / 2, 10, 8);

        const detectHoverElement = (x: number, y: number) => {
            const element = document.elementFromPoint(x, y);
            if (!element) {
                isHovering = false;
                hoverType = '';
                return;
            }

            const tagName = element.tagName.toLowerCase();
            const className = element.className || '';
            const role = element.getAttribute('role') || '';

            // Check for links
            if (tagName === 'a' || element.closest('a') || tagName === 'button' || role === 'button' ||
                className.includes('btn') || className.includes('button') ||
                element.closest('button')) {
                isHovering = true;
                hoverType = 'link';
                return;
            }

            // No hover effect
            isHovering = false;
            hoverType = '';
        };

        const onMouseMove = (e: MouseEvent) => {
            cursor.x = e.clientX;
            cursor.y = e.clientY;
            detectHoverElement(e.clientX, e.clientY);
        };

        const onWindowResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            if (canvas) {
                canvas.width = width;
                canvas.height = height;
            }
        };

        const updateDot = () => {
            if (context) {
                context.clearRect(0, 0, width, height);
                dot.moveTowards(cursor.x, cursor.y, context);
            }
        };

        const loop = () => {
            updateDot();
            animationFrame = requestAnimationFrame(loop);
        };

        const init = () => {
            if (prefersReducedMotion.matches) {
                console.log('Reduced motion enabled, cursor effect skipped.');
                return;
            }

            canvas = document.createElement('canvas');
            context = canvas.getContext('2d');
            canvas.style.position = 'fixed';
            canvas.style.zIndex = zIndex.toString();
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.pointerEvents = 'none';
            canvas.width = width;
            canvas.height = height;
            document.body.appendChild(canvas);

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('resize', onWindowResize);
            loop();
        };

        const destroy = () => {
            if (canvas) canvas.remove();
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onWindowResize);
        };

        prefersReducedMotion.onchange = () => {
            if (prefersReducedMotion.matches) {
                destroy();
            } else {
                init();
            }
        };

        init();

        return () => {
            destroy();
        };
    }, [color]);

    return null; // This component doesn't render any visible JSX
};

export default FollowCursor;
