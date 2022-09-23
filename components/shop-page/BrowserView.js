import React from 'react';
import PageHead from "../PageHead";
import CategoryHeaderVideo from "../common/CategoryHeaderVideo";
import Header from "../navbar/Header";
import BlockHeader from "../common/blockHeader";
import PantsSegregation from "./categorySegregation/PantsSegregation";
import ProductCard from "./ProductCard";
import Loader from "../common/Loader";
import Footer from "../footer/Footer";
import useNavControl from "../../hooks/useNavControl";
import SkirtsSegregation from "./categorySegregation/SkirtsSegregation";
import JewellerySegregation from "./categorySegregation/JewellerySegregation";

const BrowserView = React.forwardRef(({hpid, category, visibleData, data, total, skip}, ref) => {
    const navControl = useNavControl(-20)
    const tag_line = "Designed for timelessness and crafted with utmost love, the premium quality tops & blouses in a wide palette of prints and colours are made for both work & beyond.";
    return (
        <>
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
                <h3 className={`text-h4 font-600 mb-4 uppercase`}>{(category === "best-selling") ? "TOP SELLING PRODUCTS" : category.replace("-", " ")}</h3>
                <h4 className={`text-h6 leading-none font-cursive italic font-600 text-black/70`}>{tag_line}</h4>
            </BlockHeader>
            {
                category.includes("pants") && <PantsSegregation/>
            }
            {
                category.includes("skirts") && <SkirtsSegregation/>
            }
            {
                category.includes("jewellery") && <JewellerySegregation/>
            }
            {(data)
                ? <main className={`grid grid-cols-3 gap-5 container pb-20`}>
                    {visibleData && visibleData.map((prod, index) => {
                        return <ProductCard prod={prod} key={index}
                                            isAccessory={(category === "scarves" || category === "jewellery")}/>
                    })}
                    {
                        total <= skip || <div className={"flex justify-center col-span-3"} ref={ref}>
                            <Loader/>
                        </div>
                    }
                </main>
                : <div className={"flex justify-center my-4"}>
                    <Loader/>
                </div>
            }
            <Footer isMobile={false}/>
        </>
    );
});

export default BrowserView;