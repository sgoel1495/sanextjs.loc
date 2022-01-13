/**
 * @params {isMobile} props
 * @constructor
 */

import React from 'react';
import BlockHeader from "../common/blockHeader";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, {Pagination, Navigation, Autoplay} from 'swiper';
import Image from "next/image";

SwiperCore.use([Pagination, Navigation, Autoplay]);

const actualData = [
    {
        url: "#",
        title: "A Classic",
        image: "https://saltattire.com/assets/look-796/Full.v1.jpg"
    },
    {
        url: "#",
        title: "Jacquard",
        image: "https://saltattire.com/assets/look-795/Full.v1.jpg"
    },
    {
        url: "#",
        title: "Raspberry Crush",
        image: "https://saltattire.com/assets/look-794/Full.v1.jpg"
    },
    {
        url: "#",
        title: "Paris Winter",
        image: "https://saltattire.com/assets/look-793/Full.v1.jpg"
    },
    {
        url: "#",
        title: "Ace of Spades",
        image: "https://saltattire.com/assets/look-792/Full.v1.jpg"
    },
    {
        url: "#",
        title: "Check Mate",
        image: "https://saltattire.com/assets/look-791/Full.v1.jpg"
    },
    {
        url: "#",
        title: "Classic Checks",
        image: "https://saltattire.com/assets/look-790/Full.v1.jpg"
    },
    {
        url: "#",
        title: "Poncho Must Have",
        image: "https://saltattire.com/assets/look-789/Full.v1.jpg"
    },
    {
        url: "#",
        title: "Work & Travel Friendly",
        image: "https://saltattire.com/assets/look-788/Full.v1.jpg"
    },
    {
        url: "#",
        title: "1 Dress Many Ways",
        image: "https://saltattire.com/assets/look-787/Full.v1.jpg"
    },
]

function ShopByLooksSwiper(props) {
    const mobileView = null;

    const browserView = (
        <section className={"shopByLooks"}>
            <BlockHeader
                line
                blockHeaderStyle={"bg-white"}
                space={"py-10"}
                titleStyle={"text-h2 uppercase"}
            >
                Shop By Looks
            </BlockHeader>
            <Swiper
                slidesPerView={2.1}
                autoplay={{
                    "delay": 2500,
                    "disableOnInteraction": false
                }}
                navigation={true}
                className={"mb-10"}
            >
                {actualData.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <a href={item.url} className={"flex flex-col gap-5 items-center"}>
                                <span className={"relative h-[806px] w-full"}>
                                    <Image
                                        src={item.image}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </span>
                                <h2 className={'text-h2 italic font-cursive'}>{item.title}</h2>
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

export default ShopByLooksSwiper;

