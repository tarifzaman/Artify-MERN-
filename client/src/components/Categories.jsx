import React from "react";
const categories = [
  { name: "Digital Art", icon: "🎨", count: "15+ Items" },
  { name: "Oil Painting", icon: "🖌️", count: "10+ Items" },
  { name: "Cyberpunk", icon: "🚀", count: "8+ Items" },
  { name: "Sketching", icon: "✏️", count: "12+ Items" },
];
export default function Categories() {
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
              className="card bg-base-100 shadow-sm hover:shadow-md transition-all cursor-pointer p-6 text-center border border-gray-100"
            >
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h3 className="font-bold text-lg">{cat.name}</h3>
              <p className="text-sm text-gray-500">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
