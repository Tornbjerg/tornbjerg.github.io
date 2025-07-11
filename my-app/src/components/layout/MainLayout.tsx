import React from 'react';
import { motion } from 'framer-motion';
import './MainLayout.scss';
import Navigation from './Navigation';
import Projects from '../sections/Projects';
import Home from '../sections/Home';
import About from '../sections/About';
import Contact from '../sections/Contact';
import QuestionMark from '../../assets/images/Question-mark.svg';
import Questionmark from '../features/Questionmark';





const MainLayout: React.FC = () => {
    const sections = [
        { id: 'Home', component: <Home /> },
        { id: 'projects', component: <Projects /> },
        { id: 'about', component: <About /> },
        { id: 'contact', component: <Contact /> }
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
                {/* Home */}
                <motion.section
                    id="Home"
                    className="section"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                > {sections[0].component}</motion.section>


                {/* Projects */}
                <motion.section
                    id="projects"
                    className="section"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}>
                    {sections[1].component}
                </motion.section>

                {/* About */}
                <motion.section
                    id="about"
                    className="section"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}>
                    {sections[2].component}
                </motion.section>

                {/* Contact */}
                <motion.section
                    id="contact"
                    className="section"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}>
                    {sections[3].component}
                    <Questionmark />
                </motion.section>

            </main>
        </motion.div>
    );
};

export default MainLayout; 