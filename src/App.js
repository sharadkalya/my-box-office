import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';

import { firestore } from './firebase';

function App() {
    const [movie, setMovie] = useState('');

    const saveMovie = () => {
        firestore.collection('movies').get().then((snapshot) => {

            snapshot.docs.forEach(doc => {
                let items = doc.data();

                /* Make data suitable for rendering */
                items = JSON.stringify(items);
                console.log('items', items);

            });
        });
    };

    return (
        <>
            <Grid>
                <TextField
                    id="outlined-basic"
                    label="Movie Name"
                    onChange={(e) => setMovie(e.target.value)}
                    value={movie}
                    variant="outlined"
                />
            </Grid>
            <Grid>
                <Button
                    color="primary"
                    onClick={saveMovie}
                    variant="contained"
                >
                    Submit
                </Button>
            </Grid>
        </>

    );
}

export default App;
