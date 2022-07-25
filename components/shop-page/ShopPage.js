/**
 *
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

import CategoryHeaderVideo from "../common/CategoryHeaderVideo";
import PageHead from "../PageHead";
import React, {Fragment, useCallback, useContext, useEffect, useState} from "react";
import AppWideContext from "../../store/AppWideContext";
import Footer from "../footer/Footer";
import Image from "next/image";
import BlockHeader from "../common/blockHeader";
import Header from "../navbar/Header";

import ProductCard from "./ProductCard";
import useNavControl from "../../hooks/useNavControl";
import CategoryHeaderMobile from "./CategoryHeaderMobile";
import Loader from "../common/Loader";
import {useRouter} from "next/router";


function ShopPage(props) {
    console.log("=========== SHOP PAGE DATA RECEIVED IN PROPS",props.data)
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const router = useRouter();
    //all paths start with shop-
    const {dataStore} = useContext(AppWideContext);
    const {category, hpid} = props
    const [data, setData] = useState(props.data);
    const [visibleData, setVisibleData] = useState([])

    const initVisibleData = useCallback(() => {
        let newData = [];
        const filterActive = (dataStore.filter.length > 0)
        if (filterActive) {
            dataStore.filter.forEach(asset_id => {
                let product = data.data.find(asset => asset.asset_id === asset_id)
                if (product) {
                    if (product.is_visible) {
                        newData.push(product)
                    }
                }
            })
        } else {
            newData = [...data.data.filter(item => item.size_avail !== "")]
        }

        console.log("NEW DATA", newData)
        console.log("Filter DATA", dataStore.filter)

        setVisibleData(newData)
    }, [dataStore.refreshFilter])

    useEffect(() => {
        initVisibleData()
    }, [dataStore.refreshFilter])

    const navControl = useNavControl(-20)

    /**
     * @todo API - Please tell the api which gives the tagline for categories << HArdcoded
     *
     * @type {string}
     */
    const tag_line = "Designed for timelessness and crafted with utmost love, the premium quality tops & blouses in a wide palette of prints and colours are made for both work & beyond.";

    const [activeLayout, setActiveLayout] = useState("2");

    const displayMobileData = () => {
        let returnValue = null
        let breakSpeedKeys = []
        if (data && data.break_speed)
            breakSpeedKeys = Object.keys(data.break_speed)

        if (visibleData) {
            visibleData.forEach((prod, index) => {
                if (index % 8 === 7) {
                    let keyIndex = ((index + 1) / 8) - 1
                    let breakSpeed = null
                    if (keyIndex > -1 && keyIndex < breakSpeedKeys.length) {
                        breakSpeed = data.break_speed[breakSpeedKeys[keyIndex]]
                        returnValue = <Fragment>
                            {returnValue}
                            <ProductCard prod={prod} key={index} isMobile={true} wide={activeLayout === "1"}/>
                            <div className={`col-span-${activeLayout} -mx-5 mt-6`}>
                                <p className={`font-900 text-sm tracking-widest uppercase px-4 mb-2`}>shop
                                    by {breakSpeedKeys[keyIndex]}</p>
                                <div className={"flex overflow-x-scroll"}>
                                    {breakSpeed && Object.keys(breakSpeed).map((key, index) => (
                                        <div key={index} className={"pb-3 " + [index === 0 ? "mx-4" : "mr-4"]}
                                             onClick={() => router.push("/group/" + key + "?category=" + category)}>
                                            <span
                                                className={"block h-24 aspect-square relative border-2 border-white rounded-[35%] overflow-hidden"}
                                            >
                                                <Image
                                                    src={WEBASSETS + "/assets/" + breakSpeed[key] + "/square-crop.jpg"}
                                                    layout={"fill"} objectFit={`cover`} alt={key}
                                                />
                                            </span>
                                            <span className={`block uppercase text-xs text-center`}>{key.replace(/-n-/g, " & ").replace(/-/g, " ")}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Fragment>
                    } else {
                        returnValue = <Fragment>
                            {returnValue}
                            <ProductCard prod={prod} key={index} isMobile={true} wide={activeLayout === "1"}/>
                        </Fragment>
                    }
                } else {
                    returnValue = <Fragment>
                        {returnValue}
                        <ProductCard prod={prod} key={index} isMobile={true} wide={activeLayout === "1"}/>
                    </Fragment>
                }

            })
        }

        return returnValue
    }

    const mobileView = <div>
        <PageHead url={"/" + hpid} id={hpid} isMobile={true}/>
        <Header type={"shopMenu"} isMobile={true} category={hpid}
                subMenu={<CategoryHeaderMobile setActiveLayout={setActiveLayout} category={category} filterData={data ? data.filter_count : {}}
                                               activeLayout={activeLayout} minimal={true}/>}/>
        <CategoryHeaderMobile setActiveLayout={setActiveLayout} category={category} activeLayout={activeLayout} filterData={data ? data.filter_count : {}}/>
        {data
            ? <main className={`grid grid-cols-${activeLayout} gap-5 container py-5 px-5 bg-[#faf4f0]`}>
                {displayMobileData()}
            </main>
            : Loader
        }
        <Footer isMobile={true}/>
    </div>


    const browserView = <Fragment>
        <PageHead url={"/" + hpid} id={hpid} isMobile={false}/>
        <CategoryHeaderVideo category={category}>
            <Header type={"shopMenu"}/>
        </CategoryHeaderVideo>
        <Header type={navControl ? "minimal" : "menu"} isMobile={false} filterData={data ? data.filter_count : {}}
                category={hpid}/>
        <BlockHeader
            space={"py-5"}
            titleStyle={"text-center"}
        >
            <h3 className={`text-h4 font-600 mb-4 uppercase`}>{(category==="best-selling")?"TOP SELLING PRODUCTS":category}</h3>
            <h4 className={`text-h6 leading-none font-cursive italic font-600 text-black/70`}>{tag_line}</h4>
        </BlockHeader>
        {(data)
            ? <main className={`grid grid-cols-3 gap-5 container pb-20`}>
                {visibleData && visibleData.map((prod, index) => {
                    return <ProductCard prod={prod} key={index}
                                        isAccessory={(category === "scarves" || category === "jewellery")}/>
                })}
            </main>
            : Loader
        }
        <Footer isMobile={false}/>
    </Fragment>

    return dataStore.mobile ? mobileView : browserView
}

export default ShopPage;
