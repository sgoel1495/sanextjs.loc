import React, {Fragment, useContext, useEffect, useState} from 'react';
import PageHead from "../../components/PageHead";
import Header from "../../components/navbar/Header";
import HomePageHeaderSwiper from "../../components/swipers/HomePageHeaderSwiper";
import Footer from "../../components/footer/Footer";
import {isMobile} from "react-device-detect";
import {apiCall} from "../../helpers/apiCall";
import MobileProductCard from "../../components/shop-page/ProductCard";
import BlockHeader from "../../components/common/blockHeader";
import ProductCard from "../../components/new-Arrivals/ProductCard";
import Image from "next/image";
import CategoryHeaderMobile from "../../components/shop-page/CategoryHeaderMobile";
import AppWideContext from "../../store/AppWideContext";

function EndOfSeasonSale(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [mobile, setMobile] = useState(false)
    const [carousal] = useState(props.carousal);
    const [data, setData] = useState([]);
    const {dataStore} = useContext(AppWideContext);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setMobile(isMobile)

        apiCall("getProducts", dataStore.apiToken,
            {category: "sale", limit: 10000, skip: 0}
        ).then(resp => {
            if (resp.status === 200) {
                setData(resp.response.data.filter(item => item.is_visible));
            }
        })
    }, [])

    const checkBox_and_label_style = "flex-inline m-1 gap-1"


    const loader = <span className={"col-span-3 flex justify-center items-center"} key="loader">
        <span className={"block relative w-14 aspect-square"}>
            <Image src={WEBASSETS + "/assets/images/loader.gif"} layout={`fill`} objectFit={`cover`}
                   alt={"loader"}/>
        </span>
    </span>
    const mobileView = <section className={"bg-[#faf4f0] pb-10"}>
        <span className={"block relative w-full aspect-square"}>
            <Image src={"https://saltattire.com/assets/images/mob/sale_v15.jpg"} layout={`fill`} objectFit={`cover`}
                   alt={"loader"}/>
        </span>
        <div className={"flex flex-col items-center"}>
            <h4 className={"text-m font-600"}>Filter By Size: </h4>
            <span className={"flex gap-3"}>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox"/>
                    <label className={"mx-1"}>XS</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox"/>
                    <label className={"mx-1"}>XS</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox"/>
                    <label className={"mx-1"}>XS</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox"/>
                    <label className={"mx-1"}>XS</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox"/>
                    <label className={"mx-1"}>XS</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox"/>
                    <label className={"mx-1"}>XS</label>
                </div>
            </span>
            <span className={"text-[#ff0000] text-xs font-700 opacity-75"}>NOT VALID FOR RETURN / EXCHANGE</span>
            <span className={"my-2 text-xl font-800"}>STEAL THE DEAL</span>
            <span className={"font-700 text-[#a76b2c]"}>READY <i>to</i> SHIP</span>
        </div>

        <div className={"grid grid-cols-2 gap-5 container py-5 px-5 "}>
            {data.map((item, index) => <MobileProductCard prod={item} key={index} isMobile={true}/>)}
        </div>
        {
            isLoading
                ? loader
                : <div className="flex justify-center">
                <span
                    className={"flex flex-col border-4 p-1 px-5 border-white drop-shadow-[35px_35px_35px_rgba(0,0,0,0.25)] bg-[#faede3] mt-[12%] rounded-2xl text-[#595756] text-xs text-center"}>
                    <span className="font-800">TAP HERE</span>
                <span>TO LOAD MORE</span>
                </span>
                </div>
        }
    </section>

    const browserView = (
        <></>
    );
    return <>
        <PageHead url="/end-of-season-sale" id="sale" isMobile={mobile}/>
        <Header type={mobile ? "shopMenu" : ""} isMobile={mobile}/>
        <HomePageHeaderSwiper page={"newArrival"} isMobile={mobile} slides={carousal}/>
        {mobile ? mobileView : browserView}
        <Footer isMobile={mobile}/>
    </>
}

export default EndOfSeasonSale;

