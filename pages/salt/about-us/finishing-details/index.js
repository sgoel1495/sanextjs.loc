import React, {createRef, Fragment, useContext, useEffect, useState} from "react";
import InspiredByTrueStory from "../../../../components/about-salt/InspiredByTrueStory";
import Radhika from "../../../../components/about-salt/Radhika";
import OurDesign from "../../../../components/about-salt/OurDesign";
import Fabric from "../../../../components/about-salt/Fabric";
import SizeFit from "../../../../components/about-salt/SizeFit";
import FinishingDetails from "../../../../components/about-salt/FinishingDetails";
import WhySalt from "../../../../components/about-salt/WhySalt";
import PageHead from "../../../../components/PageHead";
import Footer from "../../../../components/footer/Footer";
import AppWideContext from "../../../../store/AppWideContext";
import AffordableLuxury from "../../../../components/about-salt/AffordableLuxury";
import Header from "../../../../components/navbar/Header";
import {isMobile} from "react-device-detect";

function SaltFinishingDetailsPage(){
    const {dataStore} = useContext(AppWideContext);
    const category = "Contact Us";
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
        setMobile(isMobile);
    }, []); 
    const scrollToRef = createRef();
    useEffect(()=>{
        setTimeout(() => {
            scrollToRef.current.scrollIntoView({ behavior: 'smooth' })
        }, 500)
    },[scrollToRef]);


    const mobileView =  (
        <>
            <section id={`radhika_story`} title={`Radhika Story`}>
                <InspiredByTrueStory isMobile={true}/>
                <Radhika isMobile={true}/>
            </section>
            <section id={`our_design`} title={`Our Design`}>
                <OurDesign isMobile={true}/>
            </section>
            <section id={`fabric`} title={`Fabric`}>
                <Fabric isMobile={true}/>
            </section>
            <section id={`size_fit`} title={`Size Fit`}>
                <SizeFit isMobile={true}/>
            </section>
            <section id={`affordable_luxury`} title={`Affordable Luxury`}>
                <AffordableLuxury isMobile={true} />
            </section>
            <section id={`finishing_details`} title={`Finishing Details`}  ref={scrollToRef}>
                <FinishingDetails isMobile={true}/>
            </section>
            <section id={`why_salt`} title={`WhySalt`} className={`mb-10`}>
                <WhySalt isMobile={true}/>
            </section>
        </>
        );

    const browserView = (
        <>
            <section id={`radhika_story`} title={`Radhika Story`}>
                <InspiredByTrueStory isMobile={mobile}/>
                <Radhika isMobile={mobile}/>
            </section>
            <section id={`our_design`} title={`Our Design`}>
                <OurDesign isMobile={mobile}/>
            </section>
            <section id={`fabric`} title={`Fabric`}>
                <Fabric isMobile={mobile}/>
            </section>
            <section id={`size_fit`} title={`Size Fit`}>
                <SizeFit isMobile={mobile}/>
            </section>
            <section id={`affordable_luxury`} title={`Affordable Luxury`}>
                <AffordableLuxury isMobile={mobile} />
            </section>
            <section id={`finishing_details`} title={`Finishing Details`}  ref={scrollToRef}>
                <FinishingDetails isMobile={mobile}/>
            </section>
            <section id={`why_salt`} title={`WhySalt`} className={`mb-10`}>
                <WhySalt isMobile={mobile}/>
            </section>
        </>
    );

    return (
        <Fragment>
            <PageHead url="/salt/about-us/finishing-details" id="aboutusfinishingdetails" isMobile={mobile}/>
            <Header type={mobile?"minimal":"shopMenu"} isMobile={mobile}/>
            {(mobile) ? mobileView : browserView}
            <Footer isMobile={mobile}/>
        </Fragment>
    )

}

export default SaltFinishingDetailsPage;
