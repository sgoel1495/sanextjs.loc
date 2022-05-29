import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import React, {Fragment, useContext} from "react";
import AppWideContext from "../../../store/AppWideContext";
import OrderSummary from "../../../components/checkout-page/OrderSummary";
import ShippingAddress from "../../../components/checkout-page/ShippingAddress";
import CreateMyAccount from "../../../CreateMyAccount";
import PromoCode from "../../../components/checkout-page/PromoCode";
import GiftAndPayment from "../../../components/checkout-page/GiftAndPayment";
import ReviewOrder from "../../../components/checkout-page/ReviewOrder";

function UsersCheckoutPage () {
    const { dataStore,updateDataStore } = useContext(AppWideContext);
    if(!dataStore.currentOrderId || dataStore.currentOrderId===0)
        updateDataStore("currentOrderId", Date.now())

    const mobileView=null
    const browserView=<Fragment>
        <PageHead url={"/users/profile"} id={"profile"} isMobile={dataStore.mobile}/>
        <Header type={"shopMenu"}/>
        <div>
            <div>
                <ShippingAddress />
            </div>
            <div>
                <PromoCode />
            </div>
            <div>
                <GiftAndPayment />
            </div>
            <div>
                <ReviewOrder />
            </div>
            <div>
                <OrderSummary />
            </div>
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