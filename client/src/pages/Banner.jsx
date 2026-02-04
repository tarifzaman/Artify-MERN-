import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom"; // useNavigate ইম্পোর্ট করো
import Swal from "sweetalert2"; // Swal ইম্পোর্ট করো

import img1 from "../assets/1.jpg";
import img2 from "../assets/2.avif";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpeg";
import img5 from "../assets/2.jpg";

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate(); // নেভিগেট হুক
  
  // আপাতত ডামি ইউজার স্টেট
  const user = null; 

  const slides = [img1, img2, img3, img4, img5];

  // Explore Now হ্যান্ডলার
  const handleExploreClick = () => {
    if (user) {
      // ইউজার লগইন থাকলে সরাসরি এক্সপ্লোর পেজে যাবে
      navigate("/explore");
    } else {
      // ইউজার লগইন না থাকলে অ্যালার্ট দেখাবে
      Swal.fire({
        title: "Login Required!",
        text: "You need to login to see the full gallery.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
        cancelButtonText: "Stay Here",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  // Auto Slider Logic (4 Seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[550px] overflow-hidden bg-black">
      {/* Background Images Layer */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              className="w-full h-full object-cover brightness-50"
              alt={`Banner ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Static Content Layer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-5 z-10 pointer-events-none">
        <Fade direction="down" duration={1000} triggerOnce>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-primary font-serif">Artify</span>
          </h1>
        </Fade>

        <div className="h-12 md:h-16">
          <h2 className="text-xl md:text-3xl font-medium text-gray-200">
            <Typewriter
              words={[
                "Discover Unique Digital Art",
                "Join Our Creative Community",
                "Support Local Artists",
                "Support Tarif Zaman",
              ]}
              loop={0}
              cursor
              typeSpeed={80}
              deleteSpeed={50}
            />
          </h2>
        </div>

        <Fade direction="up" delay={1000} triggerOnce>
          {/* onClick হ্যান্ডলার অ্যাড করা হয়েছে */}
          <button 
            onClick={handleExploreClick}
            className="btn btn-primary mt-8 px-8 border-none hover:scale-105 transition-transform pointer-events-auto"
          >
            Explore Now
          </button>
        </Fade>
      </div>

      {/* Manual Navigation Buttons */}
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-20">
        <button
          onClick={() => setActiveSlide(activeSlide === 0 ? slides.length - 1 : activeSlide - 1)}
          className="btn btn-circle btn-ghost text-white text-2xl"
        >❮</button>
        <button
          onClick={() => setActiveSlide(activeSlide === slides.length - 1 ? 0 : activeSlide + 1)}
          className="btn btn-circle btn-ghost text-white text-2xl"
        >❯</button>
      </div>
    </div>
  );
};

export default Banner;