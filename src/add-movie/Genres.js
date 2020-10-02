import React from 'react';
import PropTypes from 'prop-types';
import * as MaterialUI from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Genres = (props) => {
    const { genres, genresList, isSubmitted, onChange } = props;

    return (
        <MaterialUI.Grid
            item
            md={6}
            xs={12}
        >
            <Autocomplete
                getOptionLabel={(option) => option}
                multiple
                onChange={onChange}
                options={genresList}
                renderInput={(params) => (
                    <MaterialUI.TextField
                        {...params}
                        error={isSubmitted && !genres.length}
                        helperText={isSubmitted && !genres.length ? 'Please enter genre.' : ''}
                        label="Genres"
                        placeholder="Add Genre"
                    />
                )}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                        <MaterialUI.Chip
                            label={option}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                value={genres}
            />

        </MaterialUI.Grid>

    );
};

Genres.propTypes = {
    genres: PropTypes.instanceOf(Array).isRequired,
    genresList: PropTypes.instanceOf(Array).isRequired,
    isSubmitted: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Genres;
