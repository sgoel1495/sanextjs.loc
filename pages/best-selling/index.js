import React, {Fragment, useContext, useEffect, useState} from 'react';
import PageHead from "../../components/PageHead";
import Header from "../../components/navbar/Header";
import HomePageHeaderSwiper from "../../components/swipers/HomePageHeaderSwiper";
import Footer from "../../components/footer/Footer";
import {isMobile} from "react-device-detect";
import {apiCall} from "../../helpers/apiCall";
import MobileProductCard from "../../components/shop-page/ProductCard";
import Image from "next/image";
import AppWideContext from "../../store/AppWideContext";

function BestSellingPage(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [mobile, setMobile] = useState(false)
    const [carousal, setCarousal] = useState(props.carousal);
    const [data, setData] = useState([]);
    const {dataStore} = useContext(AppWideContext);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setMobile(isMobile)

        apiCall("getProducts", dataStore.apiToken,
            {category: "best-selling", limit: 10000, skip: 0}
        ).then(resp => {
            if (resp.status === 200) {
                console.log(resp)
                setData(resp.response.data.filter(item => item.is_visible));
            }
        })
    }, [])


    const loader = <span className={"col-span-3 flex justify-center items-center"} key="loader">
        <span className={"block relative w-14 aspect-square"}>
            <Image src={WEBASSETS + "/assets/images/loader.gif"} layout={`fill`} objectFit={`cover`}
                   alt={"loader"}/>
        </span>
    </span>
    const mobileView = <section className={"bg-[#faf4f0] pt-5 pb-10"}>

        <div className={"flex items-center justify-center gap-10"}>
            <span>~</span>
            <span><i>Top Selling<br/>Products</i></span>
            <span>~</span>
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
        <PageHead url="/best-selling" id="best-selling" isMobile={mobile}/>
        <Header type={mobile ? "shopMenu" : ""} isMobile={mobile}/>
        <HomePageHeaderSwiper page={"best-selling"} isMobile={mobile} slides={carousal}/>
        {mobile ? mobileView : browserView}
        <Footer isMobile={mobile}/>
    </>
}


export default BestSellingPage
