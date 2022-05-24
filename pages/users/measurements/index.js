import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import { useRouter } from "next/router";
import UsersSideMenu from "../../../components/user/UsersSideMenu";
import MeasurementBlock from "../../../components/user/MeasurementBlock";
import ReactDom from "react-dom";
import emptyMeasurement from "../../../store/emptyMeasurement.json";
import MeasurementModal1 from "../../../components/user/MeasurementModal1";
import MeasurementModal2 from "../../../components/user/MeasurementModal2";
import MeasurementModal3 from "../../../components/user/MeasurementModal3";
import {apiCall} from "../../../helpers/apiCall";

function UsersMeasurementsPage() {
    const router = useRouter();
    const { dataStore, updateDataStore } = useContext(AppWideContext);
    useEffect(()=>{
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    },[dataStore.userData.contact,router])


    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [currentMeasurement, setCurrentMeasurement] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const updateValues = (key, value) => {
        currentMeasurement[key] = value;
        setCurrentMeasurement(currentMeasurement);
        setRefresh(!refresh);
    }

    const measurementKeys = Object.keys(dataStore.userMeasurements);

    const measurementBlocks = () => {
        let returnValue = null;
        measurementKeys.forEach((key, index) => {
            returnValue = <Fragment>
                {returnValue}
                <MeasurementBlock
                    measurement={dataStore.userMeasurements[key]}
                    showModal={showModal.bind(this)}
                    deleteMeasurement={deleteMeasurement.bind(this)}
                    index={index}
                    mobile={dataStore.mobile}
                />
            </Fragment>
        });
    }

    const nextModal = () => {
        if (showModal1) {
            setShowModal1(false);
            setShowModal2(true);
            setShowModal3(false);
        } else if (showModal2) {
            setShowModal1(false);
            setShowModal2(false);
            setShowModal3(true);
        }
    }

    const lastModal = () => {
        if (showModal2) {
            setShowModal1(true);
            setShowModal2(false);
            setShowModal3(false);
        } else if (showModal3) {
            setShowModal1(false);
            setShowModal2(true);
            setShowModal3(false);
        }
    }

    const getNewKey = () => {
        const baseKey = dataStore.userServe.temp_user_id || Date.now();

        let newKey = "";
        for (let x = 1; x < 100; x++) {
            newKey = baseKey + "_" + x.toString();
            if (!measurementKeys.includes(newKey))
                break;
        }
        return newKey;
    }

    const getUserO=()=>{
        const tempId = dataStore.userServe.temp_user_id || Date.now()
        const userO = {
            email: (dataStore.userData.contact)?dataStore.userData.contact:"",
            is_guest: !!(dataStore.userData.contact),
            temp_user_id: tempId
        }
        return userO
    }

    const showModal = (m) => {
        console.log("Setting Measurement", m);
        setCurrentMeasurement(m);

        setShowModal1(true);
    }

    const closeModal = () => {
        setShowModal1(false);
        setShowModal2(false);
        setShowModal3(false);
        setCurrentMeasurement(null);
    }

    const saveModal = async () => {
        if(currentMeasurement.measure_id==""){
            // add new
            currentMeasurement.measure_id = getNewKey();
        } else {
            //case update - we simply remove and add
            await delMeasurement(currentMeasurement)
        }
        await apiCall("addMeasurements", dataStore.apiToken, {
            "user": getUserO(),
            "measurments":currentMeasurement
        })

        // update DataStore
        await refreshDataStore()
        closeModal()
    }

    const delMeasurement=async (m)=>{
        //only delete. no refresh
        await apiCall("removeMeasurements", dataStore.apiToken, {
            user: getUserO(),
            measurments :{
                measure_id: m.measure_id
            }
        });
    }

    const deleteMeasurement = async (m) => {
        await delMeasurement(m)
        await refreshDataStore()
    }

    const refreshDataStore=async ()=>{
        const measurementCall = await apiCall("userMeasurements", dataStore.apiToken, {
            "user":getUserO()
        });

        let userMeasurements = {};
        if (measurementCall.hasOwnProperty("response") && measurementCall.response && Object.keys(measurementCall.response).length>0)
            userMeasurements = measurementCall.response
        updateDataStore("userMeasurements", dataStore.userMeasurements)
    }

    console.log("Current Measurements", currentMeasurement)

    const mobileView = null;
    const browserView = () => {
        return <Fragment>
            <div className="xl:w-3/5 mx-auto flex divide-x gap-x-8 mt-28">
                <UsersSideMenu mobile={false} />
                <div className="pl-8 flex-[3] flex flex-col items-start gap-4">
                    <p className="text-[28px]">Measurement Summary</p>
                    <div className="flex gap-8 w-full">
                        <div className="flex-1 bg-[#f1f2f3] px-6 py-8 font-600 text-[#555]">
                            <p>User Id: {dataStore.userData.contact}</p>
                            <p>Total Measurement(s): {measurementKeys.length}</p>
                        </div>
                        <div className="flex-1 bg-[#f1f2f3] grid place-items-center" >
                            <button className="bg-black px-4 py-1.5 block text-white uppercase text-sm font-500 tracking-wide shadow-md my-2" onClick={() => showModal(emptyMeasurement)}>ADD NEW</button>
                        </div>
                    </div>
                    <div>
                        <p className="text-[28px] mt-4">Measurements</p>
                        {(measurementKeys.length > 0)
                            ? <div>{measurementBlocks()}</div>
                            : <div className="bg-[#f1f1f1] p-5 text-[#777] font-500">
                                <p>No measurement found!</p>
                                <p>Please add measurement.</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    }

    console.log("MEASUREMENT", currentMeasurement);
    return (
        <Fragment>
            <PageHead url={"/users/profile"} id={"profile"} isMobile={dataStore.mobile} />
            <Header type={"shopMenu"} />
            {(dataStore.mobile) ? mobileView : browserView()}
            {showModal1 &&
                ReactDom.createPortal(
                    <MeasurementModal1
                        closeModal={closeModal.bind(this)}
                        isMobile={dataStore.isMobile}
                        measurement={currentMeasurement}
                        lastModal={null}
                        nextModal={nextModal.bind(this)}
                        updateValues={updateValues.bind(this)}
                        product={null}
                    />,
                    document.getElementById("measurementmodal"))
            }
            {showModal2 &&
                ReactDom.createPortal(
                    <MeasurementModal2
                        closeModal={closeModal.bind(this)}
                        isMobile={dataStore.isMobile}
                        measurement={currentMeasurement}
                        nextModal={nextModal.bind(this)}
                        lastModal={lastModal.bind(this)}
                        updateValues={updateValues.bind(this)}
                        product={null}
                    />,
                    document.getElementById("measurementmodal"))
            }
            {showModal3 &&
                ReactDom.createPortal(
                    <MeasurementModal3
                        closeModal={closeModal.bind(this)}
                        isMobile={dataStore.isMobile}
                        measurement={currentMeasurement}
                        lastModal={lastModal.bind(this)}
                        saveModal={saveModal.bind(this)}
                        product={null}
                    />,
                    document.getElementById("measurementmodal"))
            }
        </Fragment>
    )
}

export default UsersMeasurementsPage;