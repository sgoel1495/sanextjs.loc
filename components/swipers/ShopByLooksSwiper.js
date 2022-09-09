/**
 * @todo The params for mobile/browser not clear. Also data does not match with current site.
 * @params {isMobile} props
 * @constructor
 */

import React, {useEffect, useState, useContext} from 'react';
import BlockHeader from "../common/blockHeader";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, {Pagination, Navigation, Autoplay} from 'swiper';
import Image from "next/image";
import useApiCall from "../../hooks/useApiCall";
import AppWideContext from "../../store/AppWideContext";
import {connect} from "react-redux";

SwiperCore.use([Pagination, Navigation, Autoplay]);


function ShopByLooksSwiper(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const resp = useApiCall("getLooksData",props.appConfig.apiToken,{look_id: ""});
    const [data,setData] = useState(null);
    useEffect(()=>{
        if(resp
            && resp.hasOwnProperty("status")
            && resp.status == 200
            && resp.hasOwnProperty("response")
            && resp.response.hasOwnProperty("look")
        )
            setData(resp.response.look);
    },[resp]);

    const actualData = [];

    if(data && data.length > 0){
        const limitedData = data.slice(-10)
        limitedData.forEach(ele=> {
            actualData.push({
                url: "/looks/" + ele.look_id,
                title: ele.heading,
                image:  WEBASSETS + ele.img_path
            });
        });
    }

    const mobileView = null;

    const browserView = (
        <section className={"shopByLooks"}>
            <BlockHeader
                line
                blockHeaderStyle={"bg-white"}
                space={"py-10"}
                titleStyle={"text-h2 uppercase"}
            >
                Shop By Looks
            </BlockHeader>
            <Swiper
                slidesPerView={2.1}
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
                            <a href={item.url} className={"flex flex-col gap-5 items-center"}>
                                <span className={"relative h-[806px] w-full"}>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </span>
                                <h2 className={'text-h2 italic font-cursive'}>{item.title}</h2>
                            </a>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </section>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(ShopByLooksSwiper);

