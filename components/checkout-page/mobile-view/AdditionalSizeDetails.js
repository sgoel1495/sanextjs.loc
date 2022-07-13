import React, { Fragment, useContext, useState } from "react";
import AppWideContext from "../../../store/AppWideContext";

function AdditionalSizeDetail(props) {
    const { dataStore } = useContext(AppWideContext);

    const [showSizeEdit, setShowSizeEdit] = useState(false);

    const brands = ["Marks & Sprencer's", "Zara", "H&M", "Allen Sally", "Van Heusen", "Vero Moda", "Mango"];
    const pantSizes = ["26", "28", "30", "32", "34", "36"];
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
    const [extraMeasure, setExtraMeasure] = useState({
        tops_brand: "",
        tops_brand_other: "",
        tops_size: "",
        tops_size_other: "",
        jeans_pants_size: 0,
        jeans_pants_size_other: 0,
    });

    const labelClass = "block font-500 mb-1";
    const optionClass = "grid grid-cols-2 gap-x-5 justify-center";
    const inputSelect = "w-full border-[#f1f2f3] font-500 text-sm bg-[#f1f2f3] focus:ring-transparent focus:border-black";
    const inputField =
        "w-full border border-[#f1f2f3] bg-[#f1f2f3] placeholder:font-600 placeholder:text-black focus:bg-white focus:ring-transparent focus:border-black";

    const selectOptions = (w) => {
        let returnValues = (
            <option className={inputSelect} value=''>
                Please Select
            </option>
        );
        w.forEach((size) => {
            returnValues = (
                <Fragment>
                    {returnValues}
                    <option className={inputSelect} value={size}>
                        {size}
                    </option>
                </Fragment>
            );
        });

        return returnValues;
    };

    const mobileView = showSizeEdit ? (
        <Fragment>
            <h4 className='text-center text-2xl font-bold p-5'>Let s understand your size better!</h4>
            <div className='grid grid-cols-1 gap-x-8 gap-y-4 text-[#555] px-10'>
                <p className='font-600 text-sm text-[#777] col-span-full'>1. What Size Tops do you usually wear?</p>
                <div className={optionClass}>
                    <div>
                        <label className={labelClass} htmlFor='tops_brand'>
                            Brand:
                        </label>
                        <select
                            className={inputSelect}
                            name='tops_brand'
                            value={extraMeasure.tops_brand}
                            onChange={(e) => updateExtraMeasureValue("tops_brand", e.target.value)}
                        >
                            {selectOptions(brands)}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass} htmlFor='tops_brand_other'>
                            Other:
                        </label>
                        <input
                            className={inputField}
                            name='tops_brand_other'
                            type='text'
                            value={extraMeasure.tops_brand_other}
                            onChange={(e) => updateExtraMeasureValue("tops_brand_other", e.target.value)}
                        />
                    </div>
                </div>
                <div className={optionClass}>
                    <div>
                        <label className={labelClass} htmlFor='tops_size'>
                            Size:
                        </label>
                        <select
                            className={inputSelect}
                            name='tops_size'
                            value={extraMeasure.tops_size}
                            onChange={(e) => updateExtraMeasureValue("tops_size", e.target.value)}
                        >
                            {selectOptions(topSizes)}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass} htmlFor='tops_size_other'>
                            Other:
                        </label>
                        <input
                            className={inputField}
                            name='tops_size_other'
                            type='text'
                            value={extraMeasure.tops_size_other}
                            onChange={(e) => updateExtraMeasureValue("tops_size_other", e.target.value)}
                        />
                    </div>
                </div>
                <p className='font-600 text-sm text-[#777] col-span-full'>2. What is the Jeans/Pants size you wear</p>
                <div className={optionClass}>
                    <div>
                        <label className={labelClass} htmlFor='jeans_pants_size'>
                            Size:
                        </label>
                        <select
                            className={inputSelect}
                            name='jeans_pants_size'
                            value={extraMeasure.jeans_pants_size}
                            onChange={(e) => updateExtraMeasureValue("jeans_pants_size", e.target.value)}
                        >
                            {selectOptions(pantSizes)}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass} htmlFor='jeans_pants_size_other'>
                            Other:
                        </label>
                        <input
                            className={inputField}
                            name='jeans_pants_size_other'
                            type='text'
                            value={extraMeasure.jeans_pants_size_other}
                            onChange={(e) => updateExtraMeasureValue("jeans_pants_size_other", e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className='bg-white text-center grid grid-cols-2 fixed h-auto w-full left-0 right-0 bottom-0 mt-4'>
                <div
                    onClick={() => {
                        setShowSizeEdit(false);
                    }}
                    className='bg-black py-2 cursor-pointer text-gray-300 mr-0.5'
                >
                    <button className='font-600 uppercase'>Cancel </button>
                </div>
                <div
                    onClick={() => {
                        setShowSizeEdit(false);
                    }}
                    className='bg-black py-2 cursor-pointer text-white'
                >
                    <button className='font-600 uppercase'> Update</button>
                </div>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <h4 className='text-center text-2xl font-bold py-5'>Review Your Size Info </h4>
            <div className='grid grid-cols-1 gap-y-4 px-16 text-[#555]'>
                <p className='font-700 text-lg text-center text-[#777] col-span-full'>1. What Size Tops do you usually wear?</p>
                <div className=''>
                    <div>
                        <label className={labelClass} htmlFor='tops_brand'>
                            Brand: {"Zara"}
                        </label>
                    </div>
                </div>
                <div className={optionClass}>
                    <div>
                        <label className={labelClass} htmlFor='tops_size'>
                            Size: {32}
                        </label>
                    </div>
                </div>
                <p className='font-700 text-lg text-center text-[#777] col-span-full'>2. What is the Jeans/Pants size you wear?</p>
                <div className={optionClass}>
                    <div>
                        <label className={labelClass} htmlFor='jeans_pants_size'>
                            Size: {40}
                        </label>
                    </div>
                </div>
            </div>
            <p
                className='p-10 underline'
                onClick={() => {
                    setShowSizeEdit(true);
                }}
            >
                Edit
            </p>
            <div className='bg-white text-center grid grid-cols-2 fixed h-auto w-full left-0 right-0 bottom-0 mt-4'>
                <div
                    onClick={() => {
                        props.setActive(2);
                    }}
                    className='cursor-pointer font-600 text-black py-2'
                >
                    <button className='font-600'>&lt; BACK </button>
                    <p className='text-xs uppercase'>Review Address</p>
                </div>
                <div
                    onClick={() => {
                        props.setActive(4);
                    }}
                    className='bg-black py-2 cursor-pointer text-white'
                >
                    <button className='font-600'> NEXT &gt;</button>
                    <p className='text-xs uppercase'>Select Payment Mode</p>
                </div>
            </div>
        </Fragment>
    );
    const browserView = null;

    return dataStore.mobile ? mobileView : browserView;
}

export default AdditionalSizeDetail;
