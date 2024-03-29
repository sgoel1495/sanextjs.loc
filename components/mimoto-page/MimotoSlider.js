import Image from "next/image";
import {apiCall} from "../../helpers/apiCall";
import AppWideContext from "../../store/AppWideContext";
import React, {Fragment, useContext, useEffect, useState} from "react";
import Link from "next/link";
// Swiper
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, {Pagination, Navigation, Autoplay} from 'swiper';
import {connect} from "react-redux";

SwiperCore.use([Pagination, Navigation, Autoplay]);

const renderData = (arr, length) => arr.reduce((renderArray, one, i) => {
    const rowItems = Math.floor(i / length);
    renderArray[rowItems] = [].concat(renderArray[rowItems] || [], one);
    return renderArray;
}, []);

function MimotoSlider({data, appConfig, ...props}) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [collectionArray, setCollectionArray] = useState([])

    useEffect(() => {
        const fetchMimotoCollection = async () => {
            const resp = await apiCall("getMimotoCollection", appConfig.apiToken)
            if (resp.hasOwnProperty("response") && resp.response.hasOwnProperty("mimoto"))
                setCollectionArray([...resp.response.mimoto])

        }
        fetchMimotoCollection().then(() => {
        }).catch(e => e.message)
    }, [])

    const displayCollection = () => {
        const collectionData = renderData(collectionArray, 9);
        return (
            <Swiper
                navigation={true}
                className="w-[29vw]"
            >
                {collectionData.map((item, index) => (
                    <SwiperSlide className="grid grid-cols-12" key={index}>
                        <div/>
                        <div className="grid grid-cols-3 col-span-10 gap-2 auto-rows-[1fr]">
                            {item.map((item, index) => (
                                <Link href={item.url} key={index}>
                                    <a className={"text-center " + [data.mimoto_collection.name === item.name && "border border-black"]}>
                                        <p className="text-h5 capitalize">{item.name}</p>
                                        <p className="text-[10px] uppercase">{item.tagline}</p>
                                    </a>
                                </Link>
                            ))}
                            {
                                item.length < 9 ?
                                    new Array(9 - item.length).fill("").map((_, index) => <div key={index}/>)
                                    :
                                    null
                            }
                        </div>
                        <div/>
                    </SwiperSlide>
                ))}
            </Swiper>
        )
    }

    return (data)
        ? <div className={props.className}>
            <div className="bg-red-400 w-full aspect-[5/4] relative">
                <div className={"relative w-full aspect-[5/4]"}>
                    <Image src={WEBASSETS + data.mimoto_collection.home_img} layout={`fill`}
                           objectFit={`cover`} objectPosition={"top"}
                           alt={data.mimoto_collection.collection_id}/>
                </div>
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 bg-[#ffffffe6]">
                    <div className="text-center mt-2">
                        <p className="text-[30px] tracking-[3px] leading-[36px] capitalize">{data.mimoto_collection.name}</p>
                        <p className="text-[11px] tracking-[1px] leading-[13px]">{data.mimoto_collection.tagline}</p>
                    </div>
                    <p className="px-4 py-2 text-[12px] tracking-[.5px] text-justify font-600">{data.mimoto_collection.description}</p>
                </div>
            </div>
            <div className="flex w-full py-2 pb-4">
                {displayCollection()}
            </div>
        </div>
        : null

}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(MimotoSlider)