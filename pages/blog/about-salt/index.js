import PageHead from "../../../components/PageHead";
import AppWideContext from "../../../store/AppWideContext";
import {Fragment, useContext, useEffect} from "react";
import InfoBand from "../../../components/info-band/InfoBand";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";


function BlogAboutSaltPage(){
    const {dataStore} = useContext(AppWideContext);
    const [navControl, setNavControl] = useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => window.removeEventListener('scroll', controller)
    }, []);
    const category = "Contact Us";

    const mobileView = null;
    const browserView = null;

    return (
        <Fragment>
            <PageHead url="/blog/about-salt" id="aboutsalt" isMobile={dataStore.mobile}/>
            <div className={"navigator fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white' : ' bg-white/60']}>
                <InfoBand/>
                <Navbar isMobile={dataStore.mobile}/>
            </div>
            {(dataStore.mobile) ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>);

}
export default BlogAboutSaltPage;