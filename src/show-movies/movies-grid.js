import React from 'react';
import PropTypes from 'prop-types';

import * as MaterialUI from '@material-ui/core';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Space from '../common/Space';

const MoviesGrid = ({ movies, openEditForm, setEditMovieData }) => {
    const onEdit = (movie) => {
        setEditMovieData(movie);
        openEditForm(true);
    };

    return (
        <MaterialUI.Grid
            className="movies-grid"
            container
            justify="flex-start"
            spacing={5}
        >
            {movies.map(movie => (
                <MaterialUI.Grid
                    item
                    key={movie.id}
                    sm={4}
                >
                    <MaterialUI.Card
                        className="movies-grid-card"
                        elevation={3}
                        xs
                    >
                        <MaterialUI.CardHeader
                            action={
                                <MaterialUI.IconButton aria-label="settings">
                                    <EditSharpIcon
                                        className="primary-color"
                                        onClick={() => onEdit(movie)}
                                    />
                                </MaterialUI.IconButton>
                            }
                            avatar={
                                <MaterialUI.Avatar aria-label="movie">
                                    {movie.name.charAt(0)}
                                </MaterialUI.Avatar>
                            }
                            subheader={`Release ${movie.releaseYear}`}
                            title={movie.name}
                        />
                        <MaterialUI.CardMedia
                            image="/static/images/cards/paella.jpg"
                            title="Paella dish"
                        />
                        <MaterialUI.CardContent>
                            <MaterialUI.Typography
                                color="textSecondary"
                                component="p"
                                variant="body2"
                            >
                                {movie.description}
                            </MaterialUI.Typography>
                            <Space />
                            <MaterialUI.Divider variant="middle" />
                            <Space />
                            <MaterialUI.Typography
                                className="genre-title"
                                component="span"
                                variant="subtitle2"
                            >
                                {`Genre: `}
                            </MaterialUI.Typography>
                            <MaterialUI.Typography
                                className="genre"
                                color="textSecondary"
                                component="span"
                                variant="body2"
                            >
                                {movie.genres.join(', ')}
                            </MaterialUI.Typography>
                            <Space />
                            <MaterialUI.Typography
                                className="genre-title"
                                component="span"
                                variant="subtitle2"
                            >
                                {`Cast: `}
                            </MaterialUI.Typography>
                            <MaterialUI.Typography
                                className="genre"
                                color="textSecondary"
                                component="span"
                                variant="body2"
                            >
                                {movie.cast.join(', ')}
                            </MaterialUI.Typography>
                            <Space />
                            <MaterialUI.Typography
                                className="genre-title"
                                component="span"
                                variant="subtitle2"
                            >
                                {`Director: `}
                            </MaterialUI.Typography>
                            <MaterialUI.Typography
                                className="genre"
                                color="textSecondary"
                                component="span"
                                variant="body2"
                            >
                                {movie.director}
                            </MaterialUI.Typography>
                            <Space />
                            <MaterialUI.Typography
                                className="genre-title"
                                component="span"
                                variant="subtitle2"
                            >
                                {`Writer: `}
                            </MaterialUI.Typography>
                            <MaterialUI.Typography
                                className="genre"
                                color="textSecondary"
                                component="span"
                                variant="body2"
                            >
                                {movie.writer}
                            </MaterialUI.Typography>
                        </MaterialUI.CardContent>

                    </MaterialUI.Card>
                </MaterialUI.Grid>
            ))}
        </MaterialUI.Grid>
    );
};

MoviesGrid.propTypes = {
    movies: PropTypes.instanceOf(Array).isRequired,
    openEditForm: PropTypes.func.isRequired,
    setEditMovieData: PropTypes.func.isRequired
};

export default MoviesGrid;
