import React, {Fragment, useContext, useState} from "react";
import TailoredSize from "../product-page/TailoredSize";
import {apiCall} from "../../helpers/apiCall";
import {getUserObject} from "../../helpers/addTocart";
import AppWideContext from "../../store/AppWideContext";

function MeasurementBlock({measurement, showModal, deleteMeasurement, index, mobile, refresh}) {
    const [currentMeasurement, setCurrentMeasurement] = useState(measurement)
    const {dataStore, updateDataStore} = useContext(AppWideContext);

    const saveMeasurement = () => {
        apiCall("updateMeasurements", dataStore.apiToken, {
            user: getUserObject(dataStore, updateDataStore),
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
        <Fragment>
            <div>
                <div>{index + 1}. Measurement Profile</div>
                <div>Measurement ID: {measurement.measure_id}</div>
                <div>Bust: {measurement.bust}</div>
                <div>Waist: {measurement.waist}</div>
                <div>Hips: {measurement.hips}</div>
                <div>
                    Height: {measurement.height_f}ft {measurement.height_i}inch(es)
                </div>
                <div>Biceps: {measurement.biceps}</div>
                <div>Wearing Waist: {measurement.wearing_waist}</div>
                <div>Shoulder: {measurement.shoulder}</div>
                <div>Others: {measurement.others}</div>
            </div>
            <TailoredSize isMobile={false} currentMeasurement={currentMeasurement} setCurrentMeasurement={setCurrentMeasurement} setSize={() => {
            }} edit={true} saveMeasurement={saveMeasurement}/>
            <div
                onClick={() =>deleteMeasurement(measurement.measure_id)}
            >
                DELETE
            </div>
        </Fragment>
    );

    return mobile ? mobileView : browserView;
}

export default MeasurementBlock;
