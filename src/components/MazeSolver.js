import React, { useState, useEffect } from 'react';
import { Node } from './Node.js';
import { ControlBar } from './ControlBar.js';
import { Footer } from './Footer.js';
import { visualizeDijkstra } from '../algorithms/dijkstra';
import { visualizeBfs } from '../algorithms/bfs';
import { visualizeDfs } from '../algorithms/dfs';
import './styles/MazeSolver.css';

export default function MazeSolver(props) {
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [addWeight, setAddWeight] = useState(false);
    const [dragStart, setDragStart] = useState(false);
    const [dragFinish, setDragFinish] = useState(false);
    const [startRow, setStartRow] = useState(NODE_START_ROW);
    const [startCol, setStartCol] = useState(NODE_START_COL);
    const [finishRow, setFinishRow] = useState(NODE_FINISH_ROW);
    const [finishCol, setFinishCol] = useState(NODE_FINISH_COL);
    const [algorithm, setAlgorithm] = useState(null);

    useEffect(() => {
        const grid = initializeGrid();
        setGrid(grid);
    }, [])

    function resetGrid() {
        for (let row = 0; row < 36; row++) {
            for (let col = 0; col < 64; col++) {
                document.getElementById(`node-${row}-${col}`).className = 'node';
            }
        }
        const newGrid = initializeGrid();
        setGrid(newGrid);
        setStartRow(NODE_START_ROW);
        setStartCol(NODE_START_COL);
        setFinishRow(NODE_FINISH_ROW);
        setFinishCol(NODE_FINISH_COL);
    }

    function resetAlgorithm(str) {
        setAlgorithm(str);
    }

    function handleMouseDown(row, col) {
        if (!addWeight) {
            if (grid[row][col].isStart) {
                setDragStart(true);
                setMouseIsPressed(true);
            }
            if (grid[row][col].isFinish) {
                setDragFinish(true);
                setMouseIsPressed(true);
            }
            if (!grid[row][col].isFinish && !grid[row][col].isStart) {
                const newGrid = initializeGridWithWall(grid, row, col);
                setGrid(newGrid);
                setMouseIsPressed(true);
            }
        }
        else {
            if (!grid[row][col].isStart && !grid[row][col].isFinish && !grid[row][col].isWall) {
                const newGrid = initializeGridWithWeight(grid, row, col);
                setGrid(newGrid);
            }
        }
    }

    function handleMouseEnter(row, col) {
        if (!mouseIsPressed && !dragStart && !dragFinish) return;
        if (dragStart) {
            const newGrid = initializeGridWithNewStart(grid, row, col);
            setGrid(newGrid);
            setStartRow(row);
            setStartCol(col);
        }
        if (dragFinish) {
            const newGrid = initializeGridWithNewFinish(grid, row, col);
            setGrid(newGrid);
            setFinishRow(row);
            setFinishCol(col);
        }
        if (!dragStart && !dragFinish) {
            const newGrid = initializeGridWithWall(grid, row, col);
            setGrid(newGrid);
        }
    }

    function handleMouseLeave(row, col) {
        if (dragStart) {
            const newGrid = initializeGridWithNewStart(grid, row, col);
            setGrid(newGrid);
        }
        if (dragFinish) {
            const newGrid = initializeGridWithNewFinish(grid, row, col);
            setGrid(newGrid);
        }
        if (!dragStart && !dragFinish) {
            return;
        }
    }

    function handleMouseUp() {
        if (!addWeight) {
            setMouseIsPressed(false);
            setDragStart(false);
            setDragFinish(false);
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'w' || event.key === 'W') {
            setAddWeight(!addWeight);
        }
    }

    function visualizeAlgorithm() {
        if (algorithm === 'dijkstra') {
            visualizeDijkstra(grid, startRow, startCol, finishRow, finishCol);
        }
        if (algorithm === 'bfs') {
            visualizeBfs(grid, startRow, startCol, finishRow, finishCol);
        }
        if (algorithm === 'dfs') {
            visualizeDfs(grid, startRow, startCol, finishRow, finishCol);
        }
    }

    return (
        <div className="page-container">
            <ControlBar
                resetGrid={resetGrid}
                resetAlgorithm={resetAlgorithm}
                algorithm={algorithm}
                visualizeAlgorithm={visualizeAlgorithm}
                toggle={props.toggle}
            />
            <div className="page-main"> {/************ START OF MAIN CONTENT ************/}
                <div className="grid" tabIndex="0" onKeyPress={(evt) => handleKeyPress(evt)}>
                    {grid && grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx} className="grid-row">
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isStart, isFinish, isWall, distance, weighted } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isWall={isWall}
                                            distance={distance}
                                            weighted={weighted}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                            onMouseLeave={(row, col) => handleMouseLeave(row, col)}
                                            onMouseUp={() => handleMouseUp()}
                                        />
                                    )
                                })}
                            </div>
                        );
                    })}
                </div>
            </div> {/************ END OF MAIN CONTENT ************/}
            <Footer />
        </div>
    )
}

const NODE_START_ROW = 10
const NODE_START_COL = 5;
const NODE_FINISH_ROW = 10;
const NODE_FINISH_COL = 20;

function initializeGrid() {
    const grid = [];
    for (let row = 0; row < 36; row++) {
        const currentRow = [];
        for (let col = 0; col < 64; col++) {
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
        isWall: false,
        visited: false,
        weighted: false,
        distance: Infinity,
        previousNode: null
    }
}

const initializeGridWithWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (!node.isStart && !node.isFinish && !node.weighted) {
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
    }
    return newGrid;
};

const initializeGridWithWeight = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (!node.isStart && !node.isFinish && !node.isWall) {
        const newNode = {
            ...node,
            weighted: !node.weighted,
        };
        newGrid[row][col] = newNode;
    }
    return newGrid;
}

const initializeGridWithNewStart = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isStart: !node.isStart,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

const initializeGridWithNewFinish = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isFinish: !node.isFinish,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};