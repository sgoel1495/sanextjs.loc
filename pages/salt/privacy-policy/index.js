import {Fragment, useContext, useEffect, useState} from 'react';
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import InfoBand from "../../../components/info-band/InfoBand";
import LooksNavbar from "../../../components/navbar/LookNavbar";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";

/**
 * @todo @Sambhav css
 * @returns {JSX.Element}
 */


function PrivacyPolicyPage() {
    const {dataStore} = useContext(AppWideContext);

    // NavBar Controls
    const [navControl, setNavControl] = useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => window.removeEventListener('scroll', controller)
    }, []);
    const category = "Privacy Policy";

    const mobileView = null;

    const browserView = <div>
        <p>We view protection of your privacy as a very important principle. This privacy policy (the "Policy"), is published pursuant to Section 43A of the Information Technology Act, 2000 (the "Act"), and the Rules thereunder . We understand clearly that You and Your Personal Information is one of our most important assets. We store and process Your Information including any sensitive financial information collected (as defined under the Act and the Rules), if any, on computers that may be protected by physical as well as reasonable technological security measures and procedures in accordance with the Act and the Rules. If you object to our current Privacy Policy and your information being transferred or used in this way please do not use Website.</p>
    </div>;

    return (
        <Fragment>
            <PageHead url="/salt/privacy-policy" id="privacypolicy" isMobile={dataStore.mobile}/>
            <div
                className={"navigator fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white/90' : ' bg-white/80']}>
                <InfoBand/>
                <LooksNavbar isMobile={dataStore.mobile}/>
            </div>
            <CategoryHeaderImage category={category}/>
            <section className="container my-20 grid grid-cols-2 gap-x-10 gap-y-5">
                {(dataStore.mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    );
}

export default PrivacyPolicyPage;
