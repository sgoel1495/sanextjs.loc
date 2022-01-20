/**
 * @todo The menu list has no order to follow from api side. Also we do not know where to get subcategories like accessories. Further the NEW tag on menu item cannot be set as no basis found.
 * @param {isMobile} props
 * @constructor
 */

import Link from "next/link";
import SubMenu from "./SubMenu";
import React, {Fragment, useContext, useEffect, useState} from 'react';
import AppWideContext from "../../store/AppWideContext";
import useApiCall from "../../hooks/useApiCall";

function Menu(props) {
    const {dataStore} = useContext(AppWideContext);
    const resp = useApiCall("exploreNewArrivals",dataStore.apiToken);
    const [data,setData] = useState(null);
    useEffect(()=>{
        if(resp
            && resp.hasOwnProperty("status")
            && resp.status == 200
            && resp.hasOwnProperty("response")
            && resp.response.hasOwnProperty("left_text")
        )
            setData(resp.response);
    },[resp]);

    const actualData = [];
    if(data && data.hasOwnProperty("left_text") && data.left_text.length > 0){
        data.left_text.forEach((ele)=>{
            actualData.push({
                link: ele.link,
                category: ele.category
            });
        });
    }

    const browserViewStyle = "block px-3 py-1 mx-1 text-xs leading-none border-b border-transparent hover:border-black text-black/60";
    let categoriesList = null;
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


    const mobileView = null;
    const browserView =
        <>
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
        </>
    ;

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default Menu;
