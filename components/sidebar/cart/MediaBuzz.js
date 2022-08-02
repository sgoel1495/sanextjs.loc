import React from 'react';
import Image from "next/image";
import SwiperCore, {Autoplay} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import useApiCall from "../../../hooks/useApiCall";
import AppWideContext from "../../../store/AppWideContext";

SwiperCore.use([Autoplay]);

const MediaBuzz = () => {
    const {dataStore} = React.useContext(AppWideContext);
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const resp = useApiCall("getMediaBuzz", dataStore.apiToken);
    const blockHeader = "border-4 border-theme-200 p-2 uppercase mb-5 tracking-wide mx-5"
    if (resp && resp.status === 200) {
        return (
            <div className={`my-12`}>
                <div className={blockHeader}>
                    <h5 className={`text-h5 font-600 text-center`}>Media Buzz</h5>
                </div>
                <Swiper
                    slidesPerView={1.25}
                    spaceBetween={5}
                    autoplay={{
                        "delay": 2500,
                        "disableOnInteraction": false
                    }}
                    className={`w-full`}
                >
                    {resp.response.data.sort((a, b) => a.serial_no - b.serial_no).map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <a href={item.media_link} target="_blank" rel="noreferrer">
                                    <div className={`p-1.5 bg-yellow-600 border border-theme-200`}>
                                        <div className="bg-white p-5">
                                        <span className={`block relative w-36 h-36 mx-auto`}>
                                            <Image src={WEBASSETS + item.mob_img} alt={item.alt} layout="fill" objectFit="contain"/>
                                        </span>
                                            <p className={`text-right font-600 text-xs`}>- {item.media_name}</p>
                                        </div>
                                    </div>
                                </a>
                            </SwiperSlide>
                        )
                    })}

                </Swiper>
            </div>
        );
    }
    return <></>
};

export default MediaBuzz;