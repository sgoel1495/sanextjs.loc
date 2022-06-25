/**
 *
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

import PageHead from "../PageHead";
import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
import AppWideContext from "../../store/AppWideContext";
import Menu from "../navbar/Menu";
import Footer from "../footer/Footer";
import Image from "next/image";
import Header from "../navbar/Header";
import MimotoProductCard from "./MimotoProductCard";
import MimotoSlider from "./MimotoSlider";
import Loader from "../common/Loader";


function MimotoPage(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    //all paths start with shop-
    const { category } = props
    const { dataStore } = useContext(AppWideContext);

    const [data, setData] = useState(props.data);
    const [visibleData, setVisibleData] = useState([])
    const initVisibleData = useCallback(()=>{
        const newData = [];
        data.products.forEach(p=>{
            if(p.is_visible)
                newData.push(p)
        })
        console.log("NEW DATA",newData)
        setVisibleData(newData)
    },[data.products])
    useEffect(()=>{
            initVisibleData()
    },[initVisibleData])
    console.log("Visible Data",visibleData)


    console.log("DATA MIMOTO MAIN PAGE", data)

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
                alt={"loader"} />
        </span>
    </span>

    if (!dataStore.mobile)
        return (
            <Fragment>
                <PageHead url={"/" + props.hpid} id={props.hpid} isMobile={dataStore.mobile} />
                {navControl || <Header type={"shopMenu"} />}
                {navControl
                    ? <Header type={"minimal"} isMobile={false} filterData={data ? data.filter_count : {}}
                        category={props.hpid} />
                    : <Menu type={"minimal"} isMobile={false} filterData={data ? data.filter_count : {}}
                        category={props.hpid} />
                }
                {(data)
                    ? (data.hasOwnProperty("mimoto_collection"))
                        ? <div className="w-11/12 mx-auto flex items-start gap-14 relative mt-8">
                            <MimotoSlider className="flex-1 block sticky top-20 inset-x-0 bg-[#f7f7f7]" data={data}/>
                            <main className={`flex-[2] relative`}>
                                <div className="flex justify-end sticky top-[3rem] inset-x-0 bg-white z-[1] py-3">
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
                    : <Loader />
                }
                <Footer isMobile={dataStore.mobile} />
            </Fragment>
        );
}

export default MimotoPage;
