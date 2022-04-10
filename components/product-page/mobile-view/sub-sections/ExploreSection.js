import React, {useContext, useEffect, useState, useCallback} from 'react';
import AppWideContext from "../../../../store/AppWideContext";
import {apiDictionary} from "../../../../helpers/apiDictionary";
import Image from "next/image";
import Link from "next/link";
import appSettings from "../../../../store/appSettings";
import {Swiper, SwiperSlide} from "swiper/react";

const ExploreSection = (props) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const {dataStore} = useContext(AppWideContext);
    const [data, setData] = useState([])

    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;

    const fetchData = useCallback(() => {
        const callObject = apiDictionary(props.api, dataStore.apiToken, props.query);
        fetch(callObject.url, callObject.fetcher)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json && json.status === 200) {
                    setData(json.response.data);
                    if (props.title === "Same Color") {
                        console.log("yoyo", json.response)
                    }
                }
            })
    },[dataStore.apiToken, props.api, props.query, props.title])

    useEffect(() => {
        fetchData()
    }, [fetchData, props.id])

    let body;

    if (props.grid)
        body = <div className={"grid  p-6 " + [props.minimal ? "grid-cols-3 gap-3" : "grid-cols-2 gap-8"]}>
            {data.map((product, index) => {
                return <Link href={"/" + product["old_product_id"]} key={index}>
                    <a className={"block text-center"}>
                        <div className={"relative w-full aspect-square border-2 border-white rounded-[35%] overflow-hidden shadow-[4px_4px_14px_0.8px_rgba(0,0,0,0.03)]"}>
                            <Image
                                src={WEBASSETS + "/assets/" + product["old_product_id"] + "/new.jpg"}
                                layout="fill"
                                objectFit="cover"
                                alt={product["old_product_id"]}
                            />
                            { !props.minimal && product.is_prod_new &&
                            <span className={"absolute left-0 top-[50%] translate-y-[-50%] text-[10px] text-white px-1.5 bg-[#c69565] tracking-wider"}>NEW</span>}

                        </div>
                        {
                            props.minimal || <>
                                <span className={"block text-sm"}>{product["name"]}</span>
                                <span className={"block text-[10px] truncate "}>{product["tag_line"]}</span>
                                <span className={"block text-[10px]"}>{currencySymbol} {currCurrency === "inr" ? product.price : product.usd_price}</span>
                            </>
                        }

                    </a>
                </Link>
            })}
            <Link href={""}>
                <a className={"block"}>
                    <div
                        className={"w-full aspect-square border-2 border-white rounded-[35%] shadow-sm grid place-items-center text-center content-center tracking-widest uppercase text-[9px]"}>
                        <span>tap here</span>
                        <span>to see more</span>
                    </div>
                </a>
            </Link>
        </div>
    else
        body = <div className={`py-5 zoomInSwiper`}>
            <Swiper
                slidesPerView={2}
                spaceBetween={50}
                centeredSlides={true}
                autoplay={false}
                navigation={true}
            >
                {data.map((product, i) => {
                    return (
                        <SwiperSlide key={i}>
                            <Link href={"/" + product.asset_id} passHref>
                                <span className={"flex flex-col items-center gap-y-2"}>
                                    <span className={"block relative h-64 w-full border-4 border-white rounded-[8vw] shadow-md bg-[#fffaf7]"}>
                                        <Image
                                            src={WEBASSETS + "/assets/" + product.asset_id + "/thumb.png"}
                                            layout="fill"
                                            objectFit="cover"
                                            alt={product.asset_id}
                                        />
                                        {product.is_prod_new &&
                                        <span className={"absolute left-0 top-[50%] translate-y-[-50%] text-[10px] text-white px-1.5 bg-[#c69565] tracking-wider"}>NEW</span>}
                                    </span>
                                    <span className={"text-[10px] text-[#8c8987] uppercase"}>{product.name}</span>
                                </span>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>

    return <div className={"p-2"}>
        <span className={"block text-xl text-center"}>{props.title}</span>
        <span className={"block text-center uppercase text-[9px] tracking-[1.5px]"}>{props.subTitle}</span>
        {body}
    </div>

};

export default ExploreSection;