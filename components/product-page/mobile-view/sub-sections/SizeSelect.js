import React, {useState} from 'react';
import ReactDom from "react-dom";
import SizeGuide from "../../SizeGuide";
import StandardSizeModal from "../StandardSizewModal";
import MeasurementModal0 from "../../../user/MeasurementModal0";
import MeasurementModal1 from "../../../user/MeasurementModal1";
import MeasurementModal2 from "../../../user/MeasurementModal2";
import MeasurementModal3 from "../../../user/MeasurementModal3";
import NotifyMe from "./NotifyMe";
import {isTailored} from "../../../../helpers/returnSizes";

const SizeSelect = ({data, sizeAvail, size, setSize}) => {
    const [showStandardSize, setShowStandardSize] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [active, setActive] = useState(0)
    const [currentMeasurement, setCurrentMeasurement] = useState(null);
    const [sizeGuideModal, setSizeGuideModal] = useState(false);
    const [currentMeasureProduct, setCurrentMeasurementProduct] = useState(null);


    const nextModal = () => {
        setActive(active + 1);
    };
    const lastModal = () => {
        setActive(active - 1);
    };
    const updateValues = (key, value) => {
        currentMeasurement[key] = value;
        setCurrentMeasurement(currentMeasurement);
    };
    const addNewModal = (m) => {
        setCurrentMeasurement(m);
        nextModal();
    };
    const pastOrdersModal = () => {

    };
    const closeModal = () => {
        setShowModal(false);
        setActive(0)
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

    let activeModalScreen
    switch (active) {
        case 0:
            activeModalScreen = <MeasurementModal0 closeModal={closeModal} isMobile={true} addNew={addNewModal} pastOrders={pastOrdersModal}
                                                   measureProduct={currentMeasureProduct}/>;
            break;
        case 1:
            activeModalScreen = <MeasurementModal1 closeModal={closeModal} isMobile={true} measurement={currentMeasurement} lastModal={lastModal}
                                                   nextModal={nextModal} updateValues={updateValues} product={data}/>;
            break;
        case 2:
            activeModalScreen = <MeasurementModal2 closeModal={closeModal} isMobile={true} measurement={currentMeasurement} nextModal={nextModal}
                                                   lastModal={lastModal} updateValues={updateValues} product={data}/>;
            break;
        case 3:
            activeModalScreen = <MeasurementModal3 closeModal={closeModal} isMobile={true} measurement={currentMeasurement} lastModal={lastModal}
                                                   saveModal={saveModal} addTailorToCart={addTailorToCart} product={data}/>;
            break;
    }

    return (
        <>
            <div className={'inline-flex items-center gap-6 mb-5 text-[#5a5958] tracking-widest'}>
                <div>
                    <span className={"uppercase text-xs font-900 block text-center mb-1 text-[#4eb16d]"}>
                        {
                            size && "selected"
                        }
                    </span>
                    <div
                        className={'border-white shadow-xl text-center px-6 leading-4 rounded-[5vw] ' + [size ? "bg-[#4eb16d] text-white border-0 py-1" : "border-4 bg-[#faede3] py-2.5"]}
                        onClick={() => {
                            setShowStandardSize(!showStandardSize);
                        }}
                    >
                        {
                            size ? <>
                                    <p className={'uppercase font-900 text-xs'}>standard</p>
                                    <p className={'uppercase font-900 text-sm'}>{size}</p>
                                    <p className={' uppercase font-400 text-[10px]'}>edit</p>
                                </>
                                :
                                <>
                                    <p className={'uppercase font-900 text-xs'}>standard</p>
                                    <p className={' uppercase font-400 text-xs'}>size</p>
                                </>
                        }
                    </div>
                </div>
                <p className={''}>OR</p>
                <div
                    className={'border-4 border-white bg-[#faede3] shadow-xl text-center px-4 py-2.5 leading-4 rounded-[5vw]' + [isTailored(data) ? "" : " pointer-events-none opacity-25"]}
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    <p className={'uppercase font-900 text-xs'}>Tailored</p>
                    <p className={'uppercase font-400 text-xs'}>size</p>
                </div>
            </div>
            <p onClick={() => setSizeGuideModal(true)} className={'mb-4 uppercase'}>size guide</p>
            {sizeGuideModal && ReactDom.createPortal(<SizeGuide closeModal={() => setSizeGuideModal(false)} isMobile={true}/>, document.getElementById('measurementmodal'))}
            {showStandardSize &&
            ReactDom.createPortal(
                <StandardSizeModal
                    closeModal={closeModal.bind(this)}
                    setSizeModal={setSizeGuideModal}
                    standardSizes={sizeAvail}
                    selected={size}
                    setSelected={setSize}
                />,
                document.getElementById('measurementmodal'),
            )}
            {showModal &&
            ReactDom.createPortal(<>{activeModalScreen}</>,
                document.getElementById('measurementmodal'),
            )}
        </>
    );
};

export default SizeSelect;