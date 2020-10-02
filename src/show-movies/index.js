import React from 'react';
import PropTypes from 'prop-types';

import MoviesGrid from './movies-grid';
import FullScreenLoader from '../common/FullScreenLoader';

const ShowMovies = ({ isLoading, movies, openEditForm, refreshMovies, setEditMovieData, setIsLoading, style }) => (
    <>
        <FullScreenLoader showLoader={isLoading} />
        {style === 'grid' &&
            <MoviesGrid
                movies={movies}
                openEditForm={openEditForm}
                refreshMovies={refreshMovies}
                setEditMovieData={setEditMovieData}
                setIsLoading={setIsLoading}
            />
        }
    </>
);

ShowMovies.defaultProps = {
    style: 'grid'
};

ShowMovies.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    movies: PropTypes.instanceOf(Array).isRequired,
    openEditForm: PropTypes.func.isRequired,
    refreshMovies: PropTypes.func.isRequired,
    setEditMovieData: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    style: PropTypes.string
};

export default ShowMovies;
