import React, { useState } from 'react';
import PageHead from "../../../components/PageHead";
import Footer from "../../../components/footer/Footer";
import Image from "next/image";
import Header from "../../../components/navbar/Header";
import HomePageHeaderSwiper from "../../../components/swipers/HomePageHeaderSwiper";
import BlockHeader from "../../../components/common/blockHeader";
import ProductCard from "../../../components/new-Arrivals/ProductCard";
import MobileProductCard from "../../../components/shop-page/ProductCard"
import { apiCall } from "../../../helpers/apiCall";
import { isMobile } from "react-device-detect";

/**
 * @todo @team Swiper data
 * @todo @Sambhav Please do CSS
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

function NewArrivalsAllPage(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [data] = useState(props.data);
    const [carousal] = useState(props.carousal);
    const [mobile, setMobile] = useState(false)

    React.useEffect(() => {
        setMobile(isMobile)
    }, [])

    const loader = <span className={"col-span-3 flex justify-center items-center"} key="loader">
        <span className={"block relative w-14 aspect-square"}>
            <Image src={WEBASSETS + "/assets/images/loader.gif"} layout={`fill`} objectFit={`cover`}
                alt={"loader"} />
        </span>
    </span>

    const mobileView = <section className={"bg-[#faf4f0] pb-20"}>
        <div className="flex tracking-widest text-h4 items-center justify-center">
            <span>~</span>
            <span className="text-center p-2">Newly Launched<br />Products</span>
            <span>~</span>
        </div>
        {(data)
            ? <main className={`px-5`}>
                {data.data && data.data.filter(prod => prod.is_visible).slice(0, 8).map((prod, index) => {
                    return <div className={"py-4"} key={index}>
                        <MobileProductCard prod={prod} isMobile={true} wide={true} />
                    </div>
                })}
                <div className={"grid grid-cols-2 gap-5"}>
                    {data.data && data.data.filter(prod => prod.is_visible).slice(8).map((prod, index) => {
                        return <div className={"py-4"} key={index}>
                            <MobileProductCard prod={prod} isMobile={true} />
                        </div>
                    })}
                </div>
            </main>
            : loader
        }
    </section>;
    const browserView = (
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
                    {data.data && data.data.filter(prod => prod.is_visible).map((prod, index) => {
                        return <ProductCard prod={prod} key={index} />
                    })}
                </main>
                : loader
            }
        </section>
    );

    return <>
        <PageHead url="/new-arrivals/all" id="new-arrivals-all" isMobile={mobile} />
        <Header type={mobile ? "shopMenu" : ""} isMobile={mobile} />
        <HomePageHeaderSwiper page={"newArrival"} isMobile={mobile} slides={carousal} />
        {mobile ? mobileView : browserView}
        <Footer isMobile={mobile} />
    </>
}

export async function getServerSideProps() {
    const fetchData = async () => {
        let gotData = false;
        const callObject = await apiCall("getProducts", process.env.API_TOKEN, {
            category: "new-arrivals",
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
        }
    }
}


export default NewArrivalsAllPage;
