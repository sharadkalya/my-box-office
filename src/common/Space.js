import React from 'react';
import PropTypes from 'prop-types';

const Space = (props) => {
    const { size } = props;
    return (
        <div
            {...props}
            style={{ marginBottom: size }}
        />

    );
};

Space.defaultProps = {
    size: 10
};

Space.propTypes = {
    size: PropTypes.number
};

export default Space;
