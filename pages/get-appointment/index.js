import PageHead from "../../components/PageHead";
import InfoBand from "../../components/info-band/InfoBand";
import LooksNavbar from "../../components/navbar/LookNavbar";
import CategoryHeaderImage from "../../components/common/CategoryHeaderImage";
import Footer from "../../components/footer/Footer";
import AppWideContext from "../../store/AppWideContext";
import React, {Fragment, useContext, useEffect, useState} from "react";

/**
 * @TODO FORM SUBMISSION LOGIC
 * @returns {JSX.Element}
 * @constructor
 */

function GetAppointmentPage() {
    const {dataStore} = useContext(AppWideContext);

    // NavBar Controls
    const [navControl, setNavControl] = useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => window.removeEventListener('scroll', controller)
    }, []);

    const focusStyle = "focus:ring-offset-0 focus:ring-0"
    const labelStyle = "block mb-1 font-500";
    const inputStyle = `block w-full border-none bg-black/5 px-4 py-3 ${focusStyle}`;
    const textareaStyle = `${inputStyle} min-h-[100px]`;

    const mobileView = null;
    const browserView = (
        <>
            <div className={`border-b border-black/30 col-span-2 text-center pb-8 mb-16`}>
                <div className={`text-2xl font-600 mb-8`}>Book An Appointment In Store</div>
                <div className={`mb-8 font-500`}>
                    <p>SALT Experience Store, DLF Mega Mall</p>
                    <p>(Shop No LG-51, Golf Course Road, Gurgaon)</p>
                    <p>Open all 7 days</p>
                </div>
                <div className={`text-sm font-500`}>Store Timings: 11:00 am - 08:30 pm</div>
            </div>
            <form className={`grid grid-cols-2 gap-x-20 gap-y-5`}>
                <div className={`grid grid-cols-2 gap-x-10 gap-y-8`}>
                    <div>
                        <label className={labelStyle} htmlFor="date">Choose Date</label>
                        <input className={inputStyle} id="date" type="datetime-local"/>
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="time">Preferred Time</label>
                        <input className={inputStyle} id="time" type="time"/>
                    </div>
                    <div className={`col-span-2`}>
                        <label className={labelStyle} htmlFor="lastname">Last Name</label>
                        <input className={inputStyle} id="lastname" type="text"/>
                    </div>
                    <div className={`col-span-2`}>
                        <label className={labelStyle} htmlFor="phonenumber">Phone Number</label>
                        <input className={inputStyle} id="phonenumber" type="tel"/>
                    </div>
                    <div className={`col-span-2`}>
                        <label className={labelStyle} htmlFor="message">Anything you would like to tell us?</label>
                        <textarea className={textareaStyle} id="message"/>
                    </div>
                    <div className={`col-span-2`}>
                        <label className={labelStyle} htmlFor="storelocation">Select Store Location</label>
                        <select className={inputStyle} id="storelocation">
                            <option value="dlfmegamall">DLF MEGA MALL</option>
                        </select>
                    </div>
                </div>
                <div className={`flex flex-col gap-y-8`}>
                    <div>
                        <label className={labelStyle} htmlFor="firstname">First Name</label>
                        <input className={inputStyle} id="firstname" type="text"/>
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="email">Email</label>
                        <input className={inputStyle} id="email" type="email"/>
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="shoppedbefore">Have you shopped with us before?</label>
                        <select className={inputStyle} id="shoppedbefore">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="somethingspecific">Anything you would like to tell us?</label>
                        <textarea className={textareaStyle} id="somethingspecific"/>
                    </div>
                </div>
                <div className={`col-span-2  mt-10 flex justify-center`}>
                    <button className={`bg-black text-white font-500 text-sm tracking-wide py-3 px-16`}>
                        BOOK AN APPOINTMENT
                    </button>
                </div>
            </form>
        </>
    );

    const category = "Get Virtual Appointment"

    return (
        <Fragment>
            <PageHead url="/salt/get-appointment" id="getappointment" isMobile={dataStore.mobile}/>
            <div className={"navigator fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white/90' : ' bg-white/80']}>
                <InfoBand/>
                <LooksNavbar isMobile={dataStore.mobile}/>
            </div>
            <CategoryHeaderImage category={category}/>
            <section className="container my-20 select-none">
                {(dataStore.mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )


}

export default GetAppointmentPage;
