import Image from "next/image";
import { apiCall } from "../../helpers/apiCall";
import AppWideContext from "../../store/AppWideContext";
import { Fragment, useContext, useEffect, useState } from "react";
import Link from "next/link";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';

SwiperCore.use([Pagination, Navigation, Autoplay]);

const renderData = (arr, length) => arr.reduce((renderArray, one, i) => {
    const rowItems = Math.floor(i / length);
    renderArray[rowItems] = [].concat(renderArray[rowItems] || [], one);
    return renderArray;
}, []);

function MimotoSlider({ data, ...props }) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext);
    const [collectionArray, setCollectionArray] = useState([])
    console.log("DATA MIMOTO SLIDER", data)

    useEffect(() => {
        const fetchMimotoCollection = async () => {
            const resp = await apiCall("getMimotoCollection", dataStore.apiToken)
            console.log("collection data", resp)
            if (resp.hasOwnProperty("response") && resp.response.hasOwnProperty("mimoto"))
                setCollectionArray([...resp.response.mimoto])

        }
        if (dataStore && dataStore.apiToken)
            fetchMimotoCollection().then(() => {
            }).catch(e => e.message)
    }, [dataStore, dataStore.apiToken])

    const displayCollection = () => {
        const collectionData = renderData(collectionArray, 9);
        return (
            <Swiper
                navigation={true}
                className="w-72 relative"
            >
                {collectionData.map((item, index) => (
                    <SwiperSlide className="" key={index}>
                        <div className="grid grid-cols-3">
                            {item.map((item, index) => (
                                <Link href={item.url} key={index}>
                                    <a className="text-center">
                                        <p className="text-h5 capitalize">{item.name}</p>
                                        <p className="text-[10px] uppercase">{item.tagline}</p>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        )
    }

    return (data)
        ? <div className={props.className}>
            <div className="bg-red-400 w-full aspect-[5/4] relative">
                <div className={"relative w-full aspect-[5/4]"}>
                    <Image src={WEBASSETS + data.mimoto_collection.mob_img_path} layout={`fill`} objectFit={`cover`} alt={data.mimoto_collection.collection_id} />
                </div>
                <Link href={data.mimoto_collection.url}>
                    <a className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 bg-[#ffffffe6]">
                        <div className="text-center mt-2">
                            <p className="text-[30px] tracking-[3px] leading-[36px] capitalize">{data.mimoto_collection.display_name}</p>
                            <p className="text-[11px] tracking-[1px] leading-[13px]">{data.mimoto_collection.tagline}</p>
                        </div>
                        <p className="px-4 py-2 text-[12px] tracking-[.5px] text-justify font-600">{data.mimoto_collection.description}</p>
                    </a>
                </Link>
            </div>
            <div className="relative w-full">
                {displayCollection()}
            </div>
        </div>
        : null

}

export default MimotoSlider