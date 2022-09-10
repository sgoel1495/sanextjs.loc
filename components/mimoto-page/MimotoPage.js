/**
 *
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

import PageHead from "../PageHead";
import React, {Fragment, useCallback, useContext, useEffect, useState} from "react";
import AppWideContext from "../../store/AppWideContext";
import Footer from "../footer/Footer";
import Image from "next/image";
import Header from "../navbar/Header";
import MimotoProductCard from "./MimotoProductCard";
import MimotoSlider from "./MimotoSlider";
import Loader from "../common/Loader";
import ProductCard from "../shop-page/ProductCard";
import CategoryHeaderMobile from "../shop-page/CategoryHeaderMobile";
import {connect} from "react-redux";


function MimotoPage(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    //all paths start with shop-
    const {category, hpid, appConfig} = props

    const [data, setData] = useState(props.data);
    const [visibleData, setVisibleData] = useState([])
    const initVisibleData = useCallback(() => {
        const filterActive = props.filter.length > 0
        const newData = [];
        data.products.forEach(p => {
            if (
                p.is_visible
                && (!filterActive || props.filter.includes(p.asset_id))
            )
                newData.push(p)
        })

        setVisibleData(newData)
    }, [props.refreshFilter])

    useEffect(() => {
        initVisibleData()
    }, [props.refreshFilter])


    const [activeLayout, setActiveLayout] = useState("2");
    const displayMobileData = () => {
        let returnValue = null
        let breakSpeedKeys
        if (data && data.break_speed)
            breakSpeedKeys = Object.keys(data.break_speed)

        if (visibleData) {
            visibleData.forEach((prod, index) => {
                if (index % 8 === 7) {
                    let keyIndex = ((index + 1) / 8) - 1
                    let breakSpeed = null
                    if (keyIndex > -1 && keyIndex < breakSpeedKeys.length)
                        breakSpeed = data.break_speed[breakSpeedKeys[keyIndex]]

                    returnValue = <Fragment>
                        {returnValue}
                        <ProductCard prod={prod} key={index} isMobile={true} wide={activeLayout === "1"}/>
                        <div className={`col-span-${activeLayout} -mx-5 mt-6`}>
                            <p className={`font-900 text-sm tracking-widest uppercase px-4 mb-2`}>shop
                                by {breakSpeedKeys[keyIndex]}</p>
                            <div className={"flex overflow-x-scroll"}>
                                {breakSpeed && Object.keys(breakSpeed).map((key, index) => (
                                    <div key={index} className={"pb-3 " + [index === 0 ? "mx-4" : "mr-4"]}>
                                        <span
                                            className={"block h-24 aspect-square relative border-2 border-white rounded-[35%] overflow-hidden"}>
                                            <Image
                                                src={WEBASSETS + "/assets/" + breakSpeed[key] + "/square-crop.jpg"}
                                                layout={"fill"} objectFit={`cover`} alt={key}/>
                                        </span>
                                        <span className={`block uppercase text-xs text-center`}>{key}</span>
                                    </div>))
                                }
                            </div>
                        </div>
                    </Fragment>
                }
                returnValue = <Fragment>
                    {returnValue}
                    <ProductCard prod={prod} key={index} isMobile={true} wide={activeLayout === "1"}/>
                </Fragment>
            })
        }

        return returnValue
    }

    const mobileView = <Fragment>
        <PageHead url={"/" + hpid} id={hpid} isMobile={true}/>
        <Header type={"shopMenu"} isMobile={true} category={hpid}
                subMenu={<CategoryHeaderMobile setActiveLayout={setActiveLayout} category={category}
                                               activeLayout={activeLayout} minimal={true}/>}/>
        <CategoryHeaderMobile setActiveLayout={setActiveLayout} category={category} activeLayout={activeLayout}/>
        {data
            ? <main className={`grid grid-cols-${activeLayout} gap-5 container py-5 px-5 bg-[#faf4f0]`}>
                {displayMobileData()}
            </main>
            : Loader
        }
        <Footer isMobile={true}/>
    </Fragment>


    const browserView = <Fragment>
        <PageHead url={"/" + props.hpid} id={props.hpid} isMobile={false}/>
        <Header type={"shopMenu"}/>
        {(data)
            ? (data.hasOwnProperty("mimoto_collection"))
                ? <div className="w-11/12 mx-auto flex items-start gap-14 relative">
                    <MimotoSlider className="flex-1 block sticky top-20 inset-x-0 bg-[#f7f7f7]" data={data}/>
                    <main className={`flex-[2] relative`}>
                        <div className="flex justify-end sticky top-[5rem] inset-x-0 bg-white z-[1] py-2">
                            <button className="flex items-center uppercase text-sm gap-x-1">
                                Filter
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {data && visibleData && visibleData.map((prod, index) => {
                                return <MimotoProductCard prod={prod} key={index}/>
                            })}
                        </div>
                    </main>
                </div>
                : null
            : <Loader/>
        }
        <Footer isMobile={false}/>
    </Fragment>

    return appConfig.isMobile ? mobileView : browserView
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig,
        filter:state.filters.filter,
        refreshFilter: state.filters.refreshFilter
    }
}

export default connect(mapStateToProps)(MimotoPage);
