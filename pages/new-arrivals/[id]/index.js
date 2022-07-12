import AppWideContext from "../../../store/AppWideContext";
import React, {useContext, useEffect, useState} from "react";
import Image from "next/image";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import HomePageHeaderSwiper from "../../../components/swipers/HomePageHeaderSwiper";
import BlockHeader from "../../../components/common/blockHeader";
import ProductCard from "../../../components/new-Arrivals/ProductCard";
import Footer from "../../../components/footer/Footer";
import {apiCall} from "../../../helpers/apiCall";
import {useRouter} from "next/router";
import MobileProductCard from "../../../components/shop-page/ProductCard"
import {isMobile} from "react-device-detect";

function NewArrivalsIdPage(props) {
    const category = "new-arrivals"
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [data, setData] = useState([]);
    const [carousal, setCarousal] = useState(props.carousal);
    const [mobile,setMobile] = useState(false);
    const router = useRouter()
    React.useEffect(() => {
        setMobile(isMobile)
    }, [])
    /*
        {
            ""ProductId"": ""Outerwear-Gallant-Suit-Set-FullSuitSet"",
            ""CategoryId"": ""c_06"",
            ""Name"": ""Gallant Suit Set"",
            ""TagLine"": ""Full Suit Set"",
            ""Discount"": ""0"",
            ""Price"": ""6250"",
            ""USDPrice"": ""45"",
            ""isStock"": ""true"",
            ""asset_id"": ""Outerwear-Gallant-Suit-Set-FullSuitSet"",
            ""is_sale"": false,
            ""is_international"": ""international"",
            ""hide_sizes"": [
                """"
            ],
            ""look_thumb"": ""/assets/Outerwear-Gallant-Suit-Set-FullSuitSet/new.jpg"",
            ""look_mo_thumb"": ""/assets/Outerwear-Gallant-Suit-Set-FullSuitSet/mo.new.jpg""
        }
*/
    console.log("DATA", data)
    useEffect(() => {
        const fetchData = async () => {
            let gotData = false;
            const callObject = await apiCall("getProducts", process.env.API_TOKEN, {category: "new-arrivals", limit: 10000, skip: 0})
            if (callObject.hasOwnProperty("response") && callObject.response.hasOwnProperty("data"))
                gotData = true;

            if (gotData)
                setCarousal(callObject.new_arr_carousal)
        }
        if (router.query.id) {
            fetchData()
                .then(resp => {
                    console.log("Carousal loaded")
                })

            apiCall("datedNewArrivals", dataStore.apiToken, {home: {date: router.query.id}})
                .then(resp => {
                    console.log("QUERY ", router.query.id, " ", resp)
                    if (resp.msg && resp.msg === "Successfully Get" && resp.new_items)
                        setData(resp.new_items)
                })
                .catch(e => console.log(e.msg))
        }
    }, [dataStore.apiToken, router.query.id])

    const loader = <span className={"col-span-3 flex justify-center items-center"} key="loader">
                            <span className={"block relative w-14 aspect-square"}>
                                <Image src={WEBASSETS + "/assets/images/loader.gif"} layout={`fill`} objectFit={`cover`}
                                       alt={"loader"}/>
                            </span>
                    </span>

    const mobileView = <section className={"bg-[#faf4f0] pb-20"}>
        <div className="flex tracking-widest text-h4 items-center justify-center">
            <span>~</span>
            <span className="text-center p-2">Newly Launched<br/>Products</span>
            <span>~</span>
        </div>
        {(data)
            ? <main className={`px-5`}>
                {data.filter(prod => prod.is_visible).slice(0, 8).map((prod, index) => {
                    return <div className={"py-4"} key={index}>
                        <MobileProductCard prod={prod} isMobile={true} wide={index <= 7}/>
                    </div>
                })}
                <div className={"grid grid-cols-2 gap-5"}>
                    {data.filter(prod => prod.is_visible).slice(8).map((prod, index) => {
                        return <div className={"py-4"} key={index}>
                            <MobileProductCard prod={prod} isMobile={true}/>
                        </div>
                    })}
                </div>

            </main>
            : loader
        }
    </section>;
    const browserView = (
        <>

            <section className={`bg-[#E6E1DB] pb-20`}>
                <BlockHeader
                    line
                    space={"py-12"}
                    titleStyle={"font-600 flex justify-center items-center gap-3 leading-none"}
                >
                    <span className={"tracking-widest text-h4 uppercase"}>New Arrivals</span>
                </BlockHeader>
                {(data)
                    ? <main className={`px-10 grid grid-cols-3 gap-10`}>
                        {data && data.map((prod, index) => {
                            return <ProductCard prod={prod} isMobile={false} key={index} isAccessory={false}/>
                        })}
                    </main>
                    : loader
                }
            </section>
        </>
    );

    return <>
        <PageHead url="//new-arrivals/all" id="new-arrivals-all" isMobile={mobile}/>
        <Header type={mobile ? "shopMenu" : ""} isMobile={mobile}/>
        <HomePageHeaderSwiper page={"newArrival"} isMobile={mobile} slides={carousal}/>
        {mobile ? mobileView : browserView}
        <Footer isMobile={mobile}/>
    </>
}

export default NewArrivalsIdPage