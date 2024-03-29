import React, {Fragment, useContext, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import AppWideContext from "../../store/AppWideContext";
import {isMobile} from "react-device-detect";

/**
 *
 * @param props
 * show - boolean(required) (weather to show the toast or not),
 * duration - int(optional)(default - 5000ms) (after how much time(in ms) the toast should disappear)
 * hideToast - callback(optional) (will be called when the toast is removed),
 * children - data to be displayed
 * @returns {React.ReactPortal}
 * @constructor
 */

const Toast = (props) => {
    const ref = React.useRef();
    const [mobile, setMobile] = useState(false);
    // Tailwind CSS
    const toastClasses = mobile ? ['bg-black', 'p-4', 'w-full', 'text-white', 'text-sm', 'mt-1', 'z-[100]'] : ['bg-black', 'fade-up', 'fixed', 'top-20', 'right-20', 'p-4', 'max-w-[300px]', 'shadow-lg', 'text-white', 'text-sm', 'mt-1', 'z-[100]'];
    let style = {}
    if (props.bottom) {
        style["marginBottom"] = props.bottom
    }
    useEffect(() => {
        setMobile(isMobile)
    }, [])
    useEffect(() => {
        if (props.show) {
            if (ref.current) {
                clearTimeout(ref.current);
            }
            ref.current = setTimeout(() => {
                if (props.hideToast)
                    props.hideToast();
            }, props.duration || 5000);
        } else {
            if (ref.current) {
                clearTimeout(ref.current);
            }
        }
    }, [props])

    const returnElement = (props.show) ? <div className={toastClasses.join(" ")} style={style}>{props.children}</div> : null;
    if (returnElement)
        return ReactDOM.createPortal(returnElement, document.getElementById(mobile ? "toastMobContainer" : "toastContainer"));
    else
        return null;
};

export default Toast;
