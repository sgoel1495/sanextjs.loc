import React, { Fragment, useContext, useState } from "react";
import AppWideContext from "../../../store/AppWideContext";
import OrderSummary from "../OrderSummary";
import PromoCode from "../PromoCode";
import Image from "next/image";

function OrderDetails(props) {
    const { dataStore } = useContext(AppWideContext);
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const mobileView = (
        <Fragment>
            <OrderSummary />
            <PromoCode />
            <div>
                <h4 className='text-xs font-bold text-gray-400 text-center pb-4'>AVAILABLE PAYMENT METHODS</h4>
                <ul className='flex justify-around'>
                    <li>
                        <Image src={WEBASSETS + "/assets/images/icons_v1/cod.png"} alt='fav' width={40} height={40} />
                    </li>
                    <li>
                    <svg viewBox="0 0 28 25" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 15a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0v-5zm6 0a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0v-5zm6 0a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0v-5zM1 25a1 1 0 0 1 0-2h20a1 1 0 0 1 0 2H1zm0-13c-.978 0-1.374-1.259-.573-1.82l10-7a1 1 0 0 1 1.146 0l1.426 1L13 9l1 3H1zm3.172-2h8.814l.017-3.378L11 5.221 4.172 10z" fill="rgba(124, 124, 124, 1)"></path>
                  <path d="M20 16a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm3.663-7H27v2h-3.338c-.162 2.156-.85 4.275-2.057 6.352l-1.21-.704c1.084-1.863 1.703-3.744 1.863-5.648H13V7h9.258c-.16-1.904-.78-3.785-1.863-5.648l1.21-.704C22.814 2.725 23.501 4.844 23.663 7zm-4.058 7.648l-1.21.704C17 12.955 16.3 10.502 16.3 8c0-2.501.701-4.955 2.095-7.352l1.21.704C18.332 3.54 17.7 5.754 17.7 8c0 2.246.632 4.46 1.905 6.648z" fill="rgba(173, 173, 173, 1)"></path>
                </svg>
                    </li>
                    <li>
                        <Image src={WEBASSETS + "/assets/images/icons_v1/cod.png"} alt='fav' width={40} height={40} />
                    </li>
                    <li>
                        <Image src={WEBASSETS + "/assets/images/icons_v1/cod.png"} alt='fav' width={40} height={40} />
                    </li>
                    <li>
                        <Image src={WEBASSETS + "/assets/images/icons_v1/paytm.svg"} alt='fav' width={40} height={40} />
                    </li>
                </ul>
                <div className='fixed h-auto bg-black w-full left-0 right-0 bottom-0 mt-4'>
                    <p
                        className='uppercase py-3 text-white text-center'
                        onClick={() => {
                            props.setActive(2);
                        }}
                    >
                        proceed to Checkout
                    </p>
                </div>
            </div>
        </Fragment>
    );
    const browserView = null;

    return dataStore.mobile ? mobileView : browserView;
}

export default OrderDetails;
