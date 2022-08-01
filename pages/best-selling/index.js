import React, {useEffect, useState} from 'react';
import PageHead from "../../components/PageHead";
import Header from "../../components/navbar/Header";
import HomePageHeaderSwiper from "../../components/swipers/HomePageHeaderSwiper";
import Footer from "../../components/footer/Footer";
import {isMobile} from "react-device-detect";
import {apiCall} from "../../helpers/apiCall";
import MobileProductCard from "../../components/shop-page/ProductCard";
import ShopPage from "../../components/shop-page/ShopPage";

function BestSellingPage(props) {
    const [mobile, setMobile] = useState(false)
    const [carousal] = useState(props.carousal);
    const [data] = useState(props.data);
    useEffect(() => {
        setMobile(isMobile)
    }, [])


    const mobileView = <>
        <PageHead url="/best-selling" id="best-selling" isMobile={mobile}/>
        <Header type={mobile ? "shopMenu" : ""} isMobile={mobile}/>
        <HomePageHeaderSwiper page={"best-selling"} isMobile={mobile} slides={carousal}/>
        <section className={"bg-[#faf4f0] pt-5 pb-10"}>

            <div className={"flex items-center justify-center gap-10"}>
                <span>~</span>
                <span><i>Top Selling<br/>Products</i></span>
                <span>~</span>
            </div>

            <div className={"grid grid-cols-2 gap-5 container py-5 px-5 "}>
                {data.data && data.data.map((item, index) => <MobileProductCard prod={item} key={index} isMobile={true}/>)}
            </div>
        </section>
        <Footer isMobile={mobile}/>
    </>

    const browserView = (
        <ShopPage category={"best-selling"} hpid={"best-selling"} data={props.data}/>
    );
    return mobile ? mobileView : browserView
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