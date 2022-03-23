import React, { useContext } from 'react';
import AppWideContext from "../../store/AppWideContext";
import useApiCall from "../../hooks/useApiCall";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

const Index = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext);
    const resp = useApiCall("getMarketingData", dataStore.apiToken);
    const currCurrency = dataStore.currCurrency;

    if (resp && resp.response) {
        let data = Object.keys(resp.response).map((key) => {
            if (resp.response[key].is_mob_visible) {
                return resp.response[key]
            }
        })
        data.sort((a, b) => a.display_serial_no - b.display_serial_no)
        if (data.length > 0)
            return (
                <div>
                    {data.map((item, index) => {
                        if (item)
                            return <div key={index} className={`bg-[${item['img_bg_color']}]`}>
                                <h3 className='text-h3 text-[#df9796] font-900 uppercase tracking-widest mx-4'>{item['img_title']}</h3>
                                <h3 className='text-h3 text-[#df9796] font-cursive italic leadding-none tracking-wider mx-4 leading-none sentence'>{item['img_sub_title']}</h3>
                                <span className={"block relative w-full aspect-square -mt-5 mb-5"}>
                                    <Image src={WEBASSETS + item['img_path']} alt='collection' layout={`fill`} objectFit={`cover`} />
                                </span>
                                <p className='font-cursive italic leading-none text-2xl text-black/80 block text-center sentence'>{item['title']}</p>
                                <p className='text-[7.5px] text-[#b3aeab] text-center uppercase font-600 tracking-widest'>{item['subtitle'][currCurrency]}</p>
                                <div className={`py-5`}>
                                    <Swiper
                                        slidesPerView={2}
                                        spaceBetween={50}
                                        centeredSlides={true}
                                        loop={true}
                                        autoplay={{
                                            "delay": 2500,
                                            "disableOnInteraction": false
                                        }}
                                        navigation={true}
                                    >
                                        {item.products_imgs.map((product, i) => {
                                            return (
                                                <SwiperSlide key={i}>
                                                    <a href={item.products_links[i]} className={"block flex flex-col items-center gap-y-2"} target="_blank" rel="noreferrer">
                                                        <span className={"block relative h-64 w-full border-4 border-white rounded-[8vw] shadow-sm bg-[#fffaf7]"}>
                                                            <Image
                                                                src={WEBASSETS + product}
                                                                alt={item.products_name[i]}
                                                                layout="fill"
                                                                objectFit="cover"
                                                            />
                                                        </span>
                                                        <span className={"text-[10px] text-[#8c8987] uppercase"}>{item.products_name[i]}</span>
                                                    </a>
                                                </SwiperSlide>
                                            )
                                        })}
                                    </Swiper>
                                </div>
                            </div>
                    })
                    }
                </div>
            );
    }
    return <></>

}

export default Index;