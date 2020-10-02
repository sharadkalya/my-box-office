import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as MaterialUI from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Space from '../common/Space';
import { getYears } from '../helper';
import { firestore } from '../firebase';
import FullScreenLoader from '../common/FullScreenLoader';

const years = getYears();

const AddForm = (props) => {
    const { close, onAdd, open } = props;
    const [name, setMovieName] = useState('');
    const [description, setDescription] = useState('');
    const [director, setDirector] = useState('');
    const [writer, setWriter] = useState('');
    const [releaseYear, updateReleaseYear] = useState('');
    const [cast, setCast] = useState(['']);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [genres, setGenres] = React.useState([]);
    const isCastEmpty = !cast.some(star => star.length);
    const [genresList, setGenresList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        firestore.collection('genres').get().then((snapshot) => {
            setIsLoading(false);
            snapshot.docs.forEach(doc => {
                const items = doc.data();

                if (items.data && items.data.length) {
                    setGenresList(items.data);
                }
            });
        })
            .catch(() => {
                setIsLoading(false);
            });
    }, []);

    const removeCast = (starIndex) => {
        if (cast.length === 1) return;
        cast.splice(starIndex, 1);

        setCast([...cast]);
    };

    const submit = (e) => {
        e.preventDefault();

        setIsSubmitted(true);

        const areFieldsEmpty = [
            !name,
            !description,
            !writer,
            isCastEmpty,
            !director,
            !genres.length,
            !releaseYear
        ].some(isEmpty => isEmpty);

        if (areFieldsEmpty) return;

        const movieCast = cast.filter(star => star.length > 0);
        setIsLoading(true);

        firestore.collection("movies").add({
            cast: movieCast,
            description,
            director,
            genres,
            name,
            releaseYear,
            writer
        })
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });

        onAdd();
        close();
    };

    return (
        <MaterialUI.Modal
            BackdropComponent={MaterialUI.Backdrop}
            BackdropProps={{
                timeout: 500
            }}
            aria-describedby="transition-modal-description"
            aria-labelledby="transition-modal-title"
            className="add-movie-form"
            closeAfterTransition
            onClose={close}
            open={open}
        >
            <MaterialUI.Fade in={open}>
                <MaterialUI.Container
                    className="add-movie-form-wrap"
                    maxWidth="md"
                >
                    <FullScreenLoader showLoader={isLoading} />
                    <MaterialUI.Grid
                        alignItems="center"
                        className="add-movie-form-wrap-inner"
                        container
                    >
                        <form
                            onSubmit={submit}
                        >
                            <MaterialUI.Grid item>
                                <MaterialUI.Typography
                                    component="h4"
                                    variant="h4"
                                >
                                    Add Movie
                                </MaterialUI.Typography>
                                <Space />
                            </MaterialUI.Grid>
                            <MaterialUI.Grid container>
                                <MaterialUI.TextField
                                    error={isSubmitted && !name}
                                    fullWidth
                                    helperText={isSubmitted && !name ? 'Please enter movie name.' : ''}
                                    label="Movie Name"
                                    onChange={e => setMovieName(e.target.value)}
                                    placeholder="Enter movie name"
                                    value={name}
                                />
                            </MaterialUI.Grid>
                            <Space size={30} />

                            <MaterialUI.Grid
                                container
                                spacing={3}
                            >
                                <MaterialUI.Grid
                                    item
                                    md={6}
                                >
                                    <MaterialUI.FormControl fullWidth>
                                        <MaterialUI.InputLabel>Release Year</MaterialUI.InputLabel>
                                        <MaterialUI.Select
                                            fullWidth
                                            onChange={(e) => updateReleaseYear(e.target.value)}
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

                                <MaterialUI.Grid
                                    item
                                    md={6}
                                >
                                    <MaterialUI.TextField
                                        error={isSubmitted && !director}
                                        fullWidth
                                        helperText={isSubmitted && !director ? 'Please enter director.' : ''}
                                        label="Director"
                                        onChange={e => setDirector(e.target.value)}
                                        placeholder="Enter Director name"
                                        value={director}
                                    />
                                </MaterialUI.Grid>

                                <MaterialUI.Grid
                                    item
                                    md={6}
                                >
                                    <MaterialUI.TextField
                                        error={isSubmitted && !writer}
                                        fullWidth
                                        helperText={isSubmitted && !writer ? 'Please enter writer.' : ''}
                                        label="Writer"
                                        onChange={e => setWriter(e.target.value)}
                                        placeholder="Enter writer name"
                                        value={writer}
                                    />
                                </MaterialUI.Grid>
                                <MaterialUI.Grid
                                    item
                                    md={6}
                                >
                                    <Autocomplete
                                        getOptionLabel={(option) => option}
                                        multiple
                                        onChange={(event, newValue) => {
                                            setGenres([
                                                ...newValue
                                            ]);
                                        }}
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
                                <MaterialUI.Grid
                                    item
                                    md={6}
                                >
                                    <MaterialUI.TextField
                                        error={isSubmitted && !description}
                                        fullWidth
                                        helperText={isSubmitted && !description ? 'Please enter description.' : ''}
                                        label="Movie Description"
                                        multiline
                                        onChange={e => setDescription(e.target.value)}
                                        placeholder="Add movie description"

                                    />
                                </MaterialUI.Grid>
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
                                                        helperText={isSubmitted && !writer ? 'Please enter cast.' : ''}
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
                            </MaterialUI.Grid>
                            <Space size={30} />

                            <MaterialUI.Grid
                                container
                                justify="space-evenly"
                            >
                                <MaterialUI.Button
                                    color="primary"
                                    type="submit"
                                    variant="outlined"
                                >
                                    Add Movie
                                </MaterialUI.Button>
                                <MaterialUI.Button
                                    color="secondary"
                                    onClick={close}
                                    variant="outlined"
                                >
                                    Cancel
                                </MaterialUI.Button>
                            </MaterialUI.Grid>
                        </form>
                    </MaterialUI.Grid>
                </MaterialUI.Container>
            </MaterialUI.Fade>
        </MaterialUI.Modal >
    );
};

AddForm.propTypes = {
    close: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    open: PropTypes.objectOf(Object).isRequired
};

export default AddForm;
