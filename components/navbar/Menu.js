/**
 * @todo API issue The menu list has no order to follow from api side. Also we do not know where to get subcategories like accessories. Further the NEW tag on menu item cannot be set as no basis found.
 * @param {isMobile. source, filterData} props
 * @constructor
 */

import Link from "next/link";
import SubMenu from "./SubMenu";
import React, {Fragment, useContext, useEffect, useState} from 'react';
import AppWideContext from "../../store/AppWideContext";
import useApiCall from "../../hooks/useApiCall";
import {New} from "../common/tags";
import CategoryFilterSidebar from "../sidebar/CategoryFilterSidebar";


function Menu(props) {
    const {dataStore} = useContext(AppWideContext);
    const defData = (props.source == "getLooksData") ? null : {categories: dataStore.categories, accessories: dataStore.accessories};
    const queryObject = (props.source == "getLooksData") ? {look_id: "", limit: 100} : null;
    const apiToken = (props.source == "getLooksData") ? dataStore.apiToken : null;
    const resp = useApiCall(props.source, apiToken, queryObject);
    const [data, setData] = useState(defData);
    const [showShop, setShowShop] = useState(false);
    const [showMimoto, setShowMimoto] = useState(false);

    const mimotoData = [
        {
            category: "noor",
            link: "/mimoto-noor",
            span: "spreading light"
        },
        {
            category: "nostalgia",
            link: "/mimoto-nostalgia",
            span: "the color prints"
        }
    ];
    let mimotoList = null;
    mimotoData.forEach(ele => {
        mimotoList = <Fragment>
            {mimotoList}
            <li key={ele.category}>
                <Link href={ele.link}>
                    <a className={`font-600 block mb-1`}>
                        {ele.category}
                        <New/>
                        <span className={`block text-[10px] tracking-wider`}>{ele.span}</span>
                    </a>
                </Link>
            </li>
        </Fragment>;
    })


    useEffect(() => {
        if (props.source == "getLooksData") {
            if (resp
                && resp.hasOwnProperty("status")
                && resp.status == 200
                && resp.hasOwnProperty("response")
                && resp.response.hasOwnProperty("prod")
            )
                setData(resp.response);
        }
    }, [resp]);


    const actualData = [];
    let browserViewStyle = null;
    let categoriesList = null;

    /**
     * @todo API issue. Not all the categories are present
     */
    const doneCategories = [];
    if (props.source == "exploreNewArrivals") {
        data.categories.forEach((ele) => {
            if (!doneCategories.includes(ele.category)) {
                actualData.push({
                    id: ele.category,
                    link: ele.link,
                    category: ele.category,
                    new: false
                });
                doneCategories.push(ele.category);
            }
        });
        browserViewStyle = "block px-3 py-1 mx-1 text-xs leading-none border-b border-transparent hover:border-black text-black/60";
    } else if (props.source === "shopCategory") {
        data.categories.forEach((ele) => {
            if (!doneCategories.includes(ele.category)) {
                actualData.push({
                    id: ele.category,
                    link: ele.link,
                    category: ele.category,
                    new: ele.new
                });
                doneCategories.push(ele.category);
            }
        });
        browserViewStyle = "block px-3 py-2 mx-1 text-sm leading-none border-b border-transparent hover:border-black text-black/60";
    } else if (props.source == "getLooksData"
        && data && data.hasOwnProperty("prod")) {
        const keys = Object.keys(data.prod);
        if (keys.length > 0) {
            keys.forEach(ele => {
                if (!doneCategories.includes(data.prod[ele].category)) {
                    actualData.push({
                        id: data.prod[ele].category,
                        link: "/shop-" + data.prod[ele].category.toLowerCase(),
                        category: data.prod[ele].category,
                        new: false
                    });
                    doneCategories.push(data.prod[ele].category);
                }
            });
        }
    }

    if (actualData.length > 0) {
        actualData.forEach(ele => {
            categoriesList = (
                <>
                    {categoriesList}
                    {(ele.new)
                        ? <li key={ele.category}>
                            <Link href={ele.link}>
                                <a className={`font-600 ${browserViewStyle}`}>
                                    <span className={"bg-black text-xs text-white leading-none"}>New</span>
                                    {ele.category}
                                </a>
                            </Link>
                        </li>
                        : <li key={ele.category}>
                            <Link href={ele.link}>
                                <a className={`font-600 ${browserViewStyle}`}>
                                    {ele.category}
                                </a>
                            </Link>
                        </li>
                    }
                </>
            );
        })
    }

    let mobileView = null;
    let browserView = null;

    if (props.source === "exploreNewArrivals" || props.source === "shopCategory") {
        browserView = (
            <div className={`relative container`}>
                <ul className={"flex flex-wrap justify-center items-center uppercase font-600"}>
                    {(props.source != "shopCategory")
                        ? <Fragment>
                            <li key="new-arrivals">
                                <Link href="/new-arrivals/all">
                                    <a className={"block px-3 py-1 mx-1 text-xs leading-none border-b border-transparent hover:border-black bg-[#B5DDF5] text-white"}>New In</a>
                                </Link>
                            </li>
                            <li key="looks">
                                <Link href="/looks">
                                    <a className={browserViewStyle}>Looks</a>
                                </Link>
                            </li>
                            {categoriesList}
                            <li key="accessories" className={"relative group"}>
                                <span className={browserViewStyle + " group-hover:border-black"}>Accessories</span>
                                <SubMenu isMobile={false} menu="accessories" data={data.accessories}/>
                            </li>
                        </Fragment>
                        : <Fragment>
                            {categoriesList}
                            <li key="accessories" className={"relative group"}>
                                <span className={browserViewStyle + " group-hover:border-black"}>Accessories</span>
                                <SubMenu isMobile={false} menu="accessories" data={data.accessories}/>
                            </li>
                        </Fragment>}
                </ul>
                {(props.source === "shopCategory")
                    ? <CategoryFilterSidebar isMobile={props.isMobile} filterData={props.filterData}/>
                    : null
                }
            </div>
        )
    } else if (props.source === "getLooksData") {
        /**
         * @todo API: Where to get Mimoto collection
         */
        const leadTextStyle = "block leading-none tracking-wider text-h5";
        const textStyle = "block leading-none tracking-wide text-black/50 text-sm";
        browserView = (
            <>
                <ul className={"flex flex-auto justify-center items-start gap-x-10 2xl:gap-x-20"}>
                    <li
                        className={`block group relative`}
                        onMouseEnter={() => setShowShop(true)}
                        onMouseLeave={() => setShowShop(false)}
                    >
                        <div className="h-12 flex flex-col justify-center">
                            <span className={leadTextStyle}>Shop</span>
                            <span className={textStyle}>Our Store</span>
                        </div>
                        <ul className={`uppercase text-xs text-black/70 absolute z-20 hidden group-hover:block py-2`}>
                            {categoriesList}
                        </ul>
                    </li>
                    <li
                        className={`block group relative`}
                        onMouseEnter={() => setShowMimoto(true)}
                        onMouseLeave={() => setShowMimoto(false)}
                    >
                        <div className="h-12 flex flex-col justify-center">
                            <span className={leadTextStyle}>Mimoto</span>
                            <span className={textStyle}>Our Collection</span>
                        </div>
                        <ul className={`uppercase text-xs text-black/70 absolute z-20 hidden group-hover:block py-2`}>
                            {mimotoList}
                        </ul>
                    </li>
                    <li key="looks">
                        <Link href="/looks">
                            <a className="h-12 flex flex-col justify-center">
                                <span className={leadTextStyle}>Looks</span>
                                <span className={textStyle}>Shop the Look</span>
                            </a>
                        </Link>
                    </li>
                    <li key="new-arrivals-all">
                        <Link href="/new-arrivals/all">
                            <a className="h-12 flex flex-col justify-center">
                                <span className={`${leadTextStyle} block w-fit px-2 py-1 text-xs leading-none bg-[#B5DDF5] text-white`}>New In</span>
                                <span className={textStyle}>New Arrivals</span>
                            </a>
                        </Link>
                    </li>
                </ul>
                {showShop && <div className={`bg-white absolute top-full inset-x-0 z-10 h-[200px]`}/>}
                {showMimoto && <div className={`bg-white absolute top-full inset-x-0 z-10 h-[100px]`}/>}
            </>
        )
    }

    return props.isMobile ? mobileView : browserView

}

export default Menu;
