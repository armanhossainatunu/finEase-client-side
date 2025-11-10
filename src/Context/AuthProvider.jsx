import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import auth from "../Firebase/Firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   user create
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //update user
  const updateUser = (updateInfo) => {
    return updateProfile(auth.currentUser, updateInfo);
  };

  //   user Sign in
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   Google Login
  const googleWithLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // logout
  const logOut = () => {
    setLoading(true);
    return auth.signOut();
  };
  // reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  // Track user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    updateUser,
    login,
    googleWithLogin,
    logOut,
    resetPassword,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
