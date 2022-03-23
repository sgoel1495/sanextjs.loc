import React, {useContext} from 'react';
import useApiCall from "../../hooks/useApiCall";
import AppWideContext from "../../store/AppWideContext";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";

const homeBanners = [
    "https://saltattire.com/assets/images/homebanner_new/salt_v10.jpg",
    "https://saltattire.com/assets/images/homebanner_new/kapaas_v5.jpg",
    "https://saltattire.com/assets/images/homebanner_new/kapaas_v4.jpg",
    "https://saltattire.com/assets/images/homebanner_new/jewellery_v2.jpg",
    "https://saltattire.com/assets/images/homebanner_new/moyo_v17.jpg",
    "https://saltattire.com/assets/images/homebanner_new/moyo_v16.jpg",
    "https://saltattire.com/assets/images/homebanner_new/noor_v3.jpg"
]

const ImageBlock = props => (
    <div className={'relative border-2 border-white overflow-hidden shadow-[4px_4px_14px_0.8px_#00000008] '+props.style}>
        <Image
            src={props.src}
            alt={props.alt}
            layout={'fill'}
            objectFit={'cover'}
        />
    </div>
)

const CategorySection = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const resp = useApiCall("getCategoryCircle", dataStore.apiToken);

    let transitionTime = 1.0;

    return (
        <>
            <div className={"py-6 w-screen overflow-x-scroll scrollbar-none bg-[#f0eae6]"}>
                <div className={"flex gap-2"}>
                    {resp && resp.response && resp.response.map((item, index) => (
                        <div key={index} className='inline-flex flex-col items-center gap-3'>
                            <ImageBlock src={WEBASSETS + item.asset_id} alt={item.category} style={"w-[100px] aspect-square rounded-[35%]"}/>
                            <span className={"text-black text-[10px] uppercase tracking-wide font-600"}>{item.category}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={"py-6 w-screen overflow-x-scroll scrollbar-none bg-[#f0eae6]"}>
                <Swiper
                    slidesPerView={1}
                    autoplay={{
                        "delay": transitionTime * 1000,
                        "disableOnInteraction": false
                    }}
                    navigation={true}
                    effect="fade"
                >
                    {homeBanners.map((item, index) => {
                        return (
                            <SwiperSlide key={index} className={"px-[10vw]"}>
                                <a href={item} className={'block relative h-[65vh] border-2 border-white'}>
                                    <Image
                                        src={item}
                                        layout="fill"
                                        objectFit="contain"
                                        objectPosition="center top"
                                    />
                                </a>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </>
    );
};

export default CategorySection;