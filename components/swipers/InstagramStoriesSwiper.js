import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, {Pagination, Navigation, Autoplay} from 'swiper';
import Image from "next/image";

SwiperCore.use([Pagination, Navigation, Autoplay]);

function InstagramStoriesSwiper(props) {
    const mobileView = null;
    const browserView = (
        <>
            <div className="container w-[80%]">
                <div className={"grid grid-cols-5 items-center text-center mb-10"}>
                    <hr className={"col-span-1"}/>
                    <p className={"text-h2 uppercase col-span-3"}>SHARE YOUR INSTAGRAM STORIES WITH US #SALTATTIRESTORIES</p>
                    <hr className={"col-span-1"}/>
                </div>
            </div>
            <Swiper
                slidesPerView={6.2}
                spaceBetween={0}
                autoplay={{
                    "delay": 2500,
                    "disableOnInteraction": false
                }}
                navigation={true}
                className={"mb-10 instagramStories"}
            >
                {[...Array(20)].map((_, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <a href="#" className={"block"}>
                                <span className={"block relative h-[270px] w-[270px]"}>
                                    <Image
                                        src={"https://source.unsplash.com/random"}
                                        width={1080}
                                        height={1080}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </span>
                            </a>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    )
    return (
        (props.isMobile) ? mobileView : browserView
    )
}

export default InstagramStoriesSwiper;
