/**
 *
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

import CategoryHeaderVideo from "../common/CategoryHeaderVideo";
import PageHead from "../PageHead";
import React, {Fragment, useCallback, useContext, useEffect, useState} from "react";
import AppWideContext from "../../store/AppWideContext";
import Menu from "../navbar/Menu";
import Footer from "../footer/Footer";
import Image from "next/image";
import BlockHeader from "../common/blockHeader";
import Header from "../navbar/Header";

import ProductCard from "./ProductCard";
import MobileShopPage from "./MobileShopPage";
import {apiCall} from "../../helpers/apiCall";


function ShopPage(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    //all paths start with shop-
    const {dataStore} = useContext(AppWideContext);
    const {category,hpid} = props
    const [data, setData] = useState(props.data);

    const [navControl, setNavControl] = React.useState(false);
    const controller = useCallback(() => {
        const isSet = (window.scrollY > window.innerHeight - 20)
        if (navControl !== isSet)
            setNavControl(isSet)
    }, [navControl])
    useEffect(() => {
        window.addEventListener("scroll", controller);
        return () =>
            window.removeEventListener('scroll', controller)
    }, [controller]);
    /**
     * @todo API - Please tell the api which gives the tagline for categories << HArdcoded
     *
     * @type {string}
     */
    const tag_line = "Designed for timelessness and crafted with utmost love, the premium quality tops & blouses in a wide palette of prints and colours are made for both work & beyond.";

    /*
        if (dataStore.mobile) {
            return (
                <MobileShopPage
                    loaderRef={loaderRef}
                    loading={loading}
                    data={data}
                    category={category}
                    hpid={hpid}
                />
            )
        }

     */

    const loader = <span className={"col-span-3 flex justify-center items-center"} key="loader">
        <span className={"block relative w-14 aspect-square"}>
            <Image src={WEBASSETS + "/assets/images/loader.gif"} layout={`fill`} objectFit={`cover`}
                   alt={"loader"}/>
        </span>
    </span>

    if (!dataStore.mobile)
        return (
            <Fragment>
                <PageHead url={"/" + hpid} id={hpid} isMobile={dataStore.mobile}/>
                {navControl || <Header type={"shopMenu"}/>}
                <CategoryHeaderVideo category={category}/>
                {navControl
                    ? <Header type={"minimal"} isMobile={false} filterData={data ? data.filter_count : {}}
                              category={hpid}/>
                    : <Menu type={"minimal"} isMobile={false} filterData={data ? data.filter_count : {}}
                            category={hpid}/>
                }
                <BlockHeader
                    space={"py-5"}
                    titleStyle={"text-center"}
                >
                    <h3 className={`text-h4 font-600 mb-4 uppercase`}>{category}</h3>
                    <h4 className={`text-h6 leading-none font-cursive italic font-600 text-black/70`}>{tag_line}</h4>
                </BlockHeader>
                {(data)
                    ?<main className={`grid grid-cols-3 gap-5 container pb-20`}>
                        {data.data && data.data.map((prod, index) => {
                            return <ProductCard prod={prod} key={index} isAccessory={(category==="scarves" || category==="jewellery")}/>
                        })}
                    </main>
                    :loader
                }
                <Footer isMobile={dataStore.mobile}/>
            </Fragment>
        );
}

export default ShopPage;
