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
        if (data != null)
            callObject.response.data = data.data.concat(callObject.response.data)
        gotData = true;
    }
    return (gotData) ? callObject.response : {}
}


function ShopPage(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    //all paths start with shop-
    const category = props.hpid.substring(5)
    const {dataStore} = useContext(AppWideContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const [navControl, setNavControl] = React.useState(false);
    const controller = useCallback((currentNav=navControl) => {
        const isSet = (window.scrollY > window.innerHeight - 20)
        if (currentNav !== isSet)
            setNavControl(isSet)
    },[])
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
                    hpid={props.hpid}
                />
            )
        }

     */
    const fetchProducts = useCallback(async () => {
        if (loading)
            return

        setLoading(true)
        const newData = await fetchData(data, dataStore.apiToken, category, pagination)
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


    if (!dataStore.mobile)
        return (
            <InfiniteScroll
                loadMore={fetchProducts}
                hasMore={hasMore}
                loader={loader}
                initialLoad={true}
            >
                {(data)
                    ? <Fragment>
                        <PageHead url={"/" + props.hpid} id={props.hpid} isMobile={dataStore.mobile}/>
                        {navControl || <Header type={"shopMenu"}/>}
                        <CategoryHeaderVideo category={category}/>
                        {navControl
                            ? <Header type={"minimal"} isMobile={false} filterData={data ? data.filter_count : {}}
                                      category={props.hpid}/>
                            : <Menu type={"minimal"} isMobile={false} filterData={data ? data.filter_count : {}}
                                    category={props.hpid}/>
                        }
                        <BlockHeader
                            space={"py-5"}
                            titleStyle={"text-center"}
                        >
                            <h3 className={`text-h4 font-600 mb-4 uppercase`}>{category}</h3>
                            <h4 className={`text-h6 leading-none font-cursive italic font-600 text-black/70`}>{tag_line}</h4>
                        </BlockHeader>
                        <main className={`grid grid-cols-3 gap-5 container pb-20`}>
                            {data && data.data && data.data.map((prod, index) => {
                                return <ProductCard prod={prod} key={index}/>
                            })}
                        </main>
                        <Footer isMobile={dataStore.mobile}/>
                    </Fragment>
                    : null}
            </InfiniteScroll>
        );
}

export default ShopPage;
