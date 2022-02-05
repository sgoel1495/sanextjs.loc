import {Fragment, useContext, useEffect, useState} from 'react';
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import InfoBand from "../../../components/info-band/InfoBand";
import LooksNavbar from "../../../components/navbar/LookNavbar";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";


function FaqPage() {
    const {dataStore} = useContext(AppWideContext);

    const [navControl, setNavControl] = useState(false);
    const controller = () => {
        if (window.scrollY > 0) {
            setNavControl(true);
        } else {
            setNavControl(false);
        };
    };
    useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => {
            window.removeEventListener('scroll', controller)
        };
    },[]);
    const category = "faq";
    return (
        <Fragment>
            <PageHead url="/salt/faq" id="faq" isMobile={dataStore.mobile}/>
            <div className={"fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white/90' : ' bg-white/80']}>
                <InfoBand/>
                <LooksNavbar isMobile={dataStore.mobile}/>
            </div>
            <CategoryHeaderImage category={category}/>
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )
}


export default FaqPage;
