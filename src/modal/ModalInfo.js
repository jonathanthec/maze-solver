import React from 'react';
import Start from './img/Start.jpeg';
import End from './img/End.jpeg';
import Wall from './img/Wall.jpeg';
import Weight from './img/Weight.jpeg';
import Selection from './img/Selection.jpeg';

const ModalInfo = () => {
    return (
        <div className="modal-info-container">
            <div className="modal-info-container-inner">
                <div className="modal-info-icon-section">
                    <h3>Start Node</h3>
                    <p>This is the starting location. You can change the starting node by drag the star to your desired node.</p>
                    <img src={Start} alt="start location symbol" />
                </div>
                <div className="modal-info-icon-section">
                    <h3>End Node</h3>
                    <p>This is the ending location. You can change the ending node by drag the target to your desired node.</p>
                    <img src={End} alt="end location symbol" />
                </div>
            </div>
            <div className="modal-info-container-inner">
                <div className="modal-info-icon-section">
                    <h3>Wall Node</h3>
                    <p>This is a piece of wall. The algorithm will not travel through walls. To place a wall, simply click on a node that is not a starting node, ending node, or weighted node. Alternatively, click and drag your mouse cursor to toggle multiple nodes as wall.</p>
                    <img src={Wall} alt="wall symbol" />
                </div>
                <div className="modal-info-icon-section">
                    <h3>Weighted Node</h3>
                    <p>This is a weighted node. The distance from a normal node to another is 1, but from a weighted node to another node is 10. To mark a node as weighted, first press w, then click any node. Press w again to exit weight placement mode.</p>
                    <img src={Weight} alt="weighted node symbol" />
                </div>
            </div>
            <div className="modal-info-container-selection">
                <h3>Select An Algorithm, Start!</h3>
                <p>Once you have placed all walls and weights, and have adjusted your desired starting and finishing location, pick an algorithm and click start!</p>
                <img src={Selection} alt="select algorithm" />
            </div>
        </div>
    )
}

export default ModalInfo;