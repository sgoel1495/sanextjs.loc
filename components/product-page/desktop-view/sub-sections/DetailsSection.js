import React, {useContext, useState} from 'react';
import Image from "next/image";
import AppWideContext from "../../../../store/AppWideContext";
import appSettings from "../../../../store/appSettings";
import Link from "next/link";

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
    let tags = Object.keys(data).map((key) => {
        if (key.startsWith('filter') && key !== "filter-collection" && key !== "filter-multi-color" && data[key]) {
            return {
                "display": data[key].replace("-", " ") + (key.includes("sleeve") ? " Sleeves" : "") + (key.includes("fit") ? " Fit" : ""),
                "value": data[key]
            }
        }
    }).filter((key) => key)
    return (
        <div className={[`flex-[5] p-4 text-${theme}`]}>
            <div className={"flex justify-between px-10"}>
                <span className={"block"}>{currencySymbol}{currCurrency === "inr" ? data.price : data.usd_price}</span>
                <span className={"block"}>SHARE</span>
            </div>
            <div className="flex flex-col items-center text-center mt-20">
                <p className={"text-4xl font-600"}>{data.name}</p>
                <p className={"text-xl"}>{data.tag_line}</p>
                <div className={"my-5 flex items-center justify-center gap-10"}>
                    {[26, 28, 30, 32, 34, 36].map((item, index) => {
                        if (index > 0)
                            return <span className={""} key={index}>{item}</span>
                        return <span className={""} key={index}>{item}</span>
                    })}
                </div>
                <p className={"uppercase font-500 mb-4"}>size guide</p>
                <button className={`border-2 border-${theme} w-10/12 hover:bg-black hover:text-white font-cursive italic font-600 pt-3 pb-1 text-2xl`}>i&lsquo;ll take it!</button>
            </div>
            <div className={"flex flex-wrap justify-center my-10"}>
                {Object.keys(data.icons_fea).filter(key => data.icons_fea[key]).map((key, index) => (
                    <div className={"text-center flex flex-col justify-center items-center w-[33%]"} key={index}>
                        <div className={"relative aspect-square h-11 grayscale fill-black"}>
                            <Image src={WEBASSETS + feature_icons[key]} alt='' layout={"fill"} objectFit={`cover`}/>
                        </div>
                        <span className={"block"}>{key.replace("9_", "9-").replace(/_/g, " ")}</span>
                    </div>
                ))}
            </div>
            <div className='flex items-center flex-wrap justify-start'>
                {tags.map((item, index) => {
                    return <Link href={"/group/" + item.value}>
                        <p className={"rounded-full bg-[#d3d3d35c] py-2 px-5 text-black font-500 mr-4 mb-4 capitalize"} key={index}>{item.display}</p>
                    </Link>
                })}
            </div>
            <div className='mb-8'>
                <div className={"flex items-end justify-start gap-10 font-600 mb-2"}>
                    <p className={"uppercase"} onClick={() => setSelected(0)}>Description</p>
                    <p className={"uppercase"} onClick={() => setSelected(1)}>details</p>
                    <p className={"uppercase"} onClick={() => setSelected(2)}>fabric & care</p>
                </div>
                <ul className='list-disc text-sm font-500 pl-5'>
                    {description.map((value, index) => <li className={""} key={index}>{value}</li>)}
                </ul>
            </div>
            <p className={"text-center font-500 text-sm mb-5"}>At SALT you can customize and tailor make your clothing</p>
            <div className={"flex mb-8"}>
                <div className={"text-center flex flex-col justify-center items-center w-[33%]"}>
                    <div className={"relative aspect-square h-11"}>
                        <Image src={WEBASSETS + "/assets/images/measure_yourself.svg"} alt='' layout={"fill"} objectFit={`cover`}/>
                    </div>
                    <p className={"font-600 text-sm"}>MADE TO MEASURE</p>
                </div>
                <div className={"text-center flex flex-col justify-center items-center w-[33%]"}>
                    <div className={"relative aspect-square h-11"}>
                        <Image src={WEBASSETS + "/assets/images/free_shipping.svg"} alt='' layout={"fill"} objectFit={`cover`}/>
                    </div>
                    <p className={"font-600 text-sm"}>FREE SHIPPING</p>
                </div>
                <div className={"text-center flex flex-col justify-center items-center w-[33%]"}>
                    <div className={"relative aspect-square h-11"}>
                        <Image src={WEBASSETS + "/assets/images/perfect_fit.svg"} alt='' layout={"fill"} objectFit={`cover`}/>
                    </div>
                    <p className={"font-600 text-sm"}>PERFECT FIT GUARANTEE</p>
                </div>
            </div>
            <div className={"flex justify-between items-center text-sm"}>
                <button className={"uppercase font-500 hover:underline"}>ask your stylist</button>
                <button className={"uppercase font-500 hover:underline"}>complete the look</button>
            </div>
        </div>
    );
};

export default DetailsSection;