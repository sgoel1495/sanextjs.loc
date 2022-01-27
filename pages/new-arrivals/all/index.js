import React, {Fragment, useContext, useEffect, useState} from 'react';
import PageHead from "../../components/PageHead";
import AppWideContext from "../../store/AppWideContext";
import InfoBand from "../../components/info-band/InfoBand";
import Footer from "../../components/footer/Footer";
import useApiCall from "../../hooks/useApiCall";
import appSettings from "../../store/appSettings";
import Image from "next/image";
import Link from "next/link";
import BlockHeader from "../../components/common/blockHeader";
import Navbar from "../../../components/navbar/Navbar";
import HomePageHeaderSwiper from "../../../components/swipers/HomePageHeaderSwiper";

/**
 * @todo Swiper data
 * @todo dispaly blocks
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
const ProductData = (props)=>{
    //<ProductData prod={prod} isOver={isOver} currCurrency={currCurrency} currencySymbol={currencySymbol} />
    const showProd = <div>
        <div>{props.prod.name}</div>
        <div>{props.prod.tag_line}</div>
    </div>;

    const showProdDetail = <div>
        <div>SIZE</div>
        <div>
            <div>ADD TO BAG</div>
            <div>
                {props.currencySymbol}
                {(props.currCurrency=="inr")? props.prod.price : props.prod.usd_price }
            </div>
        </div>
    </div>;

    return props.isOver? showProdDetail : showProd;
}

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

    // Nav Controller
    const [navControl, setNavControl] = React.useState(false);
    const controller = () => {
        if (window.scrollY > 0) {
            setNavControl(true);
        } else {
            setNavControl(false);
        };
    };
    React.useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => {
            window.removeEventListener('scroll', controller)
        };
    },[]);

    const newArrivals = () => {
        let showArrivalsData = null;
        if (!data || !data.hasOwnProperty("prod") || data.prod.length < 1) return null;
        else {
            data.prod.forEach(prod => {
                showArrivalsData = (
                    <>
                        {showArrivalsData}
                        <div onMouseEnter={()=>setIsOver(true)} onMouseLeave={()=>setIsOver(false)}>
                            <ArrivalDataBlockImage src={WEBASSETS + prod.img_path} alt={prod.name}/>
                            <div>
                                <ProductData prod={prod} isOver={isOver} currCurrency={currCurrency} currencySymbol={currencySymbol} />
                            </div>
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
            <div className={"fixed top-0 right-0 left-0 z-30 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white/90' : ' bg-white/80']}>
                <InfoBand/>
                <Navbar isMobile={dataStore.mobile}/>
            </div>
            <HomePageHeaderSwiper isMobile={dataStore.mobile}/>
            <section className={`bg-[#E6E1DB] py-20`}>
                <div className={`text-center py-10 tracking-wider`}>
                    <hr/>
                        <h3 className={`text-h4 font-600`}>NEW ARRIVALS</h3>
                    <hr/>
                </div>
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
