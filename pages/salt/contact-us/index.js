import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
import PageHead from "../../../components/PageHead";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import Footer from "../../../components/footer/Footer";
import AppWideContext from "../../../store/AppWideContext";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Header from "../../../components/navbar/Header";


/**
 * @todo Sambhav css pls
 * @todo bot to be integrated with both contact us button
 */

function ContactUsPage() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext);
    const category = "Contact Us";

    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: 28.501388,
        lng: 77.086267
    };

    const { isLoaded } = useJsApiLoader({
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

    const mobileView = (
        <section className="container my-20 flex flex-col gap-y-6 items-center text-center">
            <p className={`font-600`}>We Would Love To Hear From You!</p>
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
            <div className={`text-black/50 font-600`}>
                <p>care@saltattire.com</p>
                <p>18002709515</p>
            </div>
            <button className={`bg-black font-500 px-12 py-3 text-white uppercase tracking-wider`}>Contact Us</button>
        </section>
    );

    const browserView = <section className="container my-20 grid grid-cols-2 gap-x-10 items-start justify-center">
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
                <Marker position={center} title='Salt Store' icon={WEBASSETS + "/assets/images/salt_black.png"} />
            </GoogleMap>
            : null
        }
    </section>;

    return (
        <Fragment>
            <PageHead url="/salt/contact-us" id="contactus" isMobile={dataStore.mobile} />
            <Header type={"mimoto"}/>
            <CategoryHeaderImage category={category} />
            {dataStore.mobile ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile} minimal={true} color={"#ffffff"} />
        </Fragment>
    )

}

export default ContactUsPage;
