import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // লোডিং অবস্থায় থাকলে রিডাইরেক্ট করবে না, বরং অপেক্ষা করবে
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-black"></span>
            </div>
        );
    }

    if (user) {
        return children;
    }

    // ইউজার না থাকলে লগইন পেজে পাঠাবে এবং বর্তমান লোকেশন সেভ রাখবে
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;