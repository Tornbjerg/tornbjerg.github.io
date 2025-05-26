import React from 'react';
import './ProjectShowcase.scss';
import ProjectCardComponent from '../projectCard/ProjectCardComponent';

// Import images
import word2VecImage from '../../assets/images/Word2Vec.png';
import scrabbleBotImage from '../../assets/images/ScrabbleBot.png';
import realLifeStatsImage from '../../assets/images/logo192.png';
import MMWImage from '../../assets/images/MMW_Logo.jpg';
import MovieHouseImage from '../../assets/images/MovieHouse_Logo.jpg';
import LunarLanderImage from '../../assets/images/LunarLander.png';
interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    collaborators?: string[];
    image?: string;
}

const ProjectShowcase: React.FC = () => {
    const projects: Project[] = [
        {
            id: '1',
            title: 'Analysing the Copenhagen infrastructure with Word2Vec',
            description: 'Bachelor project at IT University of Copenhagen, researching the use of Word2Vec to capture the geographical features in the infrastructure of Copenhagen',
            technologies: ['Python', 'SQL', 'Word2Vec', 'Numpy', 'Matplotlib', 'Seaborn', 'OSM', 'Embeddings', 'Geospatial Data', 'Natural Language Processing'],
            githubUrl: 'https://github.com/Tornbjerg/Word2Vec-Copenhagen',
            collaborators: ['Monica Hardt'],
            image: word2VecImage
        },
        {
            id: '4',
            title: 'My Mental Wellbeing',
            description: 'WebApplication for a mental health tech-startup with focus on providing resources to improve mental wellbeing for individuals',
            technologies: ['React', 'TypeScript', 'SCSS', 'Deployment', 'CI/CD Pipeline', 'Docker', 'Design', 'Gamification'],
            githubUrl: 'Not Available',
            collaborators: ['Wonderful people @MyMentalWellbeing'],
            image: MMWImage
        },
        {
            id: '2',
            title: 'Scrabble Bot',
            description: 'A Scrabble bot that plays against another bot using GADDAG dictionaries with asynchronous programming',
            technologies: ['F#', 'Async', 'GADDAG', 'Recursion', 'Functional Programming'],
            githubUrl: 'https://github.com/Tornbjerg/Scrabble-Bot',
            collaborators: ['William Skou Heidemann'],
            image: scrabbleBotImage
        },
        {
            id: '7',
            title: 'Gymnasium Lunar Lander',
            description: 'Double Deep Q-Network implementation for the Lunar Lander enviornment',
            technologies: ['Python', 'TensorFlow', 'Deep Q-Network', 'Reinforcement Learning', 'Neural Networks', 'DDQN', 'Gymnasium'],
            githubUrl: 'https://github.com/Tornbjerg/LunarLander',
            collaborators: [],
            image: LunarLanderImage
        },
        {
            id: '5',
            title: 'Movie House',
            description: 'IT-consulting centred around datamanagement, data-driven decision making and data visualisation',
            technologies: ['Python', 'SQL', 'FTP', 'Google Cloud', 'Docker', 'Data Warehouse', 'Data Visualisation', 'Automation', 'ETL'],
            githubUrl: 'Not Available',
            collaborators: [],
            image: MovieHouseImage
        },
    ];

    return (
        <section className="project-showcase" id="projects">
            <h2 className="project-showcase__title">Featured Projects</h2>
            <div className="project-showcase__grid">
                {projects.map((project) => (
                    <ProjectCardComponent key={project.id} title={project.title} description={project.description} technologies={project.technologies} image={project.image} githubUrl={project.githubUrl} collaborators={project.collaborators} />
                ))}
            </div>
        </section>
    );
};

export default ProjectShowcase; 