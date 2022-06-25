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

function NewArrivalsIdPage(props){
    const category = "new-arrivals"
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext);
    const [data, setData] = useState([]);
    const [carousal, setCarousal] = useState(props.carousal);
    const router = useRouter()
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
    console.log("DATA",data)
    useEffect(()=>{
        const fetchData = async () => {
            let gotData = false;
            const callObject = await apiCall("getProducts", process.env.API_TOKEN, {category: "new-arrivals", limit: 10000, skip: 0})
            if (callObject.hasOwnProperty("response") && callObject.response.hasOwnProperty("data"))
                gotData = true;

            if(gotData)
                setCarousal(callObject.new_arr_carousal)
        }
        if(router.query.id) {
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
    },[dataStore.apiToken,router.query.id])

    const loader = <span className={"col-span-3 flex justify-center items-center"} key="loader">
                            <span className={"block relative w-14 aspect-square"}>
                                <Image src={WEBASSETS + "/assets/images/loader.gif"} layout={`fill`} objectFit={`cover`}
                                       alt={"loader"}/>
                            </span>
                    </span>

    const mobileView = null;
    const browserView = (
        <>
            <PageHead url="//new-arrivals/all" id="new-arrivals-all" isMobile={dataStore.mobile} />
            <Header type={dataStore.mobile ? "minimal" : ""} isMobile={dataStore.mobile} />
            <HomePageHeaderSwiper page={"newArrival"} isMobile={dataStore.mobile} slides={carousal} />
            <section className={`bg-[#E6E1DB] pb-20`}>
                <BlockHeader
                    line
                    space={"py-12"}
                    titleStyle={"font-600 flex justify-center items-center gap-3 leading-none"}
                >
                    <span className={"tracking-widest text-h4 uppercase"}>New Arrivals</span>
                </BlockHeader>
                {(data)
                    ?<main className={`px-10 grid grid-cols-3 gap-10`}>
                        {data && data.map((prod, index) => {
                            return <ProductCard prod={prod} isMobile={dataStore.mobile} key={index} isAccessory={false}/>
                        })}
                    </main>
                    :loader
                }
            </section>
            <Footer isMobile={dataStore.mobile} />
        </>
    );

    return dataStore.mobile ? mobileView : browserView
}

export default NewArrivalsIdPage