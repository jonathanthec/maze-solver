import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import { IoIosPlanet } from 'react-icons/io';
import './styles/InfoSection.css';

export const InfoSection = () => {
    return (
        <div className="info-section-container">
            <div>
                <FaRegStar style={{ margin: "2px 0 0 2px", color: "red", fontSize: "1.6rem" }} />
                <p>This is the start</p>
            </div>
            <div>
                <IoIosPlanet style={{ margin: "2px 0 0 2px", color: "red", fontSize: "1.6rem" }} />
                <p>This is the target</p>
            </div>
            <div>
                <div className="node"></div>
                <p>This is a typical node</p>
            </div>
            <div>
                <div className="node node-wall"></div>
                <p>This is a wall</p>
            </div>
        </div>
    )
}