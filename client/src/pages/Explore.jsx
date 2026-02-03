import React, { useEffect, useState } from "react";
import { FaRegHeart, FaSearch } from "react-icons/fa";

const Explore = ({ isHome }) => {
  const [artworks, setArtworks] = useState([]);
  const [searchText, setSearchText] = useState(""); // সার্চ টেক্সট রাখার জন্য

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setArtworks(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // সার্চ লজিক: টাইটেল অথবা আর্টিস্টের নামের সাথে মিল থাকলে ফিল্টার করবে
  const filteredArtworks = artworks.filter((art) =>
    art.title.toLowerCase().includes(searchText.toLowerCase()) ||
    art.artist.toLowerCase().includes(searchText.toLowerCase())
  );

  // Home পেজে শুধু ৬টি, আর Explore পেজে ফিল্টার করা সব ডাটা দেখাবে
  const displayData = isHome ? artworks.slice(0, 6) : filteredArtworks;

  return (
    <div className="container mx-auto p-6">
      {/* Search Bar Section - শুধু Explore পেজে দেখাবে */}
      {!isHome && (
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-bold text-center mb-6 text-primary">Explore Our Gallery</h2>
          
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search by Title or Artist..."
              className="input input-bordered w-full pl-12 focus:border-primary shadow-sm"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          
          {/* সার্চ রেজাল্ট কাউন্ট */}
          {!isHome && searchText && (
            <p className="mt-2 text-sm text-gray-500">
              Found {filteredArtworks.length} results for "{searchText}"
            </p>
          )}
        </div>
      )}

      {/* Art Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displayData.length > 0 ? (
          displayData.map((art) => (
            <div key={art.id} className="group card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <figure className="relative h-60 overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/80 p-2 rounded-full cursor-pointer hover:bg-red-100 transition-colors">
                  <FaRegHeart className="text-red-500 text-xl" />
                </div>
              </figure>

              <div className="card-body p-5">
                <div className="flex justify-between items-start">
                  <h2 className="card-title text-lg font-bold truncate w-4/5">{art.title}</h2>
                  <span className="badge badge-primary badge-outline text-[10px]">{art.category}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1 italic">By {art.artist}</p>
                
                <div className="divider my-2"></div>
                
                <div className="flex justify-between items-center mt-auto">
                  <p className="text-xl font-bold text-secondary">${art.price}</p>
                  <button className="btn btn-primary btn-sm rounded-lg">Details</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400">
            <p className="text-2xl font-semibold">No Artworks Found!</p>
            <p>Try searching with a different name.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;