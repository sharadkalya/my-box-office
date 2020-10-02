import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as MaterialUI from '@material-ui/core';
import Space from '../common/Space';
import AddForm from './AddForm';

const AddMovie = ({ onAdd }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Space />
            <MaterialUI.Button
                color="primary"
                onClick={() => setIsOpen(true)}
            >
                Add Movie
            </MaterialUI.Button>
            <AddForm
                close={() => setIsOpen(false)}
                onAdd={onAdd}
                open={isOpen}
            />
            <Space />
        </>
    );
};

AddMovie.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default AddMovie;