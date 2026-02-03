import React from "react";

export default function JoinSection() {
  return (
    <div className="container mx-auto px-6 mb-20">
      <div className="bg-primary rounded-3xl p-10 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Are you an Artist? <br /> Join Artify Today!
          </h2>
          <p className="text-lg opacity-90">
            Showcase your creativity to the world and get the appreciation you
            deserve.
          </p>
        </div>
        <button className="btn btn-lg bg-white text-primary border-none hover:bg-gray-100 px-10">
          Get Started
        </button>
      </div>
    </div>
  );
}
