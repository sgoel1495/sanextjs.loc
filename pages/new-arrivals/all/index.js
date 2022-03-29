import React, {Fragment, useContext, useEffect, useState} from 'react';
import PageHead from "../../../components/PageHead";
import AppWideContext from "../../../store/AppWideContext";
import Footer from "../../../components/footer/Footer";
import useApiCall from "../../../hooks/useApiCall";
import appSettings from "../../../store/appSettings";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/navbar/Index";
import HomePageHeaderSwiper from "../../../components/swipers/HomePageHeaderSwiper";
import BlockHeader from "../../../components/common/blockHeader";
import WishlistButton from "../../../components/common/WishListButton";

/**
 * @todo @team Swiper data
 * @todo @Sambhav Please do CSS
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

/*
    each product has
    category: "dresses"
    in_stock: "true"
    is_international: true
    name: "Aadya"
    price: 2850
    tag_line: "Raw Silk Festive Fit & A-Line Dress"
    usd_price: 50
     */

const ArrivalDataBlockImage = (props) => (
    <span className={`block relative w-full h-full aspect-square`}>
        <Image src={props.src} alt={props.name} layout={`fill`} objectFit={`cover`}/>
    </span>
)

// const data =[...Array(19).keys()]
//
// const renderData = data.reduce((all,one,i) => {
//     const ch = Math.floor(i/3);
//     all[ch] = [].concat((all[ch]||[]),one);
//     return all
// }, [])
//
// console.log(renderData);

function NewArrivalsAllPage() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [data, setData] = useState(null);
    const [isOver, setIsOver] = useState(false);

    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;

    /**
     *
     * @todo API issue. We have no idea about the number of products we should get. Please change the limit below accordingly
     */

    const resp = useApiCall("getLooksData", dataStore.apiToken, {look_id: "", limit: 10});
    useEffect(() => {
        if (resp
            && resp.hasOwnProperty("status")
            && resp.status == 200
            && resp.hasOwnProperty("response")
            && resp.response.hasOwnProperty("prod")
            && resp.response.hasOwnProperty("look")
        )
            setData(resp.response);
    }, [resp]);


    const newArrivals = () => {
        let showArrivalsData = null;
        if (!data || !data.hasOwnProperty("prod") || !data.prod) return null;
        else {
            const keys = Object.keys(data.prod);
            keys.forEach(key => {
                const prod = data.prod[key];
                const imgPath = WEBASSETS + "/assets/" + key + ((isOver == key) ? "/mo.new.jpg" : "/new.jpg");

                const showProd = (
                    <div className={`col-span-2`}>
                        <p className={`text-h5 font-500`}>{prod.name}</p>
                        <p className={`text-sm font-500`}>{prod.tag_line}</p>
                    </div>
                );

                const showProdDetail = (
                    <>
                        <span className={`font-800`}>SIZE</span>
                        <div className={`font-800 bg-black text-white h-full flex flex-col gap-2 justify-center leading-none`}>
                            <span className={`uppercase`}>Add to bag</span>
                            <p className={`text-xs`}>
                                {currencySymbol}
                                {(currCurrency == "inr") ? prod.price : prod.usd_price}
                            </p>
                        </div>
                    </>
                );


                showArrivalsData = (
                    <>
                        {showArrivalsData}
                        <div onMouseEnter={() => setIsOver(key)} onMouseLeave={() => setIsOver(null)}>
                            <Link href={"/" + key}>
                                <a className={"block bg-white text-center relative z-0"}>
                                    <WishlistButton className={`absolute right-4 top-4 z-10`}/>
                                    <ArrivalDataBlockImage src={imgPath} alt={prod.name}/>
                                    <div className="grid grid-cols-2 items-center h-16">
                                        {(isOver == key) ? showProdDetail : showProd}
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </>
                );
            });
        }
        return showArrivalsData;
    }

    const mobileView = null;
    const browserView = (
        <>
            <PageHead url="//new-arrivals/all" id="new-arrivals-all" isMobile={dataStore.mobile}/>

                <Navbar isMobile={dataStore.mobile}/>
            <HomePageHeaderSwiper isMobile={dataStore.mobile}/>
            <section className={`bg-[#E6E1DB] pb-20`}>
                <BlockHeader
                    line
                    space={"py-12"}
                    titleStyle={"font-600 flex justify-center items-center gap-3 leading-none"}
                >
                    <span className={"tracking-widest text-h4 uppercase"}>New Arrivals</span>
                </BlockHeader>
                <main className={`px-10 grid grid-cols-3 gap-10`}>
                    {(data) ? newArrivals() : null}
                </main>
            </section>
            <Footer isMobile={dataStore.mobile}/>
        </>
    );

    return dataStore.mobile ? mobileView : browserView
}


export default NewArrivalsAllPage;
