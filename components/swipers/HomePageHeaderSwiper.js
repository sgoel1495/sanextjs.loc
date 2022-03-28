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
import Link from "next/link";

SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

function HomePageHeaderSwiper(props) {
    const {dataStore} = useContext(AppWideContext);
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const resp = useApiCall("getHomePageCarousal", dataStore.apiToken);

    if (resp && resp.status === 200)
        return (
            <Swiper
                slidesPerView={1}
                autoplay={{
                    "delay": resp.response.data.web.transition_time,
                    "disableOnInteraction": false
                }}
                navigation={true}
                effect="fade"
            >
                {resp.response.data.web.imgs.map((item, index) => {

                    return (
                        <SwiperSlide key={index}>
                            <Link href={resp.response.data.web.links[index]}>
                                <span className={'block relative h-[100vh]'}>
                                    <Image
                                        src={WEBASSETS + item}
                                        alt={'header'}
                                        layout="fill"
                                        objectFit="cover"
                                        objectPosition="center top"
                                    />
                                </span>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        );
    else
        return <></>
}

export default HomePageHeaderSwiper;
