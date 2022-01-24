import React, {Fragment, useContext} from 'react';
import LooksNavbar from "../../components/navbar/LookNavbar";
import PageHead from "../../components/PageHead";
import AppWideContext from "../../store/AppWideContext";
import InfoBand from "../../components/info-band/InfoBand";
import Footer from "../../components/footer/Footer";


function LooksPage() {
    const {dataStore} = useContext(AppWideContext);

    const [navControl, setNavControl] = React.useState(false);
    const controller = () => {
        if (window.scrollY > 0) {
            setNavControl(true);
        } else {
            setNavControl(false);
        };
    };
    React.useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => {
            window.removeEventListener('scroll', controller)
        };
    },[]);

    const mobileView = null;
    const browserView = <Fragment>
        <PageHead url="/looks" id="looks" isMobile={dataStore.mobile}/>
        <div className={"fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white' : ' bg-white/60']}>
            <InfoBand />
            <LooksNavbar isMobile={dataStore.mobile}/>
        </div>
        <div>
            <div>SHOP THE LOOK</div>
            <div>LOOKS <span>WE</span> LOVE</div>
        </div>


        <Footer isMobile={dataStore.mobile}/>
    </Fragment>;

    return dataStore.mobile ? mobileView : browserView
}


export default LooksPage;
