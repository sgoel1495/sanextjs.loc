import React, {useEffect, useState} from "react";
import ReactDom from "react-dom";

import CategoryFilterModal from "./CategoryFilterModal";

/**
 *
 * @param props isMobile, filterData
 * @returns {null|JSX.Element}
 * @constructor
 */

function CategoryFilterSidebar(props) {
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [allFilters, setAllFilters] = useState([])
    const [showSort, setShowSort] = useState(false)
    const [category, setCategory] = useState("")


    useEffect(() => {
        if (props.availableFilters) {

            // get filter categories
            let filterCategories = Object.keys(props.availableFilters);
            filterCategories = filterCategories.map(item => item.split("-")[0])
            filterCategories = Array.from(new Set(filterCategories))

            //get all filter keys of a category
            const initData = [];
            filterCategories.forEach(category => {
                let temp = {}
                Object.keys(props.availableFilters).forEach(item => {
                    if (item.includes("category-"))
                        setCategory(item.substring(9))
                    if (item.startsWith(category)) {
                        let filter = item.replace(category + "-", "").replace("-", " ")
                        if (temp.filters) {
                            temp.filters.push(filter)
                            temp.key.push(item)
                            temp.count.push(props.availableFilters[item])
                        } else {
                            temp = {
                                name: category,
                                key: [item],
                                filters: [filter],
                                count: [props.availableFilters[item]]
                            }
                        }
                    }
                });
                initData.push(temp)
            })
            setAllFilters(initData)
        }
    }, [props.availableFilters]);

    useEffect(() => {
        if (showFilterModal) document.body.classList.add("scroll-overflow");
        return () => document.body.classList.remove("scroll-overflow");
    }, [showFilterModal])

    const closeModal = () => {
        setShowFilterModal(false);
        setShowSort(false);
    }

    const mobileView = <>
        <button
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider font-500 leading-none"
            onClick={() => setShowFilterModal(true)}
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
                setShowFilterModal(true)
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
            <button onClick={() => setShowFilterModal(true)}
                    className={`inset-y-0 right-0 py-2 text-sm font-500 uppercase leading-none flex items-center gap-x-1`}>
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
        {showFilterModal && ReactDom.createPortal(
            <CategoryFilterModal
                showSort={showSort}
                isMobile={props.isMobile}
                closeModal={closeModal}
                category={category}
                allFilters={allFilters}
            />,
            document.getElementById("hamburger"))}
    </>
}

export default CategoryFilterSidebar;
