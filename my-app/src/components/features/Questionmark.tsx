import './Questionmark.scss';
import { useState } from 'react';
import QuestionMark from '../../assets/images/Question-mark.svg';



export default function Questionmark() {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="questionmark">
            <img src={QuestionMark} alt="Question mark" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='btn' />
            {isHovered && (
                <div className="questionmark__tooltip">
                    Thank you <span>Cursify</span>, <span>HackRU</span>, and <span>Sara Cajner</span> for the inspiration to this page design!
                </div>
            )}
        </div>
    )
}
