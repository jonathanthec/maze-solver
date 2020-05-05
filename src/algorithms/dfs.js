// Depth first search algorithm will start at startNode, and add all of its valid neighbors
// To an array called toBeVisitedNodes. Order of adding neighbors will be top, right, bottom, left.
// It will then check for the last element in the array.
// Does not guarantee shortest path.

export function dfs(grid, startNode, finishNode) {
    const toBeVisitedNodes = [];
    const nodesVisitedInOrder = [];
    toBeVisitedNodes.push(startNode);

    while (toBeVisitedNodes.length > 0) {
        const currNode = toBeVisitedNodes.pop();
        if (currNode.isWall === true) continue;
        if (currNode.visited !== true) {
            currNode.visited = true;
            nodesVisitedInOrder.push(currNode);
        }
        if (currNode === finishNode) return nodesVisitedInOrder;
        const neighbors = getUnvisitedNeighbors(currNode, grid);
        for (const neighbor of neighbors) {
            neighbor.previousNode = currNode;
            toBeVisitedNodes.push(neighbor);
        }
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    return neighbors.filter(neighbor => !neighbor.visited);
}

function getShortestNodePath(finishNode) {
    const shortestPath = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        shortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPath;
}


function animateDfs(orderedVisitedNodes, orderedNodesOnShortestPath) {
    for (let i = 0; i < orderedVisitedNodes.length; i++) {
        if (i === orderedVisitedNodes.length - 1) {
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

export function visualizeDfs(grid, startRow, startCol, finishRow, finishCol) {
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const orderedVisitedNodes = dfs(grid, startNode, finishNode);
    const orderedNodesOnShortestPath = getShortestNodePath(finishNode);
    animateDfs(orderedVisitedNodes, orderedNodesOnShortestPath);
}