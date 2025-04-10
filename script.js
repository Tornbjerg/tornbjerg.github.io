// Project data
const projects = [
    {
        title: "Project 1",
        description: "Description of project 1",
        technologies: ["JavaScript", "React", "Node.js"],
        github: "https://github.com/yourusername/project1",
        demo: "https://demo-link-1.com"
    },
    // Add more projects as needed
];

// Function to create project cards
function createProjectCards() {
    const projectGrid = document.querySelector('.project-grid');

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-technologies">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank">GitHub</a>
                <a href="${project.demo}" target="_blank">Live Demo</a>
            </div>
        `;

        projectGrid.appendChild(card);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    createProjectCards();
});
