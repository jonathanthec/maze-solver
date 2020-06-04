import React from 'react';
import MazeSolver from './components/MazeSolver.js';
import Modal from './modal/Modal';
import useModal from './modal/useModal';
import './components/styles/Modal.css';

const App = () => {
  const { isShowing, toggle } = useModal();

  return (
    <div>
      <MazeSolver
        toggle={toggle}
      />
      <Modal
        isShowing={isShowing}
        hide={toggle}
      />
    </div>
  );
};

export default App;
