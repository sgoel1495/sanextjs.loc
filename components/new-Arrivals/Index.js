import React from 'react';
import NewArrivalsSwiper from "../swipers/NewArrivalsSwiper";

const Index = (props) => {
    return (
        <div className={"py-2"}>
            <span>NEW ARRIVALS</span>
            <NewArrivalsSwiper isMobile={true}/>
        </div>
    );
};

export default Index;