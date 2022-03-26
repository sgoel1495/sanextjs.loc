import React, {useContext} from 'react';
import AppWideContext from "../../store/AppWideContext";
import useApiCall from "../../hooks/useApiCall";
import Link from "next/link";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";

const Index = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const resp = useApiCall("reviews", dataStore.apiToken);
    if (resp && resp.reviews)
        return (
            <div className={"bg-[#f6f1ef]"}>
                <Link href={"/reviews"}>
                    <div>
                        <span className={"block uppercase"}>Testimonials</span>
                        <span className={"block"}>Happy Customers</span>
                    </div>
                </Link>
                <div className={"zoomInSwiper"}>

                    <Swiper
                        slidesPerView={2}
                        spaceBetween={50}
                        centeredSlides={true}
                        loop={true}
                        navigation={true}
                    >
                        {resp.reviews.filter(item => item['is_mob_visible']).map((item, i) => {
                            return (
                                <SwiperSlide key={i}>
                                    <a href={item['post_link']} className={"block flex flex-col items-center gap-y-2"} target="_blank" rel="noreferrer">
                                        <div>
                                        <span className={"block relative h-6 aspect-square"}>
                                            <Image
                                                src={WEBASSETS + "/assets/images/fb-icon-color.png"}
                                                layout="fill"
                                                objectFit="cover"
                                                alt={item["post_user_name"]}
                                            />
                                        </span>
                                            <span className={"block"}>{item["post_user_name"]}</span>
                                            <span className={"block"}>{item["post_time"].split(" ")[0]}</span>
                                        </div>
                                        <hr className={`border-[1px] w-full`} style={{borderColor: item['hr_color']}}/>
                                        <span className={"block relative"}>
                                        <Image
                                            src={WEBASSETS + "/" + item['post_img_path']}
                                            layout="fill"
                                            objectFit="cover"
                                            alt={item["post_user_name"]}
                                        />
                                    </span>
                                        <span className={"text-[10px] text-[#8c8987] uppercase"}>{item["post_comment"]}</span>
                                    </a>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <Link href={"/reviews"}>
                    <span className={"block uppercase"}>tap to read all</span>
                </Link>
            </div>
        );
    else
        return <></>
};

export default Index;