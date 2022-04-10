import React from 'react';
import Image from "next/image";
import ProductDetails from "./sub-sections/ProductDetails";
import Footer from "../../footer/Footer";
import NewArrivalsSection from "../../new-Arrivals";
import AboutUs from "../../about-us-section";
import OurShop from "../../our-shop";
import CompleteLook from "./sub-sections/CompleteLook";
import ExploreSection from "./sub-sections/ExploreSection";

const MobileView = ({hpid, data}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    return (
        <>
            <div className={"bg-[#f6f1ef]"}>
                <div className={"overflow-x-scroll"}>
                    <div className={"inline-flex"}>
                        {
                            data.images.map((image, index) => {
                                return <span className={"relative w-[78vw] aspect-[2/3] border-4 border-white ml-4 my-2 shadow-md"} key={index}>
                            <Image src={WEBASSETS + image} layout={`fill`} objectFit={`cover`}/>
                        </span>
                            })
                        }
                    </div>
                </div>
                <ProductDetails data={data}/>
                <CompleteLook paired_products={data['paired_products']} id={data['asset_id']}/>
                {
                    data.pattern_no &&
                    <ExploreSection
                        id={data.asset_id}
                        title={"Similar Styles"}
                        subTitle={"IN OTHER COLORS/FABRIC"}
                        api={"getProducts"}
                        query={{
                            "category": "same-pattern",
                            "skip": 0,
                            "limit": 20,
                            "category-name": data.pattern_no,
                            "curr-product-id": data.asset_id
                        }}
                    />
                }
                <ExploreSection
                    id={data.asset_id}
                    title={"Explore " + data.category.charAt(0).toUpperCase() + data.category.substr(1).toLowerCase()}
                    subTitle={"CUSTOMIZE & TAILOR TO FIT"}
                    api={"getProducts"}
                    query={{
                        "category": data.category,
                        "skip": 0,
                        "limit": 5,
                    }}
                    grid={true}
                />
                {
                    data.fabric_code &&
                    <ExploreSection
                        id={data.asset_id}
                        title={"Same Color"}
                        subTitle={"IN OTHER STYLE"}
                        api={"getProducts"}
                        query={{
                            "category": "same-color",
                            "skip": 0,
                            "limit": 20,
                            "category-name": data.fabric_code,
                            "curr-product-id": data.asset_id
                        }}
                    />
                }
                <ExploreSection
                    id={data.asset_id}
                    title={"Popular"}
                    subTitle={"OUR CUSTOMER'S FAVORITES"}
                    api={"getProducts"}
                    query={{
                        "category": "best-selling",
                        "skip": 0,
                        "limit": 5,
                    }}
                    grid={true}
                    minimal={true}
                />
                <NewArrivalsSection/>
                <AboutUs/>
                <OurShop/>
            </div>
            <Footer isMobile={true}/>
        </>
    );
};

export default MobileView;