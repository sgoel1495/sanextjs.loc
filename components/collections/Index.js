import React, {useContext} from 'react';
import AppWideContext from "../../store/AppWideContext";
import useApiCall from "../../hooks/useApiCall";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";

const Index = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
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
                    {
                        data.map((item, index) => {
                            if (item)
                                return <div key={index} className={`bg-[${item['img_bg_color']}]`}>
                                    <p>{item['img_title']}</p>
                                    <p>{item['img_sub_title']}</p>
                                    <span className={"block relative w-full aspect-square"}>
                                        <Image src={WEBASSETS + item['img_path']} layout={`fill`} objectFit={`cover`}/>
                                    </span>
                                    <p>{item['title']}</p>
                                    <p>{item['subtitle'][currCurrency]}</p>
                                    <Swiper
                                        slidesPerView={2}
                                        spaceBetween={50}
                                        autoplay={{
                                            "delay": 2500,
                                            "disableOnInteraction": false
                                        }}
                                        navigation={true}
                                    >
                                        {item.products_imgs.map((product, i) => {
                                            return (
                                                <SwiperSlide key={i}>
                                                    <a href={item.products_links[i]} className={"block"} target="_blank">
                                                        <span className={"block relative h-[270px] w-full border-4 border-white rounded-[15%] box-shadow-sm bg-[#fffaf7] m-4"}>
                                                            <Image
                                                                src={WEBASSETS + product}
                                                                layout="fill"
                                                                objectFit="cover"
                                                            />
                                                        </span>
                                                        <span className={"text-uppercase"}>{item.products_name[i]}</span>
                                                    </a>
                                                </SwiperSlide>
                                            )
                                        })}
                                    </Swiper>

                                </div>
                        })
                    }
                </div>
            );
    }
    return <></>

}

export default Index;