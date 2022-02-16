import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'

/**
 *
 * @param props, will contain title and message
 * @returns {React.ReactPortal}
 * @constructor
 */

const Toast = (props) => {
    const [node] = useState(document.createElement('div'));
    const ref = React.useRef();

    // Tailwind CSS
    const toastClasses = ['bg-black', 'p-4', 'z-toast', 'sticky', 'top-10', 'right-10', 'max-w-[300px]', 'shadow-lg', 'text-white', 'text-sm', 'float-right'];


    useEffect(() => {
        if (props.show || props.msg) {
            document.querySelector('#toast')
                .classList.add(...toastClasses);
            if (ref.current) {
                clearTimeout(ref.current);
            }
            ref.current = setTimeout(() => {
                if (props.setToastMessage) {
                    props.setToastMessage(null)
                } else {
                    props.hideToast();
                }
            }, props.duration || 5000);
        } else {
            document.querySelector('#toast')
                .classList.remove(...toastClasses);
        }
        return () => {
            if (props.setToastMessage)
                props.setToastMessage(null);
            document.querySelector('#toast')
                .classList.remove(...toastClasses);
        }
    }, [props])

    return ReactDOM.createPortal(props.msg ? <p>msg</p> : props.show ? props.children : <></>, document.querySelector('#toast'));
};

export default Toast;