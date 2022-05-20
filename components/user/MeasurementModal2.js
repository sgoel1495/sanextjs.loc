import { Fragment, useState } from "react";

function MeasurementModal2({ closeModal, isMobile, measurement, updateValues, lastModal, nextModal, product }) {

    const braSizes = [
        "30 C", "30 D", "30 DD", "30 E", "30 F", "30 FF", "30G", "30 H",
        "32 A", "32 B", "32 C", "32 D", "32 DD", "32 E", "32 F", "32 G", "32 H",
        "34 A", "34 B", "34 C", "34 D", "34 DD", "34 E", "34 F", "34 FF", "34 G",
        "36 B", "36 C", "36 D", "36 DD", "36 E", "36 F", "36 FF", "36 G", "36 H",
        "38 B", "38 C", "38 D", "38 DD", "38 E", "38 F", "38 FF", "38 G", "38 H",
        "40 A", "40 B", "40 C"
    ]
    const braSizeOptions = () => {
        let returnValues = <option className={inputSelect} value="">Select</option>;
        braSizes.forEach(size => {
            returnValues = <Fragment>
                {returnValues}
                <option className={inputSelect} value={size}>{size}</option>
            </Fragment>
        })

        returnValues = <Fragment>
            {returnValues}
            <option className={inputSelect} value="custom">Other</option>
        </Fragment>

        return returnValues;
    }

    const jeansPantSizes = ["26", "28", "30", "32", "34", "36", "38"]
    const jeansPantSizeOptions = () => {
        let returnValues = <option className={inputSelect} value="">Select</option>
        jeansPantSizes.forEach(size => {
            returnValues = <Fragment>
                {returnValues}
                <option className={inputSelect} value={size}>{size}</option>
            </Fragment>
        })

        returnValues = <Fragment>
            {returnValues}
            <option className={inputSelect} value="custom">Other</option>
        </Fragment>

        return returnValues;
    }

    const brands = [
        "Marks & Sprencer's", "Zara", "H&M", "Allen Sally", "Van Heusen", "Vero Moda", "Mango"
    ]
    const brandOptions = () => {
        let returnValues = <option className={inputSelect} value="">Select</option>;
        brands.forEach(brand => {
            returnValues = <Fragment>
                {returnValues}
                <option className={inputSelect} value={brand}>{brand}</option>
            </Fragment>
        })

        returnValues = <Fragment>
            {returnValues}
            <option className={inputSelect} value="custom">Other</option>
        </Fragment>

        return returnValues;
    }
    const sizes = [
        "UK 6", "UK 8", "UK 10", "UK 12", "UK 14", "UK 16", "UK 18",
        "EU 34", "EU 36", "EU 38", "EU 40", "EU 42", "EU 44", "EU 46",
        "x-Small", "Medium", "Large", "X-Large"
    ]
    const sizeOptions = () => {
        let returnValues = <option className={inputSelect} value="">Select</option>;
        sizes.forEach(size => {
            returnValues = <Fragment>
                {returnValues}
                <option className={inputSelect} value={size}>{size}</option>
            </Fragment>
        })

        returnValues = <Fragment>
            {returnValues}
            <option className={inputSelect} value="custom">Other</option>
        </Fragment>

        return returnValues;
    }
    console.log("Bra Size", measurement.bre_size);

    const questionLeadClass = "font-600 text-[#555] tracking-wider";
    const labelClass = "text-sm font-700 text-right mt-[12px]";
    const inputSelect = "w-[105px] font-600 text-xs focus:ring-transparent focus:border-black";
    const inputField = "w-[105px] border border-black bg-[#f1f2f3] placeholder:font-600 placeholder:text-black focus:bg-white focus:ring-transparent focus:border-black";
    const optionClass = "grid grid-cols-2 gap-x-5 justify-center"

    const mobileView = null;
    const browserView = (
        <div className="bg-black/60 h-screen w-screen fixed inset-0 z-50 grid place-items-center py-[5%] px-[10%]" onClick={closeModal}>
            <div className="bg-white border-2 border-black relative h-[720px] w-[920px] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="overflow-auto flex-1">
                    <button className="absolute top-0 right-8 text-2xl z-50" onClick={closeModal}>X</button>
                    <div className="text-center my-5">
                        <p className="font-cursive italic text-3xl mb-2">Step 2/3</p>
                        <p className="text-lg font-500 text-[#777]">SIZE REVIEW</p>
                    </div>
                    <div className={'flex flex-col items-center gap-y-2'}>
                        <div className={questionLeadClass}>WHAT&apos;S YOUR TYPICAL SIZE?</div>
                        <div className={optionClass}>
                            <label className={labelClass} htmlFor="bre_size">BRA SIZE:</label>
                            <div className="flex flex-col gap-y-2">
                                <select className={inputSelect} name="bre_size" value={measurement.bre_size}
                                    onChange={e => updateValues("bre_size", e.target.value)}>
                                    {braSizeOptions()}
                                </select>
                                {(measurement.bre_size == "custom" || (measurement.bre_size != "" && !braSizes.includes(measurement.bre_size)))
                                    ? <input className={inputField} name="bra_size_other" type="text" value={measurement.bra_size_other}
                                        onChange={e => updateValues("bra_size_other", e.target.value)} />
                                    : null
                                }
                            </div>
                        </div>
                        <div className={optionClass}>
                            <label className={labelClass} htmlFor="jeans_pant">JEANS/PANT SIZE:</label>
                            <div className="flex flex-col gap-y-2">
                                <select className={inputSelect} name="jeans_pant" value={measurement.jeans_pant}
                                    onChange={e => updateValues("jeans_pant", e.target.value)}>
                                    {jeansPantSizeOptions()}
                                </select>
                                {(measurement.jeans_pant == "custom" || (measurement.jeans_pant != "" && !jeansPantSizes.includes(measurement.jeans_pant)))
                                    ? <input className={inputField} name="jeans_pant_other" type="text" value={measurement.jeans_pant_other}
                                        onChange={e => updateValues("jeans_pant_other", e.target.value)} />
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
                                        {brandOptions()}
                                    </select>
                                    {(measurement.brand_top == "custom" || (measurement.brand_top != "" && !brands.includes(measurement.brand_top)))
                                        ? <input className={inputField} name="brand_top_other" type="text" value={measurement.brand_top_other}
                                            onChange={e => updateValues("brand_top_other", e.target.value)} />
                                        : null
                                    }
                                </div>
                            </div>
                            <div className={optionClass}>
                                <label className={labelClass} htmlFor="brand_top_size">SIZES:</label>
                                <div className="flex flex-col gap-y-2">
                                    <select className={inputSelect} name="brand_top_size" value={measurement.brand_top_size}
                                        onChange={e => updateValues("brand_top_size", e.target.value)}>
                                        {sizeOptions()}
                                    </select>
                                    {(measurement.brand_top_size == "custom" || (measurement.brand_top_size != "" && !sizes.includes(measurement.brand_top_size)))
                                        ? <input className={inputField} name="brand_top_size_other" type="text" value={measurement.brand_top_size_other}
                                            onChange={e => updateValues("brand_top_size_other", e.target.value)} />
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
                                        {brandOptions()}
                                    </select>
                                    {(measurement.brand_pant == "custom" || (measurement.brand_pant != "" && !brands.includes(measurement.brand_pant)))
                                        ? <input className={inputField} name="brand_pant_other" type="text" value={measurement.brand_pant_other}
                                            onChange={e => updateValues("brand_pant_other", e.target.value)} />
                                        : null
                                    }
                                </div>
                            </div>
                            <div className={optionClass}>
                                <label className={labelClass} htmlFor="brand_pant_size">SIZES:</label>
                                <div className="flex flex-col gap-y-2">
                                    <select className={inputSelect} name="brand_pant_size" value={measurement.brand_pant_size}
                                        onChange={e => updateValues("brand_pant_size", e.target.value)}>
                                        {sizeOptions()}
                                    </select>
                                    {(measurement.brand_pant_size == "custom" || (measurement.brand_pant_size != "" && !sizes.includes(measurement.brand_pant_size)))
                                        ? <input className={inputField} name="brand_pant_size_other" type="text" value={measurement.brand_pant_size_other}
                                            onChange={e => updateValues("brand_pant_size_other", e.target.value)} />
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
                                        {brandOptions()}
                                    </select>
                                    {(measurement.brand_dress == "custom" || (measurement.brand_dress != "" && !brands.includes(measurement.brand_dress)))
                                        ? <input className={inputField} name="brand_dress_other" type="text" value={measurement.brand_dress_other}
                                            onChange={e => updateValues("brand_dress_other", e.target.value)} />
                                        : null
                                    }
                                </div>
                            </div>
                            <div className={optionClass}>
                                <label className={labelClass} htmlFor="brand_dress_size">SIZES:</label>
                                <div className="flex flex-col gap-y-2">
                                    <select className={inputSelect} name="brand_dress_size" value={measurement.brand_dress_size}
                                        onChange={e => updateValues("brand_dress_size", e.target.value)}>
                                        {sizeOptions()}
                                    </select>
                                    {(measurement.brand_dress_size == "custom" || (measurement.brand_dress_size != "" && !sizes.includes(measurement.brand_dress_size)))
                                        ? <input className={inputField} name="brand_dress_size_other" type="text" value={measurement.brand_dress_size_other}
                                            onChange={e => updateValues("brand_dress_size_other", e.target.value)} />
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {(product)
                    ?<div className="bg-white text-center grid grid-cols-2">
                        <div className="bg-[#606060] py-2 cursor-pointer text-white" onClick={lastModal}>
                            <button className="font-600">&lt; BACK</button>
                            <p className="text-xs uppercase">EDIT MEASUREMENTS</p>
                        </div>
                        <div className="cursor-pointer font-600 text-[#777]" onClick={nextModal}>
                            <button className="font-600">NEXT &gt;</button>
                            <p className="text-xs uppercase">Review</p>
                        </div>
                    </div>
                    :<div className="bg-white text-center grid grid-cols-2">
                        <div className="bg-[#606060] py-2 cursor-pointer text-white" onClick={lastModal}>
                            <button className="font-600">&lt; BACK</button>
                            <p className="text-xs uppercase">FIT DETAILS</p>
                        </div>
                        <div className="cursor-pointer font-600 text-[#777]" onClick={nextModal}>
                            <button className="font-600">NEXT &gt;</button>
                            <p className="text-xs uppercase">Review</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );

    return (isMobile) ? mobileView : browserView;
}

export default MeasurementModal2;