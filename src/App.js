import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';

import ShowMovies from './show-movies';
import AddMovie from './add-movie';
import { firestore } from './firebase';
import './app.css';

const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editMovieData, setEditMovieData] = useState(null);
    const [movies, setMovies] = useState([]);

    const refreshMovies = () => {
        setIsLoading(true);
        firestore.collection('movies').get().then((snapshot) => {
            setIsLoading(false);
            const moviesArr = snapshot.docs.map(doc => {
                const items = doc.data();
                return { ...items, id: doc.id };
            });
            setMovies(moviesArr);
        })
            .catch(() => {
                setIsLoading(false);
            });
    };

    const onFormOpenCLose = (closeForm) => {
        if (!closeForm) {
            setEditMovieData(null);
        }
        setIsOpen(closeForm);
    };

    useEffect(() => {
        refreshMovies();
    }, []);

    return (
        <Container maxWidth='md'>
            <AddMovie
                editMovieData={editMovieData}
                isOpen={isOpen}
                onAdd={refreshMovies}
                setIsOpen={onFormOpenCLose}
            />
            <ShowMovies
                isLoading={isLoading}
                movies={movies}
                openEditForm={setIsOpen}
                setEditMovieData={setEditMovieData}
            />
        </Container>
    );
};

export default App;
