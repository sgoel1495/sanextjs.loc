import React, {Fragment, useEffect, useState, useCallback, useContext} from "react";
import ReactDom from "react-dom";
import AppWideContext from "../../store/AppWideContext";
import {apiCall} from "../../helpers/apiCall";
import {useRouter} from "next/router";

/**
 * @todo Data for the category filter
 * @params {isMobile } props
 * @constructor
 */

const drawerButtonClass = "block border-2 shadow-[4px_4px_6px_0.6px_rgba(0,0,0,0.1)] leading-none"

const DrawerSort = props => {
    const sortButtonClass = drawerButtonClass + " rounded-2xl font-cursive capitalize pb-3 pt-4 px-2"
    return (
        <div className="grid grid-cols-2 gap-4">
            <button
                className={sortButtonClass + [props.sortBy === "price-asc" ? " bg-white border-[#faf4f0]" : " bg-[#faf4f0] border-white"]}
                onClick={() => props.setSorting("price-asc")}
            >
                Price low to high
            </button>
            <button
                className={sortButtonClass + [props.sortBy === "price-desc" ? " bg-white border-[#faf4f0]" : " bg-[#faf4f0] border-white"]}
                onClick={() => props.setSorting("price-desc")}
            >
                Price high to low
            </button>
            <button
                className={sortButtonClass + [props.sortBy === "best-selling-count-desc" ? " bg-white border-[#faf4f0]" : " bg-[#faf4f0] border-white"]}
                onClick={() => props.setSorting("best-selling-count-desc")}
            >
                Most popular
            </button>
            <button
                className={sortButtonClass + [props.sortBy === "created-at-desc" ? " bg-white border-[#faf4f0]" : " bg-[#faf4f0] border-white"]}
                onClick={() => props.setSorting("created-at-desc")}
            >
                New arrivals
            </button>
            {props.sortBy && <button className={sortButtonClass + " bg-[#faf4f0] border-white"} onClick={() => props.setSorting("")}>Reset</button>}
        </div>
    )
}

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
    const router = useRouter()
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const [filterExpand, setFilterExpand] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [checkedBoxes, setCheckedBoxes] = useState(dataStore.filterCheckboxes);
    const [sortBy, setSortBy] = useState(dataStore.sortBy);

    const initArray = () => {
        const initArray = {}
        props.filterData.forEach(item => {
            initArray[item.name] = []
        })
        setCheckedBoxes(initArray)
    }

    React.useEffect(() => {
        if (router.query.sorted_by) {
            setSorting(router.query.sorted_by)
        }
    }, [router.query])

    React.useEffect(() => {
        setSorting("")
        updateDataStore("filterCheckboxes", {})
    }, [router.route])

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
            filter_by: {}
        }

        for (let x = 0; x < keys.length; x++) {
            console.log("======== I HAVE DATA ==========", checkedBoxes[keys[x]])
            if (checkedBoxes[keys[x]].length > 0) {
                haveData = true
                queryObject.filter_by[keys[x]] = checkedBoxes[keys[x]]
            }
        }
        if (sortBy) {
            queryObject['sorted_by'] = sortBy;
        }
        if (sortBy !== dataStore.sortBy) {
            haveData = true
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
                    if (limitProducts.length !== dataStore.filter.length || sortBy !== dataStore.sortBy) {
                        updateDataStore("sortBy", sortBy);
                        isChanged = true
                    }
                    if (isChanged) {
                        updateDataStore("filter", limitProducts)
                        updateDataStore("refreshFilter", !dataStore.refreshFilter)
                    }
                })
                .catch(e => console.log(e.message))
        } else {
            if (dataStore.filter.length !== 0 && !dataStore.sortBy) {
                updateDataStore("filter", [])
                updateDataStore("refreshFilter", !dataStore.refreshFilter)
            }
        }

    }, [refresh, checkedBoxes, sortBy])

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

    const setSorting = (value) => {
        setSortBy(value);
        setRefresh(!refresh);
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
                                    key={i}
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

    const browserView = <Fragment>
        <div className={`bg-theme-900/50 fixed inset-0 z-50`}>
            <div className="max-w-[400px] h-full bg-white overflow-x-hidden flex flex-col">
                <div className="self-end p-4">
                    <button className={`w-6 h-6 float-right`} onClick={() => props.setShowSidebarMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6`} viewBox="0 0 24 24">
                            <path
                                d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/>
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

    const mobileView = <div
        className="fixed inset-0 z-50 flex align-bottom"
        onClick={props.closeModal}
    >
        <div
            className='relative flex flex-col mt-auto h-2/3 w-full bg-[#faf4f0] text-[#997756] rounded-t-[7.5vw] border-2 border-[#faede3] shadow-[0_7px_12px_12px_rgba(0,0,0,0.13)] overflow-hidden p-4 pb-0'
            onClick={e => e.stopPropagation()}
        >
            <button className="absolute right-0 top-0 p-2" onClick={props.closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 24 24' className="w-8 h-8 text-black/50">
                    <path fill="currentColor"
                          d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
                    </path>
                </svg>
            </button>
            <h6 className={`text-h5 font-900 uppercase text-center mb-3`}>{props.showSort ? "Sort By" : "Filter By"}</h6>
            {
                props.showSort
                    ?
                    <DrawerSort setSorting={setSorting} sortBy={sortBy}/>
                    :
                    <div className="flex-1 overflow-y-auto px-10 flex flex-col gap-y-4">
                        <div className={`flex flex-col gap-y-8 pb-16`}>
                            {showFilters()}
                        </div>
                    </div>
            }
        </div>
    </div>;

    return props.isMobile ? mobileView : browserView
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
    const [showSort, setShowSort] = useState(false)

    // console.log("Props FilterData", props.filterData)

    const updateCheckboxData = (key, value) => {
        checkboxData[key] = value;
        setCheckboxData({...checkboxData});
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
                        } else {
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
        setShowSort(false);
    }

    const mobileView = <>
        <button
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider font-500 leading-none"
            onClick={() => setShowSidebarMenu(true)}
        >
            Filter
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" fill="currentColor" className="w-4 h-4">
                <path
                    d="M8,41.08V2c0-0.553-0.448-1-1-1S6,1.447,6,2v39.08C2.613,41.568,0,44.481,0,48c0,3.859,3.14,7,7,7s7-3.141,7-7   C14,44.481,11.387,41.568,8,41.08z M7,53c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S9.757,53,7,53z"/>
                <path
                    d="M29,20.695V2c0-0.553-0.448-1-1-1s-1,0.447-1,1v18.632c-3.602,0.396-6.414,3.456-6.414,7.161s2.812,6.765,6.414,7.161V54   c0,0.553,0.448,1,1,1s1-0.447,1-1V34.891c3.4-0.577,6-3.536,6-7.098S32.4,21.272,29,20.695z M27.793,33   c-2.871,0-5.207-2.336-5.207-5.207s2.335-5.207,5.207-5.207S33,24.922,33,27.793S30.664,33,27.793,33z"/>
                <path
                    d="M56,8c0-3.859-3.14-7-7-7s-7,3.141-7,7c0,3.519,2.613,6.432,6,6.92V54c0,0.553,0.448,1,1,1s1-0.447,1-1V14.92   C53.387,14.432,56,11.519,56,8z M49,13c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S51.757,13,49,13z"/>
            </svg>
        </button>
        <button
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider font-500 leading-none"
            onClick={() => {
                setShowSidebarMenu(true)
                setShowSort(true)
            }}
        >
            Sort
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 294.842 294.842" fill="currentColor" className="w-4 h-4">
                <path
                    d="M292.128,214.846c-2.342-2.344-6.143-2.344-8.484,0l-59.512,59.511V6c0-3.313-2.687-6-6-6s-6,2.687-6,6v268.356   l-59.513-59.512c-2.342-2.342-6.142-2.343-8.485,0.001c-2.343,2.343-2.343,6.142,0.001,8.485l69.755,69.754   c1.171,1.171,2.707,1.757,4.242,1.757s3.071-0.586,4.242-1.758l69.754-69.754C294.472,220.987,294.472,217.188,292.128,214.846z"/>
                <path d="M6.956,12h180.137c3.313,0,6-2.687,6-6s-2.687-6-6-6H6.956c-3.313,0-6,2.687-6,6S3.643,12,6.956,12z"/>
                <path d="M6.956,82.228h180.137c3.313,0,6-2.687,6-6s-2.687-6-6-6H6.956c-3.313,0-6,2.687-6,6S3.643,82.228,6.956,82.228z"/>
                <path d="M6.956,152.456h180.137c3.313,0,6-2.687,6-6s-2.687-6-6-6H6.956c-3.313,0-6,2.687-6,6S3.643,152.456,6.956,152.456z"/>
                <path d="M124.438,210.685H6.956c-3.313,0-6,2.687-6,6s2.687,6,6,6h117.482c3.313,0,6-2.687,6-6S127.752,210.685,124.438,210.685z"/>
                <path d="M124.438,280.912H6.956c-3.313,0-6,2.687-6,6s2.687,6,6,6h117.482c3.313,0,6-2.687,6-6S127.752,280.912,124.438,280.912z"/>
            </svg>
        </button>
    </>;

    const browserView = (
        <>
            <button onClick={() => setShowSidebarMenu(true)}
                    className={`absolute inset-y-0 right-0 py-2 text-sm font-500 uppercase leading-none flex items-center gap-x-1`}>
                Filters
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-3 h-3" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        </>
    );

    return <>
        {props.isMobile ? mobileView : browserView}
        {showSidebarMenu && ReactDom.createPortal(
            <CategoryFilterModal
                showSort={showSort}
                isMobile={props.isMobile}
                originalData={props.filterData}
                filterData={filterData}
                setShowSidebarMenu={setShowSidebarMenu}
                checkboxData={checkboxData}
                updateCheckboxData={updateCheckboxData.bind(this)}
                closeModal={closeModal.bind(this)}
            />,
            document.getElementById("hamburger"))}
    </>
}

export default CategoryFilterSidebar;
