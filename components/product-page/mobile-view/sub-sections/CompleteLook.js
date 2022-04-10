import React, {useContext} from 'react';
import Image from "next/image";
import AppWideContext from "../../../../store/AppWideContext";
import appSettings from "../../../../store/appSettings";

const CompleteLook = ({paired_products, id}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;
    return (
        <div className="py-5">
            <span className="block text-center text-xl">Complete The Look</span>
            <span className="block text-center uppercase text-[9px] tracking-[1.5px]">pairings that work</span>
            <div className="overflow-x-scroll pt-8 pb-4">
                <div className="inline-flex">
                    {
                        paired_products.map((item, index) => {
                            if (item.look_id)
                                return <div key={index}>
                                    <div key={index} className={"text-center"}>
                                        <div
                                            className="relative w-[90vw] aspect-square border-2 border-white shadow-lg rounded-[8vw] overflow-hidden mx-5"
                                        >
                                            <Image src={WEBASSETS + item.asset_path} layout={"fill"} objectFit={`cover`}/>
                                        </div>
                                        {
                                            item.products.map((product, index) => {
                                                if (product['old_product_id'] !== id)
                                                    return <div className={"px-1.5 flex flex-col justify-center items-center mt-8"} key={index}>
                                                        <span className="block relative aspect-[2/3] w-1/3 border-2 border-white rounded-[8vw] overflow-hidden shadow-lg">
                                                            <Image src={WEBASSETS + product.asset_id} layout={"fill"} objectFit={`cover`}/>
                                                        </span>
                                                        <span className="block">{product.name}</span>
                                                        <span className="block">{product.tag_line}</span>
                                                        <span className="block">{currencySymbol} {currCurrency === "inr" ? product.price : product.usd_price}</span>
                                                    </div>
                                            })
                                        }
                                    </div>
                                </div>
                            else
                                return <div key={index} className={"text-center"}>
                                    <div
                                        className="relative w-[80vw] aspect-square border-2 border-white shadow-lg rounded-[8vw] overflow-hidden mx-5"
                                    >
                                        <Image src={WEBASSETS + item.asset_id} layout={"fill"} objectFit={`cover`}/>
                                    </div>
                                    <span className="block">{item.name}</span>
                                    <span className="block">{item.tag_line}</span>
                                    <span className="block">{currencySymbol} {currCurrency === "inr" ? item.price : item.usd_price}</span>
                                </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default CompleteLook;