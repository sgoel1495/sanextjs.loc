/**
 * @params {isMobile} props
 * @constructor
 */

import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import 'swiper/css/effect-fade';
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, {Pagination, Navigation, Autoplay, EffectFade} from 'swiper';
import Image from "next/image";
import useGetApiCall from "../../hooks/useApiCall";

SwiperCore.use([EffectFade,Navigation,Pagination, Autoplay]);

function HomePageHeaderSwiper(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [data,setData] = useState(null);
    const url="/api/v1/get_products";
    const body = {
        "product": {
            "token": process.env.API_TOKEN,
            "category": "new-arrivals",
            "skip": 0,
            "limit": 10
        }
    };
    const resp = useGetApiCall(url,body);

    useEffect(()=>{
        if(resp
            && resp.hasOwnProperty("status")
            && resp.status == "200"
            && resp.hasOwnProperty("new_arr_carousal")
            && resp.new_arr_carousal.hasOwnProperty("imgs")
        )
        setData(resp.new_arr_carousal);
    },[resp]);
    console.log("DATA",data);
    const actualData = [];
    let foreground = null;
    if(data && data.imgs && data.imgs.length > 0){
        foreground = WEBASSETS + data.foreground_path;
        data.imgs.forEach((ele,index)=>{
            console.log("ELE",ele);
            console.log("Index",index);
            actualData.push({
                link: "/" + data.imgs_path[index],
                url: WEBASSETS + ele
            });
        });
    }




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
        </>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default HomePageHeaderSwiper;
