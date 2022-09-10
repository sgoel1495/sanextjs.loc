import React, {useContext} from 'react';
import AppWideContext from '../../../store/AppWideContext';
import emptyMeasurement from "../../../store/emptyMeasurement.json";

function StandardSizeModal({currentMeasurement, closeModal, sizeAvail, standardSizes, setSizeModal, selected, setSelected, setCurrentMeasurement}) {
    return (
        <div className={['h-screen fixed inset-0 z-modal grid place-items-center p-[2.5%] py-[5%]']} onClick={closeModal}>
            <div className='bg-white border-[1.2vw] border-[#b3aeab] text-[#997756] rounded-[10vw] h-full w-full relative flex flex-col' onClick={(e) => e.stopPropagation()}>
                <button className='absolute top-2 right-5 text-2xl z-50' onClick={closeModal}>
                    X
                </button>
                <div className='overflow-auto flex-1 text-center'>
                    <h6 className='text-base font-semibold pt-16 pb-5'>PLEASE SELECT A SIZE</h6>
                    <div className='px-4 pt-[5%] pb-[20%] text-center'>
                        <span className='text-sm pb-2'>Measurements in inches</span>
                        <table className="w-full text-[#997756] text-[15px] tracking-wide uppercase mb-4">
                            <thead>
                            <tr>
                                {
                                    Object.keys(standardSizes[0]).map((item, index) => {
                                        if (item !== "AvailQty")
                                            return <td key={index}><span
                                                className={"font-500 " + [index !== 0 ? "border-l-2 border-[#997756] text-center block my-1" : ""]}>{item}</span></td>
                                    })
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {
                                standardSizes.slice(1).map((item, index) => {
                                    if (!sizeAvail.includes(item[Object.keys(item)[0]])) {
                                        return null
                                    }
                                    return <tr key={index} className={"bg-[#F3E9E3]"} onClick={() => {
                                        setSelected(item[Object.keys(item)[0]])
                                        let temp = {}
                                        Object.keys(item).forEach(key => {
                                            temp[key.toLowerCase()] = item[key]
                                        })
                                        setCurrentMeasurement({
                                            ...emptyMeasurement, ...temp,
                                            "selected_length": currentMeasurement.selected_length,
                                            "selected_sleeve": currentMeasurement.selected_sleeve
                                        })
                                    }}>
                                        {
                                            Object.keys(item).map((key, index) => {
                                                if (key !== "AvailQty")
                                                    return <td
                                                        className={"border-y-[10px] border-white " + [index === 0 ? "font-600 border-0 " : ""] + [selected === item[Object.keys(item)[0]] ? "bg-[#e5d5c5]" : ""]}
                                                        key={index}
                                                    >
                                                        <span className={index !== 0 ? "border-l-2 border-[#997756] text-center block my-1" : ""}>{item[key]}</span>
                                                    </td>
                                            })
                                        }
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                        <span onClick={() => {
                            setSizeModal(true)
                        }} className='uppercase tracking-widest text-sm'>whats my size ?</span>
                    </div>
                    <button
                        className={'border-[#997756] bg-white border-[3px] text-center px-6 py-2.5 mx-auto leading-none rounded-[5vw]'}
                        onClick={closeModal}
                    >
                        <p className={'uppercase font-900 text-xs tracking-wider'}>Save Size</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StandardSizeModal;
