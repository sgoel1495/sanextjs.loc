/**
 * @todo The api does not differentiate between mobile and non mobile carousel data
 * @params {isMobile} props
 * @constructor
 */

import React, {useEffect, useState, useContext, Fragment} from 'react';
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
    let imgs = [], links, transition_time;
    let overlay = null;
    let apiToken;
    if (props.page === "newArrival") {
        if (props.slides) {
            imgs = props.slides.imgs.map((img) => dataStore.mobile ? img.replace("web", "mob") : img.replace("mob", "web"))
            links = props.slides.imgs_path.map((link) => "/" + link)
            transition_time = props.slides.transition_time
            overlay = <span className={"block relative h-full w-full z-20"}>
                <Image
                    src={WEBASSETS + (dataStore.mobile ? props.slides.foreground_path.replace("web", "mob").replace("v1", "v2") : props.slides.foreground_path.replace("mob", "web").replace("v2", "v1"))}
                    alt={'header-overlay'}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center top"
                />
            </span>
        }
    } else {
        apiToken = dataStore.apiToken
    }
    const resp = useApiCall("getHomePageCarousal", apiToken);
    if (resp && resp.status === 200) {
        imgs = resp.response.data.web.imgs
        links = resp.response.data.web.links
        transition_time = resp.response.data.web.transition_time
    }

    if (imgs.length)
        return (
            <Swiper
                slidesPerView={1}
                autoplay={{
                    "delay": transition_time,
                    "disableOnInteraction": false
                }}
                navigation={!props.page}
                effect="fade"
            >
                {imgs.map((item, index) => {
                    return <Fragment>
                        {(links[index] && links[index]!="")
                        ?<SwiperSlide key={index}>
                            <Link href={links[index]} passHref>
                                <span className={'block relative h-[100vh] z-10'}>
                                    {overlay}
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
                        :null}
                    </Fragment>
                })}
            </Swiper>
        )
    else
        return <></>
}

export default HomePageHeaderSwiper;
