import React, {useEffect} from 'react';
import AppWideContext from "../../../store/AppWideContext";
import Link from "next/link";
import Image from "next/image";
import ProductCartView from "../../common/ProductCartView/ProductCartView";
import qtyInCart from "../../../helpers/qtyInCart";
import Footer from "../../footer/Footer";
import ReturnAndFaq from "./ReturnAndFAQ";
import MediaBuzz from "./MediaBuzz";
import Testimonials from "./Testimonials";
import 'swiper/css';
import {useRouter} from "next/router";
import {refreshCart} from "../../../helpers/addTocart";

const BareHeading = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    return (
        <div className={"flex-1 sticky top-0 left-0 drop-shadow-sm text-center z-10"}>
            <Link href={"/salt/shipping-returns"}>
                <span className={"uppercase block bg-black text-white text-xs hover:underline py-1"}>6-10 day delivery</span>
            </Link>
            <Link href={"/"}>
                <div className={"bg-[#ffffffe6]"}>
                    <span className="relative w-16 h-8 inline-block">
                        <Image src={WEBASSETS + '/assets/images/SALT_logo.png'} layout="fill" objectFit="contain" alt={""}/>
                    </span>
                </div>
            </Link>
        </div>
    )
}

function CartModal(props) {
    const router = useRouter();
    const {dataStore, updateDataStore} = React.useContext(AppWideContext);
    const {closeModal} = props;

    useEffect(() => {
        refreshCart(dataStore, updateDataStore);
    }, [dataStore.userServe])

    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    let total = 0;
    dataStore.userCart.forEach((item) => {
        total += item.qty * (dataStore.currCurrency === "inr" ? item.price : item.usd_price)
    })
    const mobileView = () => {
        let returnValue =
            <div className="max-w-[400px] h-full bg-white overflow-y-auto overflow-x-hidden m-1 p-2">
                <div className={`text-center font-600 tracking-wider px-1 border-2 border-solid relative`}>
                    {
                        dataStore.userCart.length > 0
                            ? <>
                                    <span className={"flex justify-between items-center"}>
                                        <span className={" pt-1"}> YOUR CART: </span>
                                        <span className={" pt-1"}>{dataStore.currSymbol} {total}</span>
                                        <span className={`w-5 h-5 relative`} onClick={() => router.back()}>
                                            <Image src={WEBASSETS + "/assets/images/cancel.png"} layout="fill" objectFit="contain" alt={""}/>
                                        </span>
                                    </span>
                                <div className={"my-1 border-solid border-b-2 border-neutral-300"}/>
                                <ProductCartView isMobile={props.isMobile}/>

                            </>
                            : <>
                                <span className={`w-4 h-4 block absolute right-1 top-1`} onClick={() => router.back()}>
                                    <Image
                                        src={WEBASSETS + "/assets/images/cancel.png"}
                                        alt="cancel"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </span>
                                <p className={`px-1 text-sm mt-3 mb-6 text-center`}>YOUR CART {qtyInCart(dataStore)}</p>

                                <span className={`block relative w-16 h-16 mx-auto mb-4`}>
                                                <Image
                                                    id="emptycart"
                                                    src={WEBASSETS + "/assets/images/empty_bag.png"}
                                                    alt="empty_cart"
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                                </span>
                                <h5 className={`text-h5 mb-2`}>Hey, it feels so light!</h5>
                                <p className={`text-sm mb-4 px-1`}>There is nothing in your cart. Let&apos;s add some
                                    items.</p>
                                <Link href="/new-arrivals/all">
                                    <a className="flex justify-center underline uppercase text-sm mt-8">
                                        Continue Shopping
                                    </a>
                                </Link>
                            </>
                    }

                </div>
                {dataStore.userCart.length > 0 ?
                    <div className={"inline-flex w-full text-center m-auto my-6"}>
                        <Link href="/new-arrivals/all">
                            <a className="flex-1 w-full px-1 py-1 text-xs">
                                Continue<br/>
                                Shopping
                            </a>
                        </Link>
                        <Link href="/users/checkoutpage">
                            <a className="flex-1 text-white bg-black w-full px-1 py-1 text-xs">
                                PROCEED&nbsp;TO<br/>
                                CHECKOUT
                            </a>
                        </Link>
                    </div> : null
                }
                <ReturnAndFaq/>
                <MediaBuzz/>
                <Testimonials/>
            </div>

        return (
            <>
                <BareHeading/>
                {returnValue}
                <Footer isMobile={true} minimal={true} color={"#f5f5f5"}/>
            </>
        )
    }

    const browserView = () => {
        return <div className={`bg-theme-900/50 fixed inset-0 z-50`} onClick={closeModal}>
            <div
                className="max-w-[400px] h-full bg-white overflow-y-auto overflow-x-hidden ml-auto p-4"
                onClick={(e) => e.stopPropagation()}
            >

                <div className={`text-center font-600 tracking-wider mb-10`}>
                    <p className={`text-sm mb-6`}>YOUR CART {qtyInCart(dataStore)}</p>
                    {(dataStore.userCart.length > 0)
                        ? <>
                            <Link href={dataStore.userServe.email ? "/users/checkoutpage" : "/order/guestcheckout"}>
                                <a className="inline-flex mb-5 text-white bg-black px-5 py-3">CHECKOUT</a>
                            </Link>
                            <ProductCartView/>
                        </>
                        : <>
                                <span className={`block relative w-16 h-16 mx-auto mb-4`}>
                            <Image
                                id="emptycart"
                                src={WEBASSETS + "/assets/images/empty_bag.png"}
                                alt="empty_cart"
                                layout="fill"
                                objectFit="cover"
                            />
                        </span>
                            <h5 className={`text-h5 mb-2`}>Hey, it feels so light!</h5>
                            <p className={`text-sm mb-4`}>There is nothing in your cart. Let&apos;s add some
                                items.</p>
                            <Link href={"/new-arrivals/all"}>
                                <a className="flex justify-center underline uppercase text-sm mt-8">Continue
                                    Shopping</a>
                            </Link>
                        </>
                    }

                    {(dataStore.userCart.length > 0)
                        ? <Link href={dataStore.userServe.email ? "/users/checkoutpage" : "/order/guestcheckout"}>
                            <a className="inline-flex my-5 text-white bg-black px-5 py-3">CHECKOUT</a>
                        </Link>
                        : null
                    }
                </div>
                <ReturnAndFaq/>
                <MediaBuzz/>
                <Testimonials/>
            </div>
        </div>
    };

    return props.isMobile ? mobileView() : browserView()
}

export default CartModal;