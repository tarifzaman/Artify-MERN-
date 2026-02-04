import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaEye, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import Swal from "sweetalert2";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedArt, setSelectedArt] = useState(null); // মোডালের জন্য স্টেট
  const { user, loading } = useContext(AuthContext);

  const storageKey = user ? `fav_${user.email}` : null;

  useEffect(() => {
    if (storageKey) {
      const data = JSON.parse(localStorage.getItem(storageKey)) || [];
      setFavorites(data);
    }
  }, [storageKey]);

  const handleUnfavorite = (id) => {
    const remaining = favorites.filter((art) => String(art.id) !== String(id));
    setFavorites(remaining);
    localStorage.setItem(storageKey, JSON.stringify(remaining));

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: 'success',
      title: 'Removed from favorites'
    });
  };

  if (loading) return <div className="text-center p-20">Loading...</div>;

  if (!user) {
    return (
      <div className="text-center p-20">
        <h2 className="text-2xl font-bold mb-5">Please login to see your favorites.</h2>
        <Link to="/login" className="btn btn-primary">Login Now</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-10 min-h-screen">
      <h2 className="text-4xl font-black mb-12 text-center uppercase tracking-tighter">
        My Liked Artworks
      </h2>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((art) => (
            <div key={art.id} className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden group hover:shadow-md transition-shadow">
              <figure className="h-64 overflow-hidden relative">
                <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </figure>
              
              <div className="p-6 text-left">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-black truncate w-36">{art.title}</h2>
                    <p className="text-gray-400 text-sm mt-1 font-medium">{art.artist || "Unknown Artist"}</p>
                  </div>
                  <button 
                    onClick={() => handleUnfavorite(art.id)}
                    className="p-2 bg-red-50 hover:bg-red-100 rounded-full transition-colors group/btn"
                    title="Unfavorite"
                  >
                    <FaHeart className="text-red-500 group-hover/btn:scale-110 transition-transform" size={20} />
                  </button>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
                  <span className="text-2xl font-black text-black">${art.price}</span>
                  <button 
                    onClick={() => setSelectedArt(art)}
                    className="btn btn-sm btn-ghost text-primary font-bold hover:bg-primary/10"
                  >
                    <FaEye className="mr-1" /> View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
          <p className="text-gray-400 text-lg font-medium mb-6">No artworks liked yet.</p>
          <Link to="/explore" className="btn btn-primary px-10 rounded-full font-bold">
            GO EXPLORE
          </Link>
        </div>
      )}

      {/* --- সুন্দর ডিটেইলস মোডাল (Explore পেজের মতো) --- */}
      {selectedArt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-base-100 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative flex flex-col md:flex-row animate-fadeIn">
            
            <button 
              onClick={() => setSelectedArt(null)}
              className="absolute top-4 right-4 z-10 bg-black/10 hover:bg-black/20 p-2 rounded-full transition-colors"
            >
              <FaTimes size={20} />
            </button>

            <div className="md:w-1/2 h-72 md:h-auto">
              <img src={selectedArt.image} className="w-full h-full object-cover" alt={selectedArt.title} />
            </div>

            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <div className="badge badge-primary mb-4 px-4 py-3 font-bold uppercase">{selectedArt.category || "Art"}</div>
              <h2 className="text-3xl font-black mb-2 leading-tight">{selectedArt.title}</h2>
              <p className="text-lg font-medium text-primary mb-4">Created by: {selectedArt.artist}</p>
              
              <p className="text-gray-600 mb-6 italic border-l-4 border-primary/20 pl-4">
                {selectedArt.description || "A masterfully crafted piece of art that tells a unique story and brings life to any space."}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-3 rounded-xl border">
                  <p className="text-xs uppercase text-gray-400 font-bold tracking-tighter">Medium</p>
                  <p className="font-semibold">{selectedArt.medium || "Oil Painting"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border">
                  <p className="text-xs uppercase text-gray-400 font-bold tracking-tighter">Size</p>
                  <p className="font-semibold">{selectedArt.size || "Standard"}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-4xl font-black">${selectedArt.price}</span>
                <button 
                   onClick={() => { handleUnfavorite(selectedArt.id); setSelectedArt(null); }} 
                   className="btn btn-error text-white rounded-full px-8"
                >
                  Unfavorite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;