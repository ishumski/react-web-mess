import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBvwljdLcyWmaQhSpTMkmbxEYL-ZxGl9gQ",
  authDomain: "react-mess-9bb4d.firebaseapp.com",
  projectId: "react-mess-9bb4d",
  storageBucket: "react-mess-9bb4d.appspot.com",
  messagingSenderId: "446416106446",
  appId: "1:446416106446:web:72a2218fa36dbc793f319f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;