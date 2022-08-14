import React from "react";
import {brandOptions, brands, braSizeOptions, braSizes, jeansPantSizeOptions, jeansPantSizes, sizeOptions, sizes} from "./dropdownOptions";

function MeasurementModal2({closeModal, isMobile, measurement, updateValues, lastModal, nextModal, product}) {
    const questionLeadClass = "font-600 text-[#555] tracking-wider";
    const labelClass = "text-sm font-700 text-right mt-[12px]";
    const inputSelect = "w-[105px] font-600 text-xs focus:ring-transparent focus:border-black";
    const inputField = "w-[105px] border border-black bg-[#f1f2f3] placeholder:font-600 placeholder:text-black focus:bg-white focus:ring-transparent focus:border-black";
    const optionClass = "grid grid-cols-2 gap-x-5 justify-center"

    const mobileView = (<div className="bg-black/60 h-screen w-screen fixed inset-0 z-50 grid place-items-center py-[8%] px-[3%]" onClick={closeModal}>
        <div className="bg-white border-4 border-[#b3aeab] rounded-[10vw] overflow-hidden text-[#997756] relative h-full flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="overflow-auto flex-1 px-2">
                <button className="absolute top-2 right-4 text-2xl z-50" onClick={closeModal}>X</button>
                <div className="text-center my-5">
                    <p className="font-cursive italic text-3xl mb-2">{product.is_customize ? "Step 3/5" : "Step 2/2"}</p>
                    <p className="text-lg font-900">SIZE REVIEW</p>
                </div>
                <div className={'flex flex-col items-center gap-y-2'}>
                    <div className={questionLeadClass + " text-[#997756]"}>WHAT&apos;S YOUR TYPICAL SIZE?</div>
                    <div className={optionClass}>
                        <label className={labelClass} htmlFor="bre_size">BRA SIZE:</label>
                        <div className="flex flex-col gap-y-2">
                            <select className={inputSelect} name="bre_size" value={measurement.bre_size}
                                    onChange={e => updateValues("bre_size", e.target.value)}>
                                {braSizeOptions}
                            </select>
                            {(measurement.bre_size == "custom" || (measurement.bre_size != "" && !braSizes.includes(measurement.bre_size)))
                                ? <input className={inputField} name="bra_size_other" type="text" value={measurement.bra_size_other}
                                         onChange={e => updateValues("bra_size_other", e.target.value)}/>
                                : null
                            }
                        </div>
                    </div>
                    <div className={optionClass}>
                        <label className={labelClass} htmlFor="jeans_pant">JEANS/PANT SIZE:</label>
                        <div className="flex flex-col gap-y-2">
                            <select className={inputSelect} name="jeans_pant" value={measurement.jeans_pant}
                                    onChange={e => updateValues("jeans_pant", e.target.value)}>
                                {jeansPantSizeOptions}
                            </select>
                            {(measurement.jeans_pant == "custom" || (measurement.jeans_pant != "" && !jeansPantSizes.includes(measurement.jeans_pant)))
                                ? <input className={inputField} name="jeans_pant_other" type="text" value={measurement.jeans_pant_other}
                                         onChange={e => updateValues("jeans_pant_other", e.target.value)}/>
                                : null
                            }
                        </div>
                    </div>
                </div>
                <div className={'flex flex-col items-center gap-y-2 text-center mt-4 mb-8'}>
                    <div className={questionLeadClass + " text-[#997756]"}>ANY STANDARD SIZES OR BRANDS THAT FIT YOU CLOSEST?</div>
                    <div className={'flex flex-col items-center gap-y-2'}>
                        <div className={"font-900 text-lg"}>FOR TOPS</div>
                        <div className={optionClass}>
                            <label className={labelClass} htmlFor="brand_top">BRAND NAME:</label>
                            <div className="flex flex-col gap-y-2">
                                <select className={inputSelect} name="brand_top" value={measurement.brand_top}
                                        onChange={e => updateValues("brand_top", e.target.value)}>
                                    {brandOptions}
                                </select>
                                {(measurement.brand_top == "custom" || (measurement.brand_top != "" && !brands.includes(measurement.brand_top)))
                                    ? <input className={inputField} name="brand_top_other" type="text" value={measurement.brand_top_other}
                                             onChange={e => updateValues("brand_top_other", e.target.value)}/>
                                    : null
                                }
                            </div>
                        </div>
                        <div className={optionClass}>
                            <label className={labelClass} htmlFor="brand_top_size">SIZES:</label>
                            <div className="flex flex-col gap-y-2">
                                <select className={inputSelect} name="brand_top_size" value={measurement.brand_top_size}
                                        onChange={e => updateValues("brand_top_size", e.target.value)}>
                                    {sizeOptions}
                                </select>
                                {(measurement.brand_top_size == "custom" || (measurement.brand_top_size != "" && !sizes.includes(measurement.brand_top_size)))
                                    ? <input className={inputField} name="brand_top_size_other" type="text" value={measurement.brand_top_size_other}
                                             onChange={e => updateValues("brand_top_size_other", e.target.value)}/>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-col items-center gap-y-2'}>
                        <div className={"font-900 text-lg"}>FOR PANTS</div>
                        <div className={optionClass}>
                            <label className={labelClass} htmlFor="brand_pant">BRAND NAME:</label>
                            <div className="flex flex-col gap-y-2">
                                <select className={inputSelect} name="brand_pant" value={measurement.brand_pant}
                                        onChange={e => updateValues("brand_pant", e.target.value)}>
                                    {brandOptions}
                                </select>
                                {(measurement.brand_pant == "custom" || (measurement.brand_pant != "" && !brands.includes(measurement.brand_pant)))
                                    ? <input className={inputField} name="brand_pant_other" type="text" value={measurement.brand_pant_other}
                                             onChange={e => updateValues("brand_pant_other", e.target.value)}/>
                                    : null
                                }
                            </div>
                        </div>
                        <div className={optionClass}>
                            <label className={labelClass} htmlFor="brand_pant_size">SIZES:</label>
                            <div className="flex flex-col gap-y-2">
                                <select className={inputSelect} name="brand_pant_size" value={measurement.brand_pant_size}
                                        onChange={e => updateValues("brand_pant_size", e.target.value)}>
                                    {sizeOptions}
                                </select>
                                {(measurement.brand_pant_size == "custom" || (measurement.brand_pant_size != "" && !sizes.includes(measurement.brand_pant_size)))
                                    ? <input className={inputField} name="brand_pant_size_other" type="text" value={measurement.brand_pant_size_other}
                                             onChange={e => updateValues("brand_pant_size_other", e.target.value)}/>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-col items-center gap-y-2'}>
                        <div className={"font-900 text-lg"}>FOR DRESSES</div>
                        <div className={optionClass}>
                            <label className={labelClass} htmlFor="brand_dress">BRAND NAME:</label>
                            <div className="flex flex-col gap-y-2">
                                <select className={inputSelect} name="brand_dress" value={measurement.brand_dress}
                                        onChange={e => updateValues("brand_dress", e.target.value)}>
                                    {brandOptions}
                                </select>
                                {(measurement.brand_dress == "custom" || (measurement.brand_dress != "" && !brands.includes(measurement.brand_dress)))
                                    ? <input className={inputField} name="brand_dress_other" type="text" value={measurement.brand_dress_other}
                                             onChange={e => updateValues("brand_dress_other", e.target.value)}/>
                                    : null
                                }
                            </div>
                        </div>
                        <div className={optionClass}>
                            <label className={labelClass} htmlFor="brand_dress_size">SIZES:</label>
                            <div className="flex flex-col gap-y-2">
                                <select className={inputSelect} name="brand_dress_size" value={measurement.brand_dress_size}
                                        onChange={e => updateValues("brand_dress_size", e.target.value)}>
                                    {sizeOptions}
                                </select>
                                {(measurement.brand_dress_size == "custom" || (measurement.brand_dress_size != "" && !sizes.includes(measurement.brand_dress_size)))
                                    ? <input className={inputField} name="brand_dress_size_other" type="text" value={measurement.brand_dress_size_other}
                                             onChange={e => updateValues("brand_dress_size_other", e.target.value)}/>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white text-center grid grid-cols-2 text-[#997756]">
                <div className="bg-[#E5D5C5] py-2 cursor-pointer" onClick={lastModal}>
                    <button className="font-600">&lt; BACK</button>
                    <p className="text-xs uppercase">EDIT MEASUREMENTS</p>
                </div>
                <div className="cursor-pointer font-600" onClick={nextModal}>
                    <button className="font-600">NEXT &gt;</button>
                    <p className="text-xs uppercase">
                        {
                            product.is_customize ?
                                product.sleeve_length_opt.length > 1 ? "customize sleeve"
                                    : product.dress_length_opt.length > 1 ? "customize length"
                                    : "Review" : "Review"
                        }
                    </p>
                </div>
            </div>
        </div>
    </div>);

    const browserView = (
        <div className="bg-black/60 h-screen w-screen fixed inset-0 z-50 grid place-items-center py-[8%] px-[10%]" onClick={closeModal}>
            <div className="bg-white border-2 border-black relative h-full w-[920px] flex flex-col flex-1 overflow-auto" onClick={e => e.stopPropagation()}>
                <div className="overflow-auto flex-1">
                    <button className="absolute top-0 right-8 text-2xl z-50" onClick={closeModal}>X</button>
                    <div className="text-center my-5">
                        <p className="font-cursive italic text-3xl mb-2">{product.is_customize ? "Step 3/5" : "Step 2/2"}</p>
                        <p className="text-lg font-500 text-[#777]">SIZE REVIEW</p>
                    </div>
                    <div className={'flex flex-col items-center gap-y-2'}>
                        <div className={questionLeadClass}>WHAT&apos;S YOUR TYPICAL SIZE?</div>
                        <div className={optionClass}>
                            <label className={labelClass} htmlFor="bre_size">BRA SIZE:</label>
                            <div className="flex flex-col gap-y-2">
                                <select className={inputSelect} name="bre_size" value={measurement.bre_size}
                                        onChange={e => updateValues("bre_size", e.target.value)}>
                                    {braSizeOptions}
                                </select>
                                {(measurement.bre_size == "custom" || (measurement.bre_size != "" && !braSizes.includes(measurement.bre_size)))
                                    ? <input className={inputField} name="bra_size_other" type="text" value={measurement.bra_size_other}
                                             onChange={e => updateValues("bra_size_other", e.target.value)}/>
                                    : null
                                }
                            </div>
                        </div>
                        <div className={optionClass}>
                            <label className={labelClass} htmlFor="jeans_pant">JEANS/PANT SIZE:</label>
                            <div className="flex flex-col gap-y-2">
                                <select className={inputSelect} name="jeans_pant" value={measurement.jeans_pant}
                                        onChange={e => updateValues("jeans_pant", e.target.value)}>
                                    {jeansPantSizeOptions}
                                </select>
                                {(measurement.jeans_pant == "custom" || (measurement.jeans_pant != "" && !jeansPantSizes.includes(measurement.jeans_pant)))
                                    ? <input className={inputField} name="jeans_pant_other" type="text" value={measurement.jeans_pant_other}
                                             onChange={e => updateValues("jeans_pant_other", e.target.value)}/>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-col items-center gap-y-2 text-center mt-4 mb-8'}>
                        <div className={questionLeadClass}>ANY STANDARD SIZES OR BRANDS THAT FIT YOU CLOSEST?</div>
                        <div className={'flex flex-col items-center gap-y-2'}>
                            <div>FOR TOPS</div>
                            <div className={optionClass}>
                                <label className={labelClass} htmlFor="brand_top">BRAND NAME:</label>
                                <div className="flex flex-col gap-y-2">
                                    <select className={inputSelect} name="brand_top" value={measurement.brand_top}
                                            onChange={e => updateValues("brand_top", e.target.value)}>
                                        {brandOptions}
                                    </select>
                                    {(measurement.brand_top == "custom" || (measurement.brand_top != "" && !brands.includes(measurement.brand_top)))
                                        ? <input className={inputField} name="brand_top_other" type="text" value={measurement.brand_top_other}
                                                 onChange={e => updateValues("brand_top_other", e.target.value)}/>
                                        : null
                                    }
                                </div>
                            </div>
                            <div className={optionClass}>
                                <label className={labelClass} htmlFor="brand_top_size">SIZES:</label>
                                <div className="flex flex-col gap-y-2">
                                    <select className={inputSelect} name="brand_top_size" value={measurement.brand_top_size}
                                            onChange={e => updateValues("brand_top_size", e.target.value)}>
                                        {sizeOptions}
                                    </select>
                                    {(measurement.brand_top_size == "custom" || (measurement.brand_top_size != "" && !sizes.includes(measurement.brand_top_size)))
                                        ? <input className={inputField} name="brand_top_size_other" type="text" value={measurement.brand_top_size_other}
                                                 onChange={e => updateValues("brand_top_size_other", e.target.value)}/>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={'flex flex-col items-center gap-y-2'}>
                            <div>FOR PANTS</div>
                            <div className={optionClass}>
                                <label className={labelClass} htmlFor="brand_pant">BRAND NAME:</label>
                                <div className="flex flex-col gap-y-2">
                                    <select className={inputSelect} name="brand_pant" value={measurement.brand_pant}
                                            onChange={e => updateValues("brand_pant", e.target.value)}>
                                        {brandOptions}
                                    </select>
                                    {(measurement.brand_pant == "custom" || (measurement.brand_pant != "" && !brands.includes(measurement.brand_pant)))
                                        ? <input className={inputField} name="brand_pant_other" type="text" value={measurement.brand_pant_other}
                                                 onChange={e => updateValues("brand_pant_other", e.target.value)}/>
                                        : null
                                    }
                                </div>
                            </div>
                            <div className={optionClass}>
                                <label className={labelClass} htmlFor="brand_pant_size">SIZES:</label>
                                <div className="flex flex-col gap-y-2">
                                    <select className={inputSelect} name="brand_pant_size" value={measurement.brand_pant_size}
                                            onChange={e => updateValues("brand_pant_size", e.target.value)}>
                                        {sizeOptions}
                                    </select>
                                    {(measurement.brand_pant_size == "custom" || (measurement.brand_pant_size != "" && !sizes.includes(measurement.brand_pant_size)))
                                        ? <input className={inputField} name="brand_pant_size_other" type="text" value={measurement.brand_pant_size_other}
                                                 onChange={e => updateValues("brand_pant_size_other", e.target.value)}/>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={'flex flex-col items-center gap-y-2'}>
                            <div>FOR DRESSES</div>
                            <div className={optionClass}>
                                <label className={labelClass} htmlFor="brand_dress">BRAND NAME:</label>
                                <div className="flex flex-col gap-y-2">
                                    <select className={inputSelect} name="brand_dress" value={measurement.brand_dress}
                                            onChange={e => updateValues("brand_dress", e.target.value)}>
                                        {brandOptions}
                                    </select>
                                    {(measurement.brand_dress == "custom" || (measurement.brand_dress != "" && !brands.includes(measurement.brand_dress)))
                                        ? <input className={inputField} name="brand_dress_other" type="text" value={measurement.brand_dress_other}
                                                 onChange={e => updateValues("brand_dress_other", e.target.value)}/>
                                        : null
                                    }
                                </div>
                            </div>
                            <div className={optionClass}>
                                <label className={labelClass} htmlFor="brand_dress_size">SIZES:</label>
                                <div className="flex flex-col gap-y-2">
                                    <select className={inputSelect} name="brand_dress_size" value={measurement.brand_dress_size}
                                            onChange={e => updateValues("brand_dress_size", e.target.value)}>
                                        {sizeOptions}
                                    </select>
                                    {(measurement.brand_dress_size == "custom" || (measurement.brand_dress_size != "" && !sizes.includes(measurement.brand_dress_size)))
                                        ? <input className={inputField} name="brand_dress_size_other" type="text" value={measurement.brand_dress_size_other}
                                                 onChange={e => updateValues("brand_dress_size_other", e.target.value)}/>
                                        : null
                                    }
                                </div>
                            </div>
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
                        <p className="text-xs uppercase">{
                            product.is_customize ?
                                product.sleeve_length_opt.length > 1 ? "customize sleeve"
                                    : product.dress_length_opt.length > 1 ? "customize length"
                                    : "Review" : "Review"
                        }</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (isMobile) ? mobileView : browserView;
}

export default MeasurementModal2;