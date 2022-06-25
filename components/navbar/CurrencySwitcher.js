/**
 * @params {isMobile} props
 * @constructor
 */

import appSettings from "../../store/appSettings";
import {Fragment, useContext} from "react";
import AppWideContext from "../../store/AppWideContext";


function CurrencySwitcher(props) {

    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const currCurrency = dataStore.currCurrency;
    const currencies = appSettings("currencies");
    const currencyData = appSettings("currency_data");

    const focusStyle = "focus:ring-0 focus:border-black focus:shadow-none focus:ring-offset-transparent";

    let options = null;
    currencies.forEach(currency => {
        const currencySymbol = currencyData[currency].curr_symbol;
        options = <Fragment>
            {options}
            <option value={currency}>
                {currencySymbol}{currency.toUpperCase()}
            </option>
        </Fragment>;
    })

    const updateCurrency = (c)=>{
        updateDataStore("currCurrency", c)
        updateDataStore("currSymbol",currencyData[c].curr_symbol)
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
        <div className={`${height} flex items-center`}>
            <select
                id="currency-switcher"
                className={`border-0 border-b py-0 pl-1 pr-6 text-sm bg-transparent ${focusStyle}`}
                value={currCurrency}
                onChange={e=>updateCurrency(e.target.value)}
            >
                {options}
            </select>
            {
                props.type ==="menu" && <div className={"w-full h-full bg-white absolute top-0"}/>
            }
        </div>
    );

    const mobileView = (
        <div className={`${height} flex items-center right-0 absolute pr-2`}>
            <select
                id="currency-switcher"
                className={`border-0 border-b py-0 pl-1 pr-6 text-sm bg-transparent ${focusStyle}`}
                value={currCurrency}
                onChange={(event) => updateDataStore("currCurrency", event.target.value)}
            >
                {options}
            </select>
        </div>
    );

    return props.isMobile ? mobileView : browserView
}

export default CurrencySwitcher;
