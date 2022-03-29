import React, { useContext } from 'react';
import AppWideContext from "../../store/AppWideContext";
import useApiCall from "../../hooks/useApiCall";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

const Index = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext);
    const resp = useApiCall("reviews", dataStore.apiToken);
    if (resp && resp.reviews)
        return (
            <div className={"bg-[#f6f1ef] py-5"}>
                <Link href={"/reviews"} passHref>
                    <div>
                        <h3 className={"text-h3 font-900 uppercase tracking-widest mx-4 text-[#baa89e] leading-none mb-1"}>Testimonials</h3>
                        <h3 className={"text-h3 font-cursive italic capitalize mx-4 leading-none text-[#baa89e]"}>Happy Customers</h3>
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
                                    <a href={item['post_link']} className={"block flex flex-col items-center"} target="_blank" rel="noreferrer">
                                        <div className={"relative h-6 aspect-square mx-center"}>
                                            <Image
                                                src={WEBASSETS + "/assets/images/fb-icon-color.png"}
                                                layout="fill"
                                                objectFit="cover"
                                                alt={item["post_user_name"]}
                                            />
                                        </div>
                                        <p className={"text-xs uppercase tracking-widest font-900 leading-none"}>{item["post_user_name"]}</p>
                                        <p className={"text-xs uppercase tracking-widest font-700 text-black/60"}>{item["post_time"].split(" ")[0]}</p>
                                        <hr className={`border-[1px] w-4/5 my-3`} style={{ borderColor: item['hr_color'] }} />
                                        <div className={"relative w-full aspect-square"}>
                                            <Image
                                                src={WEBASSETS + "/" + item['post_img_path']}
                                                layout="fill"
                                                objectFit="cover"
                                                alt={item["post_user_name"]}
                                            />
                                        </div>
                                        <p className={"text-[10px] font-700 font-cursive italic"}>{item["post_comment"]}</p>
                                    </a>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <Link href={"/reviews"} passHref>
                    <button className={"uppercase w-full font-900 text-xs tracking-widest text-black/60"}>tap to read all</button>
                </Link>
            </div>
        );
    else
        return <></>
};

export default Index;