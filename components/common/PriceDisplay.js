import React from 'react';
import appSettings from "../../store/appSettings";
import currencyFormatter from "../../helpers/currencyFormatter";
import {connect} from "react-redux";

const PriceDisplay = ({userConfig, prod, isSale, qty = 1}) => {
    const currCurrency = userConfig.currCurrency;
    const curr = currCurrency.toUpperCase();
    const currencyData = appSettings("currency_data");
    const usd = currencyData["usd"].curr_symbol;
    let price = typeof (prod.price) === typeof("")? parseInt(prod.price.replace(",", "")) : prod.price
    let sale_price = typeof (prod.sale_price) === typeof("") ? prod.sale_price ? parseInt(prod.sale_price.replace(",", "")) : 0 : prod.sale_price
    if (isSale)

        return <>
            {
                (currCurrency === "inr" || !prod.usd_price) ?
                    <>
                        <span className={prod.is_sale ? "line-through" : ""}>{currencyFormatter(curr).format(price * qty).split(".")[0]}</span>
                        {
                            prod.is_sale && <span className={"text-rose-600 ml-2 font-600 "}>{currencyFormatter(curr).format(sale_price * qty).split(".")[0]}</span>
                        }
                    </>
                    :
                    <>{usd} {prod.usd_price}</>
            }
        </>
    return (
        <>
            {
                (currCurrency === "inr" || !prod.usd_price) ?
                    <>
                        <span className={prod.show_sale_price === "true" ? "line-through" : ""}>{currencyFormatter(curr).format(price * qty).split(".")[0]}</span>
                        {
                            prod.show_sale_price === "true" &&
                            <span className={"text-rose-600 ml-2 font-600 "}>{currencyFormatter(curr).format(sale_price * qty).split(".")[0]}</span>
                        }
                    </>
                    :
                    <>{usd} {prod.usd_price}</>
            }
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        userConfig: state.userConfig
    }
}

export default connect(mapStateToProps)(PriceDisplay);