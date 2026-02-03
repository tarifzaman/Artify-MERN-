import React from 'react';

const AddArtwork = () => {
    return (
        <div className="max-w-2xl mx-auto my-10 p-8 bg-white shadow-2xl rounded-2xl">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">Add Your Masterpiece</h2>
            <form className="space-y-4">
                <div className="form-control">
                    <label className="label font-semibold">Artwork Title</label>
                    <input type="text" placeholder="Title" className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Artwork Image URL</label>
                    <input type="text" placeholder="Paste Image URL" className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Short Description</label>
                    <textarea className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                </div>
                <button className="btn btn-primary w-full mt-4">Upload Artwork</button>
            </form>
        </div>
    );
};

export default AddArtwork;