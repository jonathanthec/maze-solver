// Breadth first search algorithm will start at a node, list all
// of the node's neighbors in an array, and check each of the neighbors, 
// while adding neighbor's neighbors in the list
// Does not guarantee the shortest path for obvious reason

export function bfs(grid, startNode, finishNode) {
    // Initialize an empty array to track nodes that I will be visiting in order
    const nodesVisitedInOrder = [];
    // Initialize an empty queue, this will keep track all the nodes we haven't visit yet
    const unvisitedNeighbors = [];
    // And push startNode to it, because we will start at startNode
    unvisitedNeighbors.push(startNode);
    let times = 0;
    // As long as finishNode isn't found, we'll keep searching until there are no more things to look for
    while (unvisitedNeighbors.length > 0) {
        times++;
        // Grab the first node on unvisitedNeighbors, and its row and col
        const currNode = unvisitedNeighbors.shift();
        if (currNode.isWall === false && currNode.visited === false) {
            currNode.visited = true;
            nodesVisitedInOrder.push(currNode);
        }
        // Now, if currNode is the finishNode, we are done
        if (currNode === finishNode) {
            console.log(times)
            return nodesVisitedInOrder;
        }
        // Otherwise we need to push its unvisited neighbors to unvisitedNeighbors
        const neighbors = getUnvisitedNeighbors(currNode, grid);
        for (let i = 0; i < neighbors.length; i++) {
            if (neighbors[i].visited === false && !unvisitedNeighbors.includes(neighbors[i])) {
                neighbors[i].previousNode = currNode;
                unvisitedNeighbors.push(neighbors[i]);
            }
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

function animateBfs(orderedVisitedNodes, orderedNodesOnShortestPath) {
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

export function visualizeBfs(grid, startRow, startCol, finishRow, finishCol) {
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const orderedVisitedNodes = bfs(grid, startNode, finishNode);
    const orderedNodesOnShortestPath = getShortestNodePath(finishNode);
    animateBfs(orderedVisitedNodes, orderedNodesOnShortestPath);
}