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
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => setError("Invalid credentials. Try again."));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <button onClick={googleLogin} className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition mb-6 font-medium">
          <FcGoogle size={24} /> Continue with Google
        </button>

        <div className="flex items-center gap-4 mb-6 text-gray-400">
          <hr className="flex-grow border-gray-200" /> <span>OR</span> <hr className="flex-grow border-gray-200" />
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <input type="email" name="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none transition" placeholder="Email" required />
          <input type="password" name="password" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none transition" placeholder="Password" required />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          
          <button className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg">
            Login
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-600">
          New here? <Link to="/register" className="text-black font-bold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;