import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2"; 
import { AuthContext } from "../providers/AuthContext";

const Explore = ({ isHome }) => {
  const [artworks, setArtworks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setArtworks(data))
      .catch((err) => console.error("Error fetching data:", err));

    // LocalStorage থেকে ফেভারিট ডাটা লোড করা
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);

    if (!loading && !user && !isHome) {
      Swal.fire({
        title: "Login Required!",
        text: "You need to login to see the full gallery.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#000000",
        confirmButtonText: "Login Now",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
    }
  }, [user, loading, isHome, navigate]);

  // ফেভারিট অ্যাড বা রিমুভ করার ফাংশন
  const toggleFavorite = (art) => {
    if (!user) {
      Swal.fire("Login First!", "You need to login to add favorites", "warning");
      return;
    }

    let updatedFavorites;
    const isExist = favorites.find((fav) => fav.id === art.id);

    if (isExist) {
      updatedFavorites = favorites.filter((fav) => fav.id !== art.id);
      Swal.fire({ title: "Removed!", icon: "info", timer: 1000, showConfirmButton: false });
    } else {
      updatedFavorites = [...favorites, art];
      Swal.fire({ title: "Added to Favorites!", icon: "success", timer: 1000, showConfirmButton: false });
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // ইউনিক ক্যাটাগরি লিস্ট তৈরি (Dropdown এর জন্য)
  const categories = ["All", ...new Set(artworks.map((art) => art.category))];

  // ফিল্টার লজিক (Search + Category)
  const filteredArtworks = artworks.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchText.toLowerCase()) || 
                         art.artist.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayData = isHome ? artworks.slice(0, 6) : filteredArtworks;

  if (loading && !isHome) return <div className="min-h-screen flex justify-center items-center">Checking Auth...</div>;

  return (
    <div className="container mx-auto p-6 min-h-[60vh]">
      {!isHome && user && (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          {/* Search Box */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search art or artist..."
              className="input input-bordered w-full pl-12 focus:border-black"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Category Dropdown */}
          <select 
            className="select select-bordered w-full max-w-xs focus:border-black"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {(user || isHome) && displayData.length > 0 ? (
          displayData.map((art) => {
            const isFav = favorites.find(fav => fav.id === art.id);
            return (
              <div key={art.id} className="group card bg-base-100 shadow-lg border border-gray-100 overflow-hidden">
                <figure className="relative h-60 overflow-hidden">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-110 transition-duration-500" />
                  {/* Favorite Button */}
                  <div 
                    onClick={() => toggleFavorite(art)}
                    className="absolute top-3 right-3 bg-white/90 p-2 rounded-full cursor-pointer shadow-md hover:scale-110 transition"
                  >
                    {isFav ? <FaHeart className="text-red-500 text-xl" /> : <FaRegHeart className="text-gray-400 text-xl" />}
                  </div>
                </figure>
                <div className="card-body p-5">
                  <h2 className="card-title text-lg font-bold">{art.title}</h2>
                  <p className="text-sm text-gray-500 italic">By {art.artist}</p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-xl font-black text-black">${art.price}</p>
                    <span className="badge badge-outline text-[10px]">{art.category}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          !isHome && !user && (
            <div className="col-span-full text-center py-20 text-gray-400 font-semibold italic">
              Content is locked. Please Login.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Explore;