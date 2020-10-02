import React from 'react';
import PropTypes from 'prop-types';
import * as MaterialUI from '@material-ui/core';

const ReleaseYear = (props) => {
    const { isSubmitted, onChange, releaseYear, years } = props;
    return (
        <>
            <MaterialUI.Grid
                item
                md={6}
            >
                <MaterialUI.FormControl fullWidth>
                    <MaterialUI.InputLabel>Release Year</MaterialUI.InputLabel>
                    <MaterialUI.Select
                        fullWidth
                        onChange={onChange}
                        value={releaseYear}
                    >
                        <MaterialUI.MenuItem value="">
                            <em>None</em>
                        </MaterialUI.MenuItem>
                        {years.map(year => (
                            <MaterialUI.MenuItem
                                key={year}
                                value={year}
                            >
                                {year}
                            </MaterialUI.MenuItem>
                        ))}
                    </MaterialUI.Select>
                    {isSubmitted && !releaseYear && (<MaterialUI.FormHelperText error>Please enter release year</MaterialUI.FormHelperText>)}
                </MaterialUI.FormControl>
            </MaterialUI.Grid>

        </>
    );
};

ReleaseYear.propTypes = {
    isSubmitted: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    releaseYear: PropTypes.string.isRequired,
    years: PropTypes.instanceOf(Array).isRequired
};

export default ReleaseYear;
