import React, { useEffect, useState } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const data = localStorage.getItem("favorites");
      if (data) {
        setFavorites(JSON.parse(data));
      }
    };
    
    loadData();
    window.addEventListener('focus', loadData);
    return () => window.removeEventListener('focus', loadData);
  }, []);

  // আইটেম রিমুভ করার ফাংশন
  const handleRemove = (id) => {
    Swal.fire({
      title: "Remove from favorites?",
      text: "This artwork will be removed from your liked list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Keep it"
    }).then((result) => {
      if (result.isConfirmed) {
        // ১. নতুন লিস্ট তৈরি করা (যেই আইডি রিমুভ হবে সেটা বাদে)
        const remaining = favorites.filter((item) => String(item.id) !== String(id));
        
        // ২. স্টেট আপডেট করা (এতে সাথে সাথে স্ক্রিন থেকে চলে যাবে)
        setFavorites(remaining);
        
        // ৩. লোকাল স্টোরেজ আপডেট করা
        localStorage.setItem("favorites", JSON.stringify(remaining));

        Swal.fire({
          title: "Removed!",
          icon: "success",
          timer: 800,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-10 min-h-screen">
      <h2 className="text-4xl font-black mb-12 text-center text-black uppercase tracking-tighter">
        My Favorites ({favorites.length})
      </h2>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((art) => (
            <div key={art.id} className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden group">
              <figure className="h-64 overflow-hidden relative">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                {/* এখানে হার্ট বাটনে ক্লিক করলেও রিমুভ হবে */}
                <div 
                  onClick={() => handleRemove(art.id)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md cursor-pointer hover:scale-110 transition"
                >
                  <FaHeart className="text-red-500 text-lg" />
                </div>
              </figure>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-black truncate">{art.title}</h2>
                <p className="text-gray-400 text-sm mt-1 font-medium">{art.artist}</p>
                
                <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-50">
                  <span className="text-2xl font-black text-black">${art.price}</span>
                  {/* ট্রাশ বাটনে ক্লিক করলে রিমুভ হবে */}
                  <button 
                    onClick={() => handleRemove(art.id)}
                    className="flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-600 transition-colors uppercase tracking-widest"
                  >
                    <FaTrash size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
          <p className="text-gray-400 text-lg font-medium mb-6">Your list is currently empty.</p>
          <Link 
            to="/explore" 
            className="bg-black text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-gray-800 transition shadow-xl"
          >
            EXPLORE ART
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;