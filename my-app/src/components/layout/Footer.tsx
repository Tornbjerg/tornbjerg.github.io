import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__content">
                    <div className="footer__social">
                        <a
                            href="https://github.com/Tornbjerg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__social-link"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/benjamin-tornbjerg-millant"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__social-link"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="mailto:tornmil@gmail.com"
                            className="footer__social-link"
                        >
                            Email
                        </a>
                    </div>
                    <p className="footer__copyright">
                        © {currentYear} Benjamin Tornbjerg Millant. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 