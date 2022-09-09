import React, {useContext, useEffect, useState} from 'react';
import MeasurementModal0 from "../user/MeasurementModalScreens/MeasurementModal0";
import MeasurementModal1 from "../user/MeasurementModalScreens/MeasurementModal1";
import MeasurementModalDress12 from "../user/MeasurementModalScreens/MeasurementModalDress1_2";
import MeasurementModal2 from "../user/MeasurementModalScreens/MeasurementModal2";
import CustomizeSleeve from "../user/MeasurementModalScreens/CustomizeSleeve";
import CustomizeLength from "../user/MeasurementModalScreens/CustomizeLength";
import MeasurementModal3 from "../user/MeasurementModalScreens/MeasurementModal3";
import ReactDom from "react-dom";
import UserLogin from "../user/login/UserLogin";
import {apiCall} from "../../helpers/apiCall";
import {getUserObject} from "../../helpers/addTocart";
import AppWideContext from "../../store/AppWideContext";
import {useRouter} from "next/router";
import {isTailored} from "../../helpers/returnSizes";
import Toast from "../common/Toast";
import useApiCall from "../../hooks/useApiCall";
import PastOrders from "../user/MeasurementModalScreens/PastOrders";
import {connect} from "react-redux";

const TailoredSize = ({data, currentMeasurement, setCurrentMeasurement, setSize, isMobile, saveToCart, edit, saveMeasurement, addNew, appConfig, userData}) => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [active, setActive] = useState(0)
    const [pastOrders, setPastOrders] = useState([])
    const [showOrderModal, setShowOrderModal] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [currentMeasureProduct, setCurrentMeasurementProduct] = useState(null);
    const [showToast, setShowToast] = useState(false)

    const nextModal = () => {
        setActive(active + 1);
    };

    const lastModal = () => {
        setActive(active - 1);
    };

    const updateValues = (key, value) => {
        setCurrentMeasurement({...currentMeasurement, [key]: value});
    };

    const addNewModal = (m) => {
        if (m != null) {
            setCurrentMeasurement(m);
        }
        nextModal();
    };

    const pastOrdersModal = () => {
        if (userData.userServe.email) {
            if (pastOrders.length === 0)
                setShowToast(true)
            else
                setShowOrderModal(true)
        } else {
            if (isMobile)
                router.push("/homepage/signin")
            else
                setShowLogin(true)
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setActive(0)
    };

    const saveModal = async () => {
        if (edit) {
            saveMeasurement()
        } else if (isMobile) {
            if (!currentMeasurement.measure_id) {
                setCurrentMeasurement({...currentMeasurement, measure_id: (new Date()).getTime().toString() + "_m"})
                setSize(null)
            }
        } else {
            saveToCart({...currentMeasurement, measure_id: (new Date()).getTime().toString() + "_m"})
        }
        closeModal()
    };

    const refreshMeasurements = async () => {
        const measurementCall = await apiCall("userOrderHistory", appConfig.apiToken, {
            "user": {...getUserObject(userData), token: appConfig.apiToken}
        });
        const items = []
        if (measurementCall.status !== 200)
            return
        const orders = Object.keys(measurementCall.response)
        orders.forEach(orderID => {
            let order = measurementCall.response[orderID]
            order.item.forEach(item => {
                if (item.measurement)
                    items.push({...item.measurement, asset_id: item.asset_id, old_product_id: item.old_product_id, name: item.name})
            })
        })
        setPastOrders(items)
    }

    useEffect(() => {
        refreshMeasurements()
    }, [])

    let activeModalScreen
    if (edit) {
        switch (active) {
            case 0:
                activeModalScreen = <MeasurementModal1 closeModal={closeModal} isMobile={isMobile} measurement={currentMeasurement} lastModal={lastModal}
                                                       nextModal={nextModal} updateValues={updateValues} product={{}} edit={true}/>;
                break;
            case 1:
                activeModalScreen = <MeasurementModal2 closeModal={closeModal} isMobile={isMobile} measurement={currentMeasurement} nextModal={nextModal}
                                                       lastModal={lastModal} updateValues={updateValues} product={{}} edit={true}/>;
                break;
            case 2:
                activeModalScreen = <MeasurementModal3 closeModal={closeModal} isMobile={isMobile} measurement={currentMeasurement} lastModal={lastModal}
                                                       saveModal={saveModal} product={{}} edit={true}/>;
                break;
        }
    } else if (data.is_customize) {
        let customLastModal = lastModal
        switch (active) {

            case 0:
                activeModalScreen = <MeasurementModal0 closeModal={closeModal} isMobile={isMobile} addNew={addNewModal} showPastOrders={pastOrdersModal}
                                                       pastOrders={pastOrders} measureProduct={currentMeasureProduct} product={data}/>;
                break;
            case 1:
                activeModalScreen = <MeasurementModal1 closeModal={closeModal} isMobile={isMobile} measurement={currentMeasurement} lastModal={lastModal}
                                                       nextModal={nextModal} updateValues={updateValues} product={data}/>;
                break;
            case 2:
                activeModalScreen = <MeasurementModalDress12 closeModal={closeModal} isMobile={isMobile} lastModal={lastModal} nextModal={nextModal} updateValues={updateValues}
                                                             currentMeasurement={currentMeasurement}/>
                break;
            case 3:
                activeModalScreen = <MeasurementModal2 closeModal={closeModal} isMobile={isMobile} measurement={currentMeasurement} nextModal={nextModal}
                                                       lastModal={lastModal} updateValues={updateValues} product={data}/>;
                break;
            case 4:
                activeModalScreen =
                    <CustomizeSleeve closeModal={closeModal} isMobile={isMobile} data={data.sleeve_length_opt} defaultValue={data.sleeve_length} nextModal={nextModal}
                                     lastModal={lastModal} currentMeasurement={currentMeasurement} updateValues={updateValues} product={data}/>
                break;
            case 5:
                if (data.sleeve_length_opt.length <= 1) {
                    customLastModal = () => setActive(active - 2)
                }
                activeModalScreen = <CustomizeLength closeModal={closeModal} isMobile={isMobile} data={data.dress_length_opt} defaultValue={data.dress_length} nextModal={nextModal}
                                                     lastModal={customLastModal} currentMeasurement={currentMeasurement} updateValues={updateValues} product={data}/>
                break;
            case 6:
                if (data.dress_length_opt.length <= 1) {
                    if (data.sleeve_length_opt.length <= 1) {
                        customLastModal = () => setActive(active - 3)
                    } else {
                        customLastModal = () => setActive(active - 2)
                    }
                }
                activeModalScreen =
                    <MeasurementModal3 closeModal={closeModal} isMobile={isMobile} measurement={currentMeasurement} lastModal={customLastModal} saveModal={saveModal}
                                       product={data}/>;
                break;
        }
    } else {
        switch (active) {
            case 0:
                activeModalScreen = <MeasurementModal0 closeModal={closeModal} isMobile={isMobile} addNew={addNewModal} showPastOrders={pastOrdersModal}
                                                       pastOrders={pastOrders} measureProduct={currentMeasureProduct} product={data}/>;
                break;
            case 1:
                activeModalScreen = <MeasurementModal1 closeModal={closeModal} isMobile={isMobile} measurement={currentMeasurement} lastModal={lastModal}
                                                       nextModal={nextModal} updateValues={updateValues} product={data}/>;
                break;
            case 2:
                activeModalScreen = <MeasurementModal2 closeModal={closeModal} isMobile={isMobile} measurement={currentMeasurement} nextModal={nextModal}
                                                       lastModal={lastModal} updateValues={updateValues} product={data}/>;
                break;
            case 3:
                activeModalScreen = <MeasurementModal3 closeModal={closeModal} isMobile={isMobile} measurement={currentMeasurement} lastModal={lastModal}
                                                       saveModal={saveModal} product={data}/>;
                break;
        }
    }
    return (
        <>
            {
                addNew ?
                    <button
                        className={"bg-black px-4 py-1.5 block text-white uppercase text-sm font-500 tracking-wide shadow-md my-2" + [isMobile ? " rounded-full" : ""]}
                        onClick={() => setShowModal(true)}
                    >
                        ADD NEW
                    </button>
                    :
                    edit ?
                        <button
                            className={"bg-black px-4 py-1.5 block text-white uppercase text-sm font-500 tracking-wide shadow-md my-2 " + [isMobile ? " rounded-full" : ""]}
                            onClick={() => setShowModal(true)}
                        >
                            Edit
                        </button>
                        :

                        isMobile ?
                            <div
                                className={'border-white shadow-xl text-center px-6 leading-4 rounded-[5vw] ' + [currentMeasurement.measure_id ? "bg-[#4eb16d] text-white border-0 py-1" : "border-4 bg-[#faede3] py-2.5"] + [isTailored(data) ? "" : " pointer-events-none opacity-25"]}
                                onClick={() => {
                                    setShowModal(true);
                                }}
                            >
                                {
                                    currentMeasurement.measure_id ? <>
                                            <p className={'uppercase font-900 text-xs'}>Tailored</p>
                                            <p className={'uppercase font-900 text-sm'}>T</p>
                                            <p className={' uppercase font-400 text-[10px]'}>edit</p>
                                        </>
                                        :
                                        <>
                                            <p className={'uppercase font-900 text-xs'}>Tailored</p>
                                            <p className={' uppercase font-400 text-xs'}>size</p>
                                        </>
                                }
                            </div>
                            :
                            <div className={"flex justify-center items-center gap-2 font-700 text-sm text-black/60 mb-4"} onClick={() => setShowModal(true)}>
                                <span className={"uppercase underline cursor-pointer"}>tailor it</span>
                                <span className={""}>/</span>
                                <span className={"uppercase underline cursor-pointer"}>customise</span>
                            </div>

            }

            {showModal &&
            ReactDom.createPortal(<>{activeModalScreen}</>,
                document.getElementById('measurementmodal')
            )}
            {showLogin && ReactDom.createPortal(
                <UserLogin setShowLogin={setShowLogin} closeModal={() => setShowLogin(false)}/>,
                document.getElementById("userband"))}
            {showOrderModal && ReactDom.createPortal(
                <PastOrders pastOrders={pastOrders} closeModal={() => setShowOrderModal(false)} isMobile={isMobile} setCurrentMeasurementProduct={setCurrentMeasurementProduct}
                            setCurrentMeasurement={setCurrentMeasurement}/>,
                document.getElementById("userband"))}
            <Toast show={showToast} hideToast={() => setShowToast(false)}>
                <span>Sorry! you don&apos;t have measurements from past order! Enter New Measurements</span>
            </Toast>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(TailoredSize);