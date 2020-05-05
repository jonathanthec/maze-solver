import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import { IoIosPlanet } from 'react-icons/io'
import './node.css';

export const Node = props => {
    let {
        row,
        col,
        isStart,
        isFinish,
        isWall,
        onMouseDown,
        onMouseUp,
        onMouseEnter,
        onMouseLeave
    } = props;

    const extraClassName = isWall ? 'node-wall' : '';

    return (
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseLeave={() => onMouseLeave(row, col)}
            onMouseUp={() => onMouseUp()}
            style={{ color: "red" }}
        >
            {isStart ? <FaRegStar style={{ margin: "2px 0 0 2px", color: "blue" }} /> : ""}
            {isFinish ? <IoIosPlanet style={{ margin: "2px 0 0 2px", color: "blue" }} /> : ""}
        </div>
    )
}