import * as firebase from 'firebase'
let database;
export const init = () => {
  let config = {
    apiKey: "AIzaSyD1fF2lRhBTiaqFDXUFwrPRgNYwPXCPlXw",
    authDomain: "karnban-1000.firebaseapp.com",
    databaseURL: "https://karnban-1000.firebaseio.com",
    storageBucket: "karnban-1000.appspot.com",
    messagingSenderId: "508555896293"
  };
  firebase.initializeApp(config);
	database = firebase.database()
}

// retrieve from firebase
// return promise object
export const getSectionsDB = () => {
  return database.ref('/').once('value')
}
