import React, {useEffect, useRef, useState} from 'react';
import Link from "next/link";
import DetailsCard from "./DetailsCard";
import Image from "next/image";
import ImageSwitcher from "./ImageSwitcher";
import DetailsSection from "./DetailsSection";
import Footer from "../../footer/Footer";
import CompleteLook from "./sub-sections/CompleteLook";
import ExploreSections from "./sub-sections/ExploreSections";

const DesktopView = ({hpid, data}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const [theme, setTheme] = useState("black")

    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current?.load();
    }, [hpid]);

    return (
        <div>
            <span className={"block relative w-full h-[100vh]"}>
                <video autoPlay muted className={`w-full h-fit`} loop style={{background: `no-repeat url("${WEBASSETS}/assets/${hpid}/Macro_.jpg")`}} ref={videoRef}>
                    <source
                        src={WEBASSETS + "/assets/" + hpid + "/ProductLoop.mp4"}
                        type="video/mp4"
                    />
                    Your browser does not support video tag.
                </video>
                <div className={"absolute top-[25%] bg-black left-0 text-white"}>
                    <Link href={"/"}>
                        Home
                    </Link>
                    >
                    <Link href={"/"}>
                        <span>{data.category}</span>
                    </Link>
                    > {data.name}
                </div>
                <div className={"absolute top-[15%] right-[12.5%] w-60"}>
                    <DetailsCard data={data}/>
                </div>
            </span>
            <span className={"block relative aspect-[320/159] w-full"}>
                <Image src={WEBASSETS + "/assets/looks/" + hpid + ".jpg"} layout={`fill`} objectFit={`contain`}/>
            </span>
            <span className={"block relative aspect-[16/5] w-full"}>
                <Image src={WEBASSETS + "/assets/fabrics/" + hpid + ".jpg"} layout={`fill`} objectFit={`contain`}/>
            </span>
            <div className={"flex flex-column"}>
                <div className={"flex-[7]"}>
                    <ImageSwitcher images={data.images}/>
                </div>
                <DetailsSection theme={theme} data={data}/>
            </div>
            <div className={"grid grid-cols-2"}>
                <div>
                    <span className={"block text-center"}>Why shop with us?</span>
                    <div className={"grid grid-cols-2"}>
                        <div
                            className={"text-center flex flex-col justify-center items-center w-[33%]"}>
                                <span className={"block relative aspect-square h-11"}>
                                    <Image src={WEBASSETS + "/assets/images/icons_v1/Made-To-Measure.icon.svg"} layout={"fill"} objectFit={`cover`}/>
                                </span>
                            <span className={"block"}>Made To Measure</span>
                            <span className={"block"}>FITS YOU LIKE A GLOVE</span>
                        </div>
                        <div
                            className={"text-center flex flex-col justify-center items-center w-[33%]"}>
                                <span className={"block relative aspect-square h-11"}>
                                    <Image src={WEBASSETS + "/assets/images/icons_v1/Premium-Fabric.icon.svg"} layout={"fill"} objectFit={`cover`}/>
                                </span>
                            <span className={"block"}>Premium Fabrics</span>
                            <span className={"block"}>BREATHABLE & COMFORTABLE</span>
                        </div>
                        <div
                            className={"text-center flex flex-col justify-center items-center w-[33%]"}>
                                <span className={"block relative aspect-square h-11"}>
                                    <Image src={WEBASSETS + "/assets/images/icons_v1/Styling-Services.icon.svg"} layout={"fill"} objectFit={`cover`}/>
                                </span>
                            <span className={"block"}>Styling Services</span>
                            <span className={"block"}>PERSONALISED SHOPPING</span>
                        </div>
                        <div
                            className={"text-center flex flex-col justify-center items-center w-[33%]"}>
                                <span className={"block relative aspect-square h-11"}>
                                    <Image src={WEBASSETS + "/assets/images/icons_v1/Free-Alterations.icon.svg"} layout={"fill"} objectFit={`cover`}/>
                                </span>
                            <span className={"block"}>Free Alterations</span>
                            <span className={"block"}>FIT GUARANTEE</span>
                        </div>
                    </div>
                </div>
                <span className={"block relative w-100 h-100"}>
                    <Image src={WEBASSETS + "/assets/images/why_shop_with_us.jpg"} layout={`fill`} objectFit={`cover`}/>
                </span>
            </div>
            {
                data.paired_products && data.paired_products.length > 0 && data.paired_products.products && data.paired_products.products.length > 0 && <CompleteLook data={data}/>
            }
            {
                data.pattern_no &&
                <ExploreSections
                    id={data.asset_id}
                    title={"Similar In Style"}
                    api={"getProducts"}
                    query={{
                        "category": "same-pattern",
                        "skip": 0,
                        "limit": 3,
                        "category-name": data.pattern_no,
                        "curr-product-id": data.asset_id
                    }}
                />
            }
            <ExploreSections
                id={data.asset_id}
                title={"Explore More " + data.category.toUpperCase()}
                api={"getProducts"}
                query={{
                    "category": data.category,
                    "skip": 0,
                    "limit": 3,
                }}
                more={true}
            />
            {
                data.fabric_code &&
                <ExploreSections
                    id={data.asset_id}
                    title={"More Of This Color"}
                    api={"getProducts"}
                    query={{
                        "category": "same-color",
                        "skip": 0,
                        "limit": 3,
                        "category-name": data.fabric_code,
                        "curr-product-id": data.asset_id
                    }}
                    more={true}
                />
            }
            <ExploreSections
                id={data.asset_id}
                title={"NEW ARRIVALS"}
                api={"getProducts"}
                query={{
                    "category": "new-arrivals",
                    "skip": 0,
                    "limit": 3,
                }}
                more={true}
            />
            <Footer/>
        </div>
    );
};

export default DesktopView;