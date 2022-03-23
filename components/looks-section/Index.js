import React, { useContext } from 'react';
import AppWideContext from "../../store/AppWideContext";
import useApiCall from "../../hooks/useApiCall";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

const Index = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext);
    const resp = useApiCall("getLookSection", dataStore.apiToken);
    return (
        <div className={"py-4 bg-[#f5efea]"}>
            <p>Looks</p>
            <p>handpicked for you</p>
            {
                resp && resp.response &&
                <>
                    <section className={"newArrivals"}>
                        <Swiper
                            slidesPerView={1.2}
                            spaceBetween={5}
                            navigation={false}
                        >
                            {resp.response.look_top_view.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <a href={item.link} className={"flex flex-col gap-5 items-center"}>
                                            <span className="block relative h-[300px] aspect-square">
                                                <Image
                                                    src={WEBASSETS + item.img_path}
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </span>
                                            <div className={"text-center"}>
                                                <h5 className={'text-h5 font-600'}>{item.name}</h5>
                                                <p className="text-sm tracking-wide">{item.details.split(',').join(' . ')}</p>
                                            </div>
                                        </a>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </section>
                    <span className={"py-4"}>Popular Looks</span>
                    <div className={"grid grid-cols-2 grid-rows-3 p-8 overflow-hidden"}>
                        {resp.response.look_bottom_view.slice(0, 5).map((item, index) => {
                            let style = "";
                            switch (index) {
                                case 0:
                                    style = "border-t-4 border-l-4 border-b-2 border-r-2 border-white rounded-tl-[15%]"
                                    break;
                                case 1:
                                    style = "border-t-4 border-l-2 border-b-2 border-r-4 border-white rounded-tr-[15%]"
                                    break;
                                case 2:
                                    style = "border-t-2 border-l-4 border-b-2 border-r-2 border-white"
                                    break;
                                case 3:
                                    style = "border-t-2 border-l-2 border-b-4 border-r-4 border-white rounded-br-[15%]"
                                    break;
                                case 4:
                                    style = "border-t-2 border-l-4 border-b-4 border-r-4 border-white rounded-bl-[15%]"
                                    break;
                            }
                            return <span className={"relative h-full aspect-square overflow-hidden box-shadow-lg " + style} key={index}>
                                <Image src={WEBASSETS + item.img_path} layout={`fill`} objectFit={`cover`} />
                            </span>
                        })}
                        <span className={"relative h-full"}>
                            <p>Tap to see more</p>
                            <p>ALL LOOKS SECTION</p>
                        </span>
                    </div>
                </>
            }
        </div>
    );
};

export default Index;