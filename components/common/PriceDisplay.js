import React from 'react';
import appSettings from "../../store/appSettings";
import currencyFormatter from "../../helpers/currencyFormatter";
import {connect} from "react-redux";

const PriceDisplay = ({userConfig, prod, isSale}) => {
    const currCurrency = userConfig.currCurrency;
    const curr = currCurrency.toUpperCase();
    const currencyData = appSettings("currency_data");
    const inr = currencyData["inr"].curr_symbol;
    const usd = currencyData["usd"].curr_symbol;
    if(isSale)
        return <>
            {
                (currCurrency === "inr" || !prod.usd_price) ?
                    <>
                        <span className={prod.is_sale ? "line-through" : ""}>{isNaN(parseInt(prod.price)) ? currencyFormatter(curr).format(prod.price).split(".")[0] : prod.price}</span>
                        {
                            prod.is_sale && <span className={"text-rose-600 ml-2 font-600 "}>{inr}{prod.sale_price}</span>
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
                        <span className={prod.show_sale_price === "true" ? "line-through" : ""}>{currencyFormatter(curr).format(prod.price).split(".")[0]}</span>
                        {
                            prod.show_sale_price === "true" && <span className={"text-rose-600 ml-2 font-600 "}>{inr}{prod.sale_price}</span>
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