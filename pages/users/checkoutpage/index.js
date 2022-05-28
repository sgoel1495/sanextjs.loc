import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import {Fragment, useContext} from "react";
import AppWideContext from "../../../store/AppWideContext";
import OrderSummary from "../../../components/checkout-page/OrderSummary";
import ShippingAddress from "../../../components/checkout-page/ShippingAddress";

function UsersCheckoutPage () {

    const { dataStore,updateDataStore } = useContext(AppWideContext);
    if(!dataStore.currentOrderId || dataStore.currentOrderId===0)
        updateDataStore("currentOrderId",Date.now())

    const mobileView=null
    const browserView=<Fragment>
        <PageHead url={"/users/profile"} id={"profile"} isMobile={dataStore.mobile}/>
        <Header type={"shopMenu"}/>
        <div>
            <div><ShippingAddress /></div>
            <div><OrderSummary /></div>
        </div>

    </Fragment>



    return (
        <Fragment>
            {(dataStore.mobile) ? mobileView : browserView}
        </Fragment>
    )
}

export default UsersCheckoutPage
/*

 */