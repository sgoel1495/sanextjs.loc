/**
 *
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

import CategoryHeaderVideo from "../common/CategoryHeaderVideo";
import PageHead from "../PageHead";
import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import AppWideContext from "../../store/AppWideContext";
import Menu from "../navbar/Menu";
import Footer from "../footer/Footer";
import Image from "next/image";
import BlockHeader from "../common/blockHeader";
import Header from "../navbar/Header";
import {apiDictionary} from "../../helpers/apiDictionary";
import ProductCard from "./ProductCard";


function ShopPage(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    //all paths start with shop-
    const [category, setCategory] = useState(props.hpid.substr(5));
    const { dataStore } = useContext(AppWideContext);
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

    const [dropDownView, setDropDownView] = useState(false);
    const dropData = ["tops", "sweaters", "shirts", "tunics", "jumpsuits", "shorts", "pants", "skirts", "dresses", "outwears", "scarves", "belts", "jewellery", "masks"];

    const [activeLayout, setActiveLayout] = useState("dual");

    if (dataStore.mobile) {
        return (
            <>
                <div className="relative">
                    <div className="inline-flex px-4 items-center justify-start" onClick={() => setDropDownView(!dropDownView)}>
                        <p className="text-h3 uppercase font-900 text-[#333231]">jewellery</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path fill="#ec9c98" d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
                        </svg>
                    </div>
                    {dropDownView
                        ? <div className="absolute inset-x-0 top-full shadow bg-[#2f2f2f] px-4  max-h-[200px] overflow-y-auto">
                            {dropData.map((item, index) => {
                                return (
                                    <Link href={"/"} key={index}>
                                        <a className="block py-2.5 font-700 text-center uppercase text-white">{item}</a>
                                    </Link>
                                )
                            })}
                        </div>
                        : null
                    }
                </div>
                <div className="flex items-center justify-between px-4">
                    <div className="inline-flex gap-4 items-center">
                        <button className={`grid place-items-center w-6 h-6 rounded-lg border ${activeLayout == "single" ? 'border-black' : 'border-transparent'}`} onClick={() => setActiveLayout("single")}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" fill="currentColor">
                                <path d="M230,258 C203.49,258 182,279.49 182,306 C182,332.51 203.49,354 230,354 C256.499,353.974 277.974,332.499 278,306 C278,279.49 256.51,258 230,258 zM230,338 C212.327,338 198,323.673 198,306 C198,288.327 212.327,274 230,274 C247.673,274 262,288.327 262,306 C262,323.673 247.673,338 230,338 z" />
                                <path d="M228,143 C201.49,143 180,164.49 180,191 C180,217.51 201.49,239 228,239 C254.49900000000002,238.974 275.974,217.499 276,191 C276,164.49 254.51,143 228,143 zM228,223 C210.327,223 196,208.673 196,191 S210.327,159 228,159 S260,173.327 260,191 S245.673,223 228,223 z" />
                            </svg>
                        </button>
                        <button className={`grid place-items-center w-6 h-6 rounded-lg border ${activeLayout == "dual" ? 'border-black' : 'border-transparent'}`} onClick={() => setActiveLayout("dual")}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" fill="currentColor">
                                <path d="M312,120c-26.51,0-48,21.49-48,48c0,26.51,21.49,48,48,48c26.499-0.026,47.974-21.501,48-48     C360,141.49,338.51,120,312,120z     M312,200c-17.673,0-32-14.327-32-32s14.327-32,32-32c17.673,0,32,14.327,32,32     S329.673,200,312,200z" />
                                <path d="M312,264c-26.51,0-48,21.49-48,48c0,26.51,21.49,48,48,48c26.499-0.026,47.974-21.501,48-48     C360,285.49,338.51,264,312,264z M312,344c-17.673,0-32-14.327-32-32c0-17.673,14.327-32,32-32c17.673,0,32,14.327,32,32     C344,329.673,329.673,344,312,344z" />
                                <path d="M168,120c-26.51,0-48,21.49-48,48c0,26.51,21.49,48,48,48c26.499-0.026,47.974-21.501,48-48     C216,141.49,194.51,120,168,120z M168,200c-17.673,0-32-14.327-32-32s14.327-32,32-32s32,14.327,32,32S185.673,200,168,200z" />
                                <path d="M168,264c-26.51,0-48,21.49-48,48c0,26.51,21.49,48,48,48c26.499-0.026,47.974-21.501,48-48     C216,285.49,194.51,264,168,264z M168,344c-17.673,0-32-14.327-32-32c0-17.673,14.327-32,32-32s32,14.327,32,32     C200,329.673,185.673,344,168,344z" />
                            </svg>
                        </button>
                    </div>
                    <div className="inline-flex gap-4 items-center py-2">
                        <button className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider font-500 leading-none">
                            Filter
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" fill="currentColor" className="w-4 h-4">
                                <path d="M8,41.08V2c0-0.553-0.448-1-1-1S6,1.447,6,2v39.08C2.613,41.568,0,44.481,0,48c0,3.859,3.14,7,7,7s7-3.141,7-7   C14,44.481,11.387,41.568,8,41.08z M7,53c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S9.757,53,7,53z" />
                                <path d="M29,20.695V2c0-0.553-0.448-1-1-1s-1,0.447-1,1v18.632c-3.602,0.396-6.414,3.456-6.414,7.161s2.812,6.765,6.414,7.161V54   c0,0.553,0.448,1,1,1s1-0.447,1-1V34.891c3.4-0.577,6-3.536,6-7.098S32.4,21.272,29,20.695z M27.793,33   c-2.871,0-5.207-2.336-5.207-5.207s2.335-5.207,5.207-5.207S33,24.922,33,27.793S30.664,33,27.793,33z" />
                                <path d="M56,8c0-3.859-3.14-7-7-7s-7,3.141-7,7c0,3.519,2.613,6.432,6,6.92V54c0,0.553,0.448,1,1,1s1-0.447,1-1V14.92   C53.387,14.432,56,11.519,56,8z M49,13c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S51.757,13,49,13z" />
                            </svg>
                        </button>
                        <button className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider font-500 leading-none">
                            Sort
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 294.842 294.842" fill="currentColor" className="w-4 h-4">
                                <path d="M292.128,214.846c-2.342-2.344-6.143-2.344-8.484,0l-59.512,59.511V6c0-3.313-2.687-6-6-6s-6,2.687-6,6v268.356   l-59.513-59.512c-2.342-2.342-6.142-2.343-8.485,0.001c-2.343,2.343-2.343,6.142,0.001,8.485l69.755,69.754   c1.171,1.171,2.707,1.757,4.242,1.757s3.071-0.586,4.242-1.758l69.754-69.754C294.472,220.987,294.472,217.188,292.128,214.846z" />
                                <path d="M6.956,12h180.137c3.313,0,6-2.687,6-6s-2.687-6-6-6H6.956c-3.313,0-6,2.687-6,6S3.643,12,6.956,12z" />
                                <path d="M6.956,82.228h180.137c3.313,0,6-2.687,6-6s-2.687-6-6-6H6.956c-3.313,0-6,2.687-6,6S3.643,82.228,6.956,82.228z" />
                                <path d="M6.956,152.456h180.137c3.313,0,6-2.687,6-6s-2.687-6-6-6H6.956c-3.313,0-6,2.687-6,6S3.643,152.456,6.956,152.456z" />
                                <path d="M124.438,210.685H6.956c-3.313,0-6,2.687-6,6s2.687,6,6,6h117.482c3.313,0,6-2.687,6-6S127.752,210.685,124.438,210.685z" />
                                <path d="M124.438,280.912H6.956c-3.313,0-6,2.687-6,6s2.687,6,6,6h117.482c3.313,0,6-2.687,6-6S127.752,280.912,124.438,280.912z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </>
        )
    } else return (
        <Fragment>
            <PageHead url={"/" + props.hpid} id={props.hpid} isMobile={dataStore.mobile} />
            {navControl || <Header type={"mimoto"} />}
            <CategoryHeaderVideo category={category} />
            {navControl
                ? <Header type={"minimal"} isMobile={false} filterData={data} category={props.hpid} />
                : <Menu type={"minimal"} isMobile={false} filterData={data} category={props.hpid} />
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
            <Footer isMobile={dataStore.mobile} />
        </Fragment>
    );
}

export default ShopPage;
