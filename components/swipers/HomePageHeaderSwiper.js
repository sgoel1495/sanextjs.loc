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

function HomePageHeaderSwiper(props) {

    const [data, setData] = React.useState([]);
    React.useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(json => setData(json.slice(0, 5)))
    }, [])

    console.log(data)
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
                className={"mb-10"}
            >
                {data.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <a href="#">
                                <Image src={item.url} width="1920" height="865"  layout="fill"/>
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
