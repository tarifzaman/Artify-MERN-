import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

const UpdateArtwork = () => {
  const { id } = useParams(); // URL থেকে _id নেওয়া
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  // ১. পুরনো ডাটা ডাটাবেস থেকে লোড করা
  useEffect(() => {
    fetch(`https://artify-mern.onrender.com/artwork/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const artist = form.artist.value;
    const category = form.category.value;
    const price = form.price.value;
    const image = form.image.value;
    const description = form.description.value;

    const updatedArtwork = {
      title,
      artist,
      category,
      price: parseFloat(price),
      image,
      description,
    };

    // ২. ডাটাবেসে আপডেট রিকোয়েস্ট (PUT) পাঠানো
    fetch(`https://artify-mern.onrender.com/artwork/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedArtwork),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Artwork information updated successfully",
            icon: "success",
            confirmButtonColor: "#3b82f6",
          });
          navigate("/my-gallery"); // আপডেট শেষে গ্যালারিতে ব্যাক করা
        }
      });
  };

  if (loading)
    return <div className="text-center p-20 font-bold">Loading Data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Fade direction="up">
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-black text-center text-primary mb-8 uppercase">
            Update Masterpiece
          </h2>

          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="form-control">
              <label className="label font-bold">Artwork Title</label>
              <input
                type="text"
                name="title"
                defaultValue={artwork?.title}
                className="input input-bordered focus:border-primary"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-bold">Artist Name</label>
              <input
                type="text"
                name="artist"
                defaultValue={artwork?.artist}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-bold">Category</label>
              <select
                name="category"
                defaultValue={artwork?.category}
                className="select select-bordered"
              >
                <option>Painting</option>
                <option>Digital Art</option>
                <option>Photography</option>
                <option>Sculpture</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label font-bold">Price ($)</label>
              <input
                type="number"
                name="price"
                defaultValue={artwork?.price}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label font-bold">Image URL</label>
              <input
                type="url"
                name="image"
                defaultValue={artwork?.image}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label font-bold">Description</label>
              <textarea
                name="description"
                defaultValue={artwork?.description}
                className="textarea textarea-bordered h-28"
              ></textarea>
            </div>

            <div className="md:col-span-2 mt-4 flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/my-gallery")}
                className="btn btn-outline flex-1 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-[2] text-lg rounded-xl shadow-lg shadow-blue-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </Fade>
    </div>
  );
};

export default UpdateArtwork;
