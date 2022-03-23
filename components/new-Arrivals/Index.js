import React from 'react';
import NewArrivalsSwiper from "../swipers/NewArrivalsSwiper";
import ExploreNewArrivals from "./ExploreNewArrivals";

const Index = (props) => {
    return (
        <div className={"py-4 bg-[#e8e2df]"}>
            <h3 className='font-900 uppercase text-h3 tracking-widest mx-4 text-white mb-4'>NEW ARRIVALS</h3>
            <NewArrivalsSwiper isMobile={true}/>
            <ExploreNewArrivals/>
        </div>
    );
};

export default Index;