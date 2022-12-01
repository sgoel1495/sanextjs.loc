import React from 'react';
import Image from "next/image";
import {connect} from "react-redux";
import PriceDisplay from "../../../common/PriceDisplay";

const CompleteLook = ({paired_products, id, userConfig}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    return (
        <div className="py-5">
            <span className="block text-center text-xl">Complete The Look</span>
            <span className="block text-center uppercase text-[9px] tracking-[1.5px]">pairings that work</span>
            <div className="overflow-x-scroll scrollbar-none pt-8 pb-4">
                <div className="inline-flex">
                    {
                        paired_products.map((item, index) => {
                            if (item.look_id)
                                return <div key={index}>
                                    <div key={index} className={"text-center"}>
                                        <div className="relative w-[90vw] aspect-square border-2 border-white shadow-lg rounded-[8vw] overflow-hidden mx-5">
                                            <Image src={WEBASSETS + item.asset_path} alt='' layout={"fill"} objectFit={`cover`}/>
                                        </div>
                                        {item.products.map((product, index) => {
                                            if (product['old_product_id'] !== id)
                                                return <div className={"px-1.5 flex flex-col justify-center items-center mt-8"} key={index}>
                                                    <span className="block relative aspect-[2/3] w-1/3 border-2 border-white rounded-[8vw] overflow-hidden shadow-lg">
                                                        <Image src={WEBASSETS + product.asset_id} alt='' layout={"fill"} objectFit={`cover`}/>
                                                    </span>
                                                    <span className="block text-xs font-cursive font-600 mt-2">{product.name}</span>
                                                    <span className="block text-[8px]">{product.tag_line}</span>
                                                    <span className="block text-[8px]"><PriceDisplay prod={product}/></span>
                                                </div>
                                        })}
                                    </div>
                                </div>
                            else
                                return <div key={index} className={"text-center"}>
                                    <div className="relative w-[80vw] aspect-square border-2 border-white shadow-lg rounded-[8vw] overflow-hidden mx-5">
                                        <Image src={WEBASSETS + item.asset_id} alt='' layout={"fill"} objectFit={`cover`}/>
                                    </div>
                                    <span className="block">{item.name}</span>
                                    <span className="block">{item.tag_line}</span>
                                    <span className="block"><PriceDisplay prod={item}/></span>
                                </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userConfig: state.userConfig
    }
}

export default connect(mapStateToProps)(CompleteLook);