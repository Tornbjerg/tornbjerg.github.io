import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation.scss';

interface NavigationProps {
    sections: string[];
}

const Navigation: React.FC<NavigationProps> = ({ sections }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            // Update active section based on scroll position
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    const navItems = sections.map(section => ({
        id: section,
        label: section.charAt(0).toUpperCase() + section.slice(1)
    }));

    return (
        <>
            {/* Burger Menu Button */}
            <motion.button
                className={`menu-button ${isMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <span className="menu-button__line" />
                <span className="menu-button__line" />
            </motion.button>

            {/* Side Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="side-menu"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 20 }}
                    >
                        <div className="side-menu__content">
                            <nav className="side-menu__nav">
                                <ul>
                                    {navItems.map((item, index) => (
                                        <motion.li
                                            key={item.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                        >
                                            <button
                                                className={`side-menu__link ${activeSection === item.id ? 'active' : ''}`}
                                                onClick={() => scrollToSection(item.id)}
                                            >
                                                {item.label}
                                            </button>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            <motion.div
                                className="side-menu__footer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <a href="https://github.com/Tornbjerg" target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                                <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="menu-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation; 