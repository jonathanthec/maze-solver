import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import { FiTarget } from 'react-icons/fi'
import './styles/Node.css';

export const Node = props => {
    let {
        row,
        col,
        isStart,
        isFinish,
        isWall,
        weighted,
        onMouseDown,
        onMouseUp,
        onMouseEnter,
        onMouseLeave
    } = props;

    const extraClassName = isWall ? 'node-wall' : '';

    const weightClassName = weighted ? 'node-weighted' : '';

    return (
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName} ${weightClassName}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseLeave={() => onMouseLeave(row, col)}
            onMouseUp={() => onMouseUp()}
            style={{ color: "red" }}
        >
            {isStart ? <FaRegStar style={{ margin: "2px 0 0 2px", color: "red", fontSize: "2.6rem" }} /> : ""}
            {isFinish ? <FiTarget style={{ margin: "2px 0 0 2px", color: "red", fontSize: "2.6rem" }} /> : ""}
        </div>
    )
}