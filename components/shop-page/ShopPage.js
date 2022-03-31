/**
 *
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

import CategoryHeaderVideo from "../common/CategoryHeaderVideo";
import PageHead from "../PageHead";
import React, {Fragment, useCallback, useContext, useEffect, useRef, useState} from "react";
import NavBar from "../navbar/Index";
import AppWideContext from "../../store/AppWideContext";
import Menu from "../navbar/Menu";
import Footer from "../footer/Footer";
import Image from "next/image";
import BlockHeader from "../common/blockHeader";
import Navbar from "../../components/navbar/Index";
import {apiDictionary} from "../../helpers/apiDictionary";
import ProductCard from "./ProductCard";


function ShopPage(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    //all paths start with shop-
    const [category, setCategory] = useState(props.hpid.substr(5));
    const {dataStore} = useContext(AppWideContext);
    const loaderRef = useRef(null)

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);


    const [navControl, setNavControl] = React.useState(false);
    const controller = () => setNavControl(window.scrollY > window.innerHeight - 20);

    const [pagination, setPagination] = useState({
        limit: 30, skip: 0
    })
    const fetchData = useCallback((flag = true, io = null) => {
        if (io) {
            if (!io.isIntersecting)
                return
        }
        if (data && flag) {
            if (data.total_products_exist <= pagination.skip) {
                return
            }
        }
        setLoading(true)
        const callObject = apiDictionary("getProducts", dataStore.apiToken, {category: category.replace("tailored-", ""), ...pagination});
        fetch(callObject.url, callObject.fetcher)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (data && flag)
                    json.response.data = data.data.concat(json.response.data)
                setData(json.response);
                setPagination({
                    skip: pagination.skip + pagination.limit,
                    limit: pagination.limit
                })
            }).finally(() => {
            setLoading(false);
        });
    }, [data, pagination, category])

    React.useEffect(() => {
        const observer = new IntersectionObserver((io) => fetchData(true, io[0]), {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        })
        if (loaderRef && loaderRef.current) {
            observer.observe(loaderRef.current)
        }
        window.addEventListener("scroll", controller);
        return () => {
            window.removeEventListener('scroll', controller)
            if (loaderRef && loaderRef.current)
                observer.unobserve(loaderRef.current)
        };
    }, [loaderRef, fetchData]);


    useEffect(() => {
        setData(null)
        setPagination({
            limit: 30, skip: 0
        })
        setCategory(props.hpid.substr(5))
    }, [props.hpid])

    useEffect(() => {
        fetchData(false)
    }, [category])


    /**
     * @todo API - Please tell the api which gives the tagline for categories << HArdcoded
     *
     * @type {string}
     */
    const tag_line = "Designed for timelessness and crafted with utmost love, the premium quality tops & blouses in a wide palette of prints and colours are made for both work & beyond.";
    /*
        {
            "asset_id": "Tops-Bamboo-Tee-Off-White-BambooTShirt",
            "in_stock": "true",
            "is_prod_new": true,
            "multi_color": false,
            "name": "Bamboo Tee-Off White",
            "old_product_id": "Tops-Bamboo-Tee-Off-White-BambooTShirt",
            "price": 1250,
            "tag_line": "Bamboo TShirt",
            "single_view_img": "/assets/Tops-Bamboo-Tee-Off-White-BambooTShirt/new.jpg",
            "double_view_img": "/assets/Tops-Bamboo-Tee-Off-White-BambooTShirt/thumb.mob.jpg",
            "usd_price": 18
        },
    */

    return (
        <Fragment>
            <PageHead url={"/" + props.hpid} id={props.hpid} isMobile={dataStore.mobile}/>
            {navControl || <NavBar type={"mimoto"}/>}
            <CategoryHeaderVideo category={category}/>
            {navControl
                ? <Navbar type={"minimal"} isMobile={false} filterData={data} category={props.hpid}/>
                : <Menu type={"minimal"} isMobile={false} filterData={data} category={props.hpid}/>
            }
            <BlockHeader
                space={"py-5"}
                titleStyle={"text-center"}
            >
                <h3 className={`text-h4 font-600 mb-4 uppercase`}>{category}</h3>
                <h4 className={`text-h6 leading-none font-cursive italic font-600 text-black/70`}>{tag_line}</h4>
            </BlockHeader>
            <main className={`grid grid-cols-3 gap-5 container pb-20`}>
                {
                    data && data.data && data.data.map((prod, index) => {
                        return <ProductCard prod={prod} key={index}/>
                    })
                }
                <span className={"col-span-3 flex justify-center items-center"} ref={loaderRef}>
                {
                    loading &&
                    <span className={"block relative w-14 aspect-square"}>
                        <Image src={WEBASSETS + "/assets/images/loader.gif"} layout={`fill`} objectFit={`cover`} alt={"loader"}/>
                    </span>
                }
                </span>
            </main>
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    );
}

export default ShopPage;
