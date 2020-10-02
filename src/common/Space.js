import React from 'react';

const Space = (props) => (
    <div
        {...props}
        style={{ marginBottom: props.size ? props.size : 10 }}
    />
);

export default Space;
