import * as firebase from 'firebase';

console.log('process.env.REACT_APP_API_KEY', process.env.REACT_APP_API_KEY);

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    appId: process.env.REACT_APP_APP_ID,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firebase, firestore };
