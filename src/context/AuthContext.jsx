import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; // Import from your firebase.js config
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

// 1. Create the context
export const AuthContext = createContext();

// 2. Create a custom hook for easy access
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Create the Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // To check if auth state is loaded

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  // This effect runs once on mount to check the user's auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false); // Auth state has been confirmed
    });

    return unsubscribe; // Cleanup the listener when the component unmounts
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  // We don't render the app until the auth state has been checked
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};