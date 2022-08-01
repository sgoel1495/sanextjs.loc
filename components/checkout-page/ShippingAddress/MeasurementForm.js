import React, {useMemo} from 'react';

const MeasurementForm = ({isMobile, extraMeasure, setExtraMeasure}) => {

    const selectOptions = (w) => {
        let returnValues = (
            <option className={inputSelect} value=''>
                Please Select
            </option>
        );
        w.forEach((size) => {
            returnValues = (
                <>
                    {returnValues}
                    <option className={inputSelect} value={size}>
                        {size}
                    </option>
                </>
            );
        });

        return returnValues;
    };

    const brands = ["Marks & Sprencer's", "Zara", "H&M", "Allen Sally", "Van Heusen", "Vero Moda", "Mango"];
    const topSizes = [
        "< XS",
        "XS",
        "M",
        "L",
        "XL",
        "XXL",
        "UK 6",
        "UK 8",
        "UK 10",
        "UK 12",
        "UK 14",
        "UK 16",
        "UK 18",
        "EU 34",
        "EU 36",
        "EU 38",
        "EU 40",
        "EU 42",
        "EU 44",
        "EU 46",
    ];
    const pantSizes = ["26", "28", "30", "32", "34", "36"];

    const selectBrand = useMemo(() => selectOptions(brands), [])
    const selectTopSize = useMemo(() => selectOptions(topSizes), [])
    const selectPantsSize = useMemo(() => selectOptions(pantSizes), [])

    const labelClass = "block font-500 mb-1";
    const optionClass = "grid grid-cols-2 gap-x-5 justify-center";
    const inputSelect = "w-full border-[#f1f2f3] font-500 text-sm bg-[#f1f2f3] focus:ring-transparent focus:border-black";
    const inputField = "w-full border border-[#f1f2f3] bg-[#f1f2f3] placeholder:font-600 placeholder:text-black focus:bg-white focus:ring-transparent focus:border-black";

    return (
        <>
            <p className={'font-600 text-[#777] col-span-full ' + [isMobile ? "text-[17px] text-center" : "text-sm"]}>1. What Size Tops do you usually wear?</p>
            <div className={optionClass}>
                <div className={isMobile && "col-span-2"}>
                    <label className={labelClass} htmlFor='tops_brand'>
                        Brand:
                    </label>
                    <select
                        className={inputSelect}
                        name='tops_brand'
                        value={extraMeasure.tops_brand}
                        onChange={setExtraMeasure}
                    >
                        {selectBrand}
                    </select>
                </div>
                <div className={isMobile && "grid grid-cols-2 col-span-2 my-3"}>
                    <label className={labelClass} htmlFor='tops_brand_other'>
                        Other:
                    </label>
                    <input
                        className={inputField}
                        name='tops_brand_other'
                        type='text'
                        value={extraMeasure.tops_brand_other}
                        onChange={setExtraMeasure}
                    />
                </div>
            </div>
            <div className={optionClass}>
                <div className={isMobile && "col-span-2"}>
                    <label className={labelClass} htmlFor='tops_size'>
                        Size:
                    </label>
                    <select
                        className={inputSelect}
                        name='tops_size'
                        value={extraMeasure.tops_size}
                        onChange={setExtraMeasure}
                    >
                        {selectTopSize}
                    </select>
                </div>
                <div className={isMobile && "grid grid-cols-2 col-span-2 my-3"}>
                    <label className={labelClass} htmlFor='tops_size_other'>
                        Other:
                    </label>
                    <input
                        className={inputField}
                        name='tops_size_other'
                        type='text'
                        value={extraMeasure.tops_size_other}
                        onChange={setExtraMeasure}
                    />
                </div>
            </div>
            <p className={'font-600 text-[#777] col-span-full ' + [isMobile ? "text-[17px] text-center" : "text-sm"]}>2. What is the Jeans/Pants size you wear</p>
            <div className={optionClass}>
                <div className={isMobile && "col-span-2"}>
                    <label className={labelClass} htmlFor='jeans_pants_size'>
                        Size:
                    </label>
                    <select
                        className={inputSelect}
                        name='jeans_pants_size'
                        value={extraMeasure.jeans_pants_size}
                        onChange={setExtraMeasure}
                    >
                        {selectPantsSize}
                    </select>
                </div>
                <div className={isMobile && "grid grid-cols-2 col-span-2 my-3"}>
                    <label className={labelClass} htmlFor='jeans_pants_size_other'>
                        Other:
                    </label>
                    <input
                        className={inputField}
                        name='jeans_pants_size_other'
                        type='text'
                        value={extraMeasure.jeans_pants_size_other}
                        onChange={setExtraMeasure}
                    />
                </div>
            </div>
            <div className=''/>
        </>
    );
};

export default MeasurementForm;