import React from 'react';
import Link from "next/link";
import Image from "next/image";
import SwiperCore, {Autoplay} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";

SwiperCore.use([Autoplay]);

const ReturnAndFaq = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const blockHeader = "border-4 border-theme-200 p-2 uppercase mb-5 tracking-wide mx-5"
    return (
        <>
            <Link href="#faq_slides">
                <a className={`block ${blockHeader} mt-10`}>
                    <h6 className={`text-h6 font-600 text-center mb-1`}>Our Return Policy</h6>
                    <ul className={`text-theme-600 text-xs`}>
                        <li key="money-back">Money Back Guarantee For Pre-paid.</li>
                        <li key="exchange-size">You can exchange the size.</li>
                        <li key="store-credit">Get a store credit or get a full refund For Pre-paid.</li>
                        <li key="no-question">No questions asked.</li>
                    </ul>
                </a>
            </Link>
            <div id="faq_slides">
                <Swiper
                    slidesPerView={1.25}
                    spaceBetween={5}
                    autoplay={{
                        "delay": 2500,
                        "disableOnInteraction": false
                    }}
                    className={`w-full`}
                >
                    {[...Array(6)].map((_, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={`p-2 bg-theme-50 border border-theme-200`}>
                                    <span className={`block relative w-full h-64`}>
                                        <Image src={WEBASSETS + `/assets/faq/S${index + 1}.jpg`} alt="return policy"
                                               layout="fill" objectFit="cover"/>
                                    </span>
                                </div>
                            </SwiperSlide>
                        )
                    })}

                </Swiper>
            </div>
        </>
    );
};

export default ReturnAndFaq;