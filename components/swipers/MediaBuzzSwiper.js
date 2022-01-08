/**
 * @params {isMobile} props
 * @constructor
 */

import React from 'react';
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, {Pagination, Navigation} from 'swiper';

SwiperCore.use([Pagination, Navigation]);

function MediaBuzzSwiper(props) {
    const mobileView = null;

    const browserView = (
        <>
            <div className="container w-[50%]">
                <div className={"grid grid-cols-3 items-center text-center mb-10"}>
                    <hr/>
                    <p className={"text-h2 uppercase"}>MEDIA BUZZ</p>
                    <hr/>
                </div>
            </div>
            <Swiper
                slidesPerView={4}
                pagination={{
                    "clickable": true
                }}
                navigation={true}
                className={"mb-10"}
            >
                {[...Array(20)].map((_, index) => {
                    return (
                        <SwiperSlide key={index} className={"mb-10"}>
                            <a href="#" className={"flex flex-col gap-5 items-center p-10 grayscale hover:grayscale-0"}>
                                <h5 className={'text-h5'}>Lorem Ipsum {index +1}</h5>
                                <Image src={"https://source.unsplash.com/random"} width={"100"} height={"100"} />
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

export default MediaBuzzSwiper;
