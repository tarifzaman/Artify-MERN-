import React, { useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    GoogleAuthProvider 
} from "firebase/auth";
import { auth } from '../firebase/firebase.config';
import { AuthContext } from './AuthContext'; // আগের ফাইল থেকে ইম্পোর্ট

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ১. নতুন ইউজার রেজিস্ট্রেশন
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // ২. ইমেইল-পাসওয়ার্ড দিয়ে লগইন
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // ৩. গুগল দিয়ে লগইন
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // ৪. লগআউট
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // ৫. ইউজারের বর্তমান অবস্থা পর্যবেক্ষণ করা
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("Firebase Auth State Changed:", currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleLogin,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;