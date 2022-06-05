/**
 *
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

import PageHead from "../PageHead";
import React, {Fragment, useCallback, useContext, useEffect, useState} from "react";
import AppWideContext from "../../store/AppWideContext";
import Menu from "../navbar/Menu";
import Footer from "../footer/Footer";
import Image from "next/image";
import Header from "../navbar/Header";
import MimotoProductCard from "./MimotoProductCard";
import {apiCall} from "../../helpers/apiCall";
import MimotoSlider from "./MimotoSlider";

const fetchData = async (apiToken, category) => {
    const callObject = await apiCall("getMimotoProducts", apiToken, {name: category})
    return (callObject.hasOwnProperty("response")
        && callObject.hasOwnProperty("msg")
        && callObject.msg === "Products Found"
    ) ? callObject.response : {}
}


function MimotoPage(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    //all paths start with shop-
    const {category} = props
    const {dataStore} = useContext(AppWideContext);

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (dataStore.apiToken) {
            setLoading(true)
            fetchData(dataStore.apiToken, category)
                .then(d => {
                    setData(d)
                    setLoading(false)
                })
                .catch(e => {
                    console.log(e.message)
                    setLoading(false)
                })
        }
    }, [dataStore.apiToken])


    const [navControl, setNavControl] = React.useState(false);
    const controller = useCallback(() => {
        const isSet = (window.scrollY > window.innerHeight - 20)
        if (navControl !== isSet)
            setNavControl(isSet)
    }, [navControl])
    React.useEffect(() => {
        window.addEventListener("scroll", controller);
        return () =>
            window.removeEventListener('scroll', controller)
    }, [controller]);

    const loader = <span className={"col-span-3 flex justify-center items-center"} key="loader">
        <span className={"block relative w-14 aspect-square"}>
            <Image src={WEBASSETS + "/assets/images/loader.gif"} layout={`fill`} objectFit={`cover`}
                   alt={"loader"}/>
        </span>
    </span>

    if (!dataStore.mobile)
        return (
            <Fragment>
                <PageHead url={"/" + props.hpid} id={props.hpid} isMobile={dataStore.mobile}/>
                {navControl || <Header type={"shopMenu"}/>}

                {navControl
                    ? <Header type={"minimal"} isMobile={false} filterData={data ? data.filter_count : {}}
                              category={props.hpid}/>
                    : <Menu type={"minimal"} isMobile={false} filterData={data ? data.filter_count : {}}
                            category={props.hpid}/>
                }
                {(loading)
                    ? {loader}
                    : <Fragment>
                        <MimotoSlider data={data}/>
                        <main className={`grid grid-cols-3 gap-5 container pb-20`}>
                            {data && data.data && data.data.map((prod, index) => {
                                return <MimotoProductCard prod={prod} key={index}/>
                            })}
                        </main>
                    </Fragment>
                }
                <Footer isMobile={dataStore.mobile}/>
            </Fragment>
        );
}

export default MimotoPage;
