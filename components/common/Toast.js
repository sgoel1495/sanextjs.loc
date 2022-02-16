import React, {useEffect} from 'react';
import ReactDOM from 'react-dom'

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

    // Tailwind CSS
    const toastClasses = ['bg-black', 'p-4', 'max-w-[300px]', 'shadow-lg', 'text-white', 'text-sm', 'mt-1'];


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
        return () => {
        }
    }, [props])

    return ReactDOM.createPortal(props.show ? <p className={toastClasses.join(" ")}>{props.children}</p> : <></>, document.getElementById('toastContainer'));
};

export default Toast;