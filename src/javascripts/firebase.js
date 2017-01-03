import * as firebase from 'firebase'
let database;
const EMAIL = 'taweesoft@gmail.com'
const PASS = 'todotest'
import sectionModel from './models/section'
import todoModel from './models/todo'
import {loadSections} from 'actions/todo'
import _ from 'lodash'
import {validateSections} from 'reducers/todo'

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
      sections = validateSections(sections.val())
      resolve(sections.find((section) => (id === section.id)) || {})
    })
  })
}

export const addSection = (name) => {
  let key = database.ref('/').push().key
  let model = sectionModel(key, name, firebase.database.ServerValue.TIMESTAMP)
  return database.ref('/'+ key).set(model)
}

export const addTodoItem = (id, name) => {
  return new Promise((resolve, reject) => {
    database.ref(`/${id}`).once('value').then((todo) => {
      let todos = todo.val().todos || []
      let key = database.ref(`/${id}`).push().key
      todos.push(todoModel(key, name, firebase.database.ServerValue.TIMESTAMP))
      database.ref(`/${id}/todos`).set(todos)
        .then( res => {resolve(res)})
        .catch( error => {reject(error)})
    })
  })
}

export const listening = (store) => {
  database.ref('/').on('value', (snapshot) => {
    store.dispatch(loadSections())
  })
}
