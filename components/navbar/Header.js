import React, {useCallback} from 'react';
import InfoBand from "../info-band/InfoBand";
import Navbar from "./Navbar";
import Menu from "./Menu";

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
    const controller = useCallback(() => {
        const isSet = (window.scrollY > 0)
        if (isSet !== navControl)
            setNavControl(isSet)
    }, [navControl])
    React.useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => {
            window.removeEventListener('scroll', controller)
        };
    }, [controller]);

    const mobileView = (props.type === "minimal")
        ? <div className={"fixed inset-x-0 top-0 z-20"}>
            <InfoBand/>
            <Navbar {...props} />
        </div>
        : <div>
            <InfoBand/>
            <Navbar {...props} />
        </div>
    const browserView = (props.type === "minimal" || props.type === "menu")
        ? <div className={"navigator sticky top-0 z-20 bg-white"}>
            <Navbar {...props} />
        </div>
        : <div className={"navigator z-30 duration-300 hover:bg-white transition-colors sticky top-0 right-0 left-0" + [navControl ? ' bg-white/90' : ' bg-white/95']}>
            <InfoBand/>
            <Navbar {...props} />
        </div>

    return props.isMobile ? mobileView : browserView
};

export default Header;