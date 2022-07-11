import React, {useContext, useState} from 'react';
import Link from "next/link";
import WishlistButton from "../common/WishListButton";
import Image from "next/image";
import appSettings from "../../store/appSettings";
import AppWideContext from "../../store/AppWideContext";

const ArrivalDataBlockImage = (props) => (
    <span className={`block relative w-full h-full aspect-square`}>
        <Image src={props.src} alt={props.name} layout={`fill`} objectFit={`cover`}/>
    </span>
)

const ProductCard = ({prod}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [isOver, setIsOver] = useState(false);
    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;

    const imgPath = WEBASSETS + "/assets/" + prod.asset_id + (isOver ? "/mo.new.jpg" : "/new.jpg");
    const showProd = (
        <div className={`col-span-2`}>
            <p className={`text-h5 font-500`}>{prod.name}</p>
            <p className={`text-sm font-500`}>{prod.tag_line}</p>
        </div>
    );
    const showProdDetail = (
        <>
            <span className={`font-800`}>SIZE</span>
            <div className={`font-800 bg-black text-white h-full flex flex-col gap-2 justify-center leading-none`}>
                <span className={`uppercase`}>Add to bag</span>
                <p className={`text-xs`}>
                    {currencySymbol}
                    {(currCurrency === "inr") ? prod.price : prod.usd_price}
                </p>
            </div>
        </>
    );

    return <div>
        <a href={prod.link} className={"block rounded-3xl overflow-hidden mx-4"}>
            <span className="block relative aspect-square w-full">
                <ArrivalDataBlockImage src={imgPath} alt={prod.name}/>
            </span>
            <div className={"bg-white flex prods-center py-6 px-4 mb-1"}>
                {/*<div className='flex-1 leading-none'>*/}
                {/*    <h5 className={'text-h5 font-600 font-cursive italic'}>{prod.name}</h5>*/}
                {/*    <p className="text-[8.5px] font-600 text-black/70 uppercase tracking-widest">{prod.tag}</p>*/}
                {/*</div>*/}
                {/*<p className="text-sm tracking-wide text-black/70">{"currSymbol"}{prod.price}</p>*/}
                {showProd}
            </div>
        </a>
    </div>;
};

export default ProductCard;
