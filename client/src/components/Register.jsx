import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { HiUser, HiMail, HiLockClosed, HiPhotograph } from "react-icons/hi";

const Register = () => {
    return (
        <div className="min-h-screen bg-gradient-to-tr from-base-100 to-base-300 flex items-center justify-center p-6">
            <div className="max-w-lg w-full bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/40 p-10">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-black text-primary mb-2">Join Artify</h2>
                    <p className="text-gray-500">Start your creative journey with us today</p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="form-control md:col-span-2">
                        <label className="label font-bold py-1 text-xs uppercase tracking-widest text-gray-400">Full Name</label>
                        <div className="relative">
                            <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input type="text" placeholder="Tarif Zaman" className="input input-bordered w-full pl-10 rounded-xl" required />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="form-control md:col-span-2">
                        <label className="label font-bold py-1 text-xs uppercase tracking-widest text-gray-400">Email Address</label>
                        <div className="relative">
                            <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input type="email" placeholder="example@artify.com" className="input input-bordered w-full pl-10 rounded-xl" required />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="form-control md:col-span-2">
                        <label className="label font-bold py-1 text-xs uppercase tracking-widest text-gray-400">Set Password</label>
                        <div className="relative">
                            <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input type="password" placeholder="••••••••" className="input input-bordered w-full pl-10 rounded-xl" required />
                        </div>
                    </div>

                    <button className="btn btn-primary md:col-span-2 w-full mt-4 text-white rounded-xl shadow-lg border-none hover:scale-[1.02] transition-all">
                        Create Account
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or Sign Up With</span></div>
                </div>

                <button className="btn btn-outline w-full rounded-xl border-gray-300 hover:bg-gray-50 flex items-center gap-2 transition-all">
                    <FcGoogle className="text-2xl" /> Google Account
                </button>

                <p className="text-center mt-8 text-gray-500">
                    Already a member? 
                    <Link to="/login" className="text-primary font-extrabold ml-1 hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;