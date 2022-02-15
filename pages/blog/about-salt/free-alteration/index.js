import {Fragment, useContext, useEffect, useState} from "react";
import PageHead from "../../../../components/PageHead";
import InfoBand from "../../../../components/info-band/InfoBand";
import Navbar from "../../../../components/navbar/Navbar";
import Footer from "../../../../components/footer/Footer";
import AppWideContext from "../../../../store/AppWideContext";
import WhyCustomTailoredClothing from "./index";
import StylingServices from "../../../../components/blog/StylingServices";
import FreeAlterations from "../../../../components/blog/FreeAlterations";
import PremiumFabricQuality from "../../../../components/blog/PremiumFabricQuality";
import NoInventoryNoMassProduction from "../../../../components/blog/NoInventoryNoMassProduction";
import EthicalFairTreatment from "../../../../components/blog/EthicalFairTreatment";
import Link from "next/link";

function FreeAlterationPage(){
    const {dataStore} = useContext(AppWideContext);
    const [navControl, setNavControl] = useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => window.removeEventListener('scroll', controller)
    }, []);

    const mobileView = null;
    const browserView = <div>
        <div>
            <Link href="/blog/about-salt">
                About Salt
            </Link>
            <div>Our Values</div>
        </div>
        <FreeAlterations isMobile={false} main={false} />
        <WhyCustomTailoredClothing isMobile={false} main={false} />
        <StylingServices isMobile={false} main={false} />
        <PremiumFabricQuality isMobile={false} main={false} />
        <NoInventoryNoMassProduction isMobile={false} main={false} />
        <EthicalFairTreatment isMobile={false} main={false} />
    </div>;

    return (
        <Fragment>
            <PageHead url="/blog/about-salt/free-alteration" id="free-alteration" isMobile={dataStore.mobile}/>
            <div className={"navigator fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white' : ' bg-white/60']}>
                <InfoBand/>
                <Navbar isMobile={dataStore.mobile}/>
            </div>
            {(dataStore.mobile) ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>);

}

export default FreeAlterationPage;