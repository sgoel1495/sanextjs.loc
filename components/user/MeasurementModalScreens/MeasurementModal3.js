import React from "react";
import Image from "next/image";

function MeasurementModal3({closeModal, isMobile, measurement, lastModal, saveModal, product}) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const mobileView = (
        <div className="bg-black/60 h-screen w-screen fixed inset-0 z-50 grid place-items-center py-[8%] px-[3%]"
             onClick={closeModal}>
            <div className="bg-white border-4 border-[#b3aeab] rounded-[10vw] overflow-hidden text-[#997756] relative h-full w-full flex flex-col"
                 onClick={e => e.stopPropagation()}>
                <div className="overflow-auto flex-1 px-4">
                    <button className="absolute top-0 right-8 text-2xl z-50" onClick={closeModal}>X</button>
                    <div className="text-center mt-5 mb-8">
                        <p className="font-cursive italic text-3xl mb-2">Review</p>
                        <p className="text-lg font-900">YOUR TAILORED FIT</p>
                    </div>
                    <p className="mb-10 uppercase text-center font-600">Summary</p>
                    <div className={product.is_customize ? " grid grid-cols-2 gap-x-3" : ""}>
                        {
                            product.is_customize && <div className={"relative aspect-[200/349] w-full border border-[#997756]"}>
                                <Image
                                    src={WEBASSETS + `/assets/dresses-review/${measurement.selected_sleeve.toLowerCase().replace(" ", "_").replace("/", "")}-${measurement.selected_length.toLowerCase().replace(" ", "_")}.jpg`}
                                    layout={`fill`} objectFit={`contain`}
                                    className={"border border-[#b3aeab]"}
                                />
                            </div>
                        }

                        <div className={product.is_customize ? " " : ""}>
                            <div className={"uppercase text-center text-[11px]"}>
                                <p className={"font-900 text-sm"}>Size</p>
                                <p>tailored</p>
                            </div>
                            <div className="flex flex-col items-center gap-y-2 text-[11px] font-400 mt-5">
                                <p className="text-sm font-900 uppercase">Measurements</p>
                                <p>BUST : {measurement.bust}</p>
                                <p>WAIST : {measurement.waist}</p>
                                <p>WEARING WAIST / STOMACH : {measurement.wearing_waist}</p>
                                <p>HIPS : {measurement.hips}</p>
                                <p>BICEPS : {measurement.biceps}</p>
                                <p>HEIGHT : {measurement.height_f} FT {measurement.height_i} INCH</p>
                                <p>SHOULDER : {measurement.shoulder}</p>
                                <p>OTHERS : {measurement.others}</p>
                            </div>
                            {
                                product.is_customize &&
                                <>
                                    <div className="flex flex-col items-center gap-y-2 text-[11px] font-400 mt-5 uppercase">
                                        <p className="text-sm font-900 ">fit details</p>
                                        <p>FITTING : {measurement.fitting}</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-y-2 text-[11px] font-400 mt-5 uppercase">
                                        <p className="text-sm font-900 ">customization</p>
                                        <p>SLEEVE : {measurement.selected_sleeve}</p>
                                        <p>LENGTH : {measurement.selected_length}</p>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="bg-white text-center grid grid-cols-2 text-[#997756]">
                    <div
                        className="bg-[#E5D5C5] py-2 cursor-pointer grid place-items-center align-content-center"
                        onClick={lastModal}>
                        <button className="font-600">&lt; BACK</button>
                        <p className="text-xs uppercase">
                            {
                                product.dress_length_opt.length <= 1 ?
                                    product.sleeve_length_opt.length <= 1 ? "size review"
                                        : "customize sleeve"
                                    : "customize length"

                            }

                        </p>
                    </div>
                    <div
                        className="cursor-pointer  py-2  font-600 grid place-items-center align-content-center"
                        onClick={saveModal}>
                        <button className="font-600">NEXT &gt;</button>
                        <p className="text-xs uppercase">BUY NOW</p>

                    </div>
                </div>
            </div>
        </div>
    );
    const browserView = (
        <div className="bg-black/60 h-screen w-screen fixed inset-0 z-50 grid place-items-center py-[8%] px-[10%]"
             onClick={closeModal}>
            <div className="bg-white border-2 border-black relative h-full w-[920px] flex flex-col  overflow-auto" onClick={e => e.stopPropagation()}>
                <div className="overflow-auto flex-1">
                    <button className="absolute top-0 right-8 text-2xl z-50" onClick={closeModal}>X</button>
                    <div className="text-center mt-5 mb-8">
                        <p className="font-cursive italic text-3xl mb-2">Review</p>
                        <p className="text-lg font-500 text-[#777]">YOUR TAILORED FIT</p>
                    </div>
                    <p className="text-base text-center my-6 font-600 uppercase text-[#606060]">Summary</p>
                    <div className={product.is_customize ? " grid grid-cols-2 gap-x-3" : ""}>
                        {
                            product.is_customize && <div className={"relative aspect-[200/349] w-full border border-[#997756] mx-16"}>
                                <Image
                                    src={WEBASSETS + `/assets/dresses-review/${measurement.selected_sleeve.toLowerCase().replace(" ", "_").replace("/", "")}-${measurement.selected_length.toLowerCase().replace(" ", "_")}.jpg`}
                                    layout={`fill`} objectFit={`contain`}
                                    className={"border border-[#b3aeab]"}
                                />
                            </div>
                        }
                        <div>
                            <div className={"uppercase text-center text-[11px] gap-y-2"}>
                                <p className={"text-sm font-600 text-[#555] uppercase"}>Size</p>
                                <p>tailored</p>
                            </div>
                            <div className="flex flex-col items-center gap-y-2 text-xs font-400 mt-5">
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
                            {
                                product.is_customize &&
                                <>
                                    <div className="flex flex-col items-center gap-y-2 text-[11px] font-400 mt-5 uppercase">
                                        <p className="text-sm font-600 text-[#555] uppercase">fit details</p>
                                        <p>FITTING : {measurement.fitting}</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-y-2 text-[11px] font-400 mt-5 uppercase">
                                        <p className="text-sm font-600 text-[#555] uppercase">customization</p>
                                        <p>SLEEVE : {measurement.selected_sleeve}</p>
                                        <p>LENGTH : {measurement.selected_length}</p>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="bg-white text-center grid grid-cols-2">
                    <div
                        className="bg-[#606060] py-2 cursor-pointer text-white grid place-items-center align-content-center"
                        onClick={lastModal}>
                        <button className="font-600">&lt; BACK</button>
                        <p className="text-xs uppercase">
                            {
                                product.dress_length_opt.length <= 1 ?
                                    product.sleeve_length_opt.length <= 1 ? "size review"
                                        : "customize sleeve"
                                    : "customize length"

                            }
                        </p>
                    </div>
                    <div
                        className="cursor-pointer  py-2  font-600 text-[#777] grid place-items-center align-content-center"
                        onClick={saveModal}>
                        <button className="font-600">NEXT &gt;</button>
                        <p className="text-xs uppercase">BUY NOW</p>

                    </div>
                </div>
            </div>
        </div>
    );

    return (isMobile) ? mobileView : browserView;
}

export default MeasurementModal3;