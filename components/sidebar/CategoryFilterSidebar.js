import React, { Fragment, useEffect, useState, useCallback } from "react";
import ReactDom from "react-dom";

/**
 * @todo Data for the category filter
 * @params {isMobile } props
 * @constructor
 */

function CategoryFilterModal(props) {

    const [filterExpand, setFilterExpand] = useState(false);

    return (
        <div className={`bg-theme-900/50 fixed inset-0 z-50`} onClick={() => props.setShowSidebarMenu(false)}>
            <div
                className="max-w-[400px] h-full bg-white overflow-x-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="self-end p-4">
                    <button className={`w-6 h-6 float-right`} onClick={() => props.setShowSidebarMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6`} viewBox="0 0 24 24">
                            <path
                                d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z" />
                        </svg>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-10 flex flex-col gap-y-4">
                    <h5 className={`text-h5 font-500 uppercase`}>Filter By</h5>
                    <div className={`flex flex-col gap-y-8 pb-16`}>
                        {props.filterData.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="flex gap-x-2 font-500 items-center mb-2">
                                        <h6 className="text-h6 uppercase flex-1">{item.name}</h6>
                                        <button className="text-sm underline underline-offset-2 leading-none">Reset</button>
                                    </div>
                                    <form onSubmit={e => e.preventDefault()} className={`flex flex-col gap-3`}>
                                        {item.filters.map((filter, i) => {
                                            return (
                                                <div className="flex gap-2 items-center justify-start leading-none" key={i}>
                                                    <input
                                                        type="checkbox"
                                                        className={`text-black border-black/20 focus:ring-offset-0 focus:ring-0 cursor-pointer`}
                                                    />
                                                    <label htmlFor="boo" className={`block capitalize text-sm`}>{filter}</label>
                                                    <span className={`text-black/50 text-xs font-600`}>({props.originalData[item.key[i]]})</span>
                                                </div>
                                            )
                                        })}
                                        {item.filters.length > 4
                                            ? <button
                                                className="text-[#00aff0] w-fit inline-block ml-5"
                                                onClick={() => setFilterExpand(prev => !prev)}
                                            >+{item.filters.length - 4} more</button>
                                            : null
                                        }
                                    </form>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 *
 * @param props isMobile, filterData
 * @returns {null|JSX.Element}
 * @constructor
 */

function CategoryFilterSidebar(props) {
    const [showSidebarMenu, setShowSidebarMenu] = useState(false);
    const [checkboxData, setCheckboxData] = useState(null);
    const [dataChanged, setDataChanged] = useState(false);
    const [filterData, setFilterData] = useState([])

    const updateCheckboxData = (key, value) => {
        checkboxData[key] = value;
        setCheckboxData({ ...checkboxData });
        setDataChanged(!dataChanged);
    }

    useEffect(() => {
        if (props.filterData) {
            let filterDataKeys = Object.keys(props.filterData);
            filterDataKeys = filterDataKeys.map(item => item.split("-")[0])
            filterDataKeys = Array.from(new Set(filterDataKeys))
            const initData = [];
            filterDataKeys.forEach(category => {
                let temp = {}
                Object.keys(props.filterData).forEach(item => {
                    if (item.startsWith(category)) {
                        let filter = item.replace(category + "-", "").replace("-", " ")
                        if (temp.filters) {
                            temp.filters.push(filter)
                            temp.key.push(item)
                        }
                        else {
                            temp = {
                                name: category,
                                key: [item],
                                filters: [filter]
                            }
                        }

                    }
                });
                initData.push(temp)
            })
            setFilterData(initData)
        }
    }, [props.filterData]);
    // console.log("INIT FILTER DATA", checkboxData);

    useEffect(() => {
        if (showSidebarMenu) document.body.classList.add("scroll-overflow");
        return () => document.body.classList.remove("scroll-overflow");
    }, [showSidebarMenu])

    const closeModal = () => {
        setShowSidebarMenu(false);
    }

    const mobileView = null;

    const browserView = (
        <>
            <button onClick={() => setShowSidebarMenu(true)}
                className={`absolute inset-y-0 right-0 py-2 text-sm font-500 uppercase leading-none flex items-center gap-x-1`}>
                Filters
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-3 h-3" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                </svg>
            </button>
            {showSidebarMenu && ReactDom.createPortal(
                <CategoryFilterModal
                    originalData={props.filterData}
                    filterData={filterData}
                    setShowSidebarMenu={setShowSidebarMenu}
                    checkboxData={checkboxData}
                    updateCheckboxData={updateCheckboxData.bind(this)}
                    closeModal={closeModal.bind(this)}
                />,
                document.getElementById("hamburger"))}
        </>
    );

    return props.isMobile ? mobileView : browserView
}

export default CategoryFilterSidebar;
