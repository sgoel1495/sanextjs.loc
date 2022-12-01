import React, {useContext, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import AppWideContext from "../../../store/AppWideContext";
import appSettings from "../../../store/appSettings";
import WishListButton from "../../common/WishListButton";
import {connect} from "react-redux";
import PriceDisplay from "../../common/PriceDisplay";

const ShopDataBlockImage = (props) => (
    <span className={`block relative w-full h-full ` + [props.portrait ? "aspect-[2/3]" : "aspect-square"]}>
        <Image src={props.src} alt={props.name} layout={`fill`} objectFit={`cover`}/>
    </span>
)

const ProductCard = ({prod, portrait}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [expandShop, setExpandShop] = useState(null);


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
                    <WishListButton className={`absolute right-4 top-4 z-10`} pid={prod.asset_id}/>
                    <ShopDataBlockImage src={WEBASSETS + "/assets/" + prod.asset_id + (expandShop ? "/mo.thumb.jpg" : "/thumb.jpg")} alt={prod.name} portrait={portrait}/>
                    <div className="grid grid-cols-2 items-center h-16">
                        {expandShop
                            ? <>
                                <span className={`font-800`}>SIZE</span>
                                <div className={`font-800 bg-black text-white h-full flex flex-col gap-2 justify-center leading-none`}>
                                    <span className={`uppercase`}>Add to bag</span>
                                    <p className={`text-xs`}>
                                        <PriceDisplay prod={prod} isSale={prod.product_id ? prod.product_id.split("-")[1] === "Sale" : false}/>
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