import React, { useContext, useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthContext"; // AuthContext ইম্পোর্ট করুন

// আপনার ইমেজগুলো (এখানে চাইলে ভালো রেজোলিউশনের আর্ট বা নিজের ছবি দিতে পারেন)
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.avif";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpeg";
import img5 from "../assets/2.jpg";

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // আসল ইউজার ডাটা এখান থেকে আসবে

  const slides = [
    { url: img1, title: "Abstract Visions", sub: "Explore the depth of colors" },
    { url: img2, title: "Digital Odyssey", sub: "Where technology meets art" },
    { url: img3, title: "Classic Canvas", sub: "Timeless beauty in every stroke" },
    { url: img4, title: "Cyberpunk Realm", sub: "Future in your eyes" },
    { url: img5, title: "Artify Special", sub: "Dedicated to Tarif Zaman" },
  ];

  const handleExploreClick = () => {
    if (user) {
      // ইউজার লগইন থাকলে সরাসরি এক্সপ্লোর পেজে যাবে
      navigate("/explore");
    } else {
      // লগইন না থাকলে তবেই ওয়ার্নিং দেখাবে
      Swal.fire({
        title: "Explore the Gallery!",
        text: "Please login to unlock our premium collections.",
        icon: "lock",
        showCancelButton: true,
        confirmButtonColor: "#3b82f6",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Login Now",
        cancelButtonText: "Later",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-black font-sans">
      {/* Background Slides */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-[2000ms] ease-in-out transform ${
              index === activeSlide ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          >
            <img
              src={slide.url}
              className="w-full h-full object-cover brightness-[0.4]"
              alt="Banner"
            />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-10">
        <Fade direction="down" duration={1000}>
          <span className="px-4 py-1 bg-primary/20 border border-primary/30 rounded-full text-primary text-sm font-bold tracking-widest mb-4 inline-block backdrop-blur-md">
            EXHIBITION 2026
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter">
            Welcome to <span className="text-primary italic font-serif">Artify</span>
          </h1>
        </Fade>

        <div className="h-10 md:h-14">
          <h2 className="text-xl md:text-3xl font-light text-gray-300">
            <Typewriter
              words={[
                "Discover Unique Digital Art",
                "Join Our Creative Community",
                "Support Local Artists",
                "Curated by Tarif Zaman",
              ]}
              loop={0}
              cursor
              typeSpeed={70}
              deleteSpeed={40}
            />
          </h2>
        </div>

        <Fade direction="up" delay={500}>
          <div className="flex flex-col md:flex-row gap-4 mt-12">
            <button
              onClick={handleExploreClick}
              className="btn btn-primary btn-lg rounded-full px-12 border-none shadow-xl shadow-primary/20 hover:scale-105 transition-all font-bold"
            >
              Explore Now
            </button>
          </div>
        </Fade>
      </div>

      {/* Custom Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
        <div 
          className="h-full bg-primary transition-all duration-[5000ms] ease-linear"
          style={{ width: `${((activeSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>

      {/* Side Navigation Indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30 hidden md:flex">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === activeSlide ? "bg-primary h-8" : "bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;