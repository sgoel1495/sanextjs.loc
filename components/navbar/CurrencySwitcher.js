/**
 * @params {isMobile} props
 * @constructor
 */

import appSettings from "../../store/appSettings";
import {Fragment, useContext} from "react";
import AppWideContext from "../../store/AppWideContext";


function CurrencySwitcher(props) {
    const mobileView = null;
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const currCurrency = dataStore.currCurrency;
    const currencies = appSettings("currencies");
    const currencyData = appSettings("currency_data");

    const focusStyle = " focus:outline-0 focus:border-black focus:shadow-none focus:ring-offset-transparent";

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

    const browserView = (
        <select id="currency-switcher" className={"border-0 border-b py-0 pl-1 pr-6 text-sm bg-transparent" + focusStyle} value={currCurrency}
                onChange={(event) => updateDataStore("currCurrency", event.target.value)}>
            {options}
        </select>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default CurrencySwitcher;
