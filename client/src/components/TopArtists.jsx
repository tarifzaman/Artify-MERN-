import React from "react";

export default function TopArtists() {
  const artists = [
    {
      name: "Tarif Zaman",
      role: "Digital Artist",
      img: "https://i.pravatar.cc/150?u=1",
    },
    {
      name: "Ayesha Khan",
      role: "Oil Painter",
      img: "https://i.pravatar.cc/150?u=2",
    },
    {
      name: "Zaman Art",
      role: "Concept Artist",
      img: "https://i.pravatar.cc/150?u=3",
    },
  ];
  return (
    <div className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">
        Meet Our Top Artists
      </h2>
      <div className="flex flex-wrap justify-center gap-10">
        {artists.map((artist, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={artist.img} alt={artist.name} />
              </div>
            </div>
            <h3 className="mt-4 font-bold text-xl">{artist.name}</h3>
            <p className="text-primary text-sm">{artist.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
