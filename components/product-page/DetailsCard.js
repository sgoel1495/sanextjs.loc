import React, {useContext} from 'react';
import WishlistButton from "../common/WishListButton";
import appSettings from "../../store/appSettings";
import AppWideContext from "../../store/AppWideContext";
import Link from "next/link";

const DetailsCard = ({data}) => {
    const {dataStore} = useContext(AppWideContext);
    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;
    return (
        <div>
            <div className={"bg-white"}>
                <div className={"flex justify-between"}>
                    <span>{currencySymbol} {currCurrency === "inr" ? data.price : data.usd_price}</span>
                    <div>
                        <WishlistButton/>
                        <span>share</span>
                    </div>
                </div>
                <div className={"text-center"}>
                    <span className={"block text-2xl"}>{data.name}</span>
                    <span className={"block text-sm"}>{data.tag_line}</span>
                </div>
                <div className={"flex"}>
                    {[26, 28, 30, 32, 34, 36].map((item, index) => {
                        if (index > 0)
                            return <>
                                <span className={""} key={"div"+index}>|</span>
                                <span className={""} key={index}>{item}</span>
                            </>
                        return <span className={""} key={index}>{item}</span>
                    })}
                </div>
                <span className={"block uppercase"}>size guide</span>
                <div className={"flex"}>
                    <span className={"uppercase"}>tailor it</span>
                    <span className={""}>/</span>
                    <span className={"uppercase"}>customise</span>
                </div>
                <button className="bg-black text-white">
                    i'll take it
                </button>
                <div className={"flex"}>
                    <span>+</span>
                    <span className={"uppercase"}>product details</span>
                </div>
                <div>
                    <span className={"block"}>More Colors</span>
                    <div className={"flex"}>
                        <span className={"w-10 h-10 rounded-full bg-[red]"}/>
                        <span className={"w-10 h-10 rounded-full bg-[blue]"}/>
                    </div>
                </div>
            </div>
            <div className={"bg-white mt-2 flex justify-evenly"}>
                <Link href={"/salt/shipping-returns"}>
                    <span className={"uppercase underline"}>return policy</span>
                </Link>
                <Link href={"/salt/faq"}>
                    <span className={"uppercase underline"}>faq</span>
                </Link>
            </div>
            <div className={"bg-white mt-2"}>
                <span className={"block text-sm"}> Please enter PIN to check delivery availability.</span>
                <div className={"flex"}>
                    <input placeholder={"Enter pincode"}/>
                    <button className={"bg-black"}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default DetailsCard;