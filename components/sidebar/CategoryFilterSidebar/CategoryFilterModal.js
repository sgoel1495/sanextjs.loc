import React, {Fragment, useState} from "react";
import DrawerSort from "./DrawerSort";
import ShowFilters from "./ShowFilters";
import {connect} from "react-redux";
import {applyFilters, setFilter, setFilterCheckbox, setSortBy} from "../../../ReduxStore/reducers/filterSlice";


function CategoryFilterModal(props) {
    const [checkedBoxes, setCheckedBoxes] = useState(props.filterCheckboxes);

    const closeModalAndApplyFilter = () => {
        props.closeModal()
        if (props.isMobile) {
            props.setFilterCheckbox(checkedBoxes)
        }
        props.applyFilters()
    }

    const initArray = () => {
        const initArray = {}
        props.allFilters.forEach(item => {
            initArray[item.name] = []
        })
        setCheckedBoxes(initArray)
        props.setFilterCheckbox(initArray)
    }





    React.useEffect(() => {
        if (Object.keys(checkedBoxes).length === 0)
            initArray()
    }, [props.allFilters])

    const browserView = <Fragment>
        <div className={`bg-theme-900/50 fixed inset-0 z-50`} onClick={closeModalAndApplyFilter}>
            <div className="max-w-[400px] h-full bg-white overflow-x-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="self-end p-4">
                    <button className={`w-6 h-6 float-right`} onClick={closeModalAndApplyFilter}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6`} viewBox="0 0 24 24">
                            <path
                                d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/>
                        </svg>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-10 flex flex-col gap-y-4">
                    <h5 className={`text-h5 font-500 uppercase`}>Filter By</h5>
                    <div className={`flex flex-col gap-y-8 pb-16`}>
                        <ShowFilters allFilters={props.allFilters}/>
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
                    <DrawerSort closeModal={props.closeModal}/>
                    :
                    <>
                        <div className="flex-1 overflow-y-auto px-10 flex flex-col gap-y-4">
                            <div className={`flex flex-col gap-y-8 pb-16`}>
                                <ShowFilters allFilters={props.allFilters} checkedBoxes={checkedBoxes} setCheckedBoxes={setCheckedBoxes} isMobile={true}/>
                            </div>
                        </div>
                        <div className={"border-t border-[#997756] text-center py-3 -mx-4"}>
                            <button className="px-10 py-2 border-4 border-white rounded-full font-900 uppercase shadow-lg" onClick={closeModalAndApplyFilter}>Apply</button>
                        </div>
                    </>
            }
        </div>
    </div>;

    return props.isMobile ? mobileView : browserView
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig,
        refreshFilter: state.filters.refreshFilter,
        filterCheckboxes: state.filters.filterCheckboxes,
        sortBy: state.filters.sortBy
    }
}

export default connect(mapStateToProps, {applyFilters, setFilter, setSortBy, setFilterCheckbox})(CategoryFilterModal)