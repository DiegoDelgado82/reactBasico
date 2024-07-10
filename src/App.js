// src/App.js
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from "./Auth";
import AddData from "./AddData";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <button variant="secondary" onClick={handleSignOut}>
            Cerrar Sesión
          </button>
          <AddData />
        </div>
      ) : (
        <Auth setUser={setUser} />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
