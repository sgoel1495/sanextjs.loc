import Image from "next/image";
import React, {Fragment, useState} from "react";
import ReactDom from "react-dom";
import Link from "next/link";
import {New} from "../common/tags";

/**
 * @todo Data for the category filter
 * @params {isMobile } props
 * @constructor
 */


function CategoryFilterModal(props) {
    const {closeModal} = props;

    const keys = (props.filterData)? Object.keys(props.filterData.break_speed):[];
    console.log("FILTER DATA",props.filterData);
    console.log("KEYS",keys);

    const filterElement=(key)=>{
        if(!props.filterData || !props.filterData.hasOwnProperty("filter_count"))
            return null;
        const data = props.filterData.filter_count;
        const dataKeys = Object.keys(data);
        let foundKey = null;
        const optionKeys = [];
        dataKeys.forEach(k=>{
            if(k.startsWith(key+"-")){
                optionKeys.push({
                    id: k,
                    option: k.substr(k.indexOf("-")).toUpperCase(),
                });
                foundKey = k;
                console.log("FoundKey",k,optionKeys);
            }
        });
        if(optionKeys.length==0)
            return null;
        let returnFilter = null;
        optionKeys.forEach(k=>{
            returnFilter = <Fragment>
                {returnFilter}
                <checkbox key={k.id} value={k.id}>
                    {k.option}
                </checkbox>
            </Fragment>;
        })
        return <select>

        </select>
    }

    const Category = ()=>{
        return filterElement("category");
    }
    return <div>
        <h2>FILTER BY</h2>

        </div>;
}

/**
 *
 * @param props isMobile, filterData
 * @returns {null|JSX.Element}
 * @constructor
 */

function CategoryFilterSidebar(props) {
    const [showSidebarMenu, setShowSidebarMenu] = useState(false);

    React.useEffect(() => {
        if (showSidebarMenu) document.body.classList.add("scroll-overflow");
        return () => document.body.classList.remove("scroll-overflow");
    }, [showSidebarMenu])

    const closeModal = () => {
        setShowSidebarMenu(false);
    }

    const mobileView = null;

    const browserView = (
        <>
            <span onClick={() => setShowSidebarMenu(true)} className={`block relative w-6`}>
                <span>FILTERS<i id="downup" className="fa fa-angle-down" /></span>
            </span>
            {showSidebarMenu && ReactDom.createPortal(
                <CategoryFilterModal filterData={props.filterData} closeModal={closeModal.bind(this)}/>,
                document.getElementById("hamburger"))}
        </>
    );

    return props.isMobile ? mobileView : browserView
}

export default CategoryFilterSidebar;
