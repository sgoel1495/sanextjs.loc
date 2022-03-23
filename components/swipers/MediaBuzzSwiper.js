/**
 * @todo Unable to find api for SaltMedia table
 * @params {isMobile} props
 * @constructor
 */

import React from 'react';
import BlockHeader from "../common/blockHeader";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, {Pagination, Navigation} from 'swiper';


SwiperCore.use([Pagination, Navigation]);

const actualData = [
    {
        link: "https://economictimes.indiatimes.com/small-biz/startups/newsbuzz/fashion-tech-firm-salt-attire-launches-its-offline-experience-store-in-gurugram/articleshow/70765514.cms",
        title: "SALT offers tailored clothing to customer measurements",
        image: "https://saltattire.com/assets/images/media/the-economic-times/logo/economic_times.png",
    },
    {
        link: "http://www.newindianexpress.com/cities/delhi/2019/aug/21/salt-attire-one-stop-shop-for-all-your-clothing-needs-in-gurugram-2022068.html",
        title: "One-stop shop for all your clothing needs",
        image: "https://saltattire.com/assets/images/media/the-new-india-express/logo/the_new_india_express.png",
    },
    {
        link: "https://lbb.in/delhi/awesome-homegrown-brands-on-radar",
        title: "Bored of your usual corporate looks?",
        image: "https://saltattire.com/assets/images/media/lbb/logo/lbb.png",
    },
    {
        link: "https://yourstory.com/2017/09/dipti-tolanis-journey",
        title: "Salt, that ingredient so essential for balance",
        image: "https://saltattire.com/assets/images/media/yourstory/logo/yourstory.png",
    },
    {
        link: "https://www.news18.com/news/lifestyle/turn-your-monotonous-office-wear-instantly-into-party-ready-look-2183283.html",
        title: "...quick and easy way to take your work look from formal to exceptional.",
        image: "https://saltattire.com/assets/images/media/news-18/logo/news_18.png",
    },
    {
        link: "https://www.business-standard.com/article/news-ians/turn-monotonous-office-wear-into-party-ready-look-119061200529_1.html",
        title: "Turn monotonous office wear into party ready look",
        image: "https://saltattire.com/assets/images/media/business-standard/logo/business_standard.png",
    },
]

function MediaBuzzSwiper(props) {
    const mobileView = null;

    const browserView = (
        <section className={"mediaBuzz"}>
            <BlockHeader
                line
                blockHeaderStyle={"bg-white"}
                space={"py-10"}
                titleStyle={"text-h2 uppercase"}
            >
                Media Buzz
            </BlockHeader>
            <Swiper
                slidesPerView={4}
                pagination={{
                    "clickable": true
                }}
                navigation={true}
                className={"mb-10"}
            >
                {actualData.map((item, index) => {
                    return (
                        <SwiperSlide key={index} className={"mb-10"}>
                            <a href={item.link} className={"flex flex-col items-center p-10"}>
                                <h5 className={'text-h5 min-h-[65px] text-center'}>{item.title}</h5>
                                <span className="relative h-[140px] w-full grayscale hover:grayscale-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </span>
                            </a>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </section>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default MediaBuzzSwiper;
