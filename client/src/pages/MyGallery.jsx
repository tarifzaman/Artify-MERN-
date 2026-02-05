import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

const MyGallery = () => {
  const { user } = useContext(AuthContext);
  const [myArtworks, setMyArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  // User-er email diye database theke data ana
  useEffect(() => {
    if (user?.email) {
      fetch(`https://artify-mern.onrender.com/my-artworks/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyArtworks(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  // Delete Handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      borderRadius: "15px",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://artify-mern.onrender.com/artwork/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your artwork has been deleted.",
                "success",
              );
              // UI theke delete kora item-ta soriye deya
              const remaining = myArtworks.filter((art) => art._id !== id);
              setMyArtworks(remaining);
            }
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <Fade cascade>
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter">
              MY ART GALLERY
            </h2>
            <p className="text-gray-500 font-medium italic">
              You have uploaded {myArtworks.length} masterpieces
            </p>
          </div>
          <Link
            to="/add-artwork"
            className="btn btn-primary rounded-full px-8 shadow-lg shadow-blue-200"
          >
            <FaPlus /> Add New Artwork
          </Link>
        </div>

        {myArtworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myArtworks.map((art) => (
              <div
                key={art._id}
                className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                    {art.category}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 truncate">
                    {art.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {art.description}
                  </p>

                  <div className="flex justify-between items-center border-t border-gray-50 pt-5">
                    <span className="text-2xl font-black text-primary">
                      ${art.price}
                    </span>
                    <div className="flex gap-2">
                      <Link
                        to={`/update-artwork/${art._id}`}
                        className="btn btn-sm btn-circle btn-outline btn-primary"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(art._id)}
                        className="btn btn-sm btn-circle btn-outline btn-error"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-blue-50/50 rounded-[3rem] border-2 border-dashed border-blue-200">
            <h3 className="text-2xl font-bold text-gray-400 mb-4">
              Your gallery is empty!
            </h3>
            <Link
              to="/add-artwork"
              className="btn btn-primary btn-wide rounded-full font-bold"
            >
              Upload Your First Art
            </Link>
          </div>
        )}
      </Fade>
    </div>
  );
};

export default MyGallery;
