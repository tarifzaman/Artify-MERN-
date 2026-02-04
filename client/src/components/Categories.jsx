import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Digital Art", icon: "🎨", count: "15+ Items" },
  { name: "Oil Painting", icon: "🖌️", count: "10+ Items" },
  { name: "Cyberpunk", icon: "🚀", count: "8+ Items" },
  { name: "Sketching", icon: "✏️", count: "12+ Items" },
];

export default function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    // Explore পেজে পাঠানো হচ্ছে এবং সাথে ক্যাটেগরি নাম পাঠানো হচ্ছে
    navigate("/explore", { state: { selectedCategory: categoryName } });
  };

  return (
    <div className="bg-base-200 py-16 px-6 mt-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(cat.name)}
              className="card bg-base-100 shadow-sm hover:shadow-md hover:scale-105 transition-all cursor-pointer p-6 text-center border border-gray-100 group"
            >
              <div className="text-4xl mb-4 group-hover:bounce transition-transform">{cat.icon}</div>
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{cat.name}</h3>
              <p className="text-sm text-gray-500">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}