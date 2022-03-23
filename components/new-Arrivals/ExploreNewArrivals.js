import React, { useContext } from 'react';
import useApiCall from "../../hooks/useApiCall";
import AppWideContext from "../../store/AppWideContext";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/effect-fade';
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, { Pagination, Navigation, Autoplay, EffectFade } from 'swiper';

SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

const ExploreNewArrivals = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext);
    const resp = useApiCall("exploreNewArrivals", dataStore.apiToken);

    const active = true;
    const sliderDuration = 1000;

    return (
        <div className='py-8'>
            <a href={"/new-arrivals/all"} className='font-cursive italic leading-none text-2xl text-black/80 mb-5 block text-center'>Explore All New Arrivals</a>
            <div className={"grid grid-cols-2 gap-4"}>
                <div className={"flex flex-col justify-evenly items-end text-right"}>
                    {resp && resp.response && resp.response.left_text.map((item, index) => {
                        return (
                            <a href={item.link + "?sorted_by=created-at-desc"} className={"uppercase font-800 tracking-widest text-white text-sm underline-offset-4" + [active ? ' underline' : '']} key={index}>
                                {item.category}
                            </a>
                        )
                    })}
                </div>
                <div className={"mr-5 border-4 border-white rounded-2xl overflow-hidden"}>
                    <Swiper
                        slidesPerView={1}
                        autoplay={{
                            "delay": sliderDuration,
                            "disableOnInteraction": false
                        }}
                        loop={true}
                    >
                        {resp && resp.response && resp.response.right_img.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <a href={item.link + "?sorted_by=created-at-desc"} className="block">
                                        <span className="block relative h-60 w-full">
                                            <Image
                                                src={WEBASSETS + item.asset_id}
                                                layout="fill"
                                                objectFit="cover"
                                                alt={item.category}
                                            />
                                        </span>
                                    </a>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <div className="col-span-2 flex items-center justify-center gap-2">
                    {resp && resp.response && resp.response.left_text.map((_, index) => {
                        return (
                            <span className={`block w-2.5 h-2.5 rounded-full ${active ? 'bg-[#dbd5d3]' : 'bg-[#faf3f0]'}`} key={index} />
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default ExploreNewArrivals;