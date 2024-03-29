import React, {Fragment, useContext, useState} from "react";
import TailoredSize from "../product-page/TailoredSize";
import {apiCall} from "../../helpers/apiCall";
import {getUserObject} from "../../helpers/addTocart";
import AppWideContext from "../../store/AppWideContext";
import {connect} from "react-redux";

function MeasurementBlock({measurement, showModal, deleteMeasurement, index, mobile, refresh, appConfig, userData}) {
    const [currentMeasurement, setCurrentMeasurement] = useState(measurement)

    const saveMeasurement = () => {
        apiCall("updateMeasurements", appConfig.apiToken, {
            user: getUserObject(userData),
            "measurments": currentMeasurement
        })
            .then(pData => {
                if (pData.status === 200) {
                    refresh()
                }
            })
            .catch(e => console.log(e.message))
    }

    const mobileView = (
        <div className="mt-6 pl-6">
            <div>
                <div className="font-bold mb-2">{index + 1}. Measurement Profile</div>
                <div className="mb-2">Measurement ID: {measurement.measure_id}</div>
                <div className="mb-2">Bust: {measurement.bust}</div>
                <div className="mb-2">Waist: {measurement.waist}</div>
                <div className="mb-2">Hips: {measurement.hips}</div>
                <div className="mb-2">
                    Height: {measurement.height_f}ft {measurement.height_i}inch(es)
                </div>
                <div className="mb-2">Biceps: {measurement.biceps}</div>
                <div className="mb-2">Wearing Waist: {measurement.wearing_waist}</div>
                <div className="mb-2">Shoulder: {measurement.shoulder}</div>
                <div className="mb-2">Others: {measurement.others}</div>
            </div>
            <div className="flex justify-evenly">
                <TailoredSize isMobile={true} currentMeasurement={currentMeasurement} setCurrentMeasurement={setCurrentMeasurement} setSize={() => {
                }} edit={true} saveMeasurement={saveMeasurement}/>

                <button
                    className="bg-black px-4 py-1.5 block text-white uppercase text-sm font-500 tracking-wide shadow-md my-2 rounded-full"
                    onClick={() => deleteMeasurement(measurement.measure_id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
    const browserView = (
        <div className="bg-[#f1f2f3] p-5 w-full">
            <div className="font-600 mb-2">{index + 1}. Measurement Profile</div>
            <div className="text-[#777777] text-sm grid grid-cols-2 justify-items-start my-4 font-500">
                <div className="py-1">Measurement ID: {measurement.measure_id}</div>
                <div className="py-1">Bust: {measurement.bust}</div>
                <div className="py-1">Waist: {measurement.waist}</div>
                <div className="py-1">Hips: {measurement.hips}</div>
                <div className="py-1">Height: {measurement.height_f}ft {measurement.height_i}inch(es)</div>
                <div className="py-1">Wearing Waist: {measurement.wearing_waist}</div>
                <div className="py-1">Biceps: {measurement.biceps}</div>
                <div className="py-1">Others: {measurement.others}</div>
                <div className="py-1">Shoulder: {measurement.shoulder}</div>
            </div>
            <div className="grid grid-cols-2 justify-items-start w-full items-center">
                <TailoredSize
                    isMobile={false}
                    currentMeasurement={currentMeasurement}
                    setCurrentMeasurement={setCurrentMeasurement}
                    setSize={() => {
                    }}
                    edit={true}
                    saveMeasurement={saveMeasurement}
                />
                <div className="bg-black px-4 py-1.5 block text-white uppercase text-sm font-500 tracking-wide shadow-md my-2"
                     onClick={() => deleteMeasurement(measurement.measure_id)}>
                    DELETE
                </div>
            </div>
        </div>
    );

    return mobile ? mobileView : browserView;
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(MeasurementBlock);
