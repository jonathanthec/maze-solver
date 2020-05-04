import React, { useState, useEffect } from 'react';
import { Node } from '../Node';
import { dijkstra, getShortestNodePath } from '../../algorithms/dijkstra';
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

    function animateDijkstra(orderedVisitedNodes, orderedNodesOnShortestPath) {
        for (let i = 0; i <= orderedVisitedNodes.length; i++) {
            if (i === orderedVisitedNodes.length) {
                setTimeout(() => {
                    animateShortestPath(orderedNodesOnShortestPath);
                }, 10 * i);
            }
            setTimeout(() => {
                const node = orderedVisitedNodes[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 10 * i);
        }
    }

    function animateShortestPath(orderedNodesOnShortestPath) {
        for (let i = 0; i < orderedNodesOnShortestPath.length; i++) {
            setTimeout(() => {
                const node = orderedNodesOnShortestPath[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            }, 50 * i)
        }
    }

    function visualizeDijkstra() {
        const startNode = grid[NODE_START_ROW][NODE_START_COL];
        const finishNode = grid[NODE_FINISH_ROW][NODE_FINISH_COL];
        const orderedVisitedNodes = dijkstra(grid, startNode, finishNode);
        const orderedNodesOnShortestPath = getShortestNodePath(finishNode);
        animateDijkstra(orderedVisitedNodes, orderedNodesOnShortestPath);
    }

    return (
        <div>
            <button onClick={visualizeDijkstra()}>
                Visualize Dijkstra's Algorithm
            </button>
            <div className="grid">
                {grid && grid.map((row, rowIdx) => {
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
        isWall: false,
        isVisited: false,
        distance: Infinity,
        previousNode: null
    }
}