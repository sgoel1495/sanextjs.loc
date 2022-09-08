import {useRouter} from "next/router";
import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import {apiCall} from "../../../helpers/apiCall";
import DrawerSort from "./DrawerSort";
import ShowFilters from "./ShowFilters";


export default function CategoryFilterModal(props) {
    const router = useRouter()
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const [tempCheckboxes, setTempCheckboxes] = useState(dataStore.filterCheckboxes);
    const [route, setRoute] = useState(router.route)
    const [refresh, setRefresh] = useState(false);
    const [checkedBoxes, setCheckedBoxes] = useState(dataStore.filterCheckboxes);
    const [sortBy, setSortBy] = useState(dataStore.sortBy);

    const initArray = () => {
        const initArray = {}
        props.filterData.forEach(item => {
            initArray[item.name] = []
        })
        setCheckedBoxes(initArray)
        setTempCheckboxes(initArray)
    }

    React.useEffect(() => {
        if (router.query.sorted_by) {
            setSorting(router.query.sorted_by)
        }
    }, [router.query])

    React.useEffect(() => {
        if (router.route !== route) {
            setSorting("")
            updateDataStore("filterCheckboxes", {})
            setRoute(router.route)
        }
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
            apiCall("getProducts", dataStore.apiToken, queryObject)
                .then(resp => {
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


    const setSorting = (value) => {
        setSortBy(value);
        setRefresh(!refresh);
    }


    const applyFilters = () => {
        setCheckedBoxes(tempCheckboxes)
        updateDataStore("filterCheckboxes", checkedBoxes)
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
                        <ShowFilters originalData={props.originalData} filterData={props.filterData} checkedBoxes={checkedBoxes} setCheckedBoxes={setCheckedBoxes}
                                     refresh={refresh}/>
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
                    <>
                        <div className="flex-1 overflow-y-auto px-10 flex flex-col gap-y-4">
                            <div className={`flex flex-col gap-y-8 pb-16`}>
                                <ShowFilters originalData={props.originalData} filterData={props.filterData} checkedBoxes={tempCheckboxes} setCheckedBoxes={setTempCheckboxes}
                                             refresh={refresh} isMobile={true}/>
                            </div>
                        </div>
                        <div className={"border-t border-[#997756] text-center py-3 -mx-4"}>
                            <button className="px-10 py-2 border-4 border-white rounded-full font-900 uppercase shadow-lg" onClick={applyFilters}>Apply</button>
                        </div>
                    </>
            }
        </div>
    </div>;

    return props.isMobile ? mobileView : browserView
}