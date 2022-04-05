import React, {useContext} from 'react';
import WishListButton from "../../../common/WishListButton";
import AppWideContext from "../../../../store/AppWideContext";
import appSettings from "../../../../store/appSettings";
import Image from "next/image";
import Accordion from "../../../common/accordion";

const ProductDetails = ({data}) => {

    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const {dataStore} = useContext(AppWideContext);
    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;

    let feature_icons = {}

    data.icon_assets.forEach((icon) => {
        feature_icons = {...feature_icons, ...icon}
    })

    return (
        <div>
            <div className="p-5">
                <div className={"flex justify-between"}>
                    <div>
                        <span className={"block"}>Share</span>
                        <span className={"block"}>{data.name}</span>
                        <span className={"block"}>{data.tag_line}</span>
                    </div>
                    <div className={"text-right"}>
                        <WishListButton/>
                        <span className={"block"}>{currencySymbol} {currCurrency === "inr" ? data.price : data.usd_price}</span>
                        <span className={"block"}>INCLUSIVE OF TAXES</span>
                    </div>
                </div>
                <div className={"flex flex-wrap"}>
                    {
                        Object.keys(data.icons_fea).filter(key => data.icons_fea[key]).map((key, index) => <div
                            className={"text-center flex flex-col justify-center items-center w-[25%]"} key={index}>
                                <span className={"block relative aspect-square h-11"}>
                                    <Image src={WEBASSETS + feature_icons[key]} layout={"fill"} objectFit={`cover`}/>
                                </span>
                            <span className={"block"}>{key.replace("9_", "9-").replace(/_/g, " ")}</span>
                        </div>)
                    }
                </div>
                <div className={"flex flex-col items-center"}>
                    <span className={"block uppercase"}>select a size</span>
                    <div className={"flex justify-evenly items-center w-[100vw]"}>
                        <div className={"border-4 border-white bg-[#faede3] shadow-xl text-center px-2 py-1 w-[27vw] rounded-[5vw]"}>
                            <span className={"block uppercase font-bold text-xs"}>standard</span>
                            <span className={"block uppercase font-thin text-xs"}>size</span>
                        </div>
                        <span className={"block"}>OR</span>
                        <div className={"border-4 border-white bg-[#faede3] shadow-xl text-center px-2 py-1 w-[27vw] rounded-[5vw]"}>
                            <span className={"block uppercase font-bold text-xs"}>standard</span>
                            <span className={"block uppercase font-thin text-xs"}>size</span>
                        </div>
                    </div>
                    <span className={"block uppercase"}>size guide</span>
                    <span
                        className={"block bg-[#4eb16d] uppercase text-white font-black text-xs w-[45vw] text-center rounded-[4.5vw] py-[5vw] tracking-[2px] shadow-lg"}>add to bag</span>
                    <span className={"block uppercase"}>return policy</span>
                    <div>
                        {["shirts", "Long Sleeves"].map((item, index) => {
                            return <span className={"rounded-[25px] bg-[#faede3] border-2 border-white pt-1.5 px-3.5 text-black text-sm font-cursive"} key={index}>{item}</span>
                        })}
                    </div>
                </div>
            </div>
            <Accordion
                title={"highlights"}
                style={"bg-[#EFEAE6] p-5"}
                titleStyle={"uppercase font-bold tracking-[2.5px]"}
            >
                <ul className="list-['>'] p-2">
                    {
                        data['description'].map((value, index) => {
                            if (value)
                                return <li className={"p-2.5 text-xs"} key={index}>{value}</li>
                        })
                    }
                </ul>
            </Accordion>
            <Accordion
                title={"fabric & care"}
                style={"p-5"}
                titleStyle={"uppercase font-bold tracking-[2.5px]"}
            >
                <ul className="list-['>'] p-2">
                    {
                        data['fabric'].map((value, index) => {
                            if (value)
                                return <li className={"p-2.5 text-xs"} key={index}>{value}</li>
                        })
                    }
                    {
                        data['fabric_care'].map((value, index) => {
                            if (value)
                                return <li className={"p-2.5 text-xs"} key={index}>{value}</li>
                        })
                    }
                </ul>
            </Accordion>
            <Accordion
                title={"details"}
                style={"bg-[#EFEAE6] p-5"}
                titleStyle={"uppercase font-bold tracking-[2.5px]"}
            >
                <ul className="list-['>'] p-2">
                    {
                        data['details'].map((value, index) => {
                            if (value)
                                return <li className={"p-2.5 text-xs"} key={index}>{value}</li>
                        })
                    }
                </ul>
            </Accordion>
            <div className="p-5">
                <span className="block">Why buy from us ?</span>
                <div className={"grid grid-cols-2 content-center"}>
                    <div
                        className={"text-center flex flex-col justify-center items-center"}>
                                <span className={"block relative aspect-square h-16"}>
                                    <Image src={WEBASSETS + "/assets/images/icons_v1/Made-To-Measure.icon.svg"} layout={"fill"} objectFit={`cover`}/>
                                </span>
                        <span className={"block"}>Made To Measure</span>
                        <span className={"block"}>FITS YOU LIKE A GLOVE</span>
                    </div>
                    <div
                        className={"text-center flex flex-col justify-center items-center"}>
                                <span className={"block relative aspect-square h-16"}>
                                    <Image src={WEBASSETS + "/assets/images/icons_v1/Premium-Fabric.icon.svg"} layout={"fill"} objectFit={`cover`}/>
                                </span>
                        <span className={"block"}>Premium Fabrics</span>
                        <span className={"block"}>BREATHABLE & COMFORTABLE</span>
                    </div>
                    <div
                        className={"text-center flex flex-col justify-center items-center"}>
                                <span className={"block relative aspect-square h-16"}>
                                    <Image src={WEBASSETS + "/assets/images/icons_v1/Styling-Services.icon.svg"} layout={"fill"} objectFit={`cover`}/>
                                </span>
                        <span className={"block"}>Styling Services</span>
                        <span className={"block"}>PERSONALISED SHOPPING</span>
                    </div>
                    <div
                        className={"text-center flex flex-col justify-center items-center"}>
                                <span className={"block relative aspect-square h-16"}>
                                    <Image src={WEBASSETS + "/assets/images/icons_v1/Free-Alterations.icon.svg"} layout={"fill"} objectFit={`cover`}/>
                                </span>
                        <span className={"block"}>Free Alterations</span>
                        <span className={"block"}>FIT GUARANTEE</span>
                    </div>
                </div>
                <span className={"block text-center uppercase"}>tap to read about us</span>
            </div>
            <div className={"bg-[#EFEAE6] px-5 py-8 text-center"}>
                <span className={"block uppercase tracking-wider text-xs"}>please enter pin code</span>
                <span className={"block uppercase tracking-wider text-xs"}>to check delivery availability</span>
                <div className={"flex justify-center mt-2"}>
                    <input placeholder={"ENTER YOUR PINCODE"} className={"w-[50%] p-3.5 text-[10px] tracking-wider border-2 border-[#959595]"}/>
                    <div className={"text-white bg-[#d35c56] p-4 text-[10px] ml-2"}>
                        CHECK
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;