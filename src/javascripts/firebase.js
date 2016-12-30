import * as firebase from 'firebase'
let database;
const EMAIL = 'taweesoft@gmail.com'
const PASS = 'todotest'

export const init = () => {
  let config = {
    apiKey: "AIzaSyD1fF2lRhBTiaqFDXUFwrPRgNYwPXCPlXw",
    authDomain: "karnban-1000.firebaseapp.com",
    databaseURL: "https://karnban-1000.firebaseio.com",
    storageBucket: "karnban-1000.appspot.com",
    messagingSenderId: "508555896293"
  };
  firebase.initializeApp(config);
  firebase.auth().signInWithEmailAndPassword(EMAIL, PASS)
    .then(message => {
      console.log('Signin successful');
    })
    .catch(function(error) {
      console.log('Signin failed');
      var errorCode = error.code;
      var errorMessage = error.message;
    });
	database = firebase.database()
}

// retrieve from firebase
// return promise object
export const getSectionsDB = () => {
  return database.ref('/').once('value')
}

export const getTodoDB = (id) => {
  // return a Promise while waiting for retreiving data and filtering the specified todo
  return new Promise((resolve, reject) => {
    database.ref('/').once('value').then((sections) => {
      sections = sections.val()
      resolve(sections.find( s => s.id === id) || {})
    })
  })
}

export const addSection = () => {
  return database.
}
