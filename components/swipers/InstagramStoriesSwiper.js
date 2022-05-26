import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, {Pagination, Navigation, Autoplay} from 'swiper';
import Image from "next/image";
import BlockHeader from "../common/blockHeader";
import fetchJsonp from "fetch-jsonp";
import {apiCall} from "../../helpers/apiCall";


SwiperCore.use([Pagination, Navigation, Autoplay]);

/*
const actualData = [
    "https://scontent.cdninstagram.com/v/t51.29350-15/271309711_487846002900801_7070125602518874136_n.webp.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=iraRfAzsRiQAX9FdCzm&_nc_ht=scontent.cdninstagram.com&edm=ANQ71j8EAAAA&oh=00_AT8Edziw9ISTS4ZsDdCEDTm8RmTpd3ISPAnPzGo2Jt464Q&oe=61DDD185",
    "https://scontent.cdninstagram.com/v/t51.29350-15/271147254_1187333378469600_2628835461645009588_n.webp.jpg?_nc_cat=110&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=_9gVbmmnWsEAX_q2CNA&_nc_ht=scontent.cdninstagram.com&edm=ANQ71j8EAAAA&oh=00_AT8wZCqHE4Ti1e21n9C-PVekLnpX_icJ3RmqAV_xLW6nig&oe=61DED6F0",
    "https://scontent.cdninstagram.com/v/t51.29350-15/271277604_3051274735139091_5427717725213192931_n.webp.jpg?_nc_cat=108&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=0Jh5UqfDxFkAX82uQ8d&_nc_ht=scontent.cdninstagram.com&edm=ANQ71j8EAAAA&oh=00_AT_4-62iSVp-MX5VLMd3QWkLzQDiV-yKioflyi30PbkQHg&oe=61DF8C1D",
    "https://scontent.cdninstagram.com/v/t51.29350-15/271366166_507092617446161_2249711946501500153_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=1mGBzNPQuLoAX-WiWC_&_nc_ht=scontent.cdninstagram.com&edm=ANQ71j8EAAAA&oh=00_AT9MVMZQ7Z3GUAr77aufI4X_HBhzAzE0WfeZ3YNCfCRs7A&oe=61DEE03B",
    "https://scontent.cdninstagram.com/v/t51.29350-15/270356907_269392355177559_2858144912980726734_n.webp.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=R3vVp8XYnVwAX_5N5cw&_nc_ht=scontent.cdninstagram.com&edm=ANQ71j8EAAAA&oh=00_AT8A0YjLw-2Rsozfg1fuud04S2Yd172-GtmZtzgQ4jdcOg&oe=61DF4458",
    "https://scontent.cdninstagram.com/v/t51.29350-15/270196579_135836235517728_8245316435170671528_n.webp.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=u0-mvQfZZ-EAX_yXXSh&_nc_ht=scontent.cdninstagram.com&edm=ANQ71j8EAAAA&oh=00_AT_PjVfPFbRbkHKrhdFQ4is2UknI-EzvWSHl7c6FTpM_OA&oe=61DF37CB",
    "https://scontent.cdninstagram.com/v/t51.29350-15/269832040_236907531851825_490053572019024689_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=C6lOwDHi7AkAX8bzZOS&_nc_ht=scontent.cdninstagram.com&edm=ANQ71j8EAAAA&oh=00_AT8JCQZH8c_AXeeRjxL8f7j5alEeCqxa89dOhPEaTGI2lQ&oe=61DE6957",
    "https://scontent.cdninstagram.com/v/t51.29350-15/271180752_109812288146592_8260316367016352705_n.webp.jpg?_nc_cat=105&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=OBAOxh4lufkAX_diLC9&_nc_ht=scontent.cdninstagram.com&edm=ANQ71j8EAAAA&oh=00_AT_COTJvJEnWsWy7RCUHqAo8JIkWEobq_TF1ltSDwe0jdw&oe=61DE94F7",
    "https://scontent.cdninstagram.com/v/t51.2885-15/269740244_708293303882034_1933125535968324718_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=7Kck9Htx9tUAX9abC39&_nc_ht=scontent.cdninstagram.com&edm=ANQ71j8EAAAA&oh=00_AT89ofba9QC_0UKWZWr3PQBkq8QMGDDSLN6LdHvSGoToWQ&oe=61DDF136",
    "https://scontent.cdninstagram.com/v/t51.29350-15/269990668_3022257934657797_1819390708764342416_n.webp.jpg?_nc_cat=100&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=y_yOyeF6yhcAX__9Fyo&_nc_oc=AQnpNNm1Q0qcP7BNRcmKuK06NfYCVFoVUdSDvVbDlJhyg-9TiGM-LMWLxTCHsdSXy4I&_nc_ht=scontent.cdninstagram.com&edm=ANQ71j8EAAAA&oh=00_AT-FfoN86l8CLOc55avPOgKc5j8S6as8XNdLcm_x6alnOw&oe=61DF0166"
]

 */

function InstagramStoriesSwiper(props) {
    //<InstagramStoriesSwiper isMobile={dataStore.mobile} apiToken={dataStore.apiToken}/>

    const instaGramUrl = "https://graph.instagram.com/me/media"
    const [actualData, setActualData] = useState([])
    useEffect(() => {
        apiCall("instagramToken", props.apiToken)
            .then(function (response) {
                console.log('Token RESPONSE', response)
                //if(response.response.token) {
                if(false) {
                    console.log('Using token Token RESPONSE', response.response.token)
                    fetchJsonp(instaGramUrl + "?access_token=" + response.response.token)
                        .then(function (response) {
                            return response.json()
                        }).then(function (json) {
                        console.log('INSTAGRAM RESPONSE', json)
                    }).catch(function (ex) {
                        console.log('parsing failed', ex)
                    })
                }

            }).catch(function (ex) {
                console.log('Token Failed', ex)
            })
    }, [props.apiToken])
    const mobileView = null;
    const browserView = (
        <section className={"saltAttireStories"}>
            <BlockHeader
                line
                blockHeaderStyle={"bg-white"}
                space={"py-10"}
                titleStyle={"text-h4 capitalize"}
            >
                Share your instagram stories with us #SALTATTIRESTORIES
            </BlockHeader>
            {(actualData.length = 0)
                ? <div>INSTAGRAM ACCESS REQUIRED</div>
                : <Swiper
                    slidesPerView={6.2}
                    spaceBetween={0}
                    autoplay={{
                        "delay": 2500,
                        "disableOnInteraction": false
                    }}
                    navigation={true}
                    className={"mb-10 instagramStories"}
                >
                    {actualData.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <a href={item} className={"block"} target="_blank" rel="noreferrer">
                                <span className={"block relative h-[270px] w-full"}>
                                    <Image
                                        src={item}
                                        alt="instagram_story"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </span>
                                </a>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>}
        </section>
    )
    return (
        (props.isMobile) ? mobileView : browserView
    )
}

export default InstagramStoriesSwiper;
