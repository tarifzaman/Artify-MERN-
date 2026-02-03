import React from 'react';

const MyGallery = () => {
    return (
        <div className="container mx-auto p-5">
            <h2 className="text-3xl font-bold mb-6">My Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-10 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400">
                    You haven't uploaded any artwork yet.
                </div>
            </div>
        </div>
    );
};

export default MyGallery;