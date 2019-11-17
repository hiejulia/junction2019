import firebase from 'firebase/app';
import 'firebase/storage';

//Visit://https://firebase.google.com/docs/storage/web/upload-files

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDp39GRE9wHrz0HrWZ7dq1cVdCAVZsBgpA",
    authDomain: "junction2019-3aba1.firebaseapp.com",
    databaseURL: "https://junction2019-3aba1.firebaseio.com",
    projectId: "junction2019-3aba1",
    storageBucket: "junction2019-3aba1.appspot.com",
    messagingSenderId: "818050489104",
    appId: "1:818050489104:web:68dade0960f4fd993ae395",
    measurementId: "G-325SWH5K6J"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storageRef=firebase.storage().ref();

export {storageRef, firebase as default};
