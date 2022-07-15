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
    console.log(resp)
    const testimonialsData = [
        {
            link: "https://www.facebook.com/hiraldhaval.shah/posts/3789743831052915",
            name: "Hiral Dhaval Shah",
            time: "19/09/2020 14:30",
            comment: "Im in love with the fabric..the fit is perfect. Superb service and special thanks to Asine who helped me with an undelivered package !"
        },
        {
            link: "https://www.facebook.com/rachna.mohan.73/posts/3577322832286870",
            name: "Rachna Mohan",
            time: "27/07/2020 16:26",
            comment: "there cloth material is very good"
        },
        {
            link: "https://www.facebook.com/nita.bardhan/posts/3099842763435795",
            name: "Nita Bardhan",
            time: "06/07/2020 18:15",
            comment: "Yes most certainly 😊 The fabric , fitting and most importantly service is awesome."
        },
        {
            link: "https://www.facebook.com/indrayani.sakpal/posts/10157968363674230",
            name: "Indrayani Sakpal",
            time: "04/07/2020 16:32",
            comment: "The fabric is good with some different design also they are good in after sale service Thank you!!! 😊 So much I appreciate the acknowledge my query and refund policy I am glad with your response and continue to shoping with you .They are 100 percentage trustworthy."
        }
    ];
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