import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { HiMail, HiLockClosed } from "react-icons/hi";

const Login = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-300 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-primary mb-2">Welcome Back</h2>
                    <p className="text-gray-500">Enter your details to access your account</p>
                </div>

                <form className="space-y-6">
                    {/* Email Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Email Address</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <HiMail className="h-5 w-5" />
                            </span>
                            <input 
                                type="email" 
                                placeholder="name@example.com" 
                                className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary/50 transition-all" 
                                required 
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="form-control">
                        <div className="flex justify-between">
                            <label className="label">
                                <span className="label-text font-bold">Password</span>
                            </label>
                        </div>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <HiLockClosed className="h-5 w-5" />
                            </span>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary/50 transition-all" 
                                required 
                            />
                        </div>
                    </div>

                    <button className="btn btn-primary w-full text-white text-lg rounded-xl shadow-lg hover:shadow-primary/30 transition-all border-none">
                        Sign In
                    </button>
                </form>

                <div className="divider my-8 text-gray-400 text-sm">OR CONTINUE WITH</div>

                <button className="btn btn-outline w-full border-gray-300 hover:bg-gray-50 hover:text-gray-900 rounded-xl flex items-center gap-3">
                    <FcGoogle className="text-2xl" /> Google Account
                </button>

                <p className="text-center mt-8 text-gray-600">
                    Don't have an account? 
                    <Link to="/register" className="text-primary font-bold ml-2 hover:underline">Create One</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;