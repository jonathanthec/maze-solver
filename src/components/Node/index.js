import React, { useState } from 'react';
import './node.css';

export const Node = props => {
    const {
        row,
        col,
        isStart,
        isFinish,
        isWall,
        mouseIsPressed,
        setMouseIsPressed
    } = props;

    const [gridIsWall, setGridIsWall] = useState(isWall);

    const extraClassName = isFinish
        ? 'node-finish'
        : isStart
            ? 'node-start'
            : gridIsWall
                ? 'node-wall'
                : '';


    function handleMouseDown() {
        setMouseIsPressed(true);
        if (!isStart && !isFinish) setGridIsWall(!gridIsWall);
    }

    function handleMouseEnter() {
        if (mouseIsPressed && !isStart && !isFinish) setGridIsWall(!gridIsWall);
    }

    function handleMouseUp() {
        setMouseIsPressed(false);
    }

    return (
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={() => handleMouseDown()}
            onMouseEnter={() => handleMouseEnter()}
            onMouseUp={() => handleMouseUp()}
        >
        </div>
    )
}