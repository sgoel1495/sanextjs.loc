import React, {useContext, useState} from 'react';
import WishListButton from "../common/WishListButton";
import Link from "next/link";
import Image from "next/image";
import appSettings from "../../store/appSettings";
import AppWideContext from "../../store/AppWideContext";

const ShopDataBlockImage = (props) => (
    <span className={`block relative w-full h-full ` + [props.portrait ? "aspect-[2/3]" : "aspect-square"]}>
        <Image src={props.src} alt={props.name} layout={`fill`} objectFit={`cover`}/>
    </span>
)

const ProductCard = ({prod, isMobile, wide, portrait}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [expandShop, setExpandShop] = useState(null);

    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;

    if (isMobile) {
        if (wide) {
            return <div className={"relative rounded-3xl bg-white overflow-hidden mx-10 my-6 shadow-[24.7px_24.7px_49px_1px_rgb(0,0,0,0.07)]"}>
                {prod.is_prod_new && <span className={"absolute text-white px-1.5 z-10 bg-black text-[8px] top-9 left-0 font-bold"}>NEW</span>}
                <Link href={"/" + prod.asset_id}>
                    <a className={`block text-center z-0`} id={prod.asset_id}>
                        <ShopDataBlockImage src={WEBASSETS + prod.single_view_img} alt={prod.name}/>
                        <div className={`grid grid-cols-2`}>
                            <div>
                                <p className={`text-h5 font-500`}>{prod.name}</p>
                                <p className={`text-sm font-500`}>{prod.tag_line}</p>
                            </div>
                            <div>
                                <p className={`text-xs`}>
                                    {currencySymbol}
                                    {(currCurrency === "inr") ? prod.price : prod.usd_price}
                                </p>
                                <WishListButton/>
                            </div>

                        </div>
                    </a>
                </Link>
            </div>
        }
        return <div className={"relative"}>
            <WishListButton className={`absolute left-2 top-2 z-10`}/>
            {prod.is_prod_new && <span className={"absolute text-white px-1.5 z-10 bg-black text-[8px] top-9 -left-2 font-bold"}>NEW</span>}
            <Link href={"/" + prod.asset_id}>
                <a className={`block text-center z-0`} id={prod.asset_id}>
                    <div className={`rounded-3xl bg-white overflow-hidden border-2 border-white shadow-[24.7px_24.7px_49px_1px_rgb(0,0,0,0.07)]`}>
                        <ShopDataBlockImage src={WEBASSETS + prod.double_view_img} alt={prod.name} portrait={true}/>
                    </div>
                    <div className={``}>
                        <p className={`text-h5 font-500`}>{prod.name}</p>
                        <p className={`text-sm font-500`}>{prod.tag_line}</p>
                        <p className={`text-xs`}>
                            {currencySymbol}
                            {(currCurrency === "inr") ? prod.price : prod.usd_price}
                        </p>
                    </div>
                </a>
            </Link>
        </div>

    }

    return (
        <Link href={"/" + prod.asset_id}>
            <a className={`block bg-white text-center relative z-0`} id={prod.asset_id}>
                <div
                    onMouseEnter={() => {
                        setExpandShop(true)
                    }}
                    onMouseLeave={() => {
                        setExpandShop(false)
                    }}
                    className={`group`}
                >
                    <WishListButton className={`absolute right-4 top-4 z-10`}/>
                    <ShopDataBlockImage src={WEBASSETS + "/assets/" + prod.asset_id + (expandShop ? "/mo.new.jpg" : "/new.jpg")} alt={prod.name} portrait={portrait}/>
                    <div className="grid grid-cols-2 items-center h-16">
                        {expandShop
                            ? <>
                                <span className={`font-800`}>SIZE</span>
                                <div className={`font-800 bg-black text-white h-full flex flex-col gap-2 justify-center leading-none`}>
                                    <span className={`uppercase`}>Add to bag</span>
                                    <p className={`text-xs`}>
                                        {currencySymbol}
                                        {(currCurrency === "inr") ? prod.price : prod.usd_price}
                                    </p>
                                </div>
                            </>
                            : <div className={`col-span-2`}>
                                <p className={`text-h5 font-500`}>{prod.name}</p>
                                <p className={`text-sm font-500`}>{prod.tag_line}</p>
                            </div>
                        }
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default ProductCard;