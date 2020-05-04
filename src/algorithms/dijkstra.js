// Dijkstra's algorithm will return all nodes that are visited
// Order of visiting is top, right, bottom, left
// All nodes point to their previous node, giving us the shortest path

export function dijkstra(grid, startNode, finishNode) {
    // Keep track of a list of nodes that I have visited in order
    const nodesVisitedInOrder = [];
    // The distance to startNode from startNode is 0
    startNode.distance = 0;
    // Get all unvisited nodes in the grid
    const unvisitedNodes = getAllNodes(grid);
    // Now, as long as we still have unvisited nodes in the above list
    while (unvisitedNodes.length) {

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