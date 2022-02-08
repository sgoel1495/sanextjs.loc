import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'

const Toast = props => {
    const [node] = useState(document.createElement('div'));
    const ref = React.useRef()

    // Tailwind CSS
    const toastClasses = ['bg-black', 'p-4', 'z-toast', 'absolute', 'top-10', 'right-10', 'max-w-[300px]', 'shadow-lg', 'text-white', 'text-sm']


    useEffect(() => {
        if (props.show) {
            document.querySelector('#toast')
                .classList.add(...toastClasses);
            if (ref.current) {
                clearTimeout(ref.current);
            }
            ref.current = setTimeout(() => {
                props.hideToast();
            }, props.duration || 5000);
        } else {
            document.querySelector('#toast')
                .classList.remove(...toastClasses);
        }
        return () => {
            document.querySelector('#toast')
                .classList.remove(...toastClasses);
        }
    }, [props])

    return ReactDOM.createPortal(props.show ? props.children : <></>, document.querySelector('#toast'));
};

export default Toast;