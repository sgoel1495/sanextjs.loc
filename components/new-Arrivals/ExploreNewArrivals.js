import React, {useContext} from 'react';
import useApiCall from "../../hooks/useApiCall";
import AppWideContext from "../../store/AppWideContext";
import Image from "next/image";
import Link from 'next/link';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import 'swiper/css/effect-fade';
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, {Pagination, Navigation, Autoplay, EffectFade} from 'swiper';
import {connect} from "react-redux";

SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

const ExploreNewArrivals = ({appConfig}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const resp = useApiCall("exploreNewArrivals", appConfig.apiToken);
    const [activeIndex, setActive] = React.useState(0)

    const sliderDuration = 3000;
    if (resp && resp.response)
        return (
            <div className='py-8'>
                <a href={"/new-arrivals/all"}
                   className='font-cursive italic leading-none text-2xl text-black/80 mb-5 block text-center'>Explore
                    All New Arrivals</a>
                <div className={"grid grid-cols-2 gap-4"}>
                    <div className={"flex flex-col justify-evenly items-end text-right"}>
                        {resp.response.left_text.map((item, index) => {
                            return (
                                <Link href={item.link + "?sorted_by=created-at-desc"} key={index}>
                                    <a className={"uppercase font-800 tracking-widest text-white text-sm underline-offset-4" + [activeIndex === index ? ' underline' : '']}>
                                        {item.category}
                                    </a>
                                </Link>
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
                            onSlideChange={(swiper) => setActive(swiper.realIndex)}
                            initialSlide={0}
                        >
                            {resp.response.right_img.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <Link href={item.link + "?sorted_by=created-at-desc"}>
                                            <a className="block">
                                                <span className="block relative h-60 w-full">
                                                    <Image
                                                        src={WEBASSETS + item.asset_id}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        alt={item.category}
                                                    />
                                                </span>
                                            </a>
                                        </Link>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                    <div className="col-span-2 flex items-center justify-center gap-2">
                        {resp.response.left_text.map((_, index) => {
                            return (
                                <span
                                    className={`block w-2.5 h-2.5 rounded-full ${activeIndex === index ? 'bg-[#dbd5d3]' : 'bg-[#faf3f0]'}`}
                                    key={index}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    else
        return <></>
};

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(ExploreNewArrivals);
