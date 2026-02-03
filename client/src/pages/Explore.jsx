import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Explore = ({ isHome }) => {
    const dummyArtworks = [
        { id: 1, title: "Abstract Wave", artist: "Tarif", img: "https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg" },
        { id: 2, title: "Modern City", artist: "Zaman", img: "https://images.pexels.com/photos/20967/pexels-photo.jpg" },
        { id: 3, title: "Silent Nature", artist: "Artify", img: "https://images.pexels.com/photos/1045299/pexels-photo-1045299.jpeg" },
        { id: 4, title: "Digital Portrait", artist: "Sky", img: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg" },
    ];

    const displayData = isHome ? dummyArtworks.slice(0, 3) : dummyArtworks;

    return (
        <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayData.map(art => (
                <div key={art.id} className="card bg-base-100 shadow-xl border border-gray-100">
                    <figure className="h-64"><img src={art.img} alt="Art" className="object-cover w-full h-full" /></figure>
                    <div className="card-body">
                        <div className="flex justify-between items-center">
                            <h2 className="card-title">{art.title}</h2>
                            <button className="text-red-500 text-2xl hover:scale-110 transition-transform">
                                <FaRegHeart /> {/* পরে এটাকে State দিয়ে Toggle করবে */}
                            </button>
                        </div>
                        <p>By: {art.artist}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary btn-sm">View Details</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Explore;