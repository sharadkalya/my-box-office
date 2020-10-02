import React from 'react';
import PropTypes from 'prop-types';
import * as MaterialUI from '@material-ui/core';

const FullScreenLoader = ({ showLoader }) => (
    <MaterialUI.Backdrop open={showLoader} style={{ zIndex: 999 }}>
        <MaterialUI.CircularProgress color="inherit" />
    </MaterialUI.Backdrop>
);

FullScreenLoader.defaultProps = {
    showLoader: false
};

FullScreenLoader.propTypes = {
    showLoader: PropTypes.bool
};

export default FullScreenLoader;
