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

function ShopByLooksSwiper(props) {
    const mobileView = null;

    const browserView = (
        <>
            <div className="container w-[50%]">
                <div className={"grid grid-cols-3 items-center text-center mb-10"}>
                    <hr/>
                    <p className={"text-h2 uppercase"}>Shop By Looks</p>
                    <hr/>
                </div>
            </div>
            <Swiper
                slidesPerView={2}
                autoplay={{
                    "delay": 2500,
                    "disableOnInteraction": false
                }}
                navigation={true}
                className={"mb-10"}
            >
                {[...Array(20)].map((_, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <a href="#" className={"flex flex-col gap-5 items-center grayscale hover:grayscale-0"}>
                                <Image src={"https://source.unsplash.com/random"} width={"650"} height={"650"} />
                                <h5 className={'text-h5 italic font-500'}>Lorem Ipsum {index +1}</h5>
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

export default ShopByLooksSwiper;

