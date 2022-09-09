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
import {connect} from "react-redux";

SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

function HomePageHeaderSwiper(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    let imgs = [], links, transition_time;
    let overlay = null;
    let apiToken;
    if (props.page === "newArrival" || props.page === "best-selling") {
        if (props.slides) {
            imgs = props.slides.imgs.map((img) => props.isMobile ? img.replace("web", "mob") : img.replace("mob", "web"))
            if (props.slides.imgs_path) {
                links = props.slides.imgs_path.map((link) => "/" + link)
            } else {
                links = new Array(props.slides.imgs.length).fill("#")
            }
            transition_time = props.slides.transition_time
            overlay = <span className={"block relative w-full z-20 " + [props.isMobile ? " aspect-square" : " h-full"]}>
                <Image
                    src={WEBASSETS + (props.isMobile ? props.slides.foreground_path.replace("web", "mob").replace("v1", props.page === "best-selling" ? "v1" : "v2") : props.slides.foreground_path.replace("mob", "web").replace("v2", "v1"))}
                    alt={'header-overlay'}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center top"
                />
            </span>
        }
    } else {
        apiToken = props.appConfig.apiToken
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
                    return (
                        <Fragment key={index}>
                            {(links[index] && links[index] !== "")
                                ? <SwiperSlide key={index}>
                                    <Link href={links[index]} passHref>
                                        <span className={'block relative z-10 ' + [props.isMobile ? " w-full aspect-square" : " h-[100vh]"]}>
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
                                : null
                            }
                        </Fragment>
                    )
                })}
            </Swiper>
        )
    else
        return <></>
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(HomePageHeaderSwiper);
