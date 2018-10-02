//firebase stuff
import Rebase from "re-base"; //used for mirroring from firebase to the application
import firebase from "firebase"; //actual firebase stuff

//create firebase app (provided on firebase website)
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAWg4FUhjJV-3b5Wfn_j3BkxI5i3A59fwY",
  authDomain: "catch-of-the-day-5836c.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-5836c.firebaseio.com"
});

//create rebase bindings
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
