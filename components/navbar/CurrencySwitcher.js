/**
 * @params {isMobile} props
 * @constructor
 */

import appSettings from "../../store/appSettings";
import {Fragment, useContext} from "react";
import AppWideContext from "../../store/AppWideContext";


function CurrencySwitcher(props){
  const mobileView = null;
  const {dataStore,updateDataStore} = useContext(AppWideContext);
  const currCurrency = dataStore.currCurrency;
  const currencies = appSettings("currencies");
  const currencyData = appSettings("currency_data");

  let options = null;
  currencies.forEach(currency=>{
    const currencySymbol = currencyData[currency].curr_symbol;
    options = <Fragment>
      {options}
      <option value={currency} {(currCurrency==currency)?'selected="selected"':null}>
        {currencySymbol}{currency.toUpperCase()}
      </option>
    </Fragment>;
  })

  const browserView =
    <select id="currency-switcher" onChange={(event)=>updateDataStore("currCurrency", event.target.value)}>
      {options}
  </select>;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default CurrencySwitcher;