/**
 *
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

import CategoryHeader from "./CategoryHeader";
import PageHead from "../PageHead";
import React, {Fragment, useContext, useEffect, useState} from "react";
import InfoBand from "../info-band/InfoBand";
import LooksNavbar from "../navbar/LookNavbar";
import AppWideContext from "../../store/AppWideContext";
import Menu from "../navbar/Menu";
import Footer from "../footer/Footer";
import appSettings from "../../store/appSettings";
import useApiCall from "../../hooks/useApiCall";
import Link from "next/link";
import BlockHeader from "../common/blockHeader";
import Image from "next/image";

const ShopDataBlockImage = (props) => (
    <span className={`block relative w-full h-full aspect-square`}>
        <Image src={props.src} alt={props.name} layout={`fill`} objectFit={`cover`}/>
    </span>
)


function ShopPage(props){
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    //all paths start with shop-
    const category= props.hpid.substr(5);
    const {dataStore} = useContext(AppWideContext);

    const [data, setData] = useState(null);
    const [expandShop, setExpandShop] = useState(null);

    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;

    /**
     *
     * @todo API issue. We have no idea about the number of products we should get. Please change the limit below accordingly
     */

    const resp = useApiCall("getProducts", dataStore.apiToken, {category: category, limit: 100});
    useEffect(() => {
        if (resp
            && resp.hasOwnProperty("status")
            && resp.status == 200
            && resp.hasOwnProperty("response")
            && resp.response.hasOwnProperty("data")
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

    /**
     * @todo API - Please tell the api which gives the tagline for categories
     * @type {string}
     */
    const tag_line = "Designed for timelessness and crafted with utmost love, the premium quality tops & blouses in a wide palette of prints and colours are made for both work & beyond.";
/*
    {
        "asset_id": "Tops-Bamboo-Tee-Off-White-BambooTShirt",
        "in_stock": "true",
        "is_prod_new": true,
        "multi_color": false,
        "name": "Bamboo Tee-Off White",
        "old_product_id": "Tops-Bamboo-Tee-Off-White-BambooTShirt",
        "price": 1250,
        "tag_line": "Bamboo TShirt",
        "single_view_img": "/assets/Tops-Bamboo-Tee-Off-White-BambooTShirt/new.jpg",
        "double_view_img": "/assets/Tops-Bamboo-Tee-Off-White-BambooTShirt/thumb.mob.jpg",
        "usd_price": 18
    },
*/

    const shopData = () => {
        let showShopData = null;
        if (!data || !data.hasOwnProperty("data") || data.data.length < 1) return null;
        else {
            data.data.forEach(prod => {
                showShopData = (
                    <>
                        {showShopData}
                        <Link href={"/" + prod.asset_id}>
                            <a>
                                <div onMouseEnter={()=>{setExpandShop(prod)}} onMouseLeave={()=>{setExpandShop(null)}}>
                            <ShopDataBlockImage src={WEBASSETS + prod.single_view_img} alt={prod.name}/>
                            {(expandShop && prod.asset_id == expandShop.asset_id)
                                ?<div>
                                    <div>SIZE</div>
                                    <div>
                                        <div>ADD TO BAG</div>
                                        <div>
                                            {currencySymbol}
                                            {(currCurrency=="inr")? prod.price : prod.usd_price }
                                        </div>
                                    </div>
                                </div>
                                : <div className={"hidden group-hover:grid place-items-center absolute inset-0 z-10 opacity-95 text-white text-center font-600 tracking-wider"}>
                                    <div className={`self-end`}>
                                        <p className={`mb-2 text-h5`}>{prod.name}</p>
                                        <p className={`text-h5 font-cursive italic`}>{prod.tag_line}</p>
                                    </div>
                                </div>
                            }
                        </div>
                            </a>
                        </Link>
                    </>
                );
            });
        }
        return showShopData;
    }

    return <Fragment>
        <PageHead url={"/" + props.hpid} id={props.hpid} isMobile={dataStore.mobile}/>
        <CategoryHeader category={category} />
        <div className={"fixed top-0 right-0 left-0 z-30 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white/90' : ' bg-white/80']}>
            <InfoBand/>
            <LooksNavbar isMobile={dataStore.mobile}/>
        </div>
        <Menu source="shopCategory" isMobile={false}/>
        <div>{category}</div>
        <div>{tag_line}</div>
        <main className={`px-10 grid grid-cols-3 gap-10`}>
            {(data) ? shopData() : null}
        </main>
        <Footer isMobile={dataStore.mobile}/>
    </Fragment>;
}
export default ShopPage;