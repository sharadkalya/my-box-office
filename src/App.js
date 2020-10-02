import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';

import ShowMovies from './show-movies';
import AddMovie from './add-movie';
import { firestore } from './firebase';
import './app.css';

const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState([]);

    const refreshMovies = () => {
        setIsLoading(true);
        firestore.collection('movies').get().then((snapshot) => {
            setIsLoading(false);
            const moviesArr = [];

            snapshot.docs.forEach(doc => {
                const items = doc.data();

                moviesArr.push(items);
            });
            setMovies([...moviesArr]);
        })
            .catch(() => {
                setIsLoading(false);
            });

    };

    useEffect(() => {
        refreshMovies();
    }, []);

    return (
        <Container maxWidth='md'>
            <AddMovie
                onAdd={refreshMovies}
            />
            <ShowMovies
                isLoading={isLoading}
                movies={movies}
            />
        </Container>
    );
};

export default App;
