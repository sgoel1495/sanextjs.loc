import React, {useContext, useState} from 'react';
import ReactDom from "react-dom";
import NotifyMeModal from "../../../common/NotifyMeModal";
import AppWideContext from "../../../../store/AppWideContext";
import Toast from "../../../common/Toast";
import {getUserObject} from "../../../../helpers/addTocart";
import {connect} from "react-redux";

const NotifyMe = (props) => {
    const [showNotify, setShowNotify] = useState(false)
    const [error, setError] = useState(null)

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
                    userO={getUserObject(props.userData)}
                    product={props.prod}
                />,
                document.getElementById("measurementmodal"))
            }
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData
    }
}

export default connect(mapStateToProps)(NotifyMe);