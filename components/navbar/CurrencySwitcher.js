/**
 * @params {isMobile} props
 * @constructor
 */

import appSettings from "../../store/appSettings";
import React, {Fragment, useContext} from "react";
import AppWideContext from "../../store/AppWideContext";
import {connect} from "react-redux";
import {setCurrency, setCurrencySymbol} from "../../ReduxStore/reducers/userConfigSlice";


function CurrencySwitcher(props) {
    const currCurrency = props.userConfig.currCurrency;
    const currencies = appSettings("currencies");
    const currencyData = appSettings("currency_data");
    const [show, setShow] = React.useReducer((state) => !state, false)
    const focusStyle = "focus:ring-0 focus:border-black focus:shadow-none focus:ring-offset-transparent";

    let options = null;
    currencies.forEach(currency => {
        const currencySymbol = currencyData[currency].curr_symbol;
        options = <Fragment>
            {options}
            <option value={currency} className={props.isMobile ? "bg-black text-white" : ""}>
                {currencySymbol}{currency.toUpperCase()}
            </option>
        </Fragment>;
    })

    const updateCurrency = (c) => {
        props.setCurrency(c);
        props.setCurrencySymbol(currencyData[c].curr_symbol)
    }

    let height;
    switch (props.type) {
        case "shopMenu":
            height = "h-12"
            break;
        default:
            height = "h-6"
    }

    const browserView = (
        <div className={`${height} flex items-center w-16`}>
            {
                props.type !== "menu" && <select
                    id="currency-switcher"
                    className={`border-0 border-b py-0 pl-1 pr-6 text-sm bg-transparent ${focusStyle}`}
                    value={currCurrency}
                    onChange={e => updateCurrency(e.target.value)}
                >
                    {options}
                </select>
            }
        </div>
    );

    const mobileView = (
        <div className={`${height} flex items-center pr-2 ` + [props.type === "hamMenu" ? "ml-2" : "right-0 absolute"]}>
            <div className={"relative"}>
                <span className={`border-0 border-b py-0 px-1 text-sm bg-transparent ${props.className} ${focusStyle} `} onClick={setShow}>
                    {currencyData[currCurrency].curr_symbol}{currCurrency.toUpperCase()} <span className={"pl-4 down-arrow"}/>
                </span>
                <div className={show ? "block absolute right-0 top-[101%]" : "hidden"}>
                    {
                        currencies.map((currency, index) => {
                            const currencySymbol = currencyData[currency].curr_symbol;
                            return <div className={"bg-black text-white text-[11px] px-10 py-1 " + [index === 0 && "border-b border-white"]} key={index} onClick={() => {
                                updateCurrency(currency);
                                setShow();
                            }}>
                                {currencySymbol}{currency.toUpperCase()}
                            </div>
                        })
                    }
                </div>
            </div>

        </div>
    );

    return props.isMobile ? mobileView : browserView
}

const mapStateToProps = (state) => {
    return {
        userConfig: state.userConfig
    }
}

export default connect(mapStateToProps, {setCurrency, setCurrencySymbol})(CurrencySwitcher);
