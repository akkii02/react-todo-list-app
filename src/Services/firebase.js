import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: process.env.API_ID,
  authDomain: "todolist-7dd85.firebaseapp.com",
  databaseURL: "https://todolist-7dd85-default-rtdb.firebaseio.com/",
  projectId: "todolist-7dd85",
  storageBucket: "todolist-7dd85.appspot.com",
  messagingSenderId: "399135394277",
  appId: "1:399135394277:web:8f8c9bc6c02586845f070c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app}