import {Fragment, useContext, useEffect, useState} from "react";
import PageHead from "../../../components/PageHead";
import Footer from "../../../components/footer/Footer";
import AppWideContext from "../../../store/AppWideContext";
import InspiredByTrueStory from "../../../components/about-salt/InspiredByTrueStory";
import Radhika from "../../../components/about-salt/Radhika";
import OurDesign from "../../../components/about-salt/OurDesign";
import Fabric from "../../../components/about-salt/Fabric";
import SizeFit from "../../../components/about-salt/SizeFit";
import FinishingDetails from "../../../components/about-salt/FinishingDetails";
import WhySalt from "../../../components/about-salt/WhySalt";
import Header from "../../../components/navbar/Header";


/**
 * @todo Sambhav css pls
 */

function SizeFitPage(){
    const {dataStore} = useContext(AppWideContext);
    const category = "Contact Us";



    const mobileView = null;
    const browserView = <div>
        <InspiredByTrueStory isMobile={dataStore.mobile} />
        <Radhika isMobile={dataStore.mobile} />
        <OurDesign isMobile={dataStore.mobile} />
        <Fabric isMobile={dataStore.mobile} />
        <SizeFit isMobile={dataStore.mobile} />
        <FinishingDetails isMobile={dataStore.mobile} />
        <WhySalt isMobile={dataStore.mobile} />
    </div>;

    return (
        <Fragment>
            <PageHead url="/salt/about-us/size-fit" id="aboutussizefit" isMobile={dataStore.mobile}/>
            <Header type={"mimoto"}/>
            <section className="container my-20 grid grid-cols-2 gap-x-10 gap-y-5">
                {(dataStore.mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )

}

export default SizeFitPage;