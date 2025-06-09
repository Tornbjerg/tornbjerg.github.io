import React from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
// import About from '../sections/About';
import ProjectShowcase from '../projects/ProjectShowcase';
// import Contact from '../sections/Contact';
import './MainLayout.scss';
import Home from '../sections/Home';
import About from '../sections/About';
import ResponsiveOverlay from '../responsiveIdentifyer/responsiveOverlay';

const MainLayout: React.FC = () => {
    const sections = [
        { id: 'Home', component: <Home /> },
        { id: 'projects', component: <ProjectShowcase /> },
        { id: 'about', component: <About /> },
        // { id: 'contact', component: <Contact /> }
    ];

    return (
        <motion.div
            className="main-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Navigation sections={sections.map(s => s.id)} />

            <main className="main-content">
                {sections.map(({ id, component }) => (
                    <motion.section
                        key={id}
                        id={id}
                        className="section"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        {component}
                    </motion.section>
                ))}
            </main>
        </motion.div>
    );
};

export default MainLayout; 