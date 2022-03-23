import React from 'react';
import NewArrivalsSwiper from "../swipers/NewArrivalsSwiper";
import ExploreNewArrivals from "./ExploreNewArrivals";

const Index = (props) => {
    return (
        <div className={"py-2"}>
            <span>NEW ARRIVALS</span>
            <NewArrivalsSwiper isMobile={true}/>
            <ExploreNewArrivals/>
        </div>
    );
};

export default Index;