import { Fragment, useState } from "react";

function MeasurementModal3({ closeModal, isMobile, measurement, lastModal, saveModal }) {

    const mobileView = null;
    const browserView = (
        <div className="bg-black/60 h-screen w-screen fixed inset-0 z-50 grid place-items-center py-[5%] px-[10%]" onClick={closeModal}>
            <div className="bg-white border-2 border-black relative h-[720px] w-[920px] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="overflow-auto flex-1">
                    <button className="absolute top-0 right-8 text-2xl z-50" onClick={closeModal}>X</button>
                    <div className="text-center mt-5 mb-8">
                        <p className="font-cursive italic text-3xl mb-2">Review</p>
                        <p className="text-lg font-500 text-[#777]">YOUR TAILORED FIT</p>
                    </div>
                    <div className="flex flex-col items-center gap-y-5 text-xs font-400">
                        <p className="text-sm font-600 text-[#555] uppercase">Measurements</p>
                        <p>BUST : {measurement.bust}</p>
                        <p>WAIST : {measurement.waist}</p>
                        <p>WEARING WAIST / STOMACH : {measurement.wearing_waist}</p>
                        <p>HIPS : {measurement.hips}</p>
                        <p>BICEPS : {measurement.biceps}</p>
                        <p>HEIGHT : {measurement.height_f} FT {measurement.height_i} INCH</p>
                        <p>SHOULDER : {measurement.shoulder}</p>
                        <p>OTHERS : {measurement.others}</p>
                    </div>
                </div>
                <div className="bg-white text-center grid grid-cols-2">
                    <div className="bg-[#606060] py-2 cursor-pointer text-white grid place-items-center align-content-center" onClick={lastModal}>
                        <button className="font-600">&lt; BACK</button>
                        <p className="text-xs uppercase">SIZE REVIEW</p>
                    </div>
                    <div className="cursor-pointer  py-2  font-600 text-[#777] grid place-items-center align-content-center" onClick={saveModal}>
                        <button className="font-600 text-xl">SAVE</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (isMobile) ? mobileView : browserView;
}
export default MeasurementModal3;