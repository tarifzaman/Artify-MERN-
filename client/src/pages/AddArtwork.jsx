import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

const AddArtwork = () => {
  const { user } = useContext(AuthContext);

  const handleAddArtwork = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const artist = form.artist.value;
    const category = form.category.value;
    const price = form.price.value;
    const image = form.image.value;
    const description = form.description.value;

    const newArtwork = {
      title,
      artist,
      category,
      price: parseFloat(price),
      image,
      description,
      userEmail: user?.email,
      userName: user?.displayName,
      createdAt: new Date(),
    };

    // আপনার ব্যাকএন্ডে ডাটা পাঠানো
    fetch("https://artify-mern.onrender.com/artworks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newArtwork),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Artwork Added to Gallery Successfully",
            icon: "success",
            confirmButtonText: "Awesome",
          });
          form.reset();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Error", "Could not connect to server", "error");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Fade direction="down">
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-black text-center text-blue-600 mb-8 uppercase">
            Add New Masterpiece
          </h2>

          <form
            onSubmit={handleAddArtwork}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="form-control">
              <label className="label font-bold">Artwork Title</label>
              <input
                type="text"
                name="title"
                className="input input-bordered"
                placeholder="E.g. Starry Night"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-bold">Artist Name</label>
              <input
                type="text"
                name="artist"
                defaultValue={user?.displayName}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-bold">Category</label>
              <select name="category" className="select select-bordered">
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
                className="input input-bordered"
                placeholder="99.99"
                required
              />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label font-bold">Image URL</label>
              <input
                type="url"
                name="image"
                className="input input-bordered"
                placeholder="https://image-link.com"
                required
              />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label font-bold">Description</label>
              <textarea
                name="description"
                className="textarea textarea-bordered h-28"
                placeholder="Tell us about this art..."
              ></textarea>
            </div>

            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="btn btn-primary w-full text-lg shadow-lg"
              >
                Upload to Gallery
              </button>
            </div>
          </form>
        </div>
      </Fade>
    </div>
  );
};

export default AddArtwork;
