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
        link: "#",
        url: "https://saltattire.com/assets/Shirts-Freda-PrintedSatinLongShirt/new.jpg"
    },
    {
        link: "#",
        url: "https://saltattire.com/assets/Tops-Sabre-PrintedSatinTie-upTop/new.jpg"
    },
    {
        link: "#",
        url: "https://saltattire.com/assets/Dresses-Claret-PrintedsatinShirtDress/new.jpg"
    },
    {
        link: "#",
        url: "https://saltattire.com/assets/Dresses-Glory-Printedsatinrucheddetaildress/new.jpg"
    },
    {
        link: "#",
        url: "\thttps://saltattire.com/assets/Skirts-Rubios-SatinprintedA-lineskirt/new.jpg"
    },
];

function NewArrivalsSwiper(props) {
    const mobileView = null;

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
                                        width={1080}
                                        height={1080}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </span>
                                <div className={"text-center"}>
                                    <h5 className={'text-h5 font-600'}>Product {index + 1}</h5>
                                    <p className="text-sm tracking-wide">Product Description</p>
                                    <p className="text-sm tracking-wide">₹****</p>
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
