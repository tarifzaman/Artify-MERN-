import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImg from "../assets/palette.png";
import { AuthContext } from "../providers/AuthContext";
import Swal from "sweetalert2"; // Swal ইম্পোর্ট করা হয়েছে

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- আপডেট করা লগআউট হ্যান্ডলার (Confirmation সহ) ---
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out of Artify?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6", // Primary Blue
      cancelButtonColor: "#ef4444", // Red
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      borderRadius: "20px",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            // সাকসেস মেসেজ
            Swal.fire({
              icon: "success",
              title: "Logged Out!",
              text: "You have been successfully logged out.",
              showConfirmButton: false,
              timer: 1500,
              borderRadius: "20px",
            });
            navigate("/"); // হোমপেজে রিডাইরেক্ট
          })
          .catch((error) => console.error("Logout Error:", error));
      }
    });
  };

  // নেভলিঙ্কগুলোর ডিজাইন ফাংশন
  const navLinksClass = ({ isActive }) =>
    `btn btn-sm ${isActive ? "btn-primary text-white" : "btn-ghost text-gray-600 font-medium"}`;

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-8 sticky top-0 z-50">
      {/* Navbar Start: Logo */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-10 h-10 object-contain" src={logoImg} alt="Artify Logo" />
          <span className="text-2xl font-bold tracking-tight text-primary hidden sm:block">
            Artify
          </span>
        </Link>
      </div>

      {/* Navbar Center: Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-2 px-1">
          <li><NavLink to="/" className={navLinksClass}>Home</NavLink></li>
          <li><NavLink to="/explore" className={navLinksClass}>Explore Artworks</NavLink></li>
          {user && (
            <>
              <li><NavLink to="/add-artwork" className={navLinksClass}>Add Artwork</NavLink></li>
              <li><NavLink to="/my-gallery" className={navLinksClass}>My Gallery</NavLink></li>
              <li><NavLink to="/favorites" className={navLinksClass}>My Favorites</NavLink></li>
            </>
          )}
        </ul>
      </div>

      {/* Navbar End: Profile & Login/Register */}
      <div className="navbar-end gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border-2 border-primary hover:scale-105 transition-transform"
              title={user?.displayName || "User"}
            >
              <div className="w-10 rounded-full bg-gray-200">
                <img 
                  alt="User Profile" 
                  src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52 border border-gray-100"
            >
              <li className="px-4 py-2 font-bold text-primary border-b border-gray-100 mb-1">
                {user?.displayName || "Anonymous User"}
              </li>
              <li><Link to="/update-profile">Update Profile</Link></li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="text-red-500 font-medium hover:bg-red-50"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline btn-primary btn-sm rounded-full px-5">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm text-white rounded-full px-5">Register</Link>
          </div>
        )}

        {/* Mobile Dropdown */}
        <div className="dropdown dropdown-end lg:hidden ml-2">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-64 border border-gray-100 font-medium">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/explore">Explore Artworks</NavLink></li>
            {user && (
              <>
                <div className="divider my-1"></div>
                <li><NavLink to="/add-artwork">Add Artwork</NavLink></li>
                <li><NavLink to="/my-gallery">My Gallery</NavLink></li>
                <li><NavLink to="/favorites">My Favorites</NavLink></li>
                <li><button onClick={handleLogout} className="text-red-500 font-bold">Logout</button></li>
              </>
            )}
            {!user && (
              <>
                <div className="divider my-1"></div>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}