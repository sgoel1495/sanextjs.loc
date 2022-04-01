import React from 'react';
import InfoBand from "../info-band/InfoBand";
import Navbar from "./Navbar";

/**
 *
 * @param props
 * type - String(optional) (possible values:[null,"minimal","shopMenu"])
 *      null - default header of landing page
 *      shopMenu - Web - Mimoto menu
 *      shopMenu - Mobile - header for the shop-category page (e.g. /shop-shirts)
 *      minimal - Web -  used for the menu below category video which replaces the shopMenu header and becomes sticky
 *      minimal - Mobile - header for about us pages
 * isMobile - Boolean(required)
 * subMenu - JSX(optional) - Only Mobile - used only with shopMenu type - will be displayed when the header becomes sticky
 * @returns {JSX.Element}
 **/

const Header = (props) => {
    const [navControl, setNavControl] = React.useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    React.useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => {
            window.removeEventListener('scroll', controller)
        };
    }, []);

    const mobileView = props.type === "minimal"
        ? <div className={"fixed inset-x-0 top-0 z-20"}>
            <InfoBand/>
            <Navbar {...props} />
        </div>
        : <>
            <InfoBand/>
            <Navbar {...props} />
        </>
    const browserView = props.type === "minimal" ?
        <div
            className={"navigator sticky top-0 z-20 bg-white"}>
            <Navbar {...props} />
        </div>
        :
        <div
            className={"navigator z-20 duration-300 hover:bg-white transition-colors fixed top-0 right-0 left-0" + [navControl ? ' bg-white' : ' bg-white/60']}>
            <InfoBand/>
            <Navbar {...props} />
        </div>

    return props.isMobile ? mobileView : browserView
};

export default Header;