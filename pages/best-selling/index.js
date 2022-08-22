import React, {useEffect, useState} from 'react';
import PageHead from "../../components/PageHead";
import Header from "../../components/navbar/Header";
import HomePageHeaderSwiper from "../../components/swipers/HomePageHeaderSwiper";
import Footer from "../../components/footer/Footer";
import {isMobile} from "react-device-detect";
import {apiCall} from "../../helpers/apiCall";
import MobileProductCard from "../../components/shop-page/ProductCard";

function BestSellingPage(props) {
    const [mobile, setMobile] = useState(false)
    const [carousal] = useState(props.carousal);
    const [data] = useState(props.data);
    useEffect(() => {
        setMobile(isMobile)
    }, [])


    const mobileView = <>

        <section className={"bg-[#faf4f0] pt-5 pb-10"}>

            <div className={"flex items-center justify-center gap-10 text-2xl font-cursive italic leading-0"}>
                <span>~</span>
                <span>Top Selling<br/>Products</span>
                <span>~</span>
            </div>

            <div className={"grid grid-cols-2 gap-5 container py-5 px-5 "}>
                {data.data && data.data.map((item, index) => <MobileProductCard prod={item} key={index} isMobile={true}/>)}
            </div>
        </section>
    </>

    const browserView = (
        <>
            <div className={"flex items-center justify-center gap-10 text-xl uppercase leading-0 pt-5 tracking-wide"}>
                <hr className={"w-20 border-black"}/>
                <span>Top Selling Products</span>
                <hr className={"w-20 border-black"}/>
            </div>
            <div className={"grid grid-cols-3 gap-16 container py-5 px-16 "}>
                {data.data && data.data.map((item, index) => <MobileProductCard prod={item} key={index}/>)}
            </div>
        </>
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


export async function getStaticProps() {
    const fetchData = async () => {
        let gotData = false;
        const callObject = await apiCall("getProducts", process.env.API_TOKEN, {
            category: "best-selling",
            limit: 10000,
            skip: 0
        })
        if (callObject.hasOwnProperty("response") && callObject.response.hasOwnProperty("data"))
            gotData = true;

        return (gotData) ? callObject : {}
    }

    const newData = await fetchData()
    return {
        props: {
            data: newData.response,
            carousal: newData.new_arr_carousal
        },
        revalidate: 3600,
    }
}