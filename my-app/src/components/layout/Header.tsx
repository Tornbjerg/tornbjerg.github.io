import React from 'react';
import './Header.scss';

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Benjamin Tornbjerg Millant' }) => {
    return (
        <header className="header">
            <div className="header__container">
                <h1 className="header__title">{title}</h1>
                <nav className="header__nav">
                    <ul className="header__nav-list">
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header; 