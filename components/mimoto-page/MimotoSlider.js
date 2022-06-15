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
            console.log("collection data",resp)
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
                className="w-72"
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
            <div>
                <Link href={data.mimoto_collection.url}>
                    <a>
                        <div className={"relative w-full aspect-square"}>
                            <Image src={WEBASSETS + data.mimoto_collection.mob_img_path} layout={`fill`} objectFit={`cover`} alt={data.mimoto_collection.collection_id} />
                            <div className="bg-red z-50">
                                <span>{data.mimoto_collection.display_name}</span>
                                <span>{data.mimoto_collection.tagline}</span>
                                <span>{data.mimoto_collection.description}</span>
                            </div>
                        </div>
                    </a>
                </Link>
            </div>
            <div className="w-full">
                {displayCollection()}
            </div>
        </div>
        : null

}

export default MimotoSlider