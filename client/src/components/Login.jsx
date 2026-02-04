import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // ইউজার যদি কোনো পেজ থেকে রিডাইরেক্ট হয়ে এখানে আসে তবে সেখানে যাবে, নাহলে সরাসরি হোমে যাবে
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError("");

    loginUser(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged in successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        // navigate("/") অথবা from ব্যবহার করতে পারেন
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        setError("Invalid credentials. Try again.");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Google Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        setError("Google Login failed.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50/30 px-4">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-blue-50">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500 font-medium italic">Sign in to your account</p>
        </div>

        {/* গুগল লগইন বাটন */}
        <button 
          onClick={handleGoogleLogin} 
          className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl hover:bg-blue-50 transition-all mb-6 font-bold text-gray-700 shadow-sm active:scale-95"
        >
          <FcGoogle size={24} /> Continue with Google
        </button>

        <div className="flex items-center gap-4 mb-6 text-gray-300">
          <hr className="flex-grow border-gray-100" /> 
          <span className="text-xs font-bold text-gray-400">OR</span> 
          <hr className="flex-grow border-gray-100" />
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <input 
              type="email" 
              name="email" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
              placeholder="Email" 
              required 
            />
          </div>
          <div>
            <input 
              type="password" 
              name="password" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
              placeholder="Password" 
              required 
            />
            {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
          </div>
          
          {/* btn-primary কালার */}
          <button className="btn btn-primary w-full py-3 rounded-xl font-black text-lg shadow-lg shadow-blue-200 hover:scale-[1.02] transition-transform">
            Login
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-600 font-medium">
          New here? <Link to="/register" className="text-primary font-bold hover:underline">Sign up now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;