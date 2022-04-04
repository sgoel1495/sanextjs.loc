import React, {useContext, useState} from 'react';
import Image from "next/image";
import AppWideContext from "../../../store/AppWideContext";
import appSettings from "../../../store/appSettings";

const DetailsSection = ({theme, data}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const {dataStore} = useContext(AppWideContext);
    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;

    const [selected, setSelected] = useState(0)
    let description
    switch (selected) {
        case 0:
            description = data['description']
            break;
        case 1:
            description = data['details']
            break;
        case 2:
            description = [...data['fabric'], ...data['fabric_care']]
            break;
    }

    let feature_icons = {}

    data.icon_assets.forEach((icon) => {
        feature_icons = {...feature_icons, ...icon}
    })

    return (
        <div className={[`flex-[5] p-4 text-${theme}`]}>
            <div className={"flex justify-between px-10"}>
                <span className={"block"}>{currencySymbol}{currCurrency === "inr" ? data.price : data.usd_price}</span>
                <span className={"block"}>SHARE</span>
            </div>
            <span className={"block text-center"}>{data.name}</span>
            <span className={"block text-center"}>{data.tag_line}</span>
            <div className={"text-center"}>
                {[26, 28, 30, 32, 34, 36].map((item, index) => {
                    if (index > 0)
                        return <>
                            <span className={""} key={"div" + index}>|</span>
                            <span className={""} key={index}>{item}</span>
                        </>
                    return <span className={""} key={index}>{item}</span>
                })}
            </div>
            <span className={"block text-center uppercase"}>size guide</span>
            <span className={"block px-4"}>
                        <button className={`border-2 border-${theme} w-full`}>i'll take it!</button>
                    </span>
            <div className={"flex flex-wrap justify-center"}>
                {
                    Object.keys(data.icons_fea).filter(key => data.icons_fea[key]).map(key => <div
                        className={"text-center flex flex-col justify-center items-center w-[33%]"}>
                                <span className={"block relative aspect-square h-11"}>
                                    <Image src={WEBASSETS + feature_icons[key]} layout={"fill"} objectFit={`cover`}/>
                                </span>
                        <span className={"block"}>{key.replace("9_", "9-").replace(/_/g, " ")}</span>
                    </div>)
                }
            </div>
            <div>
                {["shirts", "Long Sleeves"].map((item, index) => {
                    return <span className={"rounded-[25px] bg-[#d3d3d35c] p-2 text-black text-sm"} key={index}>{item}</span>
                })}
            </div>
            <div>
                <div className={"flex"}>
                    <span className={"uppercase px-2"} onClick={() => setSelected(0)}>Description</span>
                    <span className={"uppercase pr-2"} onClick={() => setSelected(1)}>details</span>
                    <span className={"uppercase"} onClick={() => setSelected(2)}>fabric & care</span>
                </div>
                {
                    description.map((value, index) => {
                        return <span className={"block"} key={index}>{value}</span>
                    })
                }
            </div>
            <span className={"block"}>At SALT you can customize and tailor make your clothing</span>
            <div className={"flex"}>
                <div
                    className={"text-center flex flex-col justify-center items-center w-[33%]"}>
                                <span className={"block relative aspect-square h-11"}>
                                    <Image src={WEBASSETS + "/assets/images/measure_yourself.svg"} layout={"fill"} objectFit={`cover`}/>
                                </span>
                    <span className={"block"}>MADE TO MEASURE</span>
                </div>
                <div
                    className={"text-center flex flex-col justify-center items-center w-[33%]"}>
                                <span className={"block relative aspect-square h-11"}>
                                    <Image src={WEBASSETS + "/assets/images/free_shipping.svg"} layout={"fill"} objectFit={`cover`}/>
                                </span>
                    <span className={"block"}>FREE SHIPPING</span>
                </div>
                <div
                    className={"text-center flex flex-col justify-center items-center w-[33%]"}>
                                <span className={"block relative aspect-square h-11"}>
                                    <Image src={WEBASSETS + "/assets/images/perfect_fit.svg"} layout={"fill"} objectFit={`cover`}/>
                                </span>
                    <span className={"block"}>PERFECT FIT GUARANTEE</span>
                </div>
            </div>
            <div className={"flex justify-between"}>
                <span className={"block"}>ask your stylist</span>
                <span className={"block"}>complete the look</span>
            </div>
        </div>
    );
};

export default DetailsSection;