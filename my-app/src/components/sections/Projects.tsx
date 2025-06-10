import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Projects.scss';
import ProjectCardComponent from '../projectCard/ProjectCardComponent';

import word2VecImage from '../../assets/images/Word2Vec.png';
import scrabbleBotImage from '../../assets/images/ScrabbleBot.png';
import MMWImage from '../../assets/images/MMW_Logo.jpg';
import MovieHouseImage from '../../assets/images/MovieHouse_Logo.jpg';
import LunarLanderImage from '../../assets/images/LunarLander.png';
import WebPageImage from '../../assets/images/WebPage.png';

interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    collaborators?: string[];
    image?: string;
    category?: string;
}

const ProjectShowcase: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const projects: Project[] = [
        {
            id: '1',
            title: 'Analysing the Copenhagen infrastructure with Word2Vec',
            description: 'Bachelor project at IT University of Copenhagen, researching the use of Word2Vec to capture the geographical features in the infrastructure of Copenhagen. Embedding stations based on their travelers\' commuting behaviour.',
            technologies: ['Python', 'SQL', 'Word2Vec', 'Numpy', 'Matplotlib', 'Seaborn', 'OSM', 'Embeddings', 'Geospatial Data', 'Natural Language Processing'],
            githubUrl: 'https://github.com/Tornbjerg/Word2Vec-Copenhagen',
            collaborators: ['Monica Hardt'],
            image: word2VecImage
        },
        {
            id: '4',
            title: 'My Mental Wellbeing',
            description: 'WebApplication for a mental health tech-startup with focus on providing resources to improve mental wellbeing for individuals. I had the pleasure of working as part of the full-stack team as well as the design team. Primarily focused on gamification, microinteractions, user experience, and setting up proper CI/CD pipelines.', 
            technologies: ['React', 'TypeScript', 'SCSS', 'Deployment', 'CI/CD Pipeline', 'Docker', 'Design', 'Gamification'],
            githubUrl: 'Not Available',
            collaborators: ['Wonderful people @MyMentalWellbeing'],
            image: MMWImage
        },
        {
            id: '2',
            title: 'Scrabble Bot',
            description: 'A Functional Programming project centred around the implementation of a Scrabble bot that plays against either itsself or another bot. Our implementation uses GADDAG dictionaries with asynchronous programming.',
            technologies: ['F#', 'Async', 'GADDAG', 'Recursion', 'Functional Programming'],
            githubUrl: 'https://github.com/Tornbjerg/ScrabbleProject',
            collaborators: ['William Skou Heidemann'],
            image: scrabbleBotImage
        },
        {
            id: '7',
            title: 'Gymnasium Lunar Lander',
            description: 'AI project centred around a Lunar Lander learning how to land itsself in a changing enviornment. The project implements a Double Deep Q-Network to learn how to land the Lunar Lander.',
            technologies: ['Python', 'TensorFlow', 'Deep Q-Network', 'Reinforcement Learning', 'Neural Networks', 'DDQN', 'Gymnasium'],
            githubUrl: 'https://github.com/Tornbjerg/LunarLander',
            collaborators: ['Peter Moore'],
            image: LunarLanderImage
        },
        {
            id: '5',
            title: 'Movie House',
            description: 'IT-consulting centred around datamanagement, data-driven decision making and data visualisation. Centred around the centralisation of data from multiple sources into a single data warehouse, using the Google Cloud Platform for automation and data visualisation. Solution consisted of custom ETL Python scripts containerised in Docker running through Google Jobs, Google DataWarehouse management and data visualisation using Looker Studio.',
            technologies: ['Python', 'SQL', 'FTP', 'Google Cloud', 'Docker', 'Data Warehouse', 'Data Visualisation', 'Automation', 'ETL'],
            githubUrl: 'Not Available',
            collaborators: [],
            image: MovieHouseImage
        },
        {
            id: '6',
            title: 'This Website',
            description: 'This website is a showcase of my projects, interests and skills. It is built with React and Framer Motion. Updates are made to the website as I learn new technologies and skills.',
            technologies: ['React', 'TypeScript', 'SCSS', 'Deployment', 'CI/CD Pipeline', 'Docker', 'Design', 'Gamification'],
            githubUrl: 'https://github.com/Tornbjerg/tornbjerg.github.io',
            collaborators: [],
            image: WebPageImage
        }
    ];



    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.section
            ref={ref}
            className="project-showcase"
            id="projects"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <motion.h2
                className="project-showcase__title"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 2 }}
            >
                Featured Projects
            </motion.h2>

            <motion.div
                className="project-showcase__grid"
                variants={containerVariants}
            >
                <AnimatePresence>
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProjectCardComponent
                                title={project.title}
                                description={project.description}
                                technologies={project.technologies}
                                image={project.image}
                                githubUrl={project.githubUrl}
                                collaborators={project.collaborators}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </motion.section>
    );
};

export default ProjectShowcase; 