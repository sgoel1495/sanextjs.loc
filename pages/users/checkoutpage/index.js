import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Link from "next/link";
import React, {Fragment, useContext, useEffect, useState} from "react";
import OrderSummary from "../../../components/checkout-page/OrderSummary";
import ShippingAddress from "../../../components/checkout-page/ShippingAddress/ShippingAddress";
import PromoCode from "../../../components/checkout-page/PromoCode";
import GiftAndPayment from "../../../components/checkout-page/GiftAndPayment";
import ReviewOrder from "../../../components/checkout-page/ReviewOrder";
import AppWideContext from "../../../store/AppWideContext";
import {apiCall} from "../../../helpers/apiCall";
import Image from "next/image";
import AdditionalSizeDetail from "../../../components/checkout-page/mobile-view/AdditionalSizeDetails";
import OrderDetails from "../../../components/checkout-page/mobile-view/OrderDetails";
import {useRouter} from "next/router";
import {getUserObject, refreshCart} from "../../../helpers/addTocart";

function UsersCheckoutPage() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const router = useRouter();
    const [giftPaymentComplete, setGiftPaymentComplete] = useState(false);
    const [active, setActive] = useState(1);

    useEffect(() => {
        if (dataStore && (!dataStore.currentOrderId || dataStore.currentOrderId === "")) updateDataStore("currentOrderId", Date.now().toString());
    }, [dataStore.currentOrderId]);

    useEffect(async () => {
        let user = await getUserObject(dataStore, updateDataStore)
        const gotOrderSummaryCall = await apiCall("getOrderSummary", dataStore.apiToken, {user: user});
       if(gotOrderSummaryCall.status ===200) {
           updateDataStore("orderSummary", {
               ...gotOrderSummaryCall,
           });
       }
       else{
           router.push("/new-arrivals/all")
       }
        await refreshCart(dataStore, updateDataStore)
    }, [dataStore.userServe.email])


    const goBack = () => {
        if (active !== 1) {
            setActive(active - 1);
        } else {
            router.back()
        }
    }

    let ActiveForm = <></>;
    switch (active) {
        case 1:
            ActiveForm = <OrderDetails setActive={setActive}/>;
            break;
        case 2:
            ActiveForm = <ShippingAddress setActive={setActive}/>;
            break;
        case 3:
            ActiveForm = <AdditionalSizeDetail setActive={setActive}/>;
            break;
        case 4:
            ActiveForm = (
                <GiftAndPayment giftPaymentComplete={giftPaymentComplete}
                                updateCompleteness={setGiftPaymentComplete.bind(this)} setActive={setActive}/>
            );
            break;
        case 5:
            ActiveForm = <ReviewOrder setActive={setActive}/>;
            break;
    }
    const mobileView = (
        <div>
            <div className='flex flex-row justify-between pt-5 px-3'>
                <div className='flex items-center'>
                    <span className={"px-2 font-600 border-2"} onClick={goBack}>
                        {"<"}
                    </span>
                </div>
                <div className=''>
                    <Link href='/'>
                        <Image src={WEBASSETS + "/assets/SALT_logo.png"} alt='fav' width={100} height={40}/>
                    </Link>
                </div>
                <p className='font-semibold'>{active}/5</p>
            </div>
            {ActiveForm}
        </div>
    );
    const browserView = (
        <Fragment>
            <PageHead url={"/users/profile"} id={"profile"} isMobile={dataStore.mobile}/>
            <Header type={"shopMenu"}/>
            <div className='w-[970px] xl:w-[1170px] mx-auto my-28 flex gap-6'>
                <div className='flex-[8]'>
                    <ShippingAddress/>
                    <PromoCode/>
                    <GiftAndPayment/>
                    <ReviewOrder/>
                </div>
                <div className='flex-[4]'>
                    <OrderSummary/>
                    <div id={"paymentButton"}/>
                </div>
            </div>

        </Fragment>
    );

    return (
        <Fragment>
            {dataStore.orderSummary && (dataStore.mobile ? mobileView : browserView)}
        </Fragment>
    );
}

export default UsersCheckoutPage;
