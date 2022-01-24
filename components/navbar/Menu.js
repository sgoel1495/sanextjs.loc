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

function Menu(props) {
    const {dataStore} = useContext(AppWideContext);
    const queryObject = (props.source=="getLooksData")? {look_id:"",limit:100} : null;
    const resp = useApiCall(props.source,dataStore.apiToken,queryObject);
    const [data,setData] = useState(null);
    const [showShop,setShowShop] = useState(false);
    const [showMimoto,setShowMimoto] = useState(false);

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
    mimotoData.forEach(ele=>{
        mimotoList = <Fragment>
            {mimotoList}
            <li>
                <Link href={ele.link}>
                    <a>
                        {ele.category}
                        <span>{ele.span}</span>
                    </a>
                </Link>
            </li>
        </Fragment>;
    })



    useEffect(()=>{
        if(props.source == "exploreNewArrivals") {
            if (resp
                && resp.hasOwnProperty("status")
                && resp.status == 200
                && resp.hasOwnProperty("response")
                && resp.response.hasOwnProperty("left_text")
            )
                setData(resp.response);
        } else if(props.source == "getLooksData") {
            if (resp
                && resp.hasOwnProperty("status")
                && resp.status == 200
                && resp.hasOwnProperty("response")
                && resp.response.hasOwnProperty("prod")
            )
                setData(resp.response);
        }
    },[resp]);


    const actualData = [];
    let browserViewStyle = null;
    let categoriesList = null;

    /**
     * @todo API issue. Not all the categories are present
     */

    console.log(data);
    const doneCategories = [];
    if(props.source == "exploreNewArrivals"
        && data && data.hasOwnProperty("left_text")
        && data.left_text.length > 0)
    {
        data.left_text.forEach((ele)=>{
            if(!doneCategories.includes(ele.category)) {
                actualData.push({
                    id: ele.category,
                    link: ele.link,
                    category: ele.category
                });
                doneCategories.push(ele.category);
            }
        });
        browserViewStyle = "block px-3 py-1 mx-1 text-xs leading-none border-b border-transparent hover:border-black text-black/60";
    } else if(props.source == "getLooksData"
        && data && data.hasOwnProperty("prod")){
        const keys = Object.keys(data.prod);
        if(keys.length>0){
            keys.forEach(ele=>{
                if(!doneCategories.includes(data.prod[ele].category)) {
                    actualData.push({
                        link: "/shop-" + data.prod[ele].category.toLowerCase(),
                        category: data.prod[ele].category
                    });
                    doneCategories.push(data.prod[ele].category);
                }
            });
        }
    }

    if(actualData.length>0){
        actualData.forEach(ele=>{
            categoriesList = <Fragment>
                {categoriesList}
                <li>
                    <Link href={ele.link}>
                        <a className={browserViewStyle}>{ele.category}</a>
                    </Link>
                </li>
            </Fragment>;
        })
    }

    let mobileView = null;
    let browserView = null;

    if(props.source == "exploreNewArrivals") {
        browserView =<Fragment>
            <ul className={"flex flex-1 justify-center items-center"}>
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

    } else if(props.source == "getLooksData") {
        /**
         * @todo API: Where to get Mimoto collection
         */
        browserView =<Fragment>
            <ul className={"flex flex-1 justify-center items-center"}>
                <li onMouseEnter={()=> setShowShop(true)} onMouseLeave={()=> setShowShop(false)}>
                    Shop
                    <span>Our Store</span>
                </li>
                <li onMouseEnter={()=> setShowMimoto(true)} onMouseLeave={()=> setShowMimoto(false)}>
                    Mimoto
                    <span>Our Collection</span>
                </li>
                <li>
                    <Link href="/looks">
                        <a >
                            Looks
                            <span>Shop the Look</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/new-arrivals/all">
                        <a className={"block px-3 py-1 mx-1 text-xs leading-none border-b border-transparent hover:border-black bg-[#B5DDF5] text-white"}>
                            New In
                            <span>New Arrivals</span>
                        </a>
                    </Link>
                </li>
            </ul>
            {showShop &&
                <div id="typeb-submenu"  onMouseEnter={()=> setShowShop(true)} onMouseLeave={()=> setShowShop(false)}>
                    {categoriesList}
                </div>}
            {showMimoto &&
                <div id="typeb-submenu" onMouseEnter={()=> setShowMimoto(true)} onMouseLeave={()=> setShowMimoto(false)}>
                    {mimotoList}
                </div>}
        </Fragment>
    };

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default Menu;
