import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9N9Jk1nh9WIdzUc8WXcfkPuOUNwtcdfM",
  authDomain: "test-pj-ae8fe.firebaseapp.com",
  projectId: "test-pj-ae8fe",
  storageBucket: "test-pj-ae8fe.appspot.com",
  messagingSenderId: "895459721093",
  appId: "1:895459721093:web:de438ff71a6c03a5b40eec",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
