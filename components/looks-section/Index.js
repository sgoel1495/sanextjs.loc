import React, {useContext} from 'react';
import AppWideContext from "../../store/AppWideContext";
import useApiCall from "../../hooks/useApiCall";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import Link from 'next/link'
import {connect} from "react-redux";

const Index = ({appConfig}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const resp = useApiCall("getLookSection", appConfig.apiToken);
    return (
        <div className={"py-4 bg-[#f5efea]"}>
            <Link href={"/looks"}>
                <a>
                    <h3 className='text-h3 text-[#96c7d0] font-900 uppercase tracking-widest mx-4'>Looks</h3>
                    <h3 className='text-h3 text-[#96c7d0] font-cursive italic leading-none tracking-wider mx-4 mb-4'>Handpicked for you</h3>
                </a>
            </Link>
            {resp && resp.response &&
            <>
                <section className={"newArrivals mb-5"}>
                    <Swiper
                        slidesPerView={1.2}
                        spaceBetween={5}
                        navigation={false}
                    >
                        {resp.response.look_top_view.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Link href={`looks/#${item.look_id}`}>
                                        <a className={"block rounded-3xl overflow-hidden mx-4"}>
                                                <span className="block relative h-full aspect-square">
                                                    <Image
                                                        src={WEBASSETS + item.img_path}
                                                        alt={item.name}
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </span>
                                            <div className={"bg-white text-center py-6 px-4 leading-none"}>
                                                <h5 className={'text-h5 font-600 font-cursive italic'}>{item.name}</h5>
                                                <p className="text-[10px] font-600 text-black/70 uppercase tracking-widest">{item.details.split(',').join(' . ')}</p>
                                            </div>
                                        </a>
                                    </Link>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </section>
                <span className='font-cursive italic leading-none text-2xl text-black/80 mb-5 block text-center'>Popular Looks</span>
                <div className={"grid grid-cols-2 grid-rows-3 px-5 overflow-hidden mb-4"}>
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
                                style = "border-t-2 border-l-4 border-b-4 border-r-2 border-white"
                                break;
                            case 3:
                                style = "border-t-2 border-l-2 border-b-4 border-r-4 border-white rounded-br-[15%]"
                                break;
                            case 4:
                                style = "border-t-0 border-l-4 border-b-4 border-r-2 border-white rounded-bl-[15%]"
                                break;
                        }
                        return (
                            <Link href={`looks/#${item.look_id}`} key={index} passHref>
                                <div className={"relative h-full aspect-square overflow-hidden box-shadow-lg " + style}>
                                    <Image src={WEBASSETS + item.img_path} alt='looks' layout={`fill`} objectFit={`cover`}/>
                                </div>
                            </Link>

                        )
                    })}
                    <Link href={"/looks"} passHref>
                        <div className={"relative h-full grid place-items-center text-center content-center border-l-2 border-white"}>
                            <p className='text-[20px] font-600 font-cursive italic leading-none'>Tap to see more</p>
                            <p className="text-[10px] font-600 text-black/70 uppercase tracking-widest">ALL LOOKS SECTION</p>
                        </div>
                    </Link>
                </div>
            </>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(Index);