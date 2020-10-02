import React from 'react';
import PropTypes from 'prop-types';

import * as MaterialUI from '@material-ui/core';
import Space from '../common/Space';
import AddForm from './AddForm';

const AddMovie = ({ editMovieData, isOpen, onAdd, setIsOpen }) => {
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
                editMovieData={editMovieData}
                onAdd={onAdd}
                open={isOpen}
            />
            <Space />
        </>
    );
};

AddMovie.propTypes = {
    editMovieData: PropTypes.objectOf(Object).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired,
    setIsOpen: PropTypes.func.isRequired
};

export default AddMovie;