import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { FcGoogle } from "react-icons/fc"; // Google আইকন
import Swal from "sweetalert2";

const Register = () => {
  // আপনার AuthContext থেকে googleLogin এবং createUser নেওয়া হয়েছে
  const { createUser, googleLogin } = useContext(AuthContext); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ইমেইল-পাসওয়ার্ড দিয়ে রেজিস্টার
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError("");

    createUser(email, password, name, "")
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Welcome to Artify!",
          text: "Account created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // গুগল দিয়ে রেজিস্টার (Login পেজের মতো সেম ফাংশন)
  const handleGoogleRegister = () => {
    googleLogin()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Log in with Google completed.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        setError("Google registration failed. Try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50/50 px-4 py-10">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-blue-50">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Join Artify</h2>
          <p className="text-gray-500 font-medium">Create an account to unlock the gallery</p>
        </div>

        {/* Google Registration Button */}
        <button 
          onClick={handleGoogleRegister} 
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all mb-6 font-bold text-gray-700 shadow-sm"
        >
          <FcGoogle size={24} /> Continue with Google
        </button>

        <div className="flex items-center gap-4 mb-6 text-gray-300">
          <hr className="flex-grow border-gray-100" /> 
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">OR</span> 
          <hr className="flex-grow border-gray-100" />
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Full Name</label>
            <input 
              type="text" 
              name="name" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
              placeholder="Your Name" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
              placeholder="Email" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Password</label>
            <input 
              type="password" 
              name="password" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
              placeholder="••••••••" 
              required 
            />
            {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
          </div>

          <button className="btn btn-primary w-full py-3 rounded-xl font-black text-lg shadow-lg hover:scale-[1.02] transition-transform">
            Create Account
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-600 font-medium">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;