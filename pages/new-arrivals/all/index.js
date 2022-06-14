import React, {Fragment, useCallback, useContext, useEffect, useRef, useState} from 'react';
import PageHead from "../../../components/PageHead";
import AppWideContext from "../../../store/AppWideContext";
import Footer from "../../../components/footer/Footer";
import Image from "next/image";
import Header from "../../../components/navbar/Header";
import HomePageHeaderSwiper from "../../../components/swipers/HomePageHeaderSwiper";
import BlockHeader from "../../../components/common/blockHeader";
import ProductCard from "../../../components/new-Arrivals/ProductCard";
import {apiCall} from "../../../helpers/apiCall";
import fetchMimotoData from "../../../components/mimoto-page/fetchMimotoData";

/**
 * @todo @team Swiper data
 * @todo @Sambhav Please do CSS
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

function NewArrivalsAllPage(props) {
    const category = "new-arrivals"
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext);
    const [data, setData] = useState(props.data);
    const [carousal, setCarousal] = useState(props.carousal);

    /*
    useEffect(()=>{
        const fetchData = async () => {
            let gotData = false;
            const callObject = await apiCall("getProducts", dataStore.apiToken, {category: category, ...pagination})
            if (callObject.hasOwnProperty("response") && callObject.response.hasOwnProperty("data"))
                gotData = true;

            return (gotData) ? callObject : {}
        }

        if(!data && dataStore.apiToken && category && pagination){
            fetchData()
                .then(newData=>{
                    setData(newData.response)
                    setCarousal(newData.new_arr_carousal)
                })
                .catch(e=>console.log(e.message))
                .finally(()=>{
                    console.log("Data load complete")
                })
        }

    },[data, dataStore.apiToken, category, pagination])
*/
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
                        {data.data && data.data.map((prod, index) => {
                            return <ProductCard prod={prod} key={index} />
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

export async function getStaticProps() {
    const fetchData = async () => {
        let gotData = false;
        const callObject = await apiCall("getProducts", process.env.API_TOKEN, {category: "new-arrivals", limit: 10000, skip: 0})
        if (callObject.hasOwnProperty("response") && callObject.response.hasOwnProperty("data"))
            gotData = true;

        return (gotData) ? callObject : {}
    }

    const newData = await fetchData()
    return {
        props: {
            data:newData.response,
            carousal:newData.new_arr_carousal
        }
    }
}


export default NewArrivalsAllPage;
