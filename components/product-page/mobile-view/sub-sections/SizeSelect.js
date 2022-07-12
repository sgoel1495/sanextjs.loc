import React, {useState} from 'react';
import ReactDom from "react-dom";
import SizeGuide from "../../SizeGuide";
import StandardSizeModal from "../StandardSizewModal";
import MeasurementModal0 from "../../../user/MeasurementModal0";
import MeasurementModal1 from "../../../user/MeasurementModal1";
import MeasurementModal2 from "../../../user/MeasurementModal2";
import MeasurementModal3 from "../../../user/MeasurementModal3";

const SizeSelect = (props) => {
    const [showStandardSize, setShowStandardSize] = useState(false);
    const [showModal0, setShowModal0] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModalPastOrders, setShowModalPastOrders] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [currentMeasurement, setCurrentMeasurement] = useState(null);
    const [sizeModal, setSizeModal] = useState(false);
    const [currentMeasureProduct, setCurrentMeasurementProduct] = useState(null);

    const nextModal = () => {
        if (showModal0) {
            setShowModal0(false);
            setShowModal1(true);
            setShowModal2(false);
            setShowModal3(false);
        } else if (showModal1) {
            setShowModal0(false);
            setShowModal1(false);
            setShowModal2(true);
            setShowModal3(false);
        } else if (showModal2) {
            setShowModal0(false);
            setShowModal1(false);
            setShowModal2(false);
            setShowModal3(true);
        }
    };
    const lastModal = () => {
        if (showModal1) {
            setShowModal0(true);
            setShowModal1(false);
            setShowModal2(false);
            setShowModal3(false);
        } else if (showModal2) {
            setShowModal0(false);
            setShowModal1(true);
            setShowModal2(false);
            setShowModal3(false);
        } else if (showModal3) {
            setShowModal1(false);
            setShowModal1(false);
            setShowModal2(true);
            setShowModal3(false);
        }
    };
    const updateValues = (key, value) => {
        currentMeasurement[key] = value;
        setCurrentMeasurement(currentMeasurement);
        setRefresh(!refresh);
    };
    const addNewModal = (m) => {
        setCurrentProduct(data);
        setCurrentMeasurement(m);
        nextModal();
    };
    const pastOrdersModal = () => {
        setShowModal0(false);
        setShowModal1(false);
        setShowModal2(false);
        setShowModal3(false);
        setShowModalPastOrders(true);
    };
    const closeModal = () => {
        setShowStandardSize(false);
        setShowModal0(false);
        setShowModal1(false);
        setShowModal2(false);
        setShowModal3(false);
        setShowModalPastOrders(false);
    };
    const addTailorToCart = async () => {
    };
    const saveModal = async () => {
        // if (currentMeasurement.measure_id == "") {
        //     // add new
        //     currentMeasurement.measure_id = getNewKey();
        // } else {
        //     //case update - we simply remove and add
        //     await delMeasurement(currentMeasurement)
        // }
        // if(dataStore.userData.contact) {
        //     // we have a valid user
        //     await apiCall("addMeasurements", dataStore.apiToken, {
        //         "user": getUserO(dataStore),
        //         "measurments": currentMeasurement
        //     })
        //     // update DataStore
        //     await refreshDataStore()
        // } else {
        //     //non logged in case
        //     dataStore.userMeasurements[currentMeasurement.measure_id]=currentMeasurement
        //     updateDataStore("userMeasurements",dataStore.userMeasurements)
        // }
        // closeModal()
    };

    return (
        <>
            <div className={'inline-flex items-center gap-6 mb-5'}>
                <div
                    className={'border-4 border-white bg-[#faede3] shadow-xl text-center px-4 py-2.5 leading-none rounded-[5vw]'}
                    onClick={() => {
                        setShowStandardSize(!showStandardSize);
                    }}
                >
                    <p className={'uppercase font-900 text-xs'}>standard</p>
                    <p className={' uppercase font-400 text-xs'}>size</p>
                </div>
                <p className={''}>OR</p>
                <div
                    className={'border-4 border-white bg-[#faede3] shadow-xl text-center px-4 py-2.5 leading-none rounded-[5vw]'}
                    onClick={() => {
                        setShowModal0(true);
                    }}
                >
                    <p className={'uppercase font-900 text-xs'}>Tailored</p>
                    <p className={'uppercase font-400 text-xs'}>size</p>
                </div>
            </div>
            {sizeModal && ReactDom.createPortal(<SizeGuide closeModal={() => setSizeModal(false)} isMobile={dataStore.isMobile}/>, document.getElementById('measurementmodal'))}
            {showStandardSize &&
            ReactDom.createPortal(
                <StandardSizeModal
                    closeModal={closeModal.bind(this)}
                    standardSizes={[
                        {size: 'XS', bust: '32', hips: '35'},
                        {size: 'S', bust: '34', hips: '37'},
                    ]}
                />,
                document.getElementById('measurementmodal'),
            )}
            {showModal0 &&
            ReactDom.createPortal(
                <MeasurementModal0 closeModal={closeModal.bind(this)} isMobile={true} addNew={addNewModal.bind(this)} pastOrders={pastOrdersModal.bind(this)}
                                   measureProduct={currentMeasureProduct}/>,
                document.getElementById('measurementmodal'),
            )}
            {showModal1 &&
            ReactDom.createPortal(
                <MeasurementModal1
                    closeModal={closeModal.bind(this)}
                    isMobile={true}
                    measurement={currentMeasurement}
                    lastModal={lastModal.bind(this)}
                    nextModal={nextModal.bind(this)}
                    updateValues={updateValues.bind(this)}
                    product={currentProduct}
                />,
                document.getElementById('measurementmodal'),
            )}
            {showModal2 &&
            ReactDom.createPortal(
                <MeasurementModal2
                    closeModal={closeModal.bind(this)}
                    isMobile={true}
                    measurement={currentMeasurement}
                    nextModal={nextModal.bind(this)}
                    lastModal={lastModal.bind(this)}
                    updateValues={updateValues.bind(this)}
                    product={currentProduct}
                />,
                document.getElementById('measurementmodal'),
            )}
            {showModal3 &&
            ReactDom.createPortal(
                <MeasurementModal3
                    closeModal={closeModal.bind(this)}
                    isMobile={true}
                    measurement={currentMeasurement}
                    lastModal={lastModal.bind(this)}
                    saveModal={saveModal.bind(this)}
                    addTailorToCart={addTailorToCart.bind(this)}
                    product={currentProduct}
                />,
                document.getElementById('measurementmodal'),
            )}
        </>
    );
};

export default SizeSelect;