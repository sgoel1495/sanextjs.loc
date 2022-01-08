/**
 * @params {isMobile} props
 * @constructor
 */

import React from 'react';
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
]

function NewArrivalsSwiper(props) {
    const mobileView = null;

    const browserView = (
        <>
            <div className="container w-[50%]">
                <div className={"grid grid-cols-3 items-center text-center mb-10"}>
                    <hr/>
                    <p className={"text-h3 uppercase text-[#b5ddf5] font-500"}>~ <span className={'lowercase'}>new</span> Arrivals ~</p>
                    <hr/>
                </div>
            </div>
            <Swiper
                slidesPerView={3.1}
                spaceBetween={5}
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
                                <h5 className={'text-h5 italic font-500'}>Lorem Ipsum {index + 1}</h5>
                            </a>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default NewArrivalsSwiper;
