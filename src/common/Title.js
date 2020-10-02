import React from 'react';
import PropTypes from 'prop-types';
import * as MaterialUI from '@material-ui/core';

const Heading = (props) => {
    const { title } = props;
    return (
        <MaterialUI.Grid item>
            <MaterialUI.Typography
                component="h4"
                variant="h4"
                {...props}
            >
                {title}
            </MaterialUI.Typography>
        </MaterialUI.Grid>
    );
};

Heading.propTypes = {
    title: PropTypes.string.isRequired
};

export default Heading;
