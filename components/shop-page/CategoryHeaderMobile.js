import React, { useContext, useEffect, useState } from 'react';
import Link from "next/link";
import AppWideContext from "../../store/AppWideContext";
import ReactDom from "react-dom";

const drawerButtonClass = "block bg-[#faf4f0] border-2 border-white shadow-[4px_4px_6px_0.6px_rgba(0,0,0,0.1)] leading-none"

const DrawerFilter = props => {
    return (
        <>
            <h3 className="text-h5 font-900 uppercase text-center mt-2 mb-5">Filter By</h3>
            <div className="flex flex-col items-center gap-5 flex-1">
                <div className="flex-1 overflow-y-auto">
                    Filter Data
                </div>
                <button className={drawerButtonClass + " rounded-full uppercase font-900 py-3 px-8 tracking-widest"}>Apply</button>
            </div>
        </>
    )
}

const DrawerSort = props => {
    const sortButtonClass = drawerButtonClass + " rounded-2xl font-cursive capitalize pb-3 pt-4 px-2"
    return (
        <>
            <h3 className="text-h5 font-900 uppercase text-center mt-2 mb-5">Sort By</h3>
            <div className="grid grid-cols-2 gap-4">
                <button className={sortButtonClass}>Price low to high</button>
                <button className={sortButtonClass}>Price high to low</button>
                <button className={sortButtonClass}>Most popular</button>
                <button className={sortButtonClass}>New arrivals</button>
            </div>
        </>
    )
}

const BottomDrawer = props => {
    return (
        <>
            <div
                className="fixed inset-0 z-50 flex align-bottom"
                onClick={props.onClose}
            >
                <div
                    className='relative flex flex-col mt-auto h-2/3 w-full bg-[#faf4f0] text-[#997756] rounded-t-[7.5vw] border-2 border-[#faede3] shadow-[0_7px_12px_12px_rgba(0,0,0,0.13)] overflow-hidden p-4'
                    onClick={e => e.stopPropagation()}
                >
                    <button className="absolute right-0 top-0 p-2" onClick={props.onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 24 24' className="w-8 h-8 text-black/50">
                            <path fill="currentColor" d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
                            </path>
                        </svg>
                    </button>
                    {props.children}
                </div>
            </div>
        </>
    )
}

const CategoryHeaderMobile = ({ category, activeLayout, setActiveLayout, minimal }) => {
    const { dataStore } = useContext(AppWideContext);

    const [dropDownView, setDropDownView] = useState(false);
    const [bottomDrawer, setBottomDrawer] = useState(false);
    const [drawerData, setDrawerData] = useState(null);

    const dropData = [];
    const categories = { categories: dataStore.categories, accessories: dataStore.accessories }

    categories.categories.forEach((ele) => {
        dropData.push({
            id: ele.category,
            link: ele.link,
            category: ele.category,
            new: ele.new
        });
    });
    categories.accessories.forEach((ele) => {
        dropData.push({
            id: ele.category,
            link: ele.link,
            category: ele.category,
            new: ele.new
        });
    });

    useEffect(() => {
        setDropDownView(false)
    }, [category])
    return (
        <>
            <div className={minimal ? "flex justify-between bg-[#faf4f0]" : "bg-[#faf4f0]"}>
                <div className="relative">
                    <div className="inline-flex px-4 items-center justify-start" onClick={() => setDropDownView(!dropDownView)}>
                        <p className="text-h4 uppercase font-900 text-[#333231]">{category}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path fill="#ec9c98" d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z" />
                        </svg>
                    </div>
                    {dropDownView
                        ? <div className="absolute inset-x-0 top-full shadow bg-[#2f2f2f] px-4  max-h-[200px] overflow-y-auto z-20">
                            <button className="absolute right-0 top-0 p-2" onClick={() => setDropDownView(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 24 24' className="w-8 h-8 text-white/50">
                                    <path fill="currentColor" d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
                                    </path>
                                </svg>
                            </button>
                            {dropData.map((item, index) => {
                                return (
                                    <Link href={item.link} key={index} passHref>
                                        <span className="block py-2.5 font-700 text-center uppercase text-white" key={index}>{item.category}</span>
                                    </Link>
                                )
                            })}
                        </div>
                        : null
                    }
                </div>
                <div className="flex items-center justify-between px-4">
                    {
                        minimal ||
                        <div className="inline-flex gap-4 items-center">
                            <button className={`grid place-items-center w-6 h-6 rounded-lg border ${activeLayout === "1" ? 'border-black' : 'border-transparent'}`}
                                onClick={() => setActiveLayout("1")}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" fill="currentColor">
                                    <path
                                        d="M230,258 C203.49,258 182,279.49 182,306 C182,332.51 203.49,354 230,354 C256.499,353.974 277.974,332.499 278,306 C278,279.49 256.51,258 230,258 zM230,338 C212.327,338 198,323.673 198,306 C198,288.327 212.327,274 230,274 C247.673,274 262,288.327 262,306 C262,323.673 247.673,338 230,338 z" />
                                    <path
                                        d="M228,143 C201.49,143 180,164.49 180,191 C180,217.51 201.49,239 228,239 C254.49900000000002,238.974 275.974,217.499 276,191 C276,164.49 254.51,143 228,143 zM228,223 C210.327,223 196,208.673 196,191 S210.327,159 228,159 S260,173.327 260,191 S245.673,223 228,223 z" />
                                </svg>
                            </button>
                            <button className={`grid place-items-center w-6 h-6 rounded-lg border ${activeLayout === "2" ? 'border-black' : 'border-transparent'}`}
                                onClick={() => setActiveLayout("2")}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" fill="currentColor">
                                    <path
                                        d="M312,120c-26.51,0-48,21.49-48,48c0,26.51,21.49,48,48,48c26.499-0.026,47.974-21.501,48-48     C360,141.49,338.51,120,312,120z     M312,200c-17.673,0-32-14.327-32-32s14.327-32,32-32c17.673,0,32,14.327,32,32     S329.673,200,312,200z" />
                                    <path
                                        d="M312,264c-26.51,0-48,21.49-48,48c0,26.51,21.49,48,48,48c26.499-0.026,47.974-21.501,48-48     C360,285.49,338.51,264,312,264z M312,344c-17.673,0-32-14.327-32-32c0-17.673,14.327-32,32-32c17.673,0,32,14.327,32,32     C344,329.673,329.673,344,312,344z" />
                                    <path
                                        d="M168,120c-26.51,0-48,21.49-48,48c0,26.51,21.49,48,48,48c26.499-0.026,47.974-21.501,48-48     C216,141.49,194.51,120,168,120z M168,200c-17.673,0-32-14.327-32-32s14.327-32,32-32s32,14.327,32,32S185.673,200,168,200z" />
                                    <path
                                        d="M168,264c-26.51,0-48,21.49-48,48c0,26.51,21.49,48,48,48c26.499-0.026,47.974-21.501,48-48     C216,285.49,194.51,264,168,264z M168,344c-17.673,0-32-14.327-32-32c0-17.673,14.327-32,32-32s32,14.327,32,32     C200,329.673,185.673,344,168,344z" />
                                </svg>
                            </button>
                        </div>
                    }
                    <div className="inline-flex gap-4 items-center py-2">
                        <button
                            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider font-500 leading-none"
                            onClick={() => {
                                setBottomDrawer(true)
                                setDrawerData(<DrawerFilter />)
                            }}
                        >
                            Filter
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" fill="currentColor" className="w-4 h-4">
                                <path
                                    d="M8,41.08V2c0-0.553-0.448-1-1-1S6,1.447,6,2v39.08C2.613,41.568,0,44.481,0,48c0,3.859,3.14,7,7,7s7-3.141,7-7   C14,44.481,11.387,41.568,8,41.08z M7,53c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S9.757,53,7,53z" />
                                <path
                                    d="M29,20.695V2c0-0.553-0.448-1-1-1s-1,0.447-1,1v18.632c-3.602,0.396-6.414,3.456-6.414,7.161s2.812,6.765,6.414,7.161V54   c0,0.553,0.448,1,1,1s1-0.447,1-1V34.891c3.4-0.577,6-3.536,6-7.098S32.4,21.272,29,20.695z M27.793,33   c-2.871,0-5.207-2.336-5.207-5.207s2.335-5.207,5.207-5.207S33,24.922,33,27.793S30.664,33,27.793,33z" />
                                <path
                                    d="M56,8c0-3.859-3.14-7-7-7s-7,3.141-7,7c0,3.519,2.613,6.432,6,6.92V54c0,0.553,0.448,1,1,1s1-0.447,1-1V14.92   C53.387,14.432,56,11.519,56,8z M49,13c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S51.757,13,49,13z" />
                            </svg>
                        </button>
                        <button
                            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider font-500 leading-none"
                            onClick={() => {
                                setBottomDrawer(true)
                                setDrawerData(<DrawerSort />)
                            }}
                        >
                            Sort
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 294.842 294.842" fill="currentColor" className="w-4 h-4">
                                <path
                                    d="M292.128,214.846c-2.342-2.344-6.143-2.344-8.484,0l-59.512,59.511V6c0-3.313-2.687-6-6-6s-6,2.687-6,6v268.356   l-59.513-59.512c-2.342-2.342-6.142-2.343-8.485,0.001c-2.343,2.343-2.343,6.142,0.001,8.485l69.755,69.754   c1.171,1.171,2.707,1.757,4.242,1.757s3.071-0.586,4.242-1.758l69.754-69.754C294.472,220.987,294.472,217.188,292.128,214.846z" />
                                <path d="M6.956,12h180.137c3.313,0,6-2.687,6-6s-2.687-6-6-6H6.956c-3.313,0-6,2.687-6,6S3.643,12,6.956,12z" />
                                <path d="M6.956,82.228h180.137c3.313,0,6-2.687,6-6s-2.687-6-6-6H6.956c-3.313,0-6,2.687-6,6S3.643,82.228,6.956,82.228z" />
                                <path d="M6.956,152.456h180.137c3.313,0,6-2.687,6-6s-2.687-6-6-6H6.956c-3.313,0-6,2.687-6,6S3.643,152.456,6.956,152.456z" />
                                <path d="M124.438,210.685H6.956c-3.313,0-6,2.687-6,6s2.687,6,6,6h117.482c3.313,0,6-2.687,6-6S127.752,210.685,124.438,210.685z" />
                                <path d="M124.438,280.912H6.956c-3.313,0-6,2.687-6,6s2.687,6,6,6h117.482c3.313,0,6-2.687,6-6S127.752,280.912,124.438,280.912z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {bottomDrawer && ReactDom.createPortal(
                <BottomDrawer onClose={() => setBottomDrawer(false)}>
                    {drawerData}
                </BottomDrawer>,
                document.getElementById("bottomDrawer"))
            }
        </>
    );
};

export default CategoryHeaderMobile;