import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import "./styles/ControlBar.css";

export const ControlBar = props => {
    const { resetGrid, algorithm, resetAlgorithm, visualizeAlgorithm } = props;
    const title = algorithm ? algorithm : "Select Algorithm";
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="control-bar-container">
            <Navbar.Brand href="https://jonathanthec.github.io/maze-solver/" className="control-bar-container-title">Pathfinding Visualizer</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title={title} id="collasible-nav-dropdown" className="control-bar-button" variant="outline-light">
                        <NavDropdown.Item onClick={() => resetAlgorithm('dijkstra')}>See Dijkstra's Algorithm</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => resetAlgorithm('dfs')}>See DFS Algorithm</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => resetAlgorithm('bfs')}>See BFS Algorithm</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link className="control-bar-button" onClick={() => visualizeAlgorithm()}>Start</Nav.Link>
                    <Nav.Link onClick={() => resetGrid()} className="control-bar-button">Reset Grid</Nav.Link>
                    <Nav.Link className="control-bar-button">Instructions</Nav.Link>
                    <Nav.Link className="control-bar-button" href="https://jonathanthec.github.io/gameoflife/" target="__blank">Game of Life</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}