import React from 'react';
import PropTypes from 'prop-types';
import * as MaterialUI from '@material-ui/core';

import Modal from './Modal';
import Heading from './Heading';
import Space from './Space';

const ConfirmationModal = (props) => {
    const { cancelButtonTitle, close, okButtonTitle, onAccept, onReject, open, title } = props;

    return (
        <Modal close={close} open={open}>
            <Heading component="h5" title={title} variant="h5" />
            <Space size={50} />

            <MaterialUI.Grid container justify="space-evenly" >
                <MaterialUI.Button
                    color="primary"
                    onClick={onAccept}
                    variant="outlined"
                >
                    {okButtonTitle}
                </MaterialUI.Button>
                <MaterialUI.Button
                    color="secondary"
                    onClick={onReject}
                    variant="outlined"
                >
                    {cancelButtonTitle}
                </MaterialUI.Button>
            </MaterialUI.Grid>

        </Modal>
    );
};

ConfirmationModal.defaultProps = {
    cancelButtonTitle: 'Cancel',
    okButtonTitle: 'Yes',
    onReject: () => { },
    open: false,
    title: ''
};

ConfirmationModal.propTypes = {
    cancelButtonTitle: PropTypes.string,
    close: PropTypes.func.isRequired,
    okButtonTitle: PropTypes.string,
    onAccept: PropTypes.func.isRequired,
    onReject: PropTypes.func,
    open: PropTypes.bool,
    title: PropTypes.string
};

export default ConfirmationModal;
