import React, {Fragment, useEffect, useState} from "react";
import ReactDom from "react-dom";

/**
 * @todo Data for the category filter
 * @params {isMobile } props
 * @constructor
 */



function CategoryFilterModal(props) {
    //props: closeModal, checkboxData, updateCheckboxData, filterData
    const {closeModal, checkboxData, updateCheckboxData, filterData} = props;
    const keys = (filterData) ? Object.keys(filterData.break_speed) : [];
    console.log("KEYS", keys);
    console.log("FILTER DATA", props.filterData);

    const removeCategoryFromString = (category, stringValue) => {
        const lengthOfCategory = category.length();
        return stringValue.substr(lengthOfCategory);
    }
    // filters need to be in this order. All possible filters should be mentioned here
    const possibleFilters = [
        {"category": "CATEGORY"}, {"fabric": "FABRIC"}, {"sleeve-length": "SLEEVE LENGTH"}, {"neckline": "NECKLINE"},
        {"pattern": "PATTERN"}, {"color": "COLOR"}, {"fit-or-style": "FIT / STYLE"}];

    const createElement = (e) => {
        let returnElement = <h2>{possibleFilters[e]}</h2>;
        const breakSpeed = filterData.break_speed[e];
        breakSpeed.forEach(ele => {
            const name = e + "-" + ele;
            returnElement = (
                <Fragment>
                    {returnElement}
                    <input
                        type="checkbox"
                        name={name}
                        checked={checkboxData[name]}
                        id={name}
                        onChange={() => updateCheckboxData(name, !checkboxData[name])}
                    />
                </Fragment>
            );
        });
    }

    let returnValue = null;
    if (!props.filterData || !props.filterData.hasOwnProperty("filter_count")) {
        possibleFilters.forEach(filter => {
            returnValue = (
                <Fragment>
                    {returnValue}
                    {createElement(filter)}
                </Fragment>
            )
        })
        returnValue = (
            <form>
                {returnValue}
            </form>
        )
    }

    return (
        <div className={`bg-theme-900/50 fixed inset-0 z-20`} onClick={() => props.setShowSidebarMenu(false)}>
            <div
                className="max-w-[400px] h-full bg-white overflow-x-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="self-end p-4">
                    <button className={`w-6 h-6 float-right`} onClick={() => props.setShowSidebarMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6`} viewBox="0 0 24 24">
                            <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/>
                        </svg>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-10 flex flex-col gap-y-4">
                    <h5 className={`text-h5 font-500 uppercase`}>Filter By</h5>
                    <div className={`flex flex-col gap-y-2`}>
                        <div className="flex gap-x-2 font-500 items-center">
                            <h6 className="text-h6 uppercase flex-1">Group Header</h6>
                            <button className="text-sm underline underline-offset-2 leading-none">Reset</button>
                        </div>
                        <form onSubmit={e => e.preventDefault()} className={`flex flex-col gap-2`}>
                            <div className="flex gap-2 items-center justify-start leading-none">
                                <input
                                    type="checkbox"
                                    className={`text-black focus:ring-offset-0 focus:ring-0`}
                                />
                                <label htmlFor="boo" className={`block`}>Input Label</label>
                                <span className={`text-black/50 text-xs font-600`}>(22)</span>
                            </div>
                            <div className="flex gap-2 items-center justify-start leading-none">
                                <input
                                    type="checkbox"
                                    className={`text-black focus:ring-0`}
                                />
                                <label htmlFor="boo" className={`block`}>Input Label</label>
                                <span className={`text-black/50 text-xs font-600`}>(22)</span>
                            </div>
                        </form>
                    </div>
                    {returnValue}
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

    const updateCheckboxData = (key, value) => {
        checkboxData[key] = value;
        setCheckboxData({...checkboxData});
        setDataChanged(!dataChanged);
    }

    useEffect(() => {
        console.log("Props FilterData", props.filterData);
        if (props.filterData
            && props.filterData.hasOwnProperty("filter_count")) {
            const ok = Object.keys(props.filterData.filter_count);
            const initData = [];
            ok.forEach(key => {
                const d = {};
                if (key.startsWith("category-"))
                    d[key] = true;
                else
                    d[key] = false;
                initData.push(d);
            });
            const dataKeys = Object.keys(props.filterData.filter_count);
            dataKeys.forEach(key => {
                const d = {};
                d[key + "-view-all"] = false;
                initData.push(d);
            })
            setCheckboxData(initData);
        }
    }, [props.filterData]);
    console.log("INIT FILTER DATA", checkboxData);

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
            <button onClick={() => setShowSidebarMenu(true)} className={`absolute inset-y-0 right-0 py-2 text-sm font-500 uppercase leading-none flex items-end gap-x-1`}>
                Filters
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-3 h-3" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
            {showSidebarMenu && ReactDom.createPortal(
                <CategoryFilterModal
                    filterData={props.filterData}
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
