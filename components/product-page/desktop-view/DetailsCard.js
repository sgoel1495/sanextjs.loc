import React, { useContext } from 'react';
import WishlistButton from "../../common/WishListButton";
import appSettings from "../../../store/appSettings";
import AppWideContext from "../../../store/AppWideContext";
import Link from "next/link";

const DetailsCard = ({ data, hpid }) => {
    const { dataStore } = useContext(AppWideContext);
    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;
    return (
        <div>
            <div className={"bg-white p-4 shadow-xl"}>
                <div className={"flex items-center justify-between text-black/60 text-sm font-500 mb-4"}>
                    <span>{currencySymbol} {currCurrency === "inr" ? data.price : data.usd_price}</span>
                    <div className='flex items-center gap-2'>
                        <WishlistButton pid={hpid}/>
                        <span>Icon</span>
                    </div>
                </div>
                <div className={"text-center mb-4"}>
                    <p className={"text-2xl"}>{data.name}</p>
                    <p className={"text-sm text-black/50 font-500"}>{data.tag_line}</p>
                </div>
                <div className={"flex justify-between font-600 mb-4 text-black/60"}>
                    {[26, 28, 30, 32, 34, 36].map((item, index) => {
                        if (index > 0)
                            return <>
                                <span className={""} key={"div" + index}>|</span>
                                <span className={""} key={index}>{item}</span>
                            </>
                        return <span className={""} key={index}>{item}</span>
                    })}
                </div>
                <p className={"text-sm text-center uppercase mb-2 text-black/60 font-500 text-xs"}>size guide</p>
                <div className={"flex justify-center items-center gap-2 font-700 text-sm text-black/60 mb-4"}>
                    <span className={"uppercase underline"}>tailor it</span>
                    <span className={""}>/</span>
                    <span className={"uppercase underline"}>customise</span>
                </div>
                <div className="flex items-center justify-center mb-5">
                    <button className="bg-black/90 text-white px-10 italic font-cursive text-xl pb-1 pt-3">
                        i&lsquo;ll take it
                    </button>
                </div>
                <div className={"flex items-center"}>
                    <span className='leading-none'>+</span>
                    <p className={"uppercase text-sm"}>product details</p>
                </div>
                <div>
                    <span className={"block"}>More Colors</span>
                    <div className={"flex"}>
                        <span className={"w-10 h-10 rounded-full bg-[red]"} />
                        <span className={"w-10 h-10 rounded-full bg-[blue]"} />
                    </div>
                </div>
            </div>
            <div className={"bg-white mt-2 flex justify-evenly text-xs border-4 border-black/10 py-2"}>
                <Link href={"/salt/shipping-returns"}>
                    <a className={"uppercase underline"}>return policy</a>
                </Link>
                <Link href={"/salt/faq"}>
                    <a className={"uppercase underline"}>faq</a>
                </Link>
            </div>
            <div className={"bg-white mt-2 border-4 border-black/10 p-1"}>
                <p className={"text-[10px] tracking-tight font-600 mb-1"}> Please enter PIN to check delivery availability.</p>
                <div className={"inline-flex justify-between"}>
                    <input placeholder={"Enter pincode"} className='border border-black text-sm w-3/5 placeholder:text-black font-500' />
                    <button className={"bg-black text-white uppercase text-sm px-2"}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default DetailsCard;