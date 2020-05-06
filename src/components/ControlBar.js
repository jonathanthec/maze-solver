import React from 'react';
import { visualizeDijkstra } from '../algorithms/dijkstra';
import { visualizeBfs } from '../algorithms/bfs';
import { visualizeDfs } from '../algorithms/dfs';
import "./styles/ControlBar.css";

export const ControlBar = props => {
    const { resetGrid, grid, startRow, startCol, finishRow, finishCol } = props;
    return (
        <div className="controlbar-container">
            <button onClick={() => resetGrid()}>
                Reset Map
            </button>
            <button onClick={() => visualizeDijkstra(grid, startRow, startCol, finishRow, finishCol)}>
                Visualize Dijkstra's Algorithm
            </button>
            <button onClick={() => visualizeBfs(grid, startRow, startCol, finishRow, finishCol)}>
                Visualize BFS Algorithm
            </button>
            <button onClick={() => visualizeDfs(grid, startRow, startCol, finishRow, finishCol)}>
                Visualize DFS Algorithm
            </button>
        </div>
    )
}