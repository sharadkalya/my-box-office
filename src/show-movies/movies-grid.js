import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as MaterialUI from '@material-ui/core';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Space from '../common/Space';
import ConfirmationModal from '../common/ConfirmationModal';
import { firestore } from '../firebase';

const MoviesGrid = ({ movies, openEditForm, refreshMovies, setEditMovieData, setIsLoading }) => {
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [movieToBeDeleted, setMovieToBeDeleted] = useState(false);

    const onEdit = (movie) => {
        setEditMovieData(movie);
        openEditForm(true);
    };

    const onDelete = (movie) => {
        setMovieToBeDeleted(movie);
        setOpenConfirmation(true);
    };

    const onAccept = async () => {
        setOpenConfirmation(false);
        setIsLoading(true);
        try {
            await firestore.collection('movies').doc(movieToBeDeleted.id).delete();
            setIsLoading(false);
            refreshMovies();
        } catch {
            setIsLoading(false);
        }
    };

    return (
        <MaterialUI.Grid
            className="movies-grid"
            container
            justify="flex-start"
            spacing={5}
        >
            <ConfirmationModal
                onAccept={onAccept}
                onReject={() => setOpenConfirmation(false)}
                open={openConfirmation}
                title="Are you sure you want to delete?"
            />
            {movies.map(movie => (
                <MaterialUI.Grid
                    item
                    key={movie.id}
                    sm={6}
                >
                    <MaterialUI.Card
                        className="movies-grid-card"
                        elevation={3}
                        xs
                    >
                        <MaterialUI.CardHeader
                            action={
                                <>
                                    <MaterialUI.IconButton aria-label="settings">
                                        <EditSharpIcon
                                            className="primary-color"
                                            onClick={() => onEdit(movie)}
                                        />
                                    </MaterialUI.IconButton>
                                    <MaterialUI.IconButton aria-label="settings">
                                        <DeleteForeverIcon
                                            className="primary-color"
                                            onClick={() => onDelete(movie)}
                                        />
                                    </MaterialUI.IconButton>
                                </>
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
    refreshMovies: PropTypes.func.isRequired,
    setEditMovieData: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired
};

export default MoviesGrid;
