/**
 * @todo API issue The menu list has no order to follow from api side. Also we do not know where to get subcategories like accessories. Further the NEW tag on menu item cannot be set as no basis found.
 * @param {isMobile. source} props
 * @constructor
 */

import Link from "next/link";
import SubMenu from "./SubMenu";
import React, {Fragment, useContext, useEffect, useState} from 'react';
import AppWideContext from "../../store/AppWideContext";
import useApiCall from "../../hooks/useApiCall";
import {New} from "../common/tags";

function Menu(props) {
    const {dataStore} = useContext(AppWideContext);
    const queryObject = (props.source == "getLooksData") ? {look_id: "", limit: 100} : null;
    const resp = useApiCall(props.source, dataStore.apiToken, queryObject);
    const [data, setData] = useState(null);
    const [showShop, setShowShop] = useState(false);
    const [showMimoto, setShowMimoto] = useState(false);

    const mimotoData = [
        {
            category: "noor",
            link: "'/mimoto-noor",
            span: "spreading light"
        },
        {
            category: "nostalgia",
            link: "'/mimoto-nostalgia",
            span: "the color prints"
        }
    ];
    let mimotoList = null;
    mimotoData.forEach(ele => {
        mimotoList = <Fragment>
            {mimotoList}
            <li>
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
        if (props.source == "exploreNewArrivals") {
            if (resp
                && resp.hasOwnProperty("status")
                && resp.status == 200
                && resp.hasOwnProperty("response")
                && resp.response.hasOwnProperty("left_text")
            )
                setData(resp.response);
        } else if (props.source == "getLooksData") {
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
    if (props.source == "exploreNewArrivals"
        && data && data.hasOwnProperty("left_text")
        && data.left_text.length > 0) {
        data.left_text.forEach((ele) => {
            if (!doneCategories.includes(ele.category)) {
                actualData.push({
                    id: ele.category,
                    link: ele.link,
                    category: ele.category
                });
                doneCategories.push(ele.category);
            }
        });
        browserViewStyle = "block px-3 py-1 mx-1 text-xs leading-none border-b border-transparent hover:border-black text-black/60";
    } else if (props.source == "getLooksData"
        && data && data.hasOwnProperty("prod")) {
        const keys = Object.keys(data.prod);
        if (keys.length > 0) {
            keys.forEach(ele => {
                if (!doneCategories.includes(data.prod[ele].category)) {
                    actualData.push({
                        link: "/shop-" + data.prod[ele].category.toLowerCase(),
                        category: data.prod[ele].category
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
                    <li>
                        <Link href={ele.link}>
                            <a className={`font-600 ${browserViewStyle}`}>{ele.category}<New/></a>
                        </Link>
                    </li>
                </>
            );
        })
    }

    let mobileView = null;
    let browserView = null;

    if (props.source == "exploreNewArrivals") {
        browserView = <Fragment>
            <ul className={"flex flex-1 justify-center items-center uppercase"}>
                <li>
                    <Link href="/new-arrivals/all">
                        <a className={"block px-3 py-1 mx-1 text-xs leading-none border-b border-transparent hover:border-black bg-[#B5DDF5] text-white"}>New In</a>
                    </Link>
                </li>
                <li>
                    <Link href="/looks">
                        <a className={browserViewStyle}>Looks</a>
                    </Link>
                </li>
                {categoriesList}
                <li className={"relative group"}>
                    <span className={browserViewStyle + " group-hover:border-black"}>Accessories</span>
                    <SubMenu isMobile={false} menu="accessories"/>
                </li>
            </ul>
        </Fragment>

    } else if (props.source == "getLooksData") {
        /**
         * @todo API: Where to get Mimoto collection
         */
        const leadTextStyle = "block leading-none tracking-wider text-h5";
        const textStyle = "block leading-none tracking-wide text-black/50 text-sm";
        browserView = (
            <>
                <ul className={"flex flex-auto justify-center items-start gap-x-10 2xl:gap-x-20"}>
                    <li className={`block group`}>
                        <div className="h-12 flex flex-col justify-center">
                            <span className={leadTextStyle}>Shop</span>
                            <span className={textStyle}>Our Store</span>
                        </div>
                        <ul
                            className={`bg-white z-20 hidden uppercase text-xs text-black/70 group-hover:block`}
                            id="typeb-submenu"
                        >
                            {categoriesList}
                        </ul>
                    </li>
                    <li className={`block group`}>
                        <div className="h-12 flex flex-col justify-center">
                            <span className={leadTextStyle}>Mimoto</span>
                            <span className={textStyle}>Our Collection</span>
                        </div>
                        <ul
                            className={`bg-white z-20 hidden uppercase text-xs text-black/70 group-hover:block`}
                            id="typeb-submenu"
                        >
                            {mimotoList}
                        </ul>
                    </li>
                    <li>
                        <Link href="/looks">
                            <a className="h-12 flex flex-col justify-center">
                                <span className={leadTextStyle}>Looks</span>
                                <span className={textStyle}>Shop the Look</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/new-arrivals/all">
                            <a className="h-12 flex flex-col justify-center">
                                <span className={`${leadTextStyle} block w-fit px-2 py-1 text-xs leading-none bg-[#B5DDF5] text-white`}>New In</span>
                                <span className={textStyle}>New Arrivals</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </>
        )
    }

    return props.isMobile ? mobileView : browserView

}

export default Menu;
