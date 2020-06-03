// Dijkstra's algorithm will return all nodes that are visited
// Order of visiting is top, right, bottom, left
// All nodes point to their previous node, giving us the shortest path

export function dijkstra(grid, startNode, finishNode) {
    // Keep track of a list of nodes that I have visited in order
    const nodesVisitedInOrder = [];
    // The distance to startNode from startNode is 0
    startNode.distance = 0;
    // Get all unvisited nodes in the grid (here it's all nodes)
    const unvisitedNodes = getAllNodes(grid);
    // Now, as long as we still have unvisited nodes in the above list
    while (unvisitedNodes.length !== 0) {
        // Sort the list of unvisited nodes to place the one with shortest distance 
        // In the front. This ensures startNode is at beginning. 
        sortNodesByDistance(unvisitedNodes);
        // Returns the first node in the list unvisitedNodes and removes it from list
        const closestNode = unvisitedNodes.shift();
        // If a node is wall, continue
        if (closestNode.isWall === true) continue;
        // If a node's distance to startNode is infinity, we are done, no more places to go
        if (closestNode.distance === Infinity) {
            return nodesVisitedInOrder;
        }
        // Otherwise, do the following
        closestNode.visited = true;
        nodesVisitedInOrder.push(closestNode);
        if (closestNode === finishNode) {
            return nodesVisitedInOrder;
        }
        // See what are the neighbors of closestNode, and update their distance to startNode
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisited = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisited) {
        if (neighbor.weighted) {
            neighbor.distance = node.distance + 10;
        }
        else {
            neighbor.distance = node.distance + 1;
        }
        neighbor.previousNode = node;
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

function animateDijkstra(orderedVisitedNodes, orderedNodesOnShortestPath) {
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

export function visualizeDijkstra(grid, startRow, startCol, finishRow, finishCol) {
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const orderedVisitedNodes = dijkstra(grid, startNode, finishNode);
    const orderedNodesOnShortestPath = getShortestNodePath(finishNode);
    animateDijkstra(orderedVisitedNodes, orderedNodesOnShortestPath);
}