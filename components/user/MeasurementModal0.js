import {Fragment} from "react";


function MeasurementModal0 ({ closeModal, isMobile, addNew, pastOrders }) {


    const mobileView = null;
    const browserView = ()=>{
        return <Fragment>
            <div onClick={closeModal}>X</div>
            <div>SELECT MEASUREMENTS</div>
            <div onClick={pastOrders}>CHOOSE MEASUREMENTS FROM PAST ORDERS</div>
            <div>OR</div>
            <div onClick={addNew}>ENTER NEW MEASUREMENTS</div>
            <div onClick={addNew}>CONTINUE %gt;</div>
            <div>BODY MEASUREMENTS</div>
        </Fragment>

    };


    return (isMobile) ? mobileView : browserView();
}

export default MeasurementModal0;