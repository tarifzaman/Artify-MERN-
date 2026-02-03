import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoImg from "../assets/palette.png";

export default function Navbar() {
  // ডামি ইউজার স্টেট: লগইন না থাকলে null করে টেস্ট করো
  const user = null; 

  // নেভলিঙ্কগুলোর কমন ডিজাইন ফাংশন
  const navLinksClass = ({ isActive }) =>
    `btn btn-sm ${isActive ? "btn-primary text-white" : "btn-ghost text-gray-600"}`;

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-8 sticky top-0 z-50">
      {/* Navbar Start: Logo and Site Name */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-10 h-10 object-contain" src={logoImg} alt="Artify Logo" />
          <span className="text-2xl font-bold tracking-tight text-primary hidden sm:block">
            Artify
          </span>
        </Link>
      </div>

      {/* Navbar Center: Navigation Links (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-2 px-1">
          <li>
            <NavLink to="/" className={navLinksClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" className={navLinksClass}>
              Explore Artworks
            </NavLink>
          </li>
          {/* ইউজার লগইন থাকলেই কেবল এই ৩টি বাটন দেখাবে */}
          {user && (
            <>
              <li>
                <NavLink to="/add-artwork" className={navLinksClass}>
                  Add Artwork
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-gallery" className={navLinksClass}>
                  My Gallery
                </NavLink>
              </li>
              <li>
                <NavLink to="/favorites" className={navLinksClass}>
                  My Favorites
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Navbar End: User Profile & Login/Register */}
      <div className="navbar-end gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border-2 border-primary hover:scale-105 transition-transform"
              title={user.displayName}
            >
              <div className="w-10 rounded-full">
                <img alt="User Profile" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52 border border-gray-100"
            >
              <li className="px-4 py-2 font-bold text-primary border-b border-gray-100 mb-1">
                {user.displayName}
              </li>
              <li><Link to="/update-profile">Update Profile</Link></li>
              <li>
                <button className="text-red-500 font-medium hover:bg-red-50">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          /* ইউজার না থাকলে লগইন এবং রেজিস্টার বাটন */
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline btn-primary btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm text-white">Register</Link>
          </div>
        )}

        {/* Mobile Dropdown */}
        <div className="dropdown dropdown-end lg:hidden ml-2">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-64 border border-gray-100">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/explore">Explore Artworks</NavLink></li>
            {user && (
              <>
                <div className="divider my-1"></div>
                <li><NavLink to="/add-artwork">Add Artwork</NavLink></li>
                <li><NavLink to="/my-gallery">My Gallery</NavLink></li>
                <li><NavLink to="/favorites">My Favorites</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}