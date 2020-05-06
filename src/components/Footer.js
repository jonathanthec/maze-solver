import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import "./styles/Footer.css";

export const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <ul className="footer-buttons">
                    <li>
                        <a id="github" href="https://github.com/jonathanthec" target="_blank" rel="noopener noreferrer">
                            <FaGithub style={{ fontSize: "1.6rem" }} />
                        </a>
                    </li>
                    <li>
                        <a id="linkedin" href="https://www.linkedin.com/in/jonathan-chen-86589686/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn style={{ fontSize: "1.6rem" }} />
                        </a>
                    </li>
                </ul>
                <div className="footer-copyright">
                    <p><i className="fa fa-copyright"></i> Jonathan Chen 2020</p>
                </div>
            </div>
        </footer>
    )
}