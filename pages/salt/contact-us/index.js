import React, {Fragment, useCallback, useContext, useEffect, useState} from "react";
import PageHead from "../../../components/PageHead";
import InfoBand from "../../../components/info-band/InfoBand";
import LooksNavbar from "../../../components/navbar/LookNavbar";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import Footer from "../../../components/footer/Footer";
import AppWideContext from "../../../store/AppWideContext";
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';


/**
 * @todo Sambhav css pls
 */

function ContactUsPage() {
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

    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: 28.501388,
        lng: 77.086267
    };

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCneIy_canWR3DwYcH-IR0Ho-CmQCA-VjY"
    });

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, []);

    const mobileView = null;
    const browserView = <>
        <div className={`grid grid-cols-2 gap-y-8 text-center`}>
            <p className={`font-600 col-span-2`}>We Would Love To Hear From You!</p>
            <div className={`flex flex-col gap-y-4`}>
                <p className={`font-600`}>Corporate Office</p>
                <div className="text-sm text-black/50 font-600">
                    <p>Mon to Fri - 9:00 am to 7:00 pm</p>
                    <p className={`mb-4`}>Sat - 9:00 am to 2:00 pm</p>
                    <p>Plot 508, Udyog Vihar Phase V,</p>
                    <p>Gurugram, Haryana 122016</p>
                </div>
            </div>
            <div className={`flex flex-col gap-y-4`}>
                <p className={`font-600`}>SALT Experience Store</p>
                <div className="text-sm text-black/50 font-600">
                    <p className={`mb-4`}>11:00 am to 8:30 pm</p>
                    <p>DLF Mega Mall (Shop No LG-51)</p>
                    <p>Golf Course Road, Gurugram, Haryana 122002</p>
                    <p>Open all 7 days</p>
                </div>
            </div>
            <div className={`col-span-2 text-black/50 font-600`}>
                <p>care@saltattire.com</p>
                <p>18002709515</p>
            </div>
            <div className={`col-span-2`}>
                <button className={`bg-black font-500 px-12 py-3 text-white uppercase`}>Contact Us</button>
            </div>
        </div>
        {(isLoaded)
            ? <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <Marker position={center} title='Salt Store' icon={WEBASSETS + "/assets/images/salt_black.png"}/>
            </GoogleMap>
            : null
        }
    </>;

    return (
        <Fragment>
            <PageHead url="/salt/contact-us" id="contactus" isMobile={dataStore.mobile}/>
            <div className={"navigator fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white/90' : ' bg-white/80']}>
                <InfoBand/>
                <LooksNavbar isMobile={dataStore.mobile}/>
            </div>
            <CategoryHeaderImage category={category}/>
            <section className="container my-20 grid grid-cols-2 gap-x-10 items-start justify-center">
                {(dataStore.mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )

}

export default ContactUsPage;
