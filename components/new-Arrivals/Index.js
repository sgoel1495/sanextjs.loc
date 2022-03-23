import React from 'react';
import NewArrivalsSwiper from "../swipers/NewArrivalsSwiper";
import ExploreNewArrivals from "./ExploreNewArrivals";

const Index = (props) => {
    return (
        <div className={"py-2"}>
            <span className='font-600 uppercase text-2xl tracking-wider'>NEW ARRIVALS</span>
            <NewArrivalsSwiper isMobile={true}/>
            <ExploreNewArrivals/>
        </div>
    );
};

export default Index;