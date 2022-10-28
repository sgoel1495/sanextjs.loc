import React, {useState} from 'react';
import ReactDom from "react-dom";
import SizeGuide from "../../SizeGuide";
import StandardSizeModal from "../StandardSizewModal";
import TailoredSize from "../../TailoredSize";

const SizeSelect = ({data, sizeAvail, size, setSize, currentMeasurement, setCurrentMeasurement}) => {
    const [showStandardSize, setShowStandardSize] = useState(false);
    const [sizeGuideModal, setSizeGuideModal] = useState(false);

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
                        className={'border-white shadow-xl text-center px-6 leading-4 rounded-[5vw] ' + [size ? "bg-[#4eb16d] text-white border-0 py-1" : "border-4 bg-[#faede3] py-2.5"] + [sizeAvail.length === 1 && sizeAvail[0] === "F" ? " pointer-events-none opacity-25" : ""]}
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
                <div>
                    <span className={"uppercase text-xs font-900 block text-center mb-1 text-[#4eb16d]"}>
                        {
                            currentMeasurement.measure_id && "selected"
                        }
                    </span>
                    <TailoredSize data={data} currentMeasurement={currentMeasurement} setCurrentMeasurement={setCurrentMeasurement} setSize={setSize} isMobile={true}/>
                </div>
            </div>
            <p onClick={() => setSizeGuideModal(true)} className={'mb-4 uppercase'}>size guide</p>
            {sizeGuideModal && ReactDom.createPortal(<SizeGuide closeModal={() => setSizeGuideModal(false)} isMobile={true}/>, document.getElementById('measurementmodal'))}
            {showStandardSize &&
            ReactDom.createPortal(
                <StandardSizeModal
                    closeModal={() => setShowStandardSize(false)}
                    setSizeModal={setSizeGuideModal}
                    standardSizes={data.size_avail ? JSON.parse(data.size_avail.replace(/=>/g, ":")) : []}
                    sizeAvail={sizeAvail}
                    selected={size}
                    currentMeasurement={currentMeasurement}
                    setSelected={setSize}
                    setCurrentMeasurement={setCurrentMeasurement}
                />,
                document.getElementById('measurementmodal'),
            )}
        </>
    );
};

export default SizeSelect;