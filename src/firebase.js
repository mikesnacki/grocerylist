import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: "https://grocery-list-dc685.firebaseio.com",
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

firebase.initializeApp(config)

var base = firebase.database();
export default base;