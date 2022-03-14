// import firebase from 'firebase'; //some reason this doesn't work
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7Jw0DIc8caS3hc8uexUw2bwxdEKum2ZU",
    authDomain: "imessage-clone-d374d.firebaseapp.com",
    projectId: "imessage-clone-d374d",
    storageBucket: "imessage-clone-d374d.appspot.com",
    messagingSenderId: "27048840487",
    appId: "1:27048840487:web:cb4fe0e55f100f2f1ead02",
    measurementId: "G-HFN4P28HJB"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;