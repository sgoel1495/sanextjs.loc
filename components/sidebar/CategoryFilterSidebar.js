import React, { Fragment, useEffect, useState, useCallback, useContext } from "react";
import ReactDom from "react-dom";
import AppWideContext from "../../store/AppWideContext";
import { apiCall } from "../../helpers/apiCall";

/**
 * @todo Data for the category filter
 * @params {isMobile } props
 * @constructor
 */


function Checkbox(props) {
    const [isChecked, setIsChecked] = useState(false)
    useEffect(() => {
        const result = !!(props.checkBoxes[props.item.name] && props.checkBoxes[props.item.name].includes(props.filter))
        if (result != isChecked)
            setIsChecked(result)
    }, [props.checkBoxes, props.refresh])

    const handleCheckboxChange = (e) => {
        const newVal = !isChecked
        props.handleCheckboxChange(props.item.name, props.filter, newVal)
        setIsChecked(newVal)
    }

    return (
        <div className="flex gap-2 items-center justify-start leading-none" key={props.item.name + props.filter}>
            <input
                checked={isChecked}
                onChange={(e) => handleCheckboxChange(e)}
                type="checkbox"
                className={`text-black border-black/20 focus:ring-offset-0 focus:ring-0 cursor-pointer`}
                id={props.item.name + props.filter}
                name={props.item.name + props.filter}
            />
            <label htmlFor={props.item.name + props.filter} className={`block capitalize text-sm`}>{props.filter}</label>
            <span className={`text-black/50 text-xs font-600`}>({props.count}) {isChecked}</span>
        </div>
    );
}

function CategoryFilterModal(props) {
    const { dataStore, updateDataStore } = useContext(AppWideContext);
    const [filterExpand, setFilterExpand] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [checkedBoxes, setCheckedBoxes] = useState(dataStore.filterCheckboxes);

    const initArray = () => {
        const initArray = {}
        props.filterData.forEach(item => {
            initArray[item.name] = []
        })
        setCheckedBoxes(initArray)
    }
    useEffect(() => {
        if (Object.keys(checkedBoxes).length === 0)
            initArray()
    }, [props.filterData])

    const getCategory = () => {
        let returnValue = ""
        Object.keys(props.originalData).forEach(key => {
            if (key.includes("category-"))
                returnValue = key.substring(9)
        })
        return returnValue
    }

    useEffect(() => {
        const keys = Object.keys(checkedBoxes)
        const newFilter = {}
        console.log("Keys", keys, keys.length)

        // case before init
        if (keys.length === 0)
            return

        // case after init
        let haveData = false
        const queryObject = {
            category: getCategory(),
            skip: 0,
            limit: 10000,
            sorted_by: "price-desc",
            filter_by: {}
        }
        for (let x = 0; x < keys.length; x++) {
            console.log("======== I HAVE DATA ==========", checkedBoxes[keys[x]])
            if (checkedBoxes[keys[x]].length > 0) {
                haveData = true
                queryObject.filter_by[keys[x]] = checkedBoxes[keys[x]]
            }
        }
        let isChanged = false
        if (haveData) {
            console.log("======== COMPLETED QUERY ==========", queryObject)
            apiCall("getProducts", dataStore.apiToken, queryObject)
                .then(resp => {
                    //console.log("RESPONSE",resp)
                    const limitProducts = []
                    if (resp.response && resp.response.data) {
                        resp.response.data.forEach(p => {
                            limitProducts.push(p.asset_id)
                            if (!dataStore.filter.includes(p.asset_id))
                                isChanged = true
                        })
                    }
                    if (limitProducts.length !== dataStore.filter.length)
                        isChanged = true
                    if (isChanged) {
                        updateDataStore("filter", limitProducts)
                        updateDataStore("refreshFilter", !dataStore.refreshFilter)
                    }
                })
                .catch(e => console.log(e.message))
        } else {
            if (dataStore.filter.length !== 0) {
                updateDataStore("filter", [])
                updateDataStore("refreshFilter", !dataStore.refreshFilter)
            }
        }

    }, [refresh, updateDataStore, checkedBoxes])

    const resetFilterCategory = (cat) => {
        checkedBoxes[cat] = []
        setCheckedBoxes(checkedBoxes)
        setRefresh(!refresh)
        updateDataStore("filterCheckboxes", checkedBoxes)
    }

    const handleCheckboxChange = (name, item, isTrue) => {
        //it is a toggle
        const index = checkedBoxes[name].indexOf(item)
        if (isTrue && index === -1)
            checkedBoxes[name].push(item)
        else if (!isTrue && index !== -1)
            checkedBoxes[name].splice(index, 1);
        // once another box is clicked, the reset gets reset
        setCheckedBoxes(checkedBoxes)
        updateDataStore("filterCheckboxes", checkedBoxes)
        setRefresh(!refresh)
    }

    const showFilters = () => {
        return props.filterData.map((item, index) => {
            return (
                <div key={index}>
                    <div className="flex gap-x-2 font-500 items-center mb-2">
                        <h6 className="text-h6 uppercase flex-1">{item.name}</h6>
                        <button
                            type="button"
                            className="text-sm underline underline-offset-2 leading-none"
                            onClick={() => resetFilterCategory(item.name)}
                        >
                            Reset
                        </button>
                    </div>
                    <div className={`flex flex-col gap-3`}>
                        {item.filters.map((filter, i) => {
                            return (
                                <Checkbox
                                    handleCheckboxChange={handleCheckboxChange.bind(this)}
                                    filter={filter} item={item} count={props.originalData[item.key[i]]}
                                    checkBoxes={checkedBoxes} refresh={refresh}
                                />
                            )
                        })}
                        {item.filters.length > 4
                            ? <button
                                type="button"
                                className="text-[#00aff0] w-fit inline-block ml-5"
                                onClick={() => setFilterExpand(prev => !prev)}
                            >+{item.filters.length - 4} more</button>
                            : null
                        }
                    </div>
                </div>
            )
        })
    }

    //    onClick={(e) => e.stopPropagation()}
    return <Fragment>
        <div className={`bg-theme-900/50 fixed inset-0 z-50`}>
            <div className="max-w-[400px] h-full bg-white overflow-x-hidden flex flex-col">
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
                        {showFilters()}
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
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

    console.log("Props FilterData", props.filterData)

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
