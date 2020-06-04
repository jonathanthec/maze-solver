import React from 'react';
import ReactDOM from 'react-dom';
import ModalInfo from './ModalInfo';

const Modal = ({ isShowing, hide }) => {
    function handleOverlayClicked(e) {
        if (e.target.className !== 'modal-wrapper') {
            return;
        }
        hide();
    }

    return isShowing ? ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal-overlay" />
            <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog" onClick={e => handleOverlayClicked(e)} >
                <div className="modal-cover">
                    <div className="modal-header">
                        <h1>Instructions</h1>
                        <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <ModalInfo />
                </div>
            </div>
        </React.Fragment>, document.body
    ) : null
}

export default Modal;