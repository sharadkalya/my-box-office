import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as MaterialUI from '@material-ui/core';
import Space from '../common/Space';
import { getYears } from '../helper';
import { firestore } from '../firebase';
import FullScreenLoader from '../common/FullScreenLoader';
import Heading from '../common/Heading';
import ReleaseYear from './ReleaseYear';
import Modal from '../common/Modal';
import Genres from './Genres';
import Cast from './Cast';

const years = getYears();

const AddForm = (props) => {
    const { close, editMovieData, onAdd, open } = props;
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

    useEffect(() => {
        if (editMovieData) {
            setMovieName(editMovieData.name);
            setDescription(editMovieData.description);
            setGenres(editMovieData.genres);
            setWriter(editMovieData.writer);
            setDirector(editMovieData.director);
            setCast(editMovieData.cast);
            updateReleaseYear(editMovieData.releaseYear);
        }
    }, [editMovieData]);

    const resetForm = () => {
        setMovieName('');
        setDescription('');
        setGenres([]);
        setWriter('');
        setDirector('');
        setCast(['']);
        updateReleaseYear('');
        close();
    };

    const removeCast = (starIndex) => {
        if (cast.length === 1) return;
        cast.splice(starIndex, 1);

        setCast([...cast]);
    };

    const submit = async (e) => {
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

        setIsSubmitted(false);
        setIsLoading(true);

        const data = {
            cast: movieCast,
            description,
            director,
            genres,
            name,
            releaseYear,
            writer
        };

        try {
            if (editMovieData) {
                await firestore.collection("movies").doc(editMovieData.id).update(data);
            } else {
                await firestore.collection("movies").add(data);
            }
            setIsLoading(false);
        }
        catch {
            setIsLoading(false);
        }

        onAdd();
        resetForm();
        close();

    };

    return (
        <Modal close={close} open={open}>
            <MaterialUI.Container className="add-movie-form-wrap" maxWidth="md" xs={12}>
                <FullScreenLoader showLoader={isLoading} />
                <MaterialUI.Grid
                    alignItems="center"
                    className="add-movie-form-wrap-inner"
                    container
                    xs={12}
                >
                    <form
                        onSubmit={submit}
                    >
                        <Heading title="Add Movie" />
                        <Space />
                        <MaterialUI.TextField
                            error={isSubmitted && !name}
                            fullWidth
                            helperText={isSubmitted && !name ? 'Please enter movie name.' : ''}
                            label="Movie Name"
                            onChange={e => setMovieName(e.target.value)}
                            placeholder="Enter movie name"
                            value={name}
                            xs={12}
                        />
                        <Space size={30} />

                        <MaterialUI.Grid container spacing={3} xs={12}>
                            <ReleaseYear
                                isSubmitted={isSubmitted}
                                onChange={(e) => updateReleaseYear(e.target.value)}
                                releaseYear={releaseYear}
                                years={years}
                            />

                            <MaterialUI.Grid item md={6} xs={12}>
                                <MaterialUI.TextField
                                    error={isSubmitted && !director}
                                    fullWidth
                                    helperText={isSubmitted && !director ? 'Please enter director.' : ''}
                                    label="Director"
                                    onChange={e => setDirector(e.target.value)}
                                    placeholder="Enter Director name"
                                    value={director}
                                    xs={12}
                                />
                            </MaterialUI.Grid>

                            <MaterialUI.Grid item md={6} xs={12}>
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
                            <Genres
                                genres={genres}
                                genresList={genresList}
                                isSubmitted={isSubmitted}
                                onChange={(event, newValue) => {
                                    setGenres([
                                        ...newValue
                                    ]);
                                }}
                            />
                            <MaterialUI.Grid item md={6} xs={12}>
                                <MaterialUI.TextField
                                    error={isSubmitted && !description}
                                    fullWidth
                                    helperText={isSubmitted && !description ? 'Please enter description.' : ''}
                                    label="Movie Description"
                                    multiline
                                    onChange={e => setDescription(e.target.value)}
                                    placeholder="Add movie description"
                                    value={description}
                                />
                            </MaterialUI.Grid>
                            <Cast
                                cast={cast}
                                isCastEmpty={isCastEmpty}
                                isSubmitted={isSubmitted}
                                removeCast={removeCast}
                                setCast={setCast}
                            />
                        </MaterialUI.Grid>
                        <Space size={30} />

                        <MaterialUI.Grid container justify="space-evenly" xs={12}>
                            <MaterialUI.Button
                                color="primary"
                                type="submit"
                                variant="outlined"
                            >
                                {editMovieData ? 'Update Movie' : 'Add Movie'}
                            </MaterialUI.Button>
                            <MaterialUI.Button
                                color="secondary"
                                onClick={resetForm}
                                variant="outlined"
                                xs={12}
                            >
                                Cancel
                            </MaterialUI.Button>
                        </MaterialUI.Grid>
                    </form>
                </MaterialUI.Grid>
            </MaterialUI.Container>
        </Modal>
    );
};

AddForm.propTypes = {
    close: PropTypes.func.isRequired,
    editMovieData: PropTypes.objectOf(Object).isRequired,
    onAdd: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default AddForm;
