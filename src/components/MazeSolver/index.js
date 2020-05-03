import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Node } from '../Node';

const MazeSolver = () => {
    const [map, setMap] = useState([]);
    const [numRows] = useState(20);
    const [numCols] = useState(50);

    useEffect(() => {
        const matrix = [];
        for (let row = 0; row < numRows; row++) {
            const currentRow = [];
            for (let col = 0; col < numCols; col++) {
                const currentNode = {
                    row,
                    col,
                    isStart: row === 10 && col === 5,
                    isFinish: row === 10 && col === 45,
                };
                currentRow.push(currentNode);
            }
            matrix.push(currentRow);
        }
        setMap(matrix);
    }, [numRows, numCols])

    return (
        <GridContainer>
            {map.map((row, rowIdx) => {
                return (
                    <MapContainer key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            const { isStart, isFinish } = node;
                            return (
                                <Node
                                    key={nodeIdx}
                                    isStart={isStart}
                                    isFinish={isFinish}
                                />
                            )
                        })}
                    </MapContainer>
                )
            })}
        </GridContainer>
    )
}

export default MazeSolver;

const GridContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const MapContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;