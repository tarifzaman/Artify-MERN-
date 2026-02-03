import React from 'react';
import Banner from './Banner'; // যদি একই ফোল্ডারে থাকে
import Explore from './Explore'; 
import Categories from '../components/Categories';
import TopArtists from '../components/TopArtists';
import JoinSection from '../components/JoinSection';

const Home = () => {
    return (
        <div className="space-y-20"> {/* সেকশনগুলোর মাঝে গ্যাপ দেওয়ার জন্য */}
            <Banner />
            <Explore isHome={true} /> 
            <Categories />
            <TopArtists />
            <JoinSection />
        </div>
    );
};

export default Home;