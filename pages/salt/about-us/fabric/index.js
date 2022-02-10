import {Fragment, useContext, useEffect, useState} from "react";
import PageHead from "../../../components/PageHead";
import InfoBand from "../../../components/info-band/InfoBand";
import LooksNavbar from "../../../components/navbar/LookNavbar";
import Footer from "../../../components/footer/Footer";
import AppWideContext from "../../../store/AppWideContext";
import InspiredByTrueStory from "../../../components/about-salt/InspiredByTrueStory";
import Radhika from "../../../components/about-salt/Radhika";
import OurDesign from "../../../components/about-salt/OurDesign";
import Fabric from "../../../components/about-salt/Fabric";
import SizeFit from "../../../components/about-salt/SizeFit";
import FinishingDetails from "../../../components/about-salt/FinishingDetails";
import WhySalt from "../../../components/about-salt/WhySalt";


/**
 * @todo Sambhav css pls
 */

function FabricPage(){
    const {dataStore} = useContext(AppWideContext);
    const category = "Contact Us";

    // NavBar Controls
    const [navControl, setNavControl] = useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => window.removeEventListener('scroll', controller)
    }, []);


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
            <PageHead url="/salt/about-us/fabric" id="aboutusfabric" isMobile={dataStore.mobile}/>
            <div className={"navigator fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white/90' : ' bg-white/80']}>
                <InfoBand/>
                <LooksNavbar isMobile={dataStore.mobile}/>
            </div>
            <section className="container my-20 grid grid-cols-2 gap-x-10 gap-y-5">
                {(dataStore.mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )

}

export default FabricPage;