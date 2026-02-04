import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError("");

    createUser(email, password, name, "") // Photo URL খালি পাঠানো হচ্ছে
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Welcome to Artify!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Join Us</h2>
          <p className="text-gray-500">Create your account to start exploring</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" name="name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none transition" placeholder="John Doe" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" name="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none transition" placeholder="hello@example.com" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" name="password" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none transition" placeholder="••••••••" required />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition transform active:scale-95 shadow-lg">
            Create Account
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-600">
          Already a member? <Link to="/login" className="text-black font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;