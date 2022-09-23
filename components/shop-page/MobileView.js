import React, {Fragment, useState} from 'react';
import ProductCard from "./ProductCard";
import Image from "next/image";
import PageHead from "../PageHead";
import Header from "../navbar/Header";
import CategoryHeaderMobile from "./CategoryHeaderMobile";
import Loader from "../common/Loader";
import Footer from "../footer/Footer";
import {useRouter} from "next/router";

const MobileView = React.forwardRef(({hpid, category, visibleData, data, total, skip}, ref) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [activeLayout, setActiveLayout] = useState("2");
    const router = useRouter();
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

    return <div>
        <PageHead url={"/" + hpid} id={hpid} isMobile={true}/>
        <Header type={"shopMenu"} isMobile={true} category={hpid}
                subMenu={<CategoryHeaderMobile setActiveLayout={setActiveLayout} category={category} availableFilters={data ? data.filter_count : {}}
                                               activeLayout={activeLayout} minimal={true}/>}/>
        <CategoryHeaderMobile setActiveLayout={setActiveLayout} category={category} activeLayout={activeLayout} availableFilters={data ? data.filter_count : {}}/>
        {data
            ? <main className={`grid grid-cols-${activeLayout} gap-5 container py-5 px-5 bg-[#faf4f0]`}>
                {returnValue}
                {
                    total <= skip || <div className={`flex justify-center col-span-${activeLayout}`} ref={ref}>
                        <Loader/>
                    </div>
                }

            </main>
            : <div className={"flex justify-center col-span-3"}>
                <Loader/>
            </div>
        }
        <Footer isMobile={true}/>
    </div>
});

export default MobileView;