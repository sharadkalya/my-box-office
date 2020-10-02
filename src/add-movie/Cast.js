import React from 'react';
import PropTypes from 'prop-types';

import * as MaterialUI from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';

const Cast = (props) => {
    const { cast, isCastEmpty, isSubmitted, removeCast, setCast } = props;
    return (
        <MaterialUI.Grid
            item
            md={6}
        >
            <MaterialUI.Grid container>
                {cast.map((star, starIndex) => (
                    <>
                        <MaterialUI.Grid item key={starIndex} md={9}>
                            <MaterialUI.TextField
                                error={isSubmitted && isCastEmpty}
                                fullWidth
                                helperText={isSubmitted && isCastEmpty ? 'Please enter cast.' : ''}
                                label="Cast"
                                onChange={e => {
                                    cast[starIndex] = e.target.value;
                                    setCast([...cast]);
                                }}
                                placeholder="Enter cast"
                                value={star}
                            />
                        </MaterialUI.Grid>
                        <MaterialUI.Grid className="add-new-cast" item md={3}>
                            <AddCircleOutline className="add" onClick={() => setCast([...cast, ''])} />
                            <RemoveCircleOutline className="remove" onClick={() => removeCast(starIndex)} />
                        </MaterialUI.Grid>
                    </>
                ))}
            </MaterialUI.Grid>
        </MaterialUI.Grid>

    );
};

Cast.propTypes = {
    cast: PropTypes.instanceOf(Array).isRequired,
    isCastEmpty: PropTypes.bool.isRequired,
    isSubmitted: PropTypes.bool.isRequired,
    removeCast: PropTypes.func.isRequired,
    setCast: PropTypes.func.isRequired
};

export default Cast;
