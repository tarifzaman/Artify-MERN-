import React from 'react';
import Banner from './Banner';
import Explore from './Explore';

const Home = () => {
    return (
        <div>
            <Banner />
            <div className="mt-10">
                <h2 className="text-3xl font-bold text-center mb-8">Featured Artworks</h2>
                <Explore isHome={true} /> {/* Home-এ শুধু কিছু অংশ দেখানোর জন্য */}
            </div>
        </div>
    );
};

export default Home;