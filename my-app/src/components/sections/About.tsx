import './About.scss';
import { motion } from 'framer-motion';
import FollowCursor from '../cursor/FollowCursor';
import Stars from '../features/stars';

interface project {
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    collaborators?: string[];
    meta?: string; //Used for additional styling
}

interface cvEntry {
    title: string; //Headliner for the entry
    type?: string;  //Education, Experience
    subTitle: string; //subTitle of the entry
    description?: string; //Description of the entry
    projects?: project[]; //List of projects
    technologies?: string[]; //List of technologies
    startDate?: string;
    endDate?: string;
    meta?: string; //Used for additional styling
}

const cv: cvEntry[] = [
    {
        title: 'Software Development', type: 'Bachelor', subTitle: 'IT University of Copenhagen ・ Bachelor', description: 'University education in software development, focusing on system development, algorithms, problem solving, product development, database management, project work, communication. General broad approach to IT making adapting from one technology to another a natural part of the learning process.', projects: [
            { title: 'Behaviour-based embedding space modelling of public transportation', description: 'Bachelor project at IT University of Copenhagen, researching the use of Word2Vec to capture the geographical features in the infrastructure of Copenhagen. Embedding stations based on their travelers\' commuting behaviour.', technologies: ['Python', 'SQL', 'Word2Vec', 'Numpy', 'Matplotlib', 'Seaborn', 'OSM', 'Embeddings', 'Geospatial Data', 'Natural Language Processing'], githubUrl: 'https://github.com/Tornbjerg/Word2Vec-Copenhagen', collaborators: ['Monica Hardt'] },
            { title: 'Gymnasium\'s Lunar Lander with DDQN-implementation', description: 'AI project centred around a Lunar Lander learning how to land itsself in a changing enviornment. The project implements a Double Deep Q-Network to learn how to land the Lunar Lander.', technologies: ['Python', 'TensorFlow', 'Deep Q-Network', 'Reinforcement Learning', 'Neural Networks', 'DDQN', 'Gymnasium'], githubUrl: 'https://github.com/Tornbjerg/LunarLander', collaborators: ['Peter Moore'] },
            { title: 'Scrabble and Scrabble-bot', description: 'A Functional Programming project centred around the implementation of a Scrabble bot that plays against either itsself or another bot. Our implementation uses GADDAG dictionaries with asynchronous programming.', technologies: ['F#', 'Async', 'GADDAG', 'Recursion', 'Functional Programming'], githubUrl: 'https://github.com/Tornbjerg/ScrabbleProject', collaborators: ['William Skou Heidemann'] },
            { title: 'Simple programming language from scratch', description: 'A project centred around the implementation of a simple programming language from scratch. The project implements a compiler that compiles the language into machine code.', technologies: ['F#', 'C', 'Assembly'], githubUrl: 'https://github.com/Tornbjerg/ScrabbleProject', collaborators: ['William Skou Heidemann'] },
            { title: 'Map of Denmark', description: 'Project with the goal of developing a Google-Maps-Like application from scratch using open source data from Open-Street-Map. Solution consists of a Java application with visualisation as well as sophisticated algorithms such as Dijkstra\'s and A* for shortest path calculations, ternery trie for autocompleting search results, and k/d tree for memory efficient visualisation of the map.', technologies: ['Java', 'OSM', 'Geospatial Data', 'Algorithms'] },
        ], startDate: '2021', endDate: '2024', meta: '🎓 🇩🇰'
    },
    { title: 'Computer Science', type: 'Exchange', subTitle: 'City University of Hong Kong ・ Exchange', description: 'Exchange semester at City University of Hong Kong, focusing on AI, software quality management, cloud computing and XR. Studied the use of Python, PyTorch, Software Quality Management, Cloud Computing, Virtual Reality.', technologies: ['Python', 'PyTorch', 'Software Quality Management', 'Cloud Computing', 'XR', 'Unreal Engine'], startDate: 'Jan 2023', endDate: 'May 2023', meta: "🎓 🇭🇰" },
    {
        title: 'Freelance', type: 'Experience', subTitle: 'Tornbjerg Consulting ・ Full Time', description: 'Freelance IT-consultant focused on delivering specifc solutions to specific problems. Primarily focused on helping clients with the possibilites of IT either through enabaling data-driven decision making and automation, or digitalisation of legacy systems.', projects: [
            { title: 'Movie House', description: 'IT-consulting centred around datamanagement, data-driven decision making and data visualisation. Centred around the centralisation of data from multiple sources into a single data warehouse, using the Google Cloud Platform for automation and data visualisation. Solution consisted of custom ETL Python scripts containerised in Docker running through Google Jobs, Google DataWarehouse management and data visualisation using Looker Studio.', technologies: ['Python', 'SQL', 'BigQuery', 'Docker', 'Google Cloud Platform', 'Looker Studio'] },
        ], startDate: '2024', endDate: 'Now', meta: '💼 ☁️'
    },
    { title: 'Fullstack developer / Generalist', type: 'Experience', subTitle: 'My Mental Wellbeing ・ Full Time', description: 'Design and development of a web-based-platform for mental wellbeing. The platform is a gamified solution for tracking and improving mental wellbeing. I also engaged in customer relations and stakeholder events as a part of the team.', startDate: 'Jan 2025', endDate: 'Apr 2025', meta: '🧠 ❤️' },
    { title: 'ITU Ambassador', type: 'Experience', subTitle: 'IT University of Copenhagen ・ Part-time', description: 'Presentations at ITU events and fairs. Contact person for ITU-interested as well as hosting and helping (primarily) youth activities centred around getting more people interested in IT.', startDate: '2021', endDate: '2023', meta: '🗣️ 💻' },
    { title: 'Bartender', type: 'Experience', subTitle: 'Åbenbar ・ Part-time', description: 'Bartender and mixer focused on creating a great atmosphere among both colleagues and guests.', startDate: '2021', endDate: '2022', meta: '🍹 🍻' },
]


const About: React.FC = () => {
    return (
        <div className="about" id="starryBackground">
            <Stars count={50} />
            <motion.div
                className="about__main"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <header className="about__header">
                    <h1>Who am I?</h1>
                </header>
                <section>
                    <section className="about__profile-text">
                        <div className="about__sub_header">
                            <h2>Education</h2>
                        </div>
                        <div>
                            {cv.filter((entry) => entry.type === 'Bachelor' || entry.type === 'Exchange').map((entry, index) => (
                                <div className="about__entry" key={index}>
                                    <h3>{entry.title}</h3>
                                    <p>{entry.subTitle + ' ・ ' + (entry.startDate ? entry.startDate + ' - ' + entry.endDate : '')}</p>
                                    <p className="about__entry__description">{entry.description}</p>

                                    {entry.projects && entry.projects.map((project, index) => (
                                        <div className="about__project" key={index}>
                                            <h4>{project.title}</h4>
                                            <p>{project.technologies.join('・ ')}</p>
                                        </div>
                                    ))}
                                    {!entry.projects && <div className="about__project"><p>{entry.technologies?.join('・ ')}</p></div>}
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="about__profile-text">
                        <div className="about__sub_header">
                            <h2>Working Experience</h2>
                        </div>
                        <div>
                            {cv.filter((entry) => entry.type === 'Experience').map((entry, index) => (
                                <div className="about__entry" key={index}>
                                    <h3>{entry.title}</h3>
                                    <p>{entry.subTitle + ' ・ ' + (entry.startDate ? entry.startDate + ' - ' + entry.endDate : '')}</p>
                                    <p className="about__entry__description">{entry.description}</p>

                                    {entry.projects && entry.projects.map((project, index) => (
                                        <div className="about__project" key={index}>
                                            <h4>{project.title}</h4>
                                            <p>{project.technologies.join('・ ')}</p>
                                        </div>
                                    ))}
                                    {!entry.projects && <div className="about__project"><p>{entry.technologies?.join('・ ')}</p></div>}
                                </div>
                            ))}
                        </div>
                    </section>
                </section>
            </motion.div>

            <FollowCursor />
        </div>
    );
};

export default About;   