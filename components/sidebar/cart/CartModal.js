import React from 'react';
import AppWideContext from "../../../store/AppWideContext";
import Link from "next/link";
import Image from "next/image";
import ProductCartView from "../../common/ProductCartView";
import qtyInCart from "../../../helpers/qtyInCart";
import Footer from "../../footer/Footer";
import ReturnAndFaq from "./ReturnAndFAQ";
import MediaBuzz from "./MediaBuzz";
import Testimonials from "./Testimonials";
import 'swiper/css';
import {useRouter} from "next/router";

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
                        <Image src={WEBASSETS + '/assets/images/SALT_logo.png'} layout="fill" objectFit="contain"/>
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
    const [tailoredProduct, setTailoredProduct] = React.useState(null)
    const [showEditTailored, setShowEditTailored] = React.useState(false)
    const [showViewTailored, setShowViewTailored] = React.useState(false)

    dataStore.userCart ? console.log(dataStore.userCart) : console.log("Cart empty") // TODO to be removed during integrations

    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;


    let mockProduct = [
        {
            asset_id: "/assets/Dresses-Bobby-FauxWrapPolkaDress/thumb.jpg",
            cart_id: "Dresses-Bobby-FauxWrapPolkaDress+X",
            color: {name: "MULTICOLOR"},
            is_tailor: false,
            multi_color: false,
            name: "Bobbyl",
            order: {
                dress_length: "",
                is_sale: false,
                is_tailor: false,
                product_id: "Dresses-Bobby-FauxWrapPolkaDress",
                qty: "1",
                size: "XS",
                sleeve_length: ""
            },
            price: 2950,
            product_id: "Dresses-Bobby-FauxWrapPolkaDress",
            qty: "1",
            size: "XS",
            tag_line: "Faux Wrap Polka Dress",
            usd_price: 52,
        },
        {
            asset_id: "/assets/Dresses-Bobby-FauxWrapPolkaDress/thumb.jpg",
            cart_id: "Dresses-Bobby-FauxWrapPolkaDress+XS",
            color: {name: "MULTICOLOR"},
            is_tailor: false,
            multi_color: false,
            name: "Bobby",
            order: {
                dress_length: "",
                is_sale: false,
                is_tailor: false,
                product_id: "Dresses-Bobby-FauxWrapPolkaDress",
                qty: "1",
                size: "XS",
                sleeve_length: ""
            },
            price: 2950,
            product_id: "Dresses-Bobby-FauxWrapPolkaDress",
            qty: "1",
            size: "XS",
            tag_line: "Faux Wrap Polka Dress",
            usd_price: 52,
        },
    ] //TODO to be removed during integrations

    const quickEditTailored = (p) => {
        setTailoredProduct(p)
        setShowEditTailored(true)
    }

    const quickViewTailored = (p) => {
        setTailoredProduct(p)
        setShowViewTailored(true)
    }

    const updateTailored = (key, value) => {
        tailoredProduct[key] = value
        setTailoredProduct(tailoredProduct)
    }

    const closeTailored = () => {
        setShowEditTailored(false)
        setShowViewTailored(false)
    }

    const saveTailored = () => {
        //@TODO CART UPDATE FOR TAILORED
        closeTailored()
    }


    const mobileView = () => {
        let returnValue =
            <div className="max-w-[400px] h-full bg-white overflow-y-auto overflow-x-hidden m-1 p-2">
                <div className={`text-center font-600 tracking-wider px-1 border-2 border-solid relative`}>
                    {
                        dataStore.userCart.length > 0
                            ? <>
                                    <span className={"flex justify-between items-center"}>
                                        <span className={" pt-1"}> YOUR CART: </span>
                                        <span className={" pt-1"}>{dataStore.currSymbol} 1000</span>
                                        <span className={`w-5 h-5 relative`} onClick={() => router.back()}>
                                            <Image src={WEBASSETS + "/assets/images/cancel.png"} layout="fill" objectFit="contain"/>
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
                        <Link href="/users/checkoutpage">
                            <a
                                className="flex-1 w-full px-1 py-1 text-xs"
                            >
                                Continue<br/>
                                Shopping
                            </a>
                        </Link>
                        <Link href="/users/checkoutpage">
                            <a
                                className="flex-1 text-white bg-black w-full px-1 py-1 text-xs"
                            >
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

        if (showEditTailored || showViewTailored) {
            returnValue = <div>
                <div onClick={closeTailored}>X</div>
                <div>
                    {(showEditTailored) ? <div>Edit</div> : null}
                    {(showViewTailored) ? <div>View</div> : null}
                </div>
                <div>{tailoredProduct.name}</div>
                <div>MEASUREMENTS (INCHES)</div>
                <div>
                    <div>
                        <label htmlFor="bust">BUST</label>
                        <input type="number" name="bust"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("bust", e.target.value)
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                    </div>
                    <div>
                        <label htmlFor="waist">WAIST</label>
                        <input type="number" name="waist"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("waist", e.target.value)
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                    </div>
                    <div>
                        <label htmlFor="wearing_waist">WEARING WAIST / STOMACH</label>
                        <input type="number" name="wearing_waist"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("wearing_waist", e.target.value)
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                    </div>
                    <div>
                        <label htmlFor="hips">HIPS</label>
                        <input type="number" name="hips"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("hips", e.target.value)
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                    </div>
                    <div>
                        <label htmlFor="biceps">BICEPS</label>
                        <input type="number" name="biceps"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("biceps", e.target.value)
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                    </div>
                    <div>
                        <label htmlFor="height_f">Height</label>
                        <input type="text" name="height_f"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("height_f", e.target.value + " ft")
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                        <input type="text" name="height_i"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("height_i", e.target.value + " inch")
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                    </div>
                    <div>
                        <label htmlFor="shoulder">SHOULDER</label>
                        <input type="number" name="shoulder"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("shoulder", e.target.value)
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                    </div>
                    <div>
                        <label htmlFor="others">OTHERS</label>
                        <input type="text" name="others"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("others", e.target.value)
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                    </div>
                    {(showEditTailored)
                        ? <div onClick={saveTailored}>SAVE</div>
                        : null
                    }
                    {(showViewTailored)
                        ? <div onClick={closeTailored}>CLOSE</div>
                        : null
                    }
                </div>
            </div>
        }

        return (
            <>
                <BareHeading/>
                {returnValue}
                <Footer isMobile={true} minimal={true} color={"#f5f5f5"}/>
            </>
        )
    }

    const browserView = () => {
        let returnValue =
            <div className={`bg-theme-900/50 fixed inset-0 z-50`} onClick={closeModal}>
                <div
                    className="max-w-[400px] h-full bg-white overflow-y-auto overflow-x-hidden ml-auto p-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/*<button className={`w-8 h-8 float-right`} onClick={closeModal}>*/}
                    {/*    <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8`} viewBox="0 0 24 24">*/}
                    {/*        <path*/}
                    {/*            d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/>*/}
                    {/*    </svg>*/}
                    {/*</button>

                     TODO to be removed as Website doesn't have this comp.

                    */}

                    <div className={`text-center font-600 tracking-wider mb-10`}>
                        <p className={`text-sm mb-6`}>YOUR CART {qtyInCart(dataStore)}</p>
                        {(dataStore.userCart.length > 0)
                            ? <>
                                <Link href="/users/checkoutpage">
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
                                <Link href="/new-arrivals/all">
                                    <a className="flex justify-center underline uppercase text-sm mt-8">Continue
                                        Shopping</a>
                                </Link>
                            </>
                        }

                        {(dataStore.userCart.length > 0)
                            ? <Link href="/users/checkoutpage">
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

        if (showEditTailored || showViewTailored) {
            returnValue = <div>
                <div onClick={closeTailored}>X</div>
                <div>
                    {(showEditTailored) ? <div>Edit</div> : null}
                    {(showViewTailored) ? <div>View</div> : null}
                </div>
                <div>{tailoredProduct.name}</div>
                <div>MEASUREMENTS (INCHES)</div>
                <div>
                    <div>
                        <label htmlFor="bust">BUST</label>
                        <input type="number" name="bust"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("bust", e.target.value)
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                    </div>
                    <div>
                        <label htmlFor="waist">WAIST</label>
                        <input type="number" name="waist"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("waist", e.target.value)
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                    </div>
                    <div>
                        <label htmlFor="wearing_waist">WEARING WAIST / STOMACH</label>
                        <input type="number" name="wearing_waist"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("wearing_waist", e.target.value)
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                    </div>
                    <div>
                        <label htmlFor="hips">HIPS</label>
                        <input type="number" name="hips"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("hips", e.target.value)
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                    </div>
                    <div>
                        <label htmlFor="biceps">BICEPS</label>
                        <input type="number" name="biceps"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("biceps", e.target.value)
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                    </div>
                    <div>
                        <label htmlFor="height_f">Height</label>
                        <input type="text" name="height_f"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("height_f", e.target.value + " ft")
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                        <input type="text" name="height_i"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("height_i", e.target.value + " inch")
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                    </div>
                    <div>
                        <label htmlFor="shoulder">SHOULDER</label>
                        <input type="number" name="shoulder"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("shoulder", e.target.value)
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                    </div>
                    <div>
                        <label htmlFor="others">OTHERS</label>
                        <input type="text" name="others"
                               onChange={(showEditTailored ? (e) => {
                                   updateTailored("others", e.target.value)
                               } : () => void 0)}
                               disabled={!!(showViewTailored)}/>
                    </div>
                    {(showEditTailored)
                        ? <div onClick={saveTailored}>SAVE</div>
                        : null
                    }
                    {(showViewTailored)
                        ? <div onClick={closeTailored}>CLOSE</div>
                        : null
                    }
                </div>
            </div>
        }

        return returnValue
    };

    return props.isMobile ? mobileView() : browserView()
}

export default CartModal;