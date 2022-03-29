/**
 *
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

import CategoryHeaderVideo from "../common/CategoryHeaderVideo";
import PageHead from "../PageHead";
import React, {Fragment, useContext, useEffect, useState} from "react";
import NavBar from "../navbar/Index";
import AppWideContext from "../../store/AppWideContext";
import Menu from "../navbar/Menu";
import Footer from "../footer/Footer";
import appSettings from "../../store/appSettings";
import useApiCall from "../../hooks/useApiCall";
import Link from "next/link";
import Image from "next/image";
import BlockHeader from "../common/blockHeader";
import WishListButton from "../common/WishListButton";

const ShopDataBlockImage = (props) => (
    <span className={`block relative w-full h-full aspect-square`}>
        <Image src={props.src} alt={props.name} layout={`fill`} objectFit={`cover`}/>
    </span>
)


function ShopPage(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    //all paths start with shop-
    const category = props.hpid.substr(5);
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


    /**
     * @todo API - Please tell the api which gives the tagline for categories << HArdcoded
     *
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
                            <a className={`block bg-white text-center relative z-0`}>
                                <div
                                    onMouseEnter={() => {
                                        setExpandShop(prod)
                                    }}
                                    onMouseLeave={() => {
                                        setExpandShop(null)
                                    }}
                                    className={`group`}
                                >
                                    <WishListButton className={`absolute right-4 top-4 z-10`}/>
                                    {(expandShop && prod.asset_id == expandShop.asset_id)
                                        ? <ShopDataBlockImage src={WEBASSETS + "/assets/" + prod.asset_id + "/new.jpg"} alt={prod.name}/>
                                        : <ShopDataBlockImage src={WEBASSETS + "/assets/" + prod.asset_id + "/mo.new.jpg"} alt={prod.name}/>
                                    }
                                    <div className="grid grid-cols-2 items-center h-16">
                                        {(expandShop && prod.asset_id == expandShop.asset_id)
                                            ? <>
                                                <span className={`font-800`}>SIZE</span>
                                                <div className={`font-800 bg-black text-white h-full flex flex-col gap-2 justify-center leading-none`}>
                                                    <span className={`uppercase`}>Add to bag</span>
                                                    <p className={`text-xs`}>
                                                        {currencySymbol}
                                                        {(currCurrency == "inr") ? prod.price : prod.usd_price}
                                                    </p>
                                                </div>
                                            </>
                                            : <div className={`col-span-2`}>
                                                <p className={`text-h5 font-500`}>{prod.name}</p>
                                                <p className={`text-sm font-500`}>{prod.tag_line}</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </>
                );
            });
        }
        return showShopData;
    }

    return (
        <Fragment>
            <PageHead url={"/" + props.hpid} id={props.hpid} isMobile={dataStore.mobile}/>
            <NavBar type={"mimoto"}/>
            <CategoryHeaderVideo category={category}/>
            {(data && data.hasOwnProperty("break_speed"))
                ? <Menu source="minimal" isMobile={false} filterData={data}/>
                : null
            }
            <BlockHeader
                space={"py-5"}
                titleStyle={"text-center"}
            >
                <h3 className={`text-h4 font-600 mb-4 uppercase`}>{category}</h3>
                <h4 className={`text-h6 leading-none font-cursive italic font-600 text-black/70`}>{tag_line}</h4>
            </BlockHeader>
            <main className={`grid grid-cols-3 gap-5 container pb-20`}>
                {(data) ? shopData() : null}
            </main>
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    );
}

export default ShopPage;
