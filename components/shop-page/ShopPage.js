/**
 *
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

import CategoryHeaderVideo from "../common/CategoryHeaderVideo";
import PageHead from "../PageHead";
import React, {Fragment, useCallback, useContext, useState} from "react";
import AppWideContext from "../../store/AppWideContext";
import Menu from "../navbar/Menu";
import Footer from "../footer/Footer";
import Image from "next/image";
import BlockHeader from "../common/blockHeader";
import Header from "../navbar/Header";

import ProductCard from "./ProductCard";
import MobileShopPage from "./MobileShopPage";
import InfiniteScroll from 'react-infinite-scroller';
import {apiCall} from "../../helpers/apiCall";

const fetchData = async (data, apiToken, category, pagination) => {
    let gotData = false;
    const callObject = await apiCall("getProducts", apiToken, {category: category, ...pagination})
    if (callObject.hasOwnProperty("response") && callObject.response.hasOwnProperty("data")) {
        if (callObject
            && callObject.response
            && callObject.response.data
        ) {
            gotData = true;
            if (data != null)
                callObject.response.data = data.data.concat(callObject.response.data)
        }
    }
    return (gotData) ? callObject.response : null
}


function ShopPage({category,hpid}) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    //all paths start with shop-
    const {dataStore} = useContext(AppWideContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const [navControl, setNavControl] = React.useState(false);
    const controller = useCallback(() => {
        const isSet = (window.scrollY > window.innerHeight - 20)
        if (navControl !== isSet)
            setNavControl(isSet)
    }, [navControl])
    React.useEffect(() => {
        window.addEventListener("scroll", controller);
        return () =>
            window.removeEventListener('scroll', controller)
    }, [controller]);
    const [pagination, setPagination] = useState({
        limit: 10, skip: 0
    })

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
    const fetchProducts = useCallback(async () => {
        if (loading)
            return

        setLoading(true)
        const newData = await fetchData(data, dataStore.apiToken, category, pagination)
        if(newData)
            setData(newData)
        setPagination({
            skip: pagination.skip + pagination.limit,
            limit: pagination.limit
        })
        setLoading(false)
    }, [loading, data, dataStore.apiToken, category, pagination])

    const hasMore = (data == null || (data.hasOwnProperty("total_products_exist") && data.total_products_exist > pagination.skip))

    const loader = <span className={"col-span-3 flex justify-center items-center"} key="loader">
        <span className={"block relative w-14 aspect-square"}>
            <Image src={WEBASSETS + "/assets/images/loader.gif"} layout={`fill`} objectFit={`cover`}
                   alt={"loader"}/>
        </span>
    </span>

    const threshold = (typeof window !== "undefined") ? Math.floor(window.innerHeight - 100) : 0;

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
                <InfiniteScroll
                    loadMore={fetchProducts}
                    hasMore={hasMore}
                    loader={loader}
                    initialLoad={true}
                    threshold={threshold}
                >
                    <main className={`grid grid-cols-3 gap-5 container pb-20`}>

                        {data && data.data && data.data.map((prod, index) => {
                            return <ProductCard prod={prod} key={index}/>
                        })}
                    </main>
                </InfiniteScroll>

                <Footer isMobile={dataStore.mobile}/>
            </Fragment>
        );
}

export default ShopPage;
