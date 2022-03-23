import React, {createRef, Fragment, useContext, useEffect, useState} from "react";
import InspiredByTrueStory from "../../../../components/about-salt/InspiredByTrueStory";
import Radhika from "../../../../components/about-salt/Radhika";
import OurDesign from "../../../../components/about-salt/OurDesign";
import Fabric from "../../../../components/about-salt/Fabric";
import SizeFit from "../../../../components/about-salt/SizeFit";
import FinishingDetails from "../../../../components/about-salt/FinishingDetails";
import WhySalt from "../../../../components/about-salt/WhySalt";
import PageHead from "../../../../components/PageHead";
import InfoBand from "../../../../components/info-band/InfoBand";
import LooksNavbar from "../../../../components/navbar/LookNavbar";
import Footer from "../../../../components/footer/Footer";
import AppWideContext from "../../../../store/AppWideContext";
import AffordableLuxury from "../../../../components/about-salt/AffordableLuxury";


function FinishingDetailsPage(){
    const {dataStore} = useContext(AppWideContext);
    const category = "Contact Us";

    // NavBar Controls
    const [navControl, setNavControl] = useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => window.removeEventListener('scroll', controller)
    }, []);

    const scrollToRef = createRef();
    useEffect(()=>{
        setTimeout(() => {
            scrollToRef.current.scrollIntoView({ behavior: 'smooth' })
        }, 500)
    },[scrollToRef]);


    const mobileView = null;
    const browserView = (
        <>
            <section id={`radhika_story`} title={`Radhika Story`}>
                <InspiredByTrueStory isMobile={dataStore.mobile}/>
                <Radhika isMobile={dataStore.mobile}/>
            </section>
            <section id={`our_design`} title={`Our Design`}>
                <OurDesign isMobile={dataStore.mobile}/>
            </section>
            <section id={`fabric`} title={`Fabric`}>
                <Fabric isMobile={dataStore.mobile}/>
            </section>
            <section id={`size_fit`} title={`Size Fit`}>
                <SizeFit isMobile={dataStore.mobile}/>
            </section>
            <section id={`affordable_luxury`} title={`Affordable Luxury`}>
                <AffordableLuxury isMobile={dataStore.mobile} />
            </section>
            <section id={`finishing_details`} title={`Finishing Details`}  ref={scrollToRef}>
                <FinishingDetails isMobile={dataStore.mobile}/>
            </section>
            <section id={`why_salt`} title={`WhySalt`} className={`mb-10`}>
                <WhySalt isMobile={dataStore.mobile}/>
            </section>
        </>
    );

    return (
        <Fragment>
            <PageHead url="/salt/about-us/finishing-details" id="aboutusfinishingdetails" isMobile={dataStore.mobile}/>
            <div className={"navigator fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white/90' : ' bg-white/80']}>
                <InfoBand/>
                <LooksNavbar isMobile={dataStore.mobile}/>
            </div>
            {(dataStore.mobile) ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )

}

export default FinishingDetailsPage;
