import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import { FiTarget } from 'react-icons/fi';
import './styles/InfoSection.css';

export const InfoSection = () => {
    return (
        <div className="info-section-container">
            <div>
                <p>Starting node:</p>
                <FaRegStar style={{ margin: "2px 0 0 2px", color: "red", fontSize: "1.6rem" }} />
            </div>
            <div>
                <p>Finishing node:</p>
                <FiTarget style={{ margin: "2px 0 0 2px", color: "red", fontSize: "1.6rem" }} />
            </div>
            <div>
                <p>Normal node:</p>
                <div className="node"></div>
            </div>
            <div>
                <p>Wall node:</p>
                <div className="node node-wall"></div>
            </div>
        </div>
    )
}