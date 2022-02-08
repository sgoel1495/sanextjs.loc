import {Fragment, useContext} from "react";
import PageHead from "../../../components/PageHead";
import InfoBand from "../../../components/info-band/InfoBand";
import LooksNavbar from "../../../components/navbar/LookNavbar";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import Footer from "../../../components/footer/Footer";
import AppWideContext from "../../../store/AppWideContext";

/**
 * @todo Sambhav css pls
 */

function ContactUsPage(){
    const {dataStore} = useContext(AppWideContext);

    const mobileView = null;
    const browserView = null;

    return (
        <Fragment>
            <PageHead url="/salt/contact-us" id="contactus" isMobile={dataStore.mobile}/>
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

export default ContactUsPage;