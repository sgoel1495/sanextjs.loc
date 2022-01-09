/**
 * @params {isMobile} props
 * @constructor
 */

import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import 'swiper/css/effect-fade';
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, {Pagination, Navigation, Autoplay, EffectFade} from 'swiper';
import Image from "next/image";

SwiperCore.use([EffectFade,Navigation,Pagination, Autoplay]);

const actualData = [];
for(let i=1; i<5; i++){
    actualData.push({
        link: "#",
        url: `https://saltattire.com/assets/videos/new_arrivals_nitto_v${i}.jpg`
    })
}

function HomePageHeaderSwiper(props) {
    const mobileView = null;

    const browserView = (
        <>
            <Swiper
                slidesPerView={1}
                spacebetween={10}
                autoplay={{
                    "delay": 2500,
                    "disableOnInteraction": false
                }}
                navigation={true}
                effect="fade"
            >
                {actualData.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <a href="#" className={'block relative h-[95vh] w-full'}>
                                <Image
                                    src={item.url}
                                    width={1080}
                                    height={1080}
                                    layout="fill"
                                    objectFit="cover"
                                />
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

export default HomePageHeaderSwiper;
