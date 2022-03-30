import React from 'react';
import InfoBand from "../info-band/InfoBand";
import Navbar from "./Navbar";

const Index = (props) => {
    const [navControl, setNavControl] = React.useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    React.useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => {
            window.removeEventListener('scroll', controller)
        };
    }, []);

    const mobileView = <>
        <InfoBand/>
        <Navbar {...props}/>
    </>
    const browserView = props.type === "minimal" ?
        <div
            className={"navigator sticky top-0 z-10 bg-white"}>
            <Navbar {...props}/>
        </div>
        :
        <div
            className={"navigator z-10 duration-300 hover:bg-white transition-colors fixed top-0 right-0 left-0" + [navControl ? ' bg-white' : ' bg-white/60']}>
            <InfoBand/>
            <Navbar {...props}/>
        </div>

    return props.isMobile ? mobileView : browserView
};

export default Index;