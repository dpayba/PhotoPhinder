import firebase from "firebase/app";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyB-zewzDh7d0GUXtWR2sbeSM07wlWHhpH4",
    authDomain: "test-upload-images-e6c4e.firebaseapp.com",
    projectId: "test-upload-images-e6c4e",
    storageBucket: "test-upload-images-e6c4e.appspot.com",
    messagingSenderId: "847303088942",
    appId: "1:847303088942:web:ef61b97985569d994a38bf"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export { storage, firebase as default };
