import {Fragment, useContext, useEffect, useState} from "react";
import PageHead from "../../../components/PageHead";
import InfoBand from "../../../components/info-band/InfoBand";
import LooksNavbar from "../../../components/navbar/LookNavbar";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import Footer from "../../../components/footer/Footer";
import AppWideContext from "../../../store/AppWideContext";
import { GoogleMap, Marker } from "react-google-maps";

/**
 * @todo Sambhav css pls
 */

function ContactUsPage(){
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
        <div>
            <div>We Would Love To Hear From You!</div>
            <div>
                <div>
                    Corporate Office
                    Mon to Fri - 9:00 am to 7:00 pm
                    Sat - 9:00 am to 2:00 pm
                    Plot 508, Udyog Vihar Phase V,
                    Gurugram, Haryana 122016
                </div>
                <div>
                    SALT Experience Store
                    11:00 am to 8:30 pm
                    DLF Mega Mall (Shop No LG-51)
                    Golf Course Road, Gurugram, Haryana 122002
                    Open all 7 days
                </div>
            </div>
            <div>
                care@saltattire.com
                18002709515
            </div>
            <div>
                Contact Us
            </div>
        </div>
        <div>
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: 28.501388, lng: 77.086267 }}
            >
                <Marker position={{ lat: 28.501388, lng: 77.086267 }} title='Salt Store' icon={WEBASSETS + "/assets/images/salt_black.png"} />
            </GoogleMap>
        </div>
    </div>;

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