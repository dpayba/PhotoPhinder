import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDpGB4kDEp1TpbaPPEHiGPp29bkb_tGzr0",
    authDomain: "cs35l-app.firebaseapp.com",
    databaseURL: "https://cs35l-app-default-rtdb.firebaseio.com",
    projectId: "cs35l-app",
    storageBucket: "cs35l-app.appspot.com",
    messagingSenderId: "886124767738",
    appId: "1:886124767738:web:0854fa23fd3173dd381c43"
};

firebase.initializeApp(config);

const database = firebase.database();
const storage = firebase.storage();

export default database;

export { firebase, storage };

