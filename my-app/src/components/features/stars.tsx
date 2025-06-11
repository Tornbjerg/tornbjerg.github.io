import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import './stars.scss';

/*
 Thank you to https://codesandbox.io/p/sandbox/hackru-frontend-86jfyx?file=/src/components/_Landing/assets/scripts/stars.js for the inspiration.
*/

interface StarsProps {
    count: number;
}

interface Star {
    id: number;
    top: number;
    left: number;
    opacity: number;
    size: number;
}

export default function Stars({ count }: StarsProps) {
    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        // Create stars with random positions and properties
        const newStars: Star[] = Array.from({ length: count }, (_, index) => ({
            id: index,
            top: Math.random() * 98, // Keep within 98% to avoid edge clipping
            left: Math.random() * 100,
            opacity: Math.random() * 0.8 + 0.2, // Between 0.2 and 1.0
            size: Math.random() * 6 + 1 // Between 1 and 4px
        }));

        setStars(newStars);
    }, [count]);

    useEffect(() => {
        if (stars.length === 0) return;

        const starsElements = document.querySelectorAll('.star');
        starsElements.forEach((star, index) => {
            const randomDuration = Math.random() * 1 + 1;
            const randomDelay = Math.random() * 1; 

            gsap.to(star, {
                opacity: Math.random() * 0.9 + 0.4,
                duration: randomDuration,
                delay: randomDelay,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        });

        // Cleanup function
        return () => {
            starsElements.forEach(star => {
                gsap.killTweensOf(star);
            });
        };
    }, [stars]);

    return (
        <div className="stars-container">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="star"
                    style={{
                        top: `${star.top}%`,
                        left: `${star.left}%`,
                        opacity: star.opacity,
                        width: `${star.size}px`,
                        height: `${star.size}px`
                    }}
                />
            ))}
        </div>
    );
}