import React, { useState, useEffect } from 'react';
import { Node } from '../Node';
import './MazeSolver.css';

const NODE_START_ROW = 10;
const NODE_START_COL = 5;
const NODE_FINISH_ROW = 10;
const NODE_FINISH_COL = 45;

export default function MazeSolver() {
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    useEffect(() => {
        const grid = initializeGrid();
        setGrid(grid);
    }, [])

    return (
        <div className="grid">
            {grid.map((row, rowIdx) => {
                return (
                    <div key={rowIdx} className="grid-row">
                        {row.map((node, nodeIdx) => {
                            const { row, col, isStart, isFinish, isWall } = node;
                            return (
                                <Node
                                    key={nodeIdx}
                                    row={row}
                                    col={col}
                                    isStart={isStart}
                                    isFinish={isFinish}
                                    isWall={isWall}
                                    mouseIsPressed={mouseIsPressed}
                                    setMouseIsPressed={setMouseIsPressed}
                                />
                            )
                        })}
                    </div>
                );
            })}
        </div>
    )
}

function initializeGrid() {
    const grid = [];
    for (let row = 0; row < 25; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(row, col));
        }
        grid.push(currentRow);
    }
    return grid;
}

function createNode(row, col) {
    return {
        row,
        col,
        isStart: row === NODE_START_ROW && col === NODE_START_COL,
        isFinish: row === NODE_FINISH_ROW && col === NODE_FINISH_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null
    }
}