/**
 *
 * @param props
 * type - String(optional) (possible values:[null,"minimal","shopMenu"])
 *      null - default header of landing page
 *      shopMenu - Web - Mimoto menu
 *      shopMenu - Mobile - header for the shop-category page (e.g. /shop-shirts)
 *      minimal - Web -  used for the menu below category video which replaces the shopMenu header and becomes sticky
 *      minimal - Mobile - header for about us pages
 * isMobile - Boolean(required)
 * category - String(optional) - shows an underline below the category name in the menu
 * availableFilters - JSON - for filter menu of shop page
 * @returns {JSX.Element}
 **/

import Link from "next/link";
import SubMenu from "./SubMenu";
import React, { Fragment, useContext, useState } from 'react';
import AppWideContext from "../../store/AppWideContext";
import useApiCall from "../../hooks/useApiCall";
import CategoryFilterSidebar from "../sidebar/CategoryFilterSidebar/CategoryFilterSidebar";
import {connect} from "react-redux";

function Menu(props) {
    const data = { categories: props.appConfig.categories, accessories: props.appConfig.accessories }
    const [showShop, setShowShop] = useState(false);
    const [showMimoto, setShowMimoto] = useState(false);

    //mimoto data
    const resp = useApiCall("getMimotoCollection", props.appConfig.apiToken, { skip: 0, limit: 50 });

    let mimotoList = null;
    if (resp && resp.status === 200) {
        resp.response.mimoto.filter(item => item.visible).reverse().forEach(ele => {
            mimotoList = <Fragment>
                {mimotoList}
                <div key={ele.collection_id}>
                    <Link href={ele.url}>
                        <a className={`font-600 block mb-1 text-xs text- leading-3 text-black`}>
                            {ele.name}
                            {/*<NewTag/>*/}
                            <span className={`block text-[8px] tracking-widest whitespace-nowrap`}>{ele.tagline}</span>
                        </a>
                    </Link>
                </div>
            </Fragment>;
        })
    }


    const actualData = [];
    let browserViewStyle = "block px-3 mx-1 leading-none border-b text-black/60";
    let newTagStyle = "ml-1"
    let categoriesList = null;

    /**
     * @todo API issue. Not all the categories are present
     */

    switch (props.type) {
        case "shopMenu":
            browserViewStyle = "flex flex-row-reverse justify-end items-center"
            data.categories.forEach((ele) => {
                actualData.push({
                    id: ele.category,
                    link: ele.link,
                    category: ele.category,
                    new: ele.new
                });
            });
            data.accessories.forEach((ele) => {
                actualData.push({
                    id: ele.category,
                    link: ele.link,
                    category: ele.category,
                    new: ele.new
                });
            });
            break;
        case "minimal":
            newTagStyle = "absolute top-0 left-[50%] translate-x-[-50%] mt-1"
            browserViewStyle += " py-3.5 relative "
            data.categories.forEach((ele) => {
                actualData.push({
                    id: ele.category,
                    link: ele.link,
                    category: ele.category,
                    new: ele.new
                });
            });
            browserViewStyle += " py-2 text-sm";
            break;
        default:
            data.categories.forEach((ele) => {
                actualData.push({
                    id: ele.category,
                    link: ele.link,
                    category: ele.category,
                    new: false
                });
            });
            browserViewStyle += " py-1 text-xs";
    }

    if (actualData.length > 0) {
        actualData.forEach(ele => {
            categoriesList = (
                <>
                    {categoriesList}
                    <div key={ele.category}>
                        <Link href={ele.link}>
                            <a className={`font-600 text-black ${browserViewStyle}` + ["/" + props.category === ele.link ? " border-black" : " border-transparent hover:border-black"]}>
                                {ele.new && <span className={"bg-black text-white leading-none p-[0.1rem] text-[8px] " + newTagStyle}>New</span>}
                                {ele.category}
                            </a>
                        </Link>
                    </div>
                </>
            );
        })
    }

    let isAccessoryPage = data.accessories.findIndex((item) => item.link === "/" + props.category) !== -1

    let mobileView = <>
        {actualData.map((item) => {
            return (
                <li key={item.id}>
                    <Link href={item.link} passHref>
                        <span>
                            {item.category}
                        </span>
                    </Link>
                </li>
            )
        })}
    </>;
    console.log(props.type)
    let browserView;

    switch (props.type) {
        case "shopMenu":
            const leadTextStyle = "block leading-none tracking-wider text-h5 font-500";
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
                            <div className={`uppercase text-xs text-black/70 absolute z-20 hidden group-hover:block py-2`}>
                                <div className={"grid grid-rows-[repeat(7,1fr)] grid-flow-col gap-x-16"}>
                                    {categoriesList}
                                </div>
                            </div>
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
                                <div className={"grid grid-rows-[repeat(8,1fr)] grid-flow-col gap-x-4"}>
                                    {mimotoList}
                                </div>
                            </ul>
                        </li>
                        <li key="looks">
                            <Link href={"/looks"}>
                                <a className="h-12 flex flex-col justify-center">
                                    <span className={leadTextStyle}>Looks</span>
                                    <span className={textStyle}>Shop the Look</span>
                                </a>
                            </Link>
                        </li>
                        <li key="new-arrivals-all">
                            <Link href={"/new-arrivals/all"}>
                                <a className="h-12 flex flex-col justify-center">
                                    <span className={`${leadTextStyle} block w-fit px-2 py-1 text-xs leading-none bg-[#B5DDF5] text-white`}>New In</span>
                                    <span className={textStyle}>New Arrivals</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                    {showShop && <div className={`bg-white/95 absolute top-full inset-x-0 z-10 h-[210px]`}>
                    </div>}
                    {showMimoto && <div className={`bg-white/95 absolute top-full inset-x-0 z-10 h-[210px]`} />}
                </>
            )
            break;
        default:
            browserView = (
                <div className={`relative container flex`}>
                    <ul className={"flex flex-wrap justify-center items-end uppercase font-600"}>
                        <Fragment>
                            {
                                (props.type !== "minimal") &&
                                <>
                                    <li key="new-arrivals">
                                        <Link href={"/new-arrivals/all"}>
                                            <a className={"block px-3 py-1 mx-1 text-xs leading-none border-b border-transparent hover:border-black bg-[#B5DDF5] text-white"}>New
                                                In</a>
                                        </Link>
                                    </li>
                                    <li key="looks">
                                        <Link href={"/looks"}>
                                            <a className={browserViewStyle + " border-transparent hover:border-black"}>Looks</a>
                                        </Link>
                                    </li>
                                </>
                            }
                            {categoriesList}
                            <li key="accessories" className={"relative group"}>
                                <span
                                    className={browserViewStyle + [isAccessoryPage ? " border-black" : " border-transparent hover:border-black"] + " group-hover:border-black"}>Accessories</span>
                                <SubMenu isMobile={false} menu="accessories" data={data.accessories} />
                            </li>
                        </Fragment>

                    </ul>
                    {(props.type === "minimal")
                        ? <CategoryFilterSidebar isMobile={props.isMobile} availableFilters={props.availableFilters} />
                        : null
                    }
                </div>
            )
    }

    return props.isMobile ? mobileView : browserView

}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(Menu);
