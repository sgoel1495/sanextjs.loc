import Image from "next/image";
import React, {createElement, Fragment, useEffect, useState} from "react";
import ReactDom from "react-dom";
import Link from "next/link";
import {New} from "../common/tags";

/**
 * @todo Data for the category filter
 * @params {isMobile } props
 * @constructor
 */



function CategoryFilterModal(props) {
    //props: closeModal, checkboxData, updateCheckboxData, filterData
    const {closeModal, checkboxData, updateCheckboxData, filterData} = props;
    const keys = (filterData)? Object.keys(filterData.break_speed):[];
    console.log("KEYS",keys);
    console.log("FILTER DATA",props.filterData);

    const removeCategoryFromString = (category, stringValue)=>{
        const lengthOfCategory = category.length();
        return stringValue.substr(lengthOfCategory);
    }
    // filters need to be in this order. All possible filters should be mentioned here
    const possibleFilters = [
        {"category":"CATEGORY"}, {"fabric":"FABRIC"}, {"sleeve-length":"SLEEVE LENGTH"}, {"neckline":"NECKLINE"},
        {"pattern":"PATTERN"}, {"color":"COLOR"}, {"fit-or-style":"FIT / STYLE"}];

    const createElement = (e)=>{
        let returnElement = <h2>{possibleFilters[e]}</h2>;
        const breakSpeed = filterData.break_speed[e];
        breakSpeed.forEach(ele=>{
            const name = e + "-" + ele;
           returnElement = <Fragment>
               {returnElement}
               <input type="checkbox"
                      name={name}
                      checked={checkboxData[name]}
                      id={name}
                      onChange={()=>updateCheckboxData(name,!checkboxData[name])} />
           </Fragment>;
        });
    }

    let returnValue = null;
    if(!props.filterData || !props.filterData.hasOwnProperty("filter_count")){
        possibleFilters.forEach(filter=>{
            returnValue = <Fragment>
                {returnValue}
                {createElement(filter)}
            </Fragment>
        })
        returnValue = <form>
            {returnValue}
        </form>
    }

    return <div>
        <h2>FILTER BY</h2>
        {returnValue}
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
    const [checkboxData,setCheckboxData] = useState(null);
    const [dataChanged,setDataChanged]=useState(false);

    const updateCheckboxData = (key,value)=>{
        checkboxData[key]=value;
        setCheckboxData({...checkboxData});
        setDataChanged(!dataChanged);
    }

    useEffect(()=>{
        console.log("Props FilterData",props.filterData);
        if(props.filterData
            && props.filterData.hasOwnProperty("filter_count"))
        {
            const ok = Object.keys(props.filterData.filter_count);
            const initData = [];
            ok.forEach(key => {
                const d = {};
                if(key.startsWith("category-"))
                    d[key] = true;
                else
                    d[key] = false;
                initData.push(d);
            });
            const dataKeys = Object.keys(props.filterData.filter_count);
            dataKeys.forEach(key => {
                const d = {};
                d[key+"-view-all"] = false;
                initData.push(d);
            })
            setCheckboxData(initData);
        }
    },[props.filterData]);
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
            <span onClick={() => setShowSidebarMenu(true)} className={`block relative w-6`}>
                <span>FILTERS<i id="downup" className="fa fa-angle-down" /></span>
            </span>
            {showSidebarMenu && ReactDom.createPortal(
                <CategoryFilterModal
                    filterData={props.filterData}
                    checkboxData = {checkboxData}
                    updateCheckboxData = {updateCheckboxData.bind(this)}
                    closeModal={closeModal.bind(this)}
                />,
                document.getElementById("hamburger"))}
        </>
    );

    return props.isMobile ? mobileView : browserView
}

export default CategoryFilterSidebar;
