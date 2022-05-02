import React, {useContext, useState} from 'react';
import Image from "next/image";
import ProductCard from "./ProductCard";
import CategoryHeaderMobile from "./CategoryHeaderMobile";
import PageHead from "../PageHead";
import Header from "../navbar/Header";
import Footer from "../footer/Footer";
import AppWideContext from "../../store/AppWideContext";

const MobileShopPage = ({data, loading, loaderRef, category, hpid}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [activeLayout, setActiveLayout] = useState("2");

    let breakSpeedKeys;

    if (data && data.break_speed) {
        breakSpeedKeys = Object.keys(data.break_speed)
    }


    return (
        <>
            <PageHead url={"/" + hpid} id={hpid} isMobile={dataStore.mobile}/>
            <Header type={"shopMenu"} isMobile={true} category={hpid} subMenu={<CategoryHeaderMobile setActiveLayout={setActiveLayout} category={category} activeLayout={activeLayout} minimal={true}/>}/>
            <CategoryHeaderMobile setActiveLayout={setActiveLayout} category={category} activeLayout={activeLayout}/>
            <main className={`grid grid-cols-${activeLayout} gap-5 container py-5 px-5 bg-[#faf4f0]`}>
                {data && data.data && data.data.map((prod, index) => {
                        if (index % 8 === 7) {
                            let keyIndex = ((index + 1) / 8) - 1
                            if (keyIndex > -1 && keyIndex < breakSpeedKeys.length) {
                                let breakSpeed = data.break_speed[breakSpeedKeys[keyIndex]]
                                return <>
                                    <ProductCard prod={prod} key={index} isMobile={true} wide={activeLayout === "1"}/>
                                    <div className={`col-span-${activeLayout} -mx-5 mt-6`}>
                                        <p className={`font-900 text-sm tracking-widest uppercase px-4 mb-2`}>shop by {breakSpeedKeys[keyIndex]}</p>
                                        <div className={"flex overflow-x-scroll"}>
                                            {Object.keys(breakSpeed).map((key, index) => (<div key={index} className={"pb-3 " + [index === 0 ? "mx-4" : "mr-4"]}>
                                                <span className={"block h-24 aspect-square relative border-2 border-white rounded-[35%] overflow-hidden"}>
                                                    <Image src={WEBASSETS + "/assets/" + breakSpeed[key] + "/square-crop.jpg"} layout={"fill"} objectFit={`cover`} alt={key}/>
                                                </span>
                                                <span className={`block uppercase text-xs text-center`}>{key}</span>
                                            </div>))}

                                        </div>
                                    </div>
                                </>
                            }
                        }
                        return <ProductCard prod={prod} key={index} isMobile={true} wide={activeLayout === "1"}/>
                    })
                }
                <span className={`col-span-${activeLayout} flex justify-center items-center`} ref={loaderRef}>
                        {loading &&
                            <span className={"block relative w-14 aspect-square"}>
                                <Image src={WEBASSETS + "/assets/images/loader.gif"} layout={`fill`} objectFit={`cover`} alt={"loader"}/>
                            </span>
                        }
                    </span>
            </main>
            <Footer isMobile={true}/>
        </>
    );
};

export default MobileShopPage;