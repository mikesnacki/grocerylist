import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyAeuIU8lyIRbd_iAeb3Ge9XASV1kXcIlFY",
    authDomain: "grocery-list-dc685.firebaseapp.com",
    databaseURL: "https://grocery-list-dc685.firebaseio.com",
    projectId: "grocery-list-dc685",
    storageBucket: "grocery-list-dc685.appspot.com",
    messagingSenderId: "407470376589",
    appId: "1:407470376589:web:103b5c2312bb03ed"
};

firebase.initializeApp(config)

var base = firebase.database();
export default base;