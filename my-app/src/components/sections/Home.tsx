import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Home.scss';
import imgCursor from '../../assets/images/Benjamin.png'; // Update path as needed

const Home: React.FC = () => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [showCursor, setShowCursor] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const scrollToProjects = () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="home">
            <motion.div
                className="home__content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.h1
                    className="home__title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Hello! I am <span className="name"
                        onMouseEnter={() => setShowCursor(true)}
                        onMouseLeave={() => setShowCursor(false)}
                        onMouseMove={handleMouseMove}>
                        Benjamin
                        <span className="asterisk">
                            *
                        </span>
                    </span>
                </motion.h1>

                <motion.h2
                    className="home__subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Software Developer & People Pleaser
                </motion.h2>

                <motion.p
                    className="home__description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    Passionate about creating elegant solutions to complex problems.
                    Specialising in full-stack development and data science.
                </motion.p>

                <motion.div
                    className="home__cta"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <motion.button
                        className="home__cta-button"
                        onClick={scrollToProjects}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View My Work
                    </motion.button>
                </motion.div>
            </motion.div>

            <motion.div
                className="home__scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 1,
                    delay: 1.2,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            >
                <span className="home__scroll-arrow">↓</span>
            </motion.div>

            {showCursor && (
                <div className="custom-cursor-blur" />
            )}
            {showCursor && (
                <img
                    src={imgCursor}
                    alt="Custom Cursor"
                    className="custom-cursor"
                    style={{
                        left: cursorPos.x,
                        top: cursorPos.y,
                    }}
                />
            )}
        </div>
    );
};

export default Home; 