/**
 * @todo The api does not differentiate between mobile and non mobile carousel data
 * @params {isMobile} props
 * @constructor
 */

import React, {useEffect, useState, useContext} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import 'swiper/css/effect-fade';
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, {Pagination, Navigation, Autoplay, EffectFade} from 'swiper';
import Image from "next/image";
import useApiCall from "../../hooks/useApiCall";
import AppWideContext from "../../store/AppWideContext";

SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

function HomePageHeaderSwiper(props) {
    const maxSlides = 10;
    const {dataStore} = useContext(AppWideContext);
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const resp = useApiCall("getProducts", dataStore.apiToken, {category: "new-arrivals"});
    const [data, setData] = useState(null);

    useEffect(() => {
        if (resp
            && resp.hasOwnProperty("status")
            && resp.status == 200
            && resp.hasOwnProperty("new_arr_carousal")
            && resp.new_arr_carousal.hasOwnProperty("imgs")
        )
            setData(resp.new_arr_carousal);
    }, [resp]);

    const actualData = [];
    let foreground = null;
    let transitionTime = 1.0;

    if (data && data.imgs && data.imgs.length > 0) {
        foreground = WEBASSETS + data.foreground_path;
        transitionTime = data.transition_time;
        data.imgs.forEach((ele, index) => {
            if (index < maxSlides) {
                actualData.push({
                    link: "/" + data.imgs_path[index],
                    url: WEBASSETS + ele
                });
            }
        });
    }

    const mobileView = null;

    const browserView = (
        <Swiper
            slidesPerView={1}
            autoplay={{
                "delay": transitionTime * 1000,
                "disableOnInteraction": false
            }}
            navigation={true}
            effect="fade"
        >
            {actualData.map((item, index) => {
                return (
                    <SwiperSlide key={index}>
                        <a href={item.link} className={'block relative h-[95vh] w-full'}>
                            <Image
                                src={item.url}
                                layout="fill"
                                objectFit="cover"
                            />
                        </a>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    );

    return props.isMobile ? mobileView : browserView
}

export default HomePageHeaderSwiper;
