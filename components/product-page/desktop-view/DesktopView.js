import React, { useEffect, useRef, useState } from 'react';
import Link from "next/link";
import DetailsCard from "./DetailsCard";
import Image from "next/image";
import ImageSwitcher from "./sub-sections/ImageSwitcher";
import DetailsSection from "./sub-sections/DetailsSection";
import Footer from "../../footer/Footer";
import CompleteLook from "./sub-sections/CompleteLook";
import ExploreSections from "./sub-sections/ExploreSections";

const DesktopView = ({ hpid, data }) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const [theme, setTheme] = useState("black")
    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current?.load();
    }, [hpid]);

    return (
        <div>
            <div className={"relative w-full h-screen"}>
                <video autoPlay muted className={`w-full h-fit`} loop style={{ background: `no-repeat url("${WEBASSETS}/assets/${hpid}/Macro_.jpg")` }} ref={videoRef}>
                    <source
                        src={WEBASSETS + "/assets/" + hpid + "/ProductLoop.mp4"}
                        type="video/mp4"
                    />
                    Your browser does not support video tag.
                </video>
                <div className={"absolute top-20 pl-28 pr-10 py-2 capitalize inline-flex gap-4 items-center bg-black left-0 text-white text-xs font-600"}>
                    <Link href={"/"}>
                        <a>Home</a>
                    </Link>
                    <span>&gt;</span>
                    <Link href={"/"}>
                        <a>{data.category}</a>
                    </Link>
                    <span>&gt;</span>
                    {data.name}
                </div>
                <div className={"absolute top-[15%] right-[12.5%] w-60"}>
                    <DetailsCard data={data} hpid={hpid} />
                </div>
            </div>
            <span className={"block relative aspect-[320/159] w-full"}>
                <Image src={WEBASSETS + "/assets/looks/" + hpid + ".jpg"} alt='' layout={`fill`} objectFit={`contain`} />
            </span>
            <span className={"block relative aspect-[16/5] w-full"}>
                <Image src={WEBASSETS + "/assets/fabrics/" + hpid + ".jpg"} alt='' layout={`fill`} objectFit={`contain`} />
            </span>
            <div className={"flex flex-column bg-[#F7EDEE]"}>
                <div className={"flex-[7]"}>
                    <ImageSwitcher images={data.images} />
                </div>
                <DetailsSection theme={theme} data={data} />
            </div>
            <div className={"grid grid-cols-2"}>
                <div className='py-10'>
                    <p className={"text-center text-h3"}>Why shop with us?</p>
                    <div className={"grid grid-cols-2 justify-items-center"}>
                        <div className={"text-center flex flex-col py-10 justify-center items-center"}>
                            <div className={"relative aspect-square h-16"}>
                                <Image src={WEBASSETS + "/assets/images/icons_v1/Made-To-Measure.icon.svg"} alt='' layout={"fill"} objectFit={`cover`} />
                            </div>
                            <p className={"font-cursive italic leading-none text-h3 font-600 mt-4"}>Made To Measure</p>
                            <p className={"text-[10px] tracking-wider font-800"}>FITS YOU LIKE A GLOVE</p>
                        </div>
                        <div className={"text-center flex flex-col py-10 justify-center items-center"}>
                            <div className={"relative aspect-square h-16"}>
                                <Image src={WEBASSETS + "/assets/images/icons_v1/Premium-Fabric.icon.svg"} alt='' layout={"fill"} objectFit={`cover`} />
                            </div>
                            <p className={"font-cursive italic leading-none text-h3 font-600 mt-4"}>Premium Fabrics</p>
                            <p className={"text-[10px] tracking-wider font-800"}>BREATHABLE & COMFORTABLE</p>
                        </div>
                        <div className={"text-center flex flex-col py-10 justify-center items-center"}>
                            <div className={"relative aspect-square h-16"}>
                                <Image src={WEBASSETS + "/assets/images/icons_v1/Styling-Services.icon.svg"} alt='' layout={"fill"} objectFit={`cover`} />
                            </div>
                            <p className={"font-cursive italic leading-none text-h3 font-600 mt-4"}>Styling Services</p>
                            <p className={"text-[10px] tracking-wider font-800"}>PERSONALISED SHOPPING</p>
                        </div>
                        <div className={"text-center flex flex-col py-10 justify-center items-center"}>
                            <div className={"relative aspect-square h-16"}>
                                <Image src={WEBASSETS + "/assets/images/icons_v1/Free-Alterations.icon.svg"} alt='' layout={"fill"} objectFit={`cover`} />
                            </div>
                            <p className={"font-cursive italic leading-none text-h3 font-600 mt-4"}>Free Alterations</p>
                            <p className={"text-[10px] tracking-wider font-800"}>FIT GUARANTEE</p>
                        </div>
                    </div>
                </div>
                <div className={"relative w-100 h-100"}>
                    <Image src={WEBASSETS + "/assets/images/why_shop_with_us.jpg"} alt='' layout={`fill`} objectFit={`cover`} />
                </div>
            </div>
            {data.paired_products && data.paired_products.length > 0 && data.paired_products.products && data.paired_products.products.length > 0 && <CompleteLook data={data} />}
            {data.pattern_no &&
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
            {data.fabric_code &&
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
            <Footer />
        </div>
    );
};

export default DesktopView;