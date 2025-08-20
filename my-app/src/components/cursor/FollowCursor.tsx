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
        let isMobile = false;
        let fadeoutTimeout: NodeJS.Timeout | null = null;
        let currentOpacity = 1;
        let isVisible = true;

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        );

        // Detect if device is mobile
        const detectMobile = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isSmallScreen = window.innerWidth <= 768;

            const isMobile = isMobileDevice || isTouchDevice || isSmallScreen;
            return isMobile;
        };

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

            moveTowards(x: number, y: number, context: CanvasRenderingContext2D, shouldHide: boolean = false) {
                this.position.x += (x - this.position.x) / this.lag;
                this.position.y += (y - this.position.y) / this.lag;

                // Hide cursor completely when hovering over "name" class
                if (shouldHide) {
                    return; // Don't draw anything
                }

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

                // Apply fadeout effect for mobile
                if (isMobile && !isVisible) {
                    context.globalAlpha = currentOpacity;
                } else {
                    context.globalAlpha = 1;
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

        // Fadeout effect for mobile
        const startFadeout = () => {
            if (!isMobile) return;
            if (fadeoutTimeout) {
                clearTimeout(fadeoutTimeout);
            }

            fadeoutTimeout = setTimeout(() => {
                isVisible = false;
                currentOpacity = 1;

                const fadeOut = () => {
                    if (currentOpacity > 0) {
                        currentOpacity -= 0.05;
                        requestAnimationFrame(fadeOut);
                    } else {
                        currentOpacity = 0;
                    }
                };

                fadeOut();
            }, 2000);
        };

        // Reset visibility and opacity
        const resetVisibility = () => {
            isVisible = true;
            currentOpacity = 1;
            if (fadeoutTimeout) {
                clearTimeout(fadeoutTimeout);
                fadeoutTimeout = null;
            }

            // Start the fadeout timer after resetting
            if (isMobile) {
                startFadeout();
            }
        };

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

            // Check if hovering over the "name" class (Benjamin image cursor)
            if (className.includes('name') || element.closest('.name')) {
                isHovering = false;
                hoverType = '';
                return;
            }

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

            // Reset visibility on mouse move for mobile
            if (isMobile) {
                resetVisibility();
            }
        };

        const onTouchStart = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                cursor.x = touch.clientX;
                cursor.y = touch.clientY;
                detectHoverElement(touch.clientX, touch.clientY);

                // Reset visibility on touch
                resetVisibility();
            }
        };

        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                cursor.x = touch.clientX;
                cursor.y = touch.clientY;
                detectHoverElement(touch.clientX, touch.clientY);

                // Reset visibility on touch move
                resetVisibility();
            }
        };

        const onTouchEnd = () => {
            // Touch ended, but we don't need to do anything special here
            // The fadeout timer is managed by resetVisibility() which gets called on touchstart/touchmove
        };

        const onWindowResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            if (canvas) {
                canvas.width = width;
                canvas.height = height;
            }

            // Re-detect mobile on resize
            isMobile = detectMobile();
        };

        const updateDot = () => {
            if (context) {
                context.clearRect(0, 0, width, height);

                // Check if we should hide the cursor (when hovering over "name" class)
                const elementAtCursor = document.elementFromPoint(cursor.x, cursor.y);
                const shouldHide = Boolean(elementAtCursor && (
                    elementAtCursor.className.includes('name') ||
                    elementAtCursor.closest('.name')
                ));

                dot.moveTowards(cursor.x, cursor.y, context, shouldHide);
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

            // Detect mobile device
            isMobile = detectMobile();

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
            window.addEventListener('touchstart', onTouchStart);
            window.addEventListener('touchmove', onTouchMove);
            window.addEventListener('touchend', onTouchEnd);
            window.addEventListener('resize', onWindowResize);
            loop();
        };

        const destroy = () => {
            if (canvas) canvas.remove();
            if (fadeoutTimeout) clearTimeout(fadeoutTimeout);
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
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
