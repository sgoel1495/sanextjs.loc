import Image from "next/image";
import React from "react";
import {brandOptions, brands, braSizeOptions, braSizes, jeansPantSizeOptions, jeansPantSizes, sizeOptions, sizes} from "./dropdownOptions";

const CustomizeLength = ({closeModal, data, currentMeasurement, updateValues, defaultValue, lastModal, nextModal, product,isMobile}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    if (product.dress_length_opt.length <= 1) {
        nextModal()
    }
    let mobile = <div className={['bg-black/60 h-screen fixed inset-0 z-[90] grid place-items-center py-[8%] px-[3%]']}>
        <div className={"bg-white h-full w-full rounded-[10vw] border-4 border-[#b3aeab] flex flex-col items-center justify-between pt-5 overflow-hidden"}>
            <div className={"relative flex flex-col items-center justify-center tracking-wider text-lg text-[#997756] w-full"}>
                <button className="absolute top-[-1rem] right-4 text-2xl z-50" onClick={closeModal}>X</button>
                <p className='font-cursive italic text-3xl mb-2'>Step 5/5</p>
                <p className={"uppercase mt-8 text-base font-600"}>select your dress length</p>
                <div className={"px-4 grid grid-cols-2 w-full text-[#997756] text-base mt-8"}>
                    {
                        data.map((item, index) => {
                            return <div className={"p-2"} key={index}>
                                <div
                                    className={"w-full border-4 rounded-3xl overflow-hidden text-center pb-3 " + [currentMeasurement["selected_length"] === item ? "border-[#997756]" : "border-[#b3aeab]"]}
                                    onClick={() => updateValues("selected_length", item)}>
                                    <span className={"relative block w-full aspect-[123/160]"}>
                                        <Image src={WEBASSETS + `/assets/dresses-length/cap-${item.toLowerCase().replace(" ", "_")}.jpg`} layout={`fill`} objectFit={`cover`}/>
                                        <span className={"absolute bottom-0 left-[50%] translate-x-[-50%] capitalize"}>{item}</span>
                                    </span>
                                </div>
                                {
                                    defaultValue === item && <div className="text-[#997756] uppercase text-center text-[11px] font-500 tracking-wide leading-3 mt-1">
                                        <span className={"block"}>as shown</span>
                                        <span className={"block"}>(original)</span>
                                    </div>
                                }
                            </div>
                        })
                    }
                </div>
                <p className={"mx-16 text-center mt-8"}>You Selected <span className={"font-600"}>{currentMeasurement["selected_length"]}</span> length</p>
                <input type="number" min={0} placeholder={"inches"} className={"p-0 w-16 text-sm"} value={currentMeasurement['length']}
                       onChange={(e) => updateValues("length", e.target.value)}/>
                <p className={"text-xs font-cursive italic font-900 mt-6"}>you can edit it.</p>
            </div>
            <div className="bg-white text-center grid grid-cols-2 text-[#997756] w-full">
                <div className="bg-[#E5D5C5] py-2 cursor-pointer" onClick={lastModal}>
                    <button className="font-600">&lt; BACK</button>
                    <p className="text-xs uppercase">
                        {
                            product.is_customize ?
                                product.sleeve_length_opt.length > 1 ? "customize sleeve"
                                    : "Size Review" : "Size Review"
                        }
                    </p>
                </div>
                <div className="cursor-pointer font-600" onClick={nextModal}>
                    <button className="font-600">NEXT &gt;</button>
                    <p className="text-xs uppercase">Review</p>
                </div>
            </div>
        </div>
    </div>

    let browser = <div className="bg-black/60 h-screen w-screen fixed inset-0 z-50 grid place-items-center py-[8%] px-[10%]" onClick={closeModal}>
        <div className="bg-white border-2 border-black relative h-full w-[920px] flex flex-col flex-1 overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="overflow-auto flex-1">
                <button className="absolute top-0 right-8 text-2xl z-50" onClick={closeModal}>X</button>
                <div className="text-center my-5">
                    <p className="font-cursive italic text-3xl mb-2">Step 5/5</p>
                    <p className="text-base font-600 text-[#606060] uppercase">select your dress length</p>
                </div>

                <div className={"px-12 grid grid-cols-2 gap-x-12 w-full text-black text-base mt-8"}>
                    {
                        data.map((item, index) => {
                            return <div className={"p-2"} key={index}>
                                <div
                                    className={"w-full overflow-hidden text-center " + [currentMeasurement["selected_length"] === item ? "border-black border-2" : ""]}
                                    onClick={() => updateValues("selected_length", item)}>
                                    <span className={"relative block w-full aspect-[123/160]"}>
                                        <Image src={WEBASSETS + `/assets/dresses-length/cap-${item.toLowerCase().replace(" ", "_")}.jpg`} layout={`fill`} objectFit={`cover`}/>
                                        <span className={"absolute bottom-0 left-[50%] translate-x-[-50%] capitalize"}>{item}</span>
                                    </span>
                                </div>
                                {
                                    defaultValue === item && <div className="text-black uppercase text-center text-[11px] font-500 tracking-wide leading-3 mt-1">
                                        <span className={"block"}>as shown</span>
                                        <span className={"block"}>(original)</span>
                                    </div>
                                }
                            </div>
                        })
                    }
                </div>
                <div className={"text-center"}>
                    <p className={"mx-16 text-center mt-8"}>You Selected <span className={"font-600"}>{currentMeasurement["selected_length"]}</span> length</p>
                    <input type="number" min={0} placeholder={"inches"} className={"p-0 w-16 text-sm"} value={currentMeasurement['length']}
                           onChange={(e) => updateValues("length", e.target.value)}/>
                    <p className={"text-xs font-cursive italic font-900 mt-6"}>you can edit it.</p>
                </div>

            </div>
            <div className="bg-white text-center grid grid-cols-2">
                <div className="bg-[#606060] py-2 cursor-pointer text-white" onClick={lastModal}>
                    <button className="font-600">&lt; BACK</button>
                    <p className="text-xs uppercase">
                        {
                            product.is_customize ?
                                product.sleeve_length_opt.length > 1 ? "customize sleeve"
                                    : "Size Review" : "Size Review"
                        }
                    </p>
                </div>
                <div className="cursor-pointer font-600 text-[#777]" onClick={nextModal}>
                    <button className="font-600">NEXT &gt;</button>
                    <p className="text-xs uppercase">Review</p>
                </div>
            </div>
        </div>
    </div>

    return isMobile ? mobile : browser
}

export default CustomizeLength