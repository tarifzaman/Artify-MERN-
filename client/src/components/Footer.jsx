import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import logoImg from "../assets/palette.png";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Section 1: Logo & Vision */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img className="w-10 h-10" src={logoImg} alt="Artify Logo" />
            <span className="text-2xl font-bold text-primary">Artify</span>
          </div>
          <p className="text-gray-500 leading-relaxed">
            The world's leading community for creatives to share, grow, and get hired. Express your creativity with us.
          </p>
          <div className="flex gap-4 text-2xl text-gray-600">
            <a href="#" className="hover:text-primary transition-colors"><FaFacebook /></a>
            <a href="#" className="hover:text-primary transition-colors"><FaSquareXTwitter /></a>
            <a href="#" className="hover:text-primary transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-primary transition-colors"><FaLinkedin /></a>
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-6">Quick Links</h3>
          <ul className="space-y-3 text-gray-500">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/explore" className="hover:text-primary transition-colors">Explore Artworks</Link></li>
            <li><Link to="/add-artwork" className="hover:text-primary transition-colors">Upload Art</Link></li>
            <li><Link to="/login" className="hover:text-primary transition-colors">Sign In</Link></li>
          </ul>
        </div>

        {/* Section 3: Categories */}
        <div>
          <h3 className="font-bold text-lg mb-6">Popular Categories</h3>
          <ul className="space-y-3 text-gray-500">
            <li className="hover:text-primary cursor-pointer">Digital Art</li>
            <li className="hover:text-primary cursor-pointer">Oil Painting</li>
            <li className="hover:text-primary cursor-pointer">Sketching</li>
            <li className="hover:text-primary cursor-pointer">Cyberpunk</li>
          </ul>
        </div>

        {/* Section 4: Newsletter */}
        <div>
          <h3 className="font-bold text-lg mb-6">Join Our Newsletter</h3>
          <p className="text-gray-500 mb-4 text-sm">Get the latest updates on new artists and features.</p>
          <div className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="input input-bordered w-full focus:border-primary" 
            />
            <button className="btn btn-primary text-white w-full">Subscribe</button>
          </div>
        </div>

      </div>

      <div className="divider container mx-auto px-6 opacity-30 my-10"></div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} <span className="font-bold">Artify</span>. All rights reserved by Tarif Zaman.</p>
      </div>
    </footer>
  );
};

export default Footer;