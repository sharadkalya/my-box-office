import React from 'react';
import PropTypes from 'prop-types';

import * as MaterialUI from '@material-ui/core';

const Modal = (props) => {
    const { children, close, open } = props;
    return (
        <MaterialUI.Modal
            BackdropComponent={MaterialUI.Backdrop}
            BackdropProps={{
                timeout: 500
            }}
            aria-describedby="transition-modal-description"
            aria-labelledby="transition-modal-title"
            className="movie-modal"
            closeAfterTransition
            onClose={close}
            open={open}
        >
            <MaterialUI.Fade in={open}>
                {children}
            </MaterialUI.Fade>
        </MaterialUI.Modal >
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    close: PropTypes.func.isRequired,
    open: PropTypes.objectOf(Object).isRequired
};

export default Modal;
