import React from "react";

const Myfavorites = () => {
  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold mb-6 text-red-500">My Favorites ❤️</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <p className="text-gray-500 italic">No favorites added yet!</p>
      </div>
    </div>
  );
};

export default Myfavorites;
