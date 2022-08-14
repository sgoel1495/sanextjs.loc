import React from 'react';

const MeasurementModalDress12 = ({isMobile, closeModal, updateValues, lastModal, nextModal,currentMeasurement}) => {
    const mobileView = () => {
        return (
            <div className={['bg-black/60 h-screen fixed inset-0 z-modal grid place-items-center py-[8%] px-[3%]']} onClick={closeModal}>
                <div className='bg-white border-4 border-[#b3aeab] text-[#997756] rounded-[10vw] h-full w-full relative flex flex-col overflow-hidden'
                     onClick={(e) => e.stopPropagation()}>
                    <div className='overflow-auto flex-1 px-5'>
                        <button className='absolute top-0 right-8 text-2xl z-50' onClick={closeModal}>
                            X
                        </button>
                        <div className='text-center my-5'>
                            <p className='font-cursive italic text-3xl mb-2'>Step 2/5</p>
                            <p className='text-lg font-900 tracking-wider leading-tight'>FIT DETAILS</p>
                        </div>
                        <p className='text-center font-600 uppercase mb-5'>how do you like your dress to fit?</p>
                        <div className='grid grid-cols-1 place-items-center text-xs tracking-widest font-600'>
                            <div className={"flex flex-col items-center justify-end mt-3 relative h-14 overflow-hidden"} onClick={() => updateValues("fitting", "fitted")}>
                                <div className={"aspect-square border-2 border-[#997756] absolute duration-100 "+[currentMeasurement.fitting==="fitted"?" origin-center rotate-[60deg] w-14 bottom-10":" w-8 top-0"]}/>
                                <p>FITTED</p>
                            </div>
                            <div className={"flex flex-col items-center mt-3 justify-end relative h-14 overflow-hidden"} onClick={() => updateValues("fitting", "comfort")}>
                                <div className={"aspect-square border-2 border-[#997756] absolute duration-100 "+[currentMeasurement.fitting==="comfort"?" origin-center rotate-[60deg] w-14 bottom-10":" w-8 top-0"]}/>
                                <p>COMFORT</p>
                            </div>
                            <div className={"flex flex-col items-center mt-3 justify-end relative h-14 overflow-hidden"} onClick={() => updateValues("fitting", "easy & relaxed")}>
                                <div className={"aspect-square border-2 border-[#997756] absolute duration-100 "+[currentMeasurement.fitting==="easy & relaxed"?" origin-center rotate-[60deg] w-14 bottom-10":" w-8 top-0"]}/>
                                <p>EASY & RELAXED</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white text-center grid grid-cols-2 text-[#997756]'>
                        <div className='bg-[#E5D5C5] py-2 cursor-pointer' onClick={lastModal}>
                            <button className='font-600'>&lt; BACK</button>
                            <p className='text-xs uppercase'>SELECT MEASUREMENTS</p>
                        </div>
                        <div className='cursor-pointer font-600' onClick={nextModal}>
                            <button className='font-600'>NEXT &gt;</button>
                            <p className='text-xs uppercase'>SIZE REVIEW</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const browserView = () => {
        return (
            <div className={['bg-black/60 h-screen w-screen fixed inset-0 z-50 grid place-items-center py-[8%] px-[10%]']} onClick={closeModal}>
                <div className='bg-white border-2 border-black relative h-full w-[920px] flex flex-col' onClick={(e) => e.stopPropagation()}>
                    <div className='overflow-auto flex-1'>
                        <button className='absolute top-0 right-8 text-2xl z-50' onClick={closeModal}>
                            X
                        </button>
                        <div className="text-center my-5">
                            <p className="font-cursive italic text-3xl mb-2">Step 2/5</p>
                            <p className="text-lg font-500 text-[#777]">FIT DETAILS</p>
                        </div>
                        <p className='text-center font-600 uppercase mb-5 text-[#606060]'>how do you like your dress to fit?</p>
                        <div className='grid grid-cols-1 place-items-center text-xs tracking-widest font-600'>
                            <div className={"flex flex-col items-center justify-end mt-3 relative h-14 overflow-hidden"} onClick={() => updateValues("fitting", "fitted")}>
                                <div className={"aspect-square border-2 border-black absolute duration-100 "+[currentMeasurement.fitting==="fitted"?" origin-center rotate-[60deg] w-14 bottom-10":" w-8 top-0"]}/>
                                <p className={"text-[#606060]"}>FITTED</p>
                            </div>
                            <div className={"flex flex-col items-center mt-3 justify-end relative h-14 overflow-hidden"} onClick={() => updateValues("fitting", "comfort")}>
                                <div className={"aspect-square border-2 border-black absolute duration-100 "+[currentMeasurement.fitting==="comfort"?" origin-center rotate-[60deg] w-14 bottom-10":" w-8 top-0"]}/>
                                <p className={"text-[#606060]"}>COMFORT</p>
                            </div>
                            <div className={"flex flex-col items-center mt-3 justify-end relative h-14 overflow-hidden"} onClick={() => updateValues("fitting", "easy & relaxed")}>
                                <div className={"aspect-square border-2 border-black absolute duration-100 "+[currentMeasurement.fitting==="easy & relaxed"?" origin-center rotate-[60deg] w-14 bottom-10":" w-8 top-0"]}/>
                                <p className={"text-[#606060]"}>EASY & RELAXED</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white text-center grid grid-cols-2">
                        <div className="bg-[#606060] py-2 cursor-pointer text-white" onClick={lastModal}>
                            <button className="font-600">&lt; BACK</button>
                            <p className="text-xs uppercase">EDIT MEASUREMENTS</p>
                        </div>
                        <div className="cursor-pointer font-600 text-[#777]" onClick={nextModal}>
                            <button className="font-600">NEXT &gt;</button>
                            <p className="text-xs uppercase">Size Review</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return isMobile ? mobileView() : browserView();
};

export default MeasurementModalDress12;