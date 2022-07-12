import React, {useContext, useState} from 'react';
import ReactDom from "react-dom";
import NotifyMeModal from "../../../common/NotifyMeModal";
import getUserO from "../../../../helpers/getUserO";
import AppWideContext from "../../../../store/AppWideContext";
import Toast from "../../../common/Toast";

const NotifyMe = (props) => {
    const [showNotify, setShowNotify] = useState(false)
    const [error, setError] = useState(null)

    const {dataStore} = useContext(AppWideContext);
    return (
        <>
            <button className={"bg-white py-2 px-8 mt-4 rounded-full font-500"} onClick={() => setShowNotify(true)}>
                Notify Me
            </button>
            <Toast show={error} hideToast={() => setError(null)}>
                <span>{error}</span>
            </Toast>
            {showNotify &&
            ReactDom.createPortal(
                <NotifyMeModal
                    setError={setError}
                    closeModal={setShowNotify}
                    isMobile={true}
                    userO={getUserO(dataStore)}
                    product={props.prod}
                />,
                document.getElementById("measurementmodal"))
            }
        </>
    );
};

export default NotifyMe;