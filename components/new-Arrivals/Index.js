import React from 'react';
import NewArrivalsSwiper from "../swipers/NewArrivalsSwiper";
import ExploreNewArrivals from "./ExploreNewArrivals";

const Index = (props) => {
    return (
        <div className={"py-4 bg-[#e8e2df]"}>
            <h3 className='text-h3 font-900 uppercase tracking-widest mx-4 mb-4 text-white'>NEW ARRIVALS</h3>
            <NewArrivalsSwiper isMobile={true}/>
            <ExploreNewArrivals/>
        </div>
    );
};

export default Index;