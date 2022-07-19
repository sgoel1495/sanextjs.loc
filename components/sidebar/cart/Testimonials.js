import React from 'react';
import Link from "next/link";
import Image from "next/image";
import SwiperCore, {Autoplay} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import useApiCall from "../../../hooks/useApiCall";
import AppWideContext from "../../../store/AppWideContext";

SwiperCore.use([Autoplay]);

const Testimonials = () => {
    const {dataStore} = React.useContext(AppWideContext);
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const blockHeader = "border-4 border-theme-200 p-2 uppercase mb-5 tracking-wide mx-5"
    const resp = useApiCall("reviews", dataStore.apiToken);

    if (resp && resp.msg === "Successfully Get")
        return (
            <div className={`my-12`}>
                <div className={blockHeader}>
                    <h5 className={`text-h5 font-600 text-center`}>Testimonials</h5>
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
                    {resp.reviews.sort((a, b) => a.serial_no - b.serial_no).map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={`p-2 bg-theme-50 border border-theme-200`}>
                                    <p className="text-justify text-sm mb-6">
                                        {item.post_comment}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <Link href={item.post_link}>
                                            <a className={`block relative w-8 h-8`}>
                                                <Image src={WEBASSETS + "/assets/images/fb-icon-color.png"}
                                                       alt={`Facebook Link`} layout="fill" objectFit="contain"/>
                                            </a>
                                        </Link>
                                        <div>
                                            <p className={`text-right font-600 text-xs`}>- {item.post_user_name}</p>
                                            <p className={`text-right text-xs text-theme-500`}>{item.post_time}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        )
    return <></>
};

export default Testimonials;