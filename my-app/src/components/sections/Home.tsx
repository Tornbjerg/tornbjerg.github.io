import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Home.scss';
import imgCursor from '../../assets/images/Benjamin.png'; // Update path as needed

const Home: React.FC = () => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [showCursor, setShowCursor] = useState(false);
    const [currentTechIndex, setCurrentTechIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const technologies = ['Python', 'SQL', 'Word2Vec', 'Numpy', 'Matplotlib', 'Seaborn', 'OSM', 'Embeddings', 'Geospatial Data', 'Natural Language Processing', 'React', 'TypeScript', 'SCSS', 'Deployment', 'CI/CD Pipeline', 'Docker', 'Design', 'Gamification', 'F#', 'Async', 'GADDAG', 'Recursion', 'Functional Programming', 'Python', 'TensorFlow', 'Deep Q-Network', 'Reinforcement Learning', 'Neural Networks', 'DDQN', 'Gymnasium', 'Python', 'SQL', 'FTP', 'Google Cloud', 'Docker', 'Data Warehouse', 'Data Visualisation', 'Automation', 'ETL'];

    useEffect(() => {
        const currentTech = technologies[currentTechIndex];
        const typingSpeed = 100; // Speed for typing
        const deletingSpeed = 50; // Speed for deleting
        const pauseTime = 500; // Time to pause when text is complete

        let timeout: NodeJS.Timeout;

        if (!isDeleting && displayText === currentTech) {
            // Pause at the end of typing
            timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && displayText === '') {
            // Move to next word after deleting
            setIsDeleting(false);
            setCurrentTechIndex((prev) => (prev + 1) % technologies.length);
        } else {
            // Type or delete characters
            const speed = isDeleting ? deletingSpeed : typingSpeed;
            timeout = setTimeout(() => {
                setDisplayText(currentTech.substring(0, displayText.length + (isDeleting ? -1 : 1)));
            }, speed);
        }

        return () => clearTimeout(timeout);
    }, [displayText, currentTechIndex, isDeleting, technologies]);

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
                </motion.p>
                <motion.p
                    className="home__description home__description--second"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                >
                    Let me help you with{' '}
                    <span className="technology-container">
                        <motion.span
                            className="technology"
                            key={currentTechIndex}
                        >
                            {displayText}
                            <motion.span
                                className="cursor"
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            >
                                |
                            </motion.span>
                        </motion.span>
                    </span>
                    {' '}for your next project
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