import PageHead from "../../components/PageHead";
import InfoBand from "../../components/info-band/InfoBand";
import LooksNavbar from "../../components/navbar/LookNavbar";
import CategoryHeaderImage from "../../components/common/CategoryHeaderImage";
import Footer from "../../components/footer/Footer";
import AppWideContext from "../../store/AppWideContext";
import {Fragment, useContext, useEffect, useState} from "react";

/**
 * @TODO FORM SUBMISSION LOGIC
 * @returns {JSX.Element}
 * @constructor
 */

function GetVirtualAppointmentPage(){
    const {dataStore} = useContext(AppWideContext);
    // NavBar Controls
    const [navControl, setNavControl] = useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => window.removeEventListener('scroll', controller)
    }, []);

    const mobileView = null;
    const browserView = <div>
        <div>Book An Online Styling Session</div>
        <form>
            <div>
                <div>
                    <label htmlFor="date">Choose Date</label>
                    <input id="date" type="datetime-local" />
                    <label htmlFor="time">Preferred Time</label>
                    <input id="time" type="time" />
                </div>
                <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input id="lastname" type="text" />
                </div>
                <div>
                    <label htmlFor="phonenumber">Phone Number</label>
                    <input id="phonenumber" type="tel" />
                </div>
                <div>
                    <label htmlFor="message">Anything you would like to tell us?</label>
                    <textarea id="message" />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="firstname">First Name</label>
                    <input id="firstname" type="text" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" />
                </div>
                <div>
                    <label htmlFor="shoppedbefore">Have you shopped with us before?</label>
                    <select id="shoppedbefore">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="somethingspecific">Anything you would like to tell us?</label>
                    <textarea id="somethingspecific"/>
                </div>
            </div>
            <div>
                BOOK A VIRTUAL STYLING SESSION
            </div>
        </form>
    </div>;

    const category = "Get Virtual Appointment"

    return (
        <Fragment>
            <PageHead url="/salt/get-virtual-appointment" id="virtualappointment" isMobile={dataStore.mobile}/>
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

export default GetVirtualAppointmentPage;
