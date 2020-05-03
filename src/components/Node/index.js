import React from 'react';
import './node.css';

export const Node = props => {
    const { isStart, isFinish } = props;
    const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : '';

    return (
        <div className={`node ${extraClassName}`}>
        </div>
    )
}

export const DEFAULT_NODE = {
    row: 0,
    col: 0
}