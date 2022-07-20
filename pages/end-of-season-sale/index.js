import React, {useEffect, useReducer, useState} from 'react';
import PageHead from "../../components/PageHead";
import Header from "../../components/navbar/Header";
import HomePageHeaderSwiper from "../../components/swipers/HomePageHeaderSwiper";
import Footer from "../../components/footer/Footer";
import {isMobile} from "react-device-detect";
import {apiCall} from "../../helpers/apiCall";
import Image from "next/image";
import ProductCard from "./ProductCard";

function EndOfSeasonSale(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [mobile, setMobile] = useState(false)
    const [carousal] = useState(props.carousal);
    const [data,setData] = useState(props.data);
    const [selected, setSelected] = useReducer((state, e) => {
        if (e.target.checked) {
            return Array.from(new Set([...state, e.target.name]))
        } else {
            return state.filter(item => item !== e.target.name);
        }
    }, [])

    useEffect(() => {
        setMobile(isMobile)
    }, [])

    useEffect(() => {
        if(selected.length){
            setData(props.data.filter(item => item.inv_sizes.some(s => selected.includes(s))))
        }
        else{
            setData(props.data)
        }
    },[selected])

    // console.log(data)

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
                    <input type="checkbox" name={"XS"} onChange={setSelected}/>
                    <label className={"mx-1"}>XS</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"S"} onChange={setSelected}/>
                    <label className={"mx-1"}>S</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"M"} onChange={setSelected}/>
                    <label className={"mx-1"}>M</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"L"} onChange={setSelected}/>
                    <label className={"mx-1"}>L</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"XL"} onChange={setSelected}/>
                    <label className={"mx-1"}>XL</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"XXL"} onChange={setSelected}/>
                    <label className={"mx-1"}>XXL</label>
                </div>
            </span>
            <span className={"text-[#ff0000] text-xs font-700 opacity-75"}>NOT VALID FOR RETURN / EXCHANGE</span>
            <span className={"my-2 text-xl font-800"}>STEAL THE DEAL</span>
            <span className={"font-700 text-[#a76b2c]"}>READY <i>to</i> SHIP</span>
        </div>

        <div className={"grid grid-cols-2 gap-5 container py-5 px-5 "}>
            {data.map((item, index) => <ProductCard prod={item} key={index} isMobile={true}/>)}
        </div>
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

export async function getStaticProps() {
    const fetchData = async () => {
        let gotData = false;
        const callObject = await apiCall("getSaleItems", process.env.API_TOKEN, {"sale_name": "end of season sale"})
        if (callObject.msg === "Successfully Get") {
            gotData = true
        }

        return (gotData) ? callObject.new_items.filter(item => item.is_visible) : []
    }

    return {
        props: {
            data: await fetchData()
        },
        revalidate: 50
    }
}
