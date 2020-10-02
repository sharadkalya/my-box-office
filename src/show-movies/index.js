import React from 'react';
import PropTypes from 'prop-types';

import MoviesGrid from './movies-grid';
import FullScreenLoader from '../common/FullScreenLoader';

const ShowMovies = ({ isLoading, movies, style }) => (
    <>
        <FullScreenLoader showLoader={isLoading} />
        {style === 'grid' && <MoviesGrid movies={movies} />}
    </>
);

ShowMovies.defaultProps = {
    style: 'grid'
};

ShowMovies.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    movies: PropTypes.instanceOf(Array).isRequired,
    style: PropTypes.string
};

export default ShowMovies;
