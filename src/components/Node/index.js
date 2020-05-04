import React from 'react';
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
            style={{ color: "black" }}
        >
            {isStart ? "S" : ""}
            {isFinish ? "F" : ""}
        </div>
    )
}