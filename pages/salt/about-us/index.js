import {Fragment, useCallback, useContext, useEffect, useState} from "react";
import PageHead from "../../../components/PageHead";
import InfoBand from "../../../components/info-band/InfoBand";
import LooksNavbar from "../../../components/navbar/LookNavbar";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import Footer from "../../../components/footer/Footer";
import AppWideContext from "../../../store/AppWideContext";
import InspiredByTrueStory from "../../../components/about-salt/InspiredByTrueStory";
import Radhika from "../../../components/about-salt/Radhika";
import OurDesign from "../../../components/about-salt/OurDesign";
import Fabric from "../../../components/about-salt/Fabric";


/**
 * @todo Sambhav css pls
 */

function AboutUsPage(){
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
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
        <InspiredByTrueStory mobile={dataStore.mobile} />
        <Radhika mobile={dataStore.mobile} />
        <OurDesign mobile={dataStore.mobile} />
        <Fabric mobile={dataStore.mobile} />
    </div>;

    return (
        <Fragment>
            <PageHead url="/salt/about-us" id="aboutus" isMobile={dataStore.mobile}/>
            <div className={"navigator fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white/90' : ' bg-white/80']}>
                <InfoBand/>
                <LooksNavbar isMobile={dataStore.mobile}/>
            </div>
            <CategoryHeaderImage category={category}/>
            <section className="container my-20 grid grid-cols-2 gap-x-10 gap-y-5">
                {(dataStore.mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )

}

export default AboutUsPage;