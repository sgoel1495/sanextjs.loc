import React from 'react';
import InfoBand from "../info-band/InfoBand";
import Navbar from "./Navbar";

const Index = (props) => {

    const mobileView = <div
        className={"navigator z-10 duration-300 hover:bg-white transition-colors" + [props.navControl ? ' bg-white' : ' bg-white/60']}>
        <InfoBand/>
        <Navbar isMobile={props.isMobile}/>
    </div>
    const browserView = <div
        className={"navigator z-10 duration-300 hover:bg-white transition-colors fixed top-0 right-0 left-0" + [props.navControl ? ' bg-white' : ' bg-white/60']}>
        <InfoBand/>
        <Navbar isMobile={props.isMobile}/>
    </div>
    return props.isMobile ? mobileView : browserView
};

export default Index;