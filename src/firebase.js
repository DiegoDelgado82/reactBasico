// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Tu configuración de Firebase

const firebaseConfig = {
    apiKey: "AIzaSyAYdLlP7m-CK5MDnHGUOASJiDgDHiZPAs0",
    authDomain: "basico-539ad.firebaseapp.com",
    projectId: "basico-539ad",
    storageBucket: "basico-539ad.appspot.com",
    messagingSenderId: "883064890628",
    appId: "1:883064890628:web:d21fe38675cc9322bd1c51",
    measurementId: "G-2RL9VNLP4G"
  };



// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios de Firebase
export const db = getFirestore(app);
export const auth = getAuth(app);

// Añadir usuario inicial a Firestore
const initializeUser = async () => {
  const initialEmail = "example@mail.com";
  const initialUid = "USER_UID"; // reemplaza con el uid del usuario creado en Authentication

  await setDoc(doc(db, "users", initialUid), {
    email: initialEmail,
  });
};

// Llamar a la función para asegurarse de que el usuario esté en Firestore
initializeUser().catch(console.error);
