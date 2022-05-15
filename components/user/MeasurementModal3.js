import {Fragment, useState} from "react";

function MeasurementModal3({closeModal, isMobile, measurement, lastModal, saveModal}){

    const mobileView = null;
    const browserView = <Fragment>
        <div>
            Review
            <span>YOUR TAILORED FIT</span>
            <span>MEASUREMENTS</span>
        </div>
        <div>
            <div>BUST : {measurement.bust}</div>
            <div>WAIST : {measurement.waist}</div>
            <div>WEARING WAIST / STOMACH : {measurement.wearing_waist}</div>
            <div>HIPS : {measurement.hips}</div>
            <div>BICEPS : {measurement.biceps}</div>
            <div>HEIGHT : {measurement.height_f} FT {measurement.height_i} INCH</div>
            <div>SHOULDER : {measurement.shoulder}</div>
            <div>OTHERS : {measurement.others}</div>
        </div>

        <div>
            <div onClick={lastModal()}>
                &lt; BACK
                <span>SIZE REVIEW</span>
            </div>
            <div onClick={saveModal()}>SAVE</div>
        </div>
    </Fragment>

    return (isMobile) ? mobileView : browserView;
}
export default MeasurementModal3;