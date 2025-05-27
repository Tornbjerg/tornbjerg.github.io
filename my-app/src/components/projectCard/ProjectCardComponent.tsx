import React from 'react';
import './ProjectCardComponentStyle.scss';
import { motion } from 'framer-motion';

interface ProjectCardComponentProps {
    title: string;
    description: string;
    technologies: string[];
    image?: string;
    githubUrl?: string;
    collaborators?: string[];
}

const ProjectCardComponent = ({ title, description, technologies, image, githubUrl, collaborators }: ProjectCardComponentProps) => {
    return (
        <motion.div
            className="project-card"
            initial="offscreen"
            whileInView="onscreen"
            variants={{
                offscreen: { opacity: 0, y: 100 },
                onscreen: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.3 }}
            style={{
                padding: '1rem 0'
            }}
        >


        <div className="project-card">
            {image && (
                <div className="project-card__image">
                    <img src={image} alt={title} />
                    <h3 className="project-card__title">{title}</h3>
                </div>
            )}
            <div className="project-card__overlay">
                <div className="project-card__content">
                    <p>{description}</p>
                    {collaborators && collaborators.length > 0 && (
                        <div className="project-card__collaborators">
                            <span>Collaborators</span>
                            {collaborators.map((collaborator) => (
                                <span key={collaborator}>{collaborator}</span>
                            ))}
                        </div>
                    )}
                    {githubUrl && githubUrl !== 'Not Available' && (
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                            View Project
                        </a>
                    )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCardComponent;