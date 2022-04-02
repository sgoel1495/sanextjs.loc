import AppWideContext from "../../store/AppWideContext";
import {Fragment, useContext, useEffect, useState} from "react";
import PageHead from "../PageHead";
import useApiCall from "../../hooks/useApiCall";
import appSettings from "../../store/appSettings";
import NavBar from "../navbar";

/**
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

function ProductPage(props){
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [data, setData] = useState(null);

    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;

    const resp = useApiCall("getProduct", dataStore.apiToken, {product_id:props.hpid});
    useEffect(() => {
        if (resp
            && resp.hasOwnProperty("status")
            && resp.status == 200
            && resp.hasOwnProperty("response")
            && resp.response.hasOwnProperty("data")
        )
            setData(resp.response);
    }, [resp]);

    console.log(resp);
    const mobileView = null;
    const browserView = <Fragment>


    </Fragment>;

    return <div>
        <PageHead url={"/" + props.hpid} id={props.hpid} isMobile={dataStore.mobile}/>
        <div>6-10 day delivery</div>
        <NavBar type={"minimal"}/>
        {(props.isMobile) ? mobileView:browserView }
    </div>;
}
export default ProductPage;