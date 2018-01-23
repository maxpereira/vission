import firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyC9T__N_caP_HEANMHpDq9ckIOjw7ytDiQ",
  authDomain: "vission-io.firebaseapp.com",
  databaseURL: "https://vission-io.firebaseio.com",
  projectId: "vission-io",
  storageBucket: "vission-io.appspot.com",
  messagingSenderId: "309099591006"
};

var VissionApp = firebase.initializeApp(firebaseConfig);
export default VissionApp.database(); //this doesnt have to be database only