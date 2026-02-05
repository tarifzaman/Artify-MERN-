import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaEye, FaTimes, FaSearch, FaLock } from "react-icons/fa";
import { AuthContext } from "../providers/AuthContext";
import Swal from "sweetalert2";

export default function Explore({ isHome }) {
  const [artworks, setArtworks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedArt, setSelectedArt] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  const storageKey = user ? `fav_${user.email}` : null;

  useEffect(() => {
    // --- ডাটাবেস থেকে ডাটা নিয়ে আসা ---
    fetch("http://localhost:5000/artworks")
      .then((res) => res.json())
      .then((data) => {
        setArtworks(data);
        if (location.state?.selectedCategory) {
          setActiveCategory(location.state.selectedCategory);
        }
      })
      .catch(err => console.error("Error fetching artworks:", err));

    if (storageKey) {
      const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
      setFavorites(saved);
    }
  }, [storageKey, location.state]);

  const toggleFavorite = (art) => {
    if (!user) {
      return Swal.fire("Login Required", "Please login to add favorites", "warning");
    }
    const currentFavs = JSON.parse(localStorage.getItem(storageKey)) || [];
    const isExist = currentFavs.find((f) => f._id === art._id); // _id ব্যবহার করা হয়েছে
    let updated = isExist ? currentFavs.filter((f) => f._id !== art._id) : [...currentFavs, art];
    
    setFavorites(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  // --- ফিল্টারিং লজিক (Search & Category) ---
  const filteredArtworks = artworks.filter((art) => {
    const matchesCategory = activeCategory === "All" || art.category === activeCategory;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // হোম পেজে হলে শুধু ৬টি দেখাবে, নতুবা ফিল্টার করা ডাটা
  const displayArtworks = isHome ? artworks.slice(0, 6) : filteredArtworks;

  if (loading) return <div className="text-center p-20 font-bold">Loading Gallery...</div>;

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black uppercase tracking-widest mb-6">
          {isHome ? "Featured Artworks" : "Explore Art Gallery"}
        </h2>
        
        {/* সার্চ এবং ফিল্টার শুধু লগইন ইউজার বা হোম পেজে দেখাবে */}
        {!isHome && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search by art or artist name..."
                className="input input-bordered w-full pl-12 rounded-full shadow-sm focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {/* আপনার ডাটাবেসের ক্যাটাগরির সাথে মিলিয়ে বাটনগুলো এখানে দিন */}
              {["All", "Painting", "Digital Art", "Photography", "Sculpture"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`btn btn-sm rounded-full px-6 transition-all ${activeCategory === cat ? 'btn-primary' : 'btn-outline border-gray-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* এক্সপ্লোর পেজে লগইন না থাকলে লক দেখাবে */}
      {(!user && !isHome) ? (
        <div className="max-w-md mx-auto text-center py-20 bg-base-200 rounded-[40px] border-2 border-dashed border-primary/30 px-10">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaLock className="text-primary text-3xl" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Gallery is Locked!</h2>
          <p className="text-gray-500 mb-8">Please login to explore our full collection of masterpieces and artist details.</p>
          <Link to="/login" className="btn btn-primary btn-wide rounded-full font-bold">Login to Unlock</Link>
        </div>
      ) : (
        <>
          {displayArtworks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
              {displayArtworks.map((art) => {
                const isFav = favorites.find((f) => f._id === art._id);
                return (
                  <div key={art._id} className="card bg-base-100 shadow-lg border hover:shadow-2xl transition-all duration-300 group rounded-2xl overflow-hidden">
                    <figure className="relative h-64 overflow-hidden">
                      <img src={art.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={art.title} />
                      <button 
                        onClick={() => toggleFavorite(art)} 
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                      >
                        {isFav ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-400" />}
                      </button>
                    </figure>
                    
                    <div className="card-body p-6 bg-white">
                      <div className="badge badge-ghost text-xs mb-1 uppercase tracking-tighter">{art.category}</div>
                      <h2 className="card-title text-xl font-bold truncate">{art.title}</h2>
                      <p className="text-gray-500 font-medium">By {art.artist}</p>
                      <div className="card-actions justify-between items-center mt-4">
                        <span className="text-2xl font-black text-black">${art.price}</span>
                        <button onClick={() => setSelectedArt(art)} className="btn btn-sm btn-primary rounded-lg">
                          <FaEye /> View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-lg">No artworks found matching "{searchQuery}"</p>
            </div>
          )}
        </>
      )}

      {/* --- View Details Modal --- */}
      {selectedArt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-base-100 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative flex flex-col md:flex-row animate-scaleUp">
            <button onClick={() => setSelectedArt(null)} className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-black/20 p-2 rounded-full text-white md:text-black">
              <FaTimes size={20} />
            </button>
            <div className="md:w-1/2 h-72 md:h-auto">
              <img src={selectedArt.image} className="w-full h-full object-cover" alt={selectedArt.title} />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <div className="badge badge-primary mb-4 px-4 py-3 font-bold uppercase">{selectedArt.category}</div>
              <h2 className="text-3xl font-black mb-2 leading-tight">{selectedArt.title}</h2>
              <p className="text-lg font-medium text-primary mb-4">Created by: {selectedArt.artist}</p>
              <p className="text-gray-600 mb-6 italic border-l-4 border-primary/20 pl-4">
                {selectedArt.description || "A masterfully crafted piece of art that tells a unique story."}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-4xl font-black">${selectedArt.price}</span>
                <button 
                   onClick={() => { toggleFavorite(selectedArt); setSelectedArt(null); }} 
                   className={`btn rounded-full px-8 ${favorites.find(f => f._id === selectedArt._id) ? 'btn-error text-white' : 'btn-primary'}`}
                >
                  {favorites.find(f => f._id === selectedArt._id) ? "Liked" : "Add Like"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}