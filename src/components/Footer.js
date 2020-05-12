import React from 'react';
import "./styles/Footer.css";

export const Footer = () => {
    return (
        <div className="footer-container">
            <p style={{ backgroundColor: "white", opacity: "80%" }}>Created by Jonathan Chen, hosted on <a href="https://github.com/jonathanthec/maze-solver" target="__blank">Github</a></p>
        </div>
    )
}