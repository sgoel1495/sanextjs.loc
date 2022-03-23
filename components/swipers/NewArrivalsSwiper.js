/**
 * @params {isMobile} props
 * @constructor
 */

import React, {useContext, useEffect, useState} from 'react';
import BlockHeader from "../common/blockHeader";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, {Pagination, Navigation, Autoplay} from 'swiper';
import Image from "next/image";
import useApiCall from "../../hooks/useApiCall";
import AppWideContext from "../../store/AppWideContext";
import appSettings from "../../store/appSettings";

SwiperCore.use([Pagination, Navigation, Autoplay]);

function NewArrivalsSwiper(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);

    const resp = useApiCall("getProducts", dataStore.apiToken, {category: "new-arrivals"});
    const [data, setData] = useState(null);
    useEffect(() => {
        if (resp
            && resp.hasOwnProperty("status")
            && resp.status == 200
            && resp.hasOwnProperty("response")
            && resp.response.hasOwnProperty("data")
        )
            setData(resp.response.data);
    }, [resp]);

    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currSymbol = currencyData[currCurrency]["curr_symbol"];

    const actualData = [];

    if (data && data.length > 0) {
        data.forEach(ele => {
            actualData.push({
                link: "/" + ele.asset_id,
                url: WEBASSETS + ele.single_view_img,
                name: ele.name,
                tag: ele.tag_line,
                price: (currCurrency == "inr") ? ele.price : ele.usd_price
            });
        });
    }


    const mobileView = (
        <section className={"newArrivals"}>
            <Swiper
                slidesPerView={1.2}
                spaceBetween={5}
                navigation={false}
            >
                {actualData.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <a href={item.link} className={"flex flex-col gap-5 items-center"}>
                                <span className="relative h-[300px] aspect-square">
                                    <Image
                                        src={item.url}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </span>
                                <div className={"text-center"}>
                                    <h5 className={'text-h5 font-600'}>{item.name}</h5>
                                    <p className="text-sm tracking-wide">{item.tag}</p>
                                    <p className="text-sm tracking-wide">{currSymbol}{item.price}</p>
                                </div>
                            </a>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </section>
    );

    const browserView = (
        <section className={"newArrivals"}>
            <BlockHeader
                blockHeaderStyle="bg-[#f9f9f9]"
                space={"py-10"}
                titleStyle={"text-[#b5ddf5] font-600 flex justify-center items-center gap-3 leading-none"}
            >
                <span className={"text-h1"}>~</span>
                <span className={'font-cursive italic text-h1'}>new</span>
                <span className={"tracking-widest text-h4 uppercase"}>Arrivals</span>
                <span className={"text-h1"}>~</span>
            </BlockHeader>
            <Swiper
                slidesPerView={3.1}
                spaceBetween={5}
                autoplay={{
                    "delay": 2500,
                    "disableOnInteraction": false
                }}
                navigation={true}
            >
                {actualData.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <a href={item.link} className={"flex flex-col gap-5 items-center"}>
                                <span className="relative h-[606px] w-full">
                                    <Image
                                        src={item.url}
                                        alt={item.name}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </span>
                                <div className={"text-center"}>
                                    <h5 className={'text-h5 font-600'}>{item.name}</h5>
                                    <p className="text-sm tracking-wide">{item.tag}</p>
                                    <p className="text-sm tracking-wide">{currSymbol}{item.price}</p>
                                </div>
                            </a>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </section>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default NewArrivalsSwiper;
