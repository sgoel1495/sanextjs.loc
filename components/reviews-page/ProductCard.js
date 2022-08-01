import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {apiDictionary} from "../../helpers/apiDictionary";
import AppWideContext from "../../store/AppWideContext";
import appSettings from "../../store/appSettings";

const ProductCard = ({product}) => {
    const {dataStore} = React.useContext(AppWideContext);
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [data, setData] = React.useState({})
    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings('currency_data');
    const currencySymbol = currencyData[currCurrency].curr_symbol;

    React.useEffect(() => {
        if (product) {

            const callObject = apiDictionary("getProduct", dataStore.apiToken, {product_id: product});

            fetch(callObject.url, callObject.fetcher)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    if (json && json.status === 200)
                        setData(json.response);
                })
        }
    }, [dataStore.apiToken, product])

    return (
        <Link href={product}>
            <div className={"flex w-80 border-2 border-grey mr-2"}>
                <div className={"p-5 w-40"}>
                    <span className={`block relative w-full aspect-square`}>
                        <Image src={WEBASSETS + "/assets/" + product + "/square-crop.jpg"} layout={`fill`} objectFit={`cover`}/>
                    </span>
                </div>
                <div className={"w-40 flex flex-col justify-center items-center"}>
                    <div className={"text-base font-600"}>{data.name}</div>
                    <div className={"text-xs font-200"}>{data.tag_line}</div>
                    <div className={"text-xs font-900"}>{currencySymbol} {currCurrency === 'inr' ? data.price : data.usd_price}</div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;