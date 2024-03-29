import React, {useContext, useState} from 'react';
import useApiCall from "../../hooks/useApiCall";
import AppWideContext from "../../store/AppWideContext";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import Link from 'next/link';
import {connect} from "react-redux";

const ImageBlock = props => (
    <div className={'relative border-2 border-white overflow-hidden shadow-[4px_4px_14px_0.8px_#00000008] ' + props.style}>
        <Image
            src={props.src}
            alt={props.alt}
            layout={'fill'}
            objectFit={'cover'}
        />
    </div>
)

const CategorySection = ({appConfig, homePageSwiper, categoryCircle}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [activeIndex, setActive] = useState(0)

    return (
        <>
            <div className={"py-6 w-screen overflow-x-scroll scrollbar-none bg-[#f0eae6]"}>
                <div className={"flex gap-2"}>
                    {categoryCircle.map((item, index) => {
                        return <Link key={index} href={"/shop-" + item.category}>
                            <div className='inline-flex flex-col items-center gap-3'>
                                <ImageBlock src={WEBASSETS + item.asset_id} alt={item.category} style={"w-[100px] aspect-square rounded-[35%]"}/>
                                <span className={"text-black text-[10px] uppercase tracking-wide font-600"}>{item.category}</span>
                            </div>
                        </Link>
                    })}
                </div>
            </div>
            <div className={"pb-8 px-[10vw] bg-[#f0eae6]"}>

                <div className='overflow-hidden rounded-3xl border-4 border-white category-section-swiper'>
                    <Swiper
                        slidesPerView={1}
                        autoplay={{
                            "delay": homePageSwiper.transition_time,
                            "disableOnInteraction": false
                        }}
                        navigation={false}
                        loop={true}
                        onSlideChange={(swiper) => setActive(swiper.realIndex)}
                        initialSlide={0}
                    >
                        {homePageSwiper.imgs.map((item, index) => {
                            return <SwiperSlide key={index}>
                                <Link href={homePageSwiper.links[index] ? homePageSwiper.links[index] : ""}>
                                    <a className={'block relative aspect-[9/16] w-full'}>
                                        <Image
                                            src={WEBASSETS + item}
                                            alt=""
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </a>
                                </Link>
                            </SwiperSlide>
                        })}
                    </Swiper>
                </div>
                <div className="col-span-2 flex items-center justify-center gap-2 mt-2 flex-wrap">
                    {homePageSwiper.links.map((_, index) => {
                        return (
                            <span className={`block w-2.5 h-2.5 rounded-full opacity-[.2] ${activeIndex === index ? 'bg-[#000000]' : 'bg-[#fe9e0b]'}`} key={index}/>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(CategorySection);