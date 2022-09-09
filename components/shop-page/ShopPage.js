/**
 *
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

import CategoryHeaderVideo from "../common/CategoryHeaderVideo";
import PageHead from "../PageHead";
import React, {Fragment, useEffect, useState} from "react";
import _ from "lodash"
import Footer from "../footer/Footer";
import Image from "next/image";
import BlockHeader from "../common/blockHeader";
import Header from "../navbar/Header";
import ProductCard from "./ProductCard";
import useNavControl from "../../hooks/useNavControl";
import CategoryHeaderMobile from "./CategoryHeaderMobile";
import Loader from "../common/Loader";
import {useRouter} from "next/router";
import {connect} from "react-redux";
import {apiCall} from "../../helpers/apiCall";
import {applyFilters, setFilterCheckbox, setSortBy} from "../../ReduxStore/reducers/filterSlice";


function ShopPage(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const router = useRouter();
    const [route, setRoute] = useState("")
    //all paths start with shop-
    const {category, hpid, appConfig, data} = props
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState({
        category: props.category,
        skip: 0,
        limit: 10000,
        filter_by: {}
    })
    const [visibleData, setVisibleData] = useState(data.data)

    const filterVisibleData = (rawData) => {
        let newData = [...rawData.filter(item => item.size_avail !== "" && item.is_visible)]
        setVisibleData(newData)
    }

    const updateVisibleData = () => {
        const filterCategories = Object.keys(props.filterCheckboxes)

        //case before init
        if (filterCategories.length === 0)
            return

        // create query object
        const queryObject = {
            category: props.category,
            skip: 0,
            limit: 10000,
            filter_by: {}
        }
        for (let x = 0; x < filterCategories.length; x++) {
            if (props.filterCheckboxes[filterCategories[x]].length > 0) {
                queryObject.filter_by[filterCategories[x]] = props.filterCheckboxes[filterCategories[x]]
            }
        }
        if (props.sortBy) {
            queryObject['sorted_by'] = props.sortBy;
        }

        //set original data is not filter or sort is applied
        if (queryObject['sorted_by'] === "" && Object.keys(queryObject.filter_by).length === 0) {
            updateVisibleData(data.data)
            return
        }

        //if no new query is added, return
        if (_.isEqual(query, queryObject)) {
            return
        }

        // get new products
        setLoading(true)
        apiCall("getProducts", props.appConfig.apiToken, queryObject)
            .then(resp => {
                if (resp.response && resp.response.data) {
                    filterVisibleData(resp.response.data)
                    setQuery(queryObject)
                }
            })
            .catch(e => console.log(e.message))
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (route) {
            updateVisibleData()
        }
    }, [props.refreshFilter])

    React.useEffect(() => {
        if (router.route !== route) {
            if (router.query.sorted_by) {
                props.setSortBy(router.query.sorted_by)
            } else {
                props.setSortBy("")
            }
            props.setFilterCheckbox({})
            setTimeout(() => {
                setRoute(router.route)
                props.applyFilters()
            },100)

        }
    }, [router.route])

    React.useEffect(() => {
        if (router.query.sorted_by) {
            props.setSortBy(router.query.sorted_by)
        }
    }, [router.query])

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
                subMenu={<CategoryHeaderMobile setActiveLayout={setActiveLayout} category={category} availableFilters={data ? data.filter_count : {}}
                                               activeLayout={activeLayout} minimal={true}/>}/>
        <CategoryHeaderMobile setActiveLayout={setActiveLayout} category={category} activeLayout={activeLayout} availableFilters={data ? data.filter_count : {}}/>
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
        <Header type={navControl ? "minimal" : "menu"} isMobile={false} availableFilters={data ? data.filter_count : {}}
                category={hpid}/>
        <BlockHeader
            space={"py-5"}
            titleStyle={"text-center"}
        >
            <h3 className={`text-h4 font-600 mb-4 uppercase`}>{(category === "best-selling") ? "TOP SELLING PRODUCTS" : category}</h3>
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

    return appConfig.isMobile ? mobileView : browserView
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig,
        refreshFilter: state.filters.refreshFilter,
        filterCheckboxes: state.filters.filterCheckboxes,
        sortBy: state.filters.sortBy
    }
}

export default connect(mapStateToProps, {setFilterCheckbox, setSortBy, applyFilters})(ShopPage);
