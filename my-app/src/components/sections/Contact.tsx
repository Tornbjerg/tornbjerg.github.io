import { motion } from 'framer-motion';
import './Contact.scss';    

export default function Contact() {
    return (
        <div className="contact">
            <motion.div
                className="contact__footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <motion.button
                    className="contact__footer-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('https://github.com/Tornbjerg', '_blank')}
                >
                    GitHub
                </motion.button>
                    <motion.button
                        className="contact__footer-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open('mailto:tornmil@gmail.com', '_blank')}
                    >
                    Shoot me a message
                </motion.button>
                <motion.button
                    className="contact__footer-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('https://linkedin.com/in/benjamin-tornbjerg-millant', '_blank')}
                >
                    LinkedIn
                </motion.button>
            </motion.div>
        </div>
    )
}   