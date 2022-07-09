import Link from "next/link";
import Image from "next/image";
import React, {Fragment, useContext, useState} from "react";
import ReactDom from "react-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay} from "swiper";
import "swiper/css";
import AppWideContext from "../../store/AppWideContext";
import ProductCartView from "../common/ProductCartView";
import qtyInCart from "../../helpers/qtyInCart";
import Footer from "../footer/Footer";

SwiperCore.use([Autoplay]);

/**
 * @todo No api for media buzz or testimonial. Hardcoded.
 * @params {isMobile} props
 * @constructor
 */

function CartModal(props) {
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const {closeModal} = props;
    const [tailoredProduct, setTailoredProduct] = useState(null)
    const [showEditTailored, setShowEditTailored] = useState(false)
    const [showViewTailored, setShowViewTailored] = useState(false)

    dataStore.userCart ? console.log(dataStore.userCart) : console.log("Cart empty") // TODO to be removed during integrations

    const imageClass = "block relative w-40 h-40";
    const blockHeader = "border-4 border-theme-200 p-2 uppercase mb-5 tracking-wide mx-5"

    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const returnPolicy = (
        <>
            <Link href="#faq_slides">
                <a className={`block ${blockHeader} mt-10`}>
                    <h6 className={`text-h6 font-600 text-center mb-1`}>Our Return Policy</h6>
                    <ul className={`text-theme-600 text-xs`}>
                        <li key="money-back">Money Back Guarantee For Pre-paid.</li>
                        <li key="exchange-size">You can exchange the size.</li>
                        <li key="store-credit">Get a store credit or get a full refund For Pre-paid.</li>
                        <li key="no-question">No questions asked.</li>
                    </ul>
                </a>
            </Link>
            <div id="faq_slides">
                <Swiper
                    slidesPerView={1.25}
                    spaceBetween={5}
                    autoplay={{
                        "delay": 2500,
                        "disableOnInteraction": false
                    }}
                    className={`w-full`}
                >
                    {[...Array(6)].map((_, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={`p-2 bg-theme-50 border border-theme-200`}>
                                    <span className={`block relative w-full h-64`}>
                                        <Image src={WEBASSETS + `/assets/faq/S${index + 1}.jpg`} alt="return policy"
                                               layout="fill" objectFit="cover"/>
                                    </span>
                                </div>
                            </SwiperSlide>
                        )
                    })}

                </Swiper>
            </div>
        </>
    );

    const mediaBuzzData = [
        {
            link: "https://economictimes.indiatimes.com/small-biz/startups/newsbuzz/fashion-tech-firm-salt-attire-launches-its-offline-experience-store-in-gurugram/articleshow/70765514.cms",
            media: WEBASSETS + "/assets/images/media/the-economic-times/logo/economic_times.png",
            alt: "media-0011",
            headline: "The Economic Times"
        },
        {
            link: "http://www.newindianexpress.com/cities/delhi/2019/aug/21/salt-attire-one-stop-shop-for-all-your-clothing-needs-in-gurugram-2022068.html",
            media: WEBASSETS + "/assets/images/media/the-new-india-express/logo/the_new_india_express.png",
            alt: "media-0010",
            headline: "The New Indian Express"
        },
        {
            link: "https://yourstory.com/2017/09/dipti-tolanis-journey",
            media: WEBASSETS + "/assets/images/media/yourstory/logo/yourstory.png",
            alt: "media-0005",
            headline: "Yourstory"
        },
        {
            link: "https://www.business-standard.com/article/news-ians/turn-monotonous-office-wear-into-party-ready-look-119061200529_1.html",
            media: WEBASSETS + "/assets/images/media/business-standard/logo/business_standard.png",
            alt: "media-0006",
            headline: "Business Standard"
        },
        {
            link: "https://www.indiatoday.in/magazine/supplement/story/20181001-the-re-inventors-1345733-2018-09-21",
            media: WEBASSETS + "/assets/images/media/india-today/logo/india_today.png",
            alt: "media-0002",
            headline: "India Today"
        },
        {
            link: "https://www.bloombergquint.com/business/startup-street-how-a-hunt-for-workwear-turned-into-a-bespoke-clothing-startup",
            media: WEBASSETS + "/assets/images/media/bloomberg-quint/logo/bloomberg_quint.png",
            alt: "media-0007",
            headline: "Bloomberg Quint"
        }
    ];
    const mediaBuzz = () => {
        return (
            <div className={`my-12`}>
                <div className={blockHeader}>
                    <h5 className={`text-h5 font-600 text-center`}>Media Buzz</h5>
                </div>
                <Swiper
                    slidesPerView={1.25}
                    spaceBetween={5}
                    autoplay={{
                        "delay": 2500,
                        "disableOnInteraction": false
                    }}
                    className={`w-full`}
                >
                    {mediaBuzzData.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={`p-1.5 bg-yellow-600 border border-theme-200`}>
                                    <div className="bg-white p-5">
                                        <span className={`block relative w-36 h-36 mx-auto`}>
                                            <Image src={item.media} alt={item.alt} layout="fill" objectFit="contain"/>
                                        </span>
                                        <p className={`text-right font-600 text-xs`}>- {item.headline}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}

                </Swiper>
            </div>
        )
    }

    const testimonialsData = [
        {
            link: "https://www.facebook.com/hiraldhaval.shah/posts/3789743831052915",
            name: "Hiral Dhaval Shah",
            time: "19/09/2020 14:30",
            comment: "Im in love with the fabric..the fit is perfect. Superb service and special thanks to Asine who helped me with an undelivered package !"
        },
        {
            link: "https://www.facebook.com/rachna.mohan.73/posts/3577322832286870",
            name: "Rachna Mohan",
            time: "27/07/2020 16:26",
            comment: "there cloth material is very good"
        },
        {
            link: "https://www.facebook.com/nita.bardhan/posts/3099842763435795",
            name: "Nita Bardhan",
            time: "06/07/2020 18:15",
            comment: "Yes most certainly 😊 The fabric , fitting and most importantly service is awesome."
        },
        {
            link: "https://www.facebook.com/indrayani.sakpal/posts/10157968363674230",
            name: "Indrayani Sakpal",
            time: "04/07/2020 16:32",
            comment: "The fabric is good with some different design also they are good in after sale service Thank you!!! 😊 So much I appreciate the acknowledge my query and refund policy I am glad with your response and continue to shoping with you .They are 100 percentage trustworthy."
        }
    ];
    const testimonials = () => {
        return (
            <div className={`my-12`}>
                <div className={blockHeader}>
                    <h5 className={`text-h5 font-600 text-center`}>Testimonials</h5>
                </div>
                <Swiper
                    slidesPerView={1.25}
                    spaceBetween={5}
                    autoplay={{
                        "delay": 2500,
                        "disableOnInteraction": false
                    }}
                    className={`w-full`}
                >
                    {testimonialsData.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={`p-2 bg-theme-50 border border-theme-200`}>
                                    <p className="text-justify text-sm mb-6">
                                        {item.comment}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <Link href={item.link}>
                                            <a className={`block relative w-8 h-8`}>
                                                <Image src={WEBASSETS + "/assets/images/fb-icon-color.png"}
                                                       alt={`Facebook Link`} layout="fill" objectFit="contain"/>
                                            </a>
                                        </Link>
                                        <div>
                                            <p className={`text-right font-600 text-xs`}>- {item.name}</p>
                                            <p className={`text-right text-xs text-theme-500`}>{item.time}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        )
    }

    /*
    {
      "product_id": "Tops-Rooh-PinkShirtTop",
      "size": "S",
      "qty": "1",
      "is_sale": "false",
      "is_tailor": "false",
      "sleeve_length": "",
      "dress_length": "",
      "cart_id": "Tops-Rooh-PinkShirtTop+S",
      "asset_id": "/assets/Tops-Rooh-PinkShirtTop/thumb.jpg",
      "tag_line": "Pink Shirt Top",
      "color": {
        "name": "pink",
        "code": "#fff"
      },
      "name": "Rooh",
      "price": 1850.0,
      "usd_price": 26
    }
  ]
}

     */

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
    const BareHeading = () => {
        return (
            <div className={"flex-1 sticky top-0 drop-shadow-sm text-center z-10"}>
                <Link href={"/salt/shipping-returns"}>
                    <span className={"uppercase block bg-black text-white text-xs hover:underline py-1"}>6-10 day delivery</span>
                </Link>
                <Link href={"/"}>
                    <div className={" bg-[#ffffffe6]"}>
                        <img
                            src={WEBASSETS + `/assets/images/SALT_logo.png`}
                            alt="SALT_logo" className="w-16 inline-block"
                        />
                    </div>
                </Link>
            </div>
        )
    }

    const mobileView = () => {
        let returnValue =
            <div className={`bg-theme-900/50 m-1`}>
                <div className="max-w-[400px] h-full bg-white overflow-y-auto overflow-x-hidden ml-auto p-2">
                    <div className={`text-center font-600 tracking-wider px-1 border-2 border-solid`}>
                        {
                            dataStore.userCart.length > 0
                                ? <Fragment>
                                            <span className={"flex justify-between"}>
                                                <span className={" pt-1"}> YOUR CART: </span>
                                                 <span className={" pt-1"}>{dataStore.currSymbol} 1000</span>
                                               <span>
                                                    <a href={"/"}
                                                       className={`w-7 h-7 absolute top-[10%] right-[4%] p-1.5`}>
                                                    <img
                                                        src={WEBASSETS + "/assets/images/cancel.png"}
                                                        alt="cancel"
                                                    />
                                                    </a>
                                               </span>
                                            </span>
                                    <div className={"my-1 border-solid border-b-2 border-neutral-300"}/>
                                    <ProductCartView mockData={dataStore.userCart}/>

                                </Fragment>
                                : <Fragment>
                                    <a className={`w-7 h-7 absolute right-[4%] p-1.5`} href={"/"}>
                                        <img
                                            src={WEBASSETS + "/assets/images/cancel.png"}
                                            alt="cancel"
                                        />
                                    </a>
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
                                        <a
                                            className="flex justify-center underline uppercase text-sm mt-8"
                                            onClick={updateDataStore("userCart", mockProduct)} //  TODO to be removed during integrations
                                        >
                                            Continue Shoppings
                                        </a>
                                    </Link>
                                </Fragment>
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
                    {returnPolicy}
                    {mediaBuzz()}
                    {testimonials()}
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

        return (
            <Fragment>
                <BareHeading/>
                {returnValue}
                <Footer isMobile={dataStore.mobile} minimal={true} color={"#f5f5f5"}/>
            </Fragment>
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
                            ? <Fragment>
                                <Link href="/users/checkoutpage">
                                    <a className="inline-flex mb-5 text-white bg-black px-5 py-3">CHECKOUT</a>
                                </Link>
                                <ProductCartView/>
                            </Fragment>
                            : <Fragment>
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
                            </Fragment>
                        }

                        {(dataStore.userCart.length > 0)
                            ? <Link href="/users/checkoutpage">
                                <a className="inline-flex my-5 text-white bg-black px-5 py-3">CHECKOUT</a>
                            </Link>
                            : null
                        }
                    </div>
                    {returnPolicy}
                    {mediaBuzz()}
                    {testimonials()}
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


function SidebarMenuCart(props) {
    const {dataStore} = useContext(AppWideContext);
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [showSidebarMenuCart, setShowSidebarMenuCart] = useState(false);
    React.useEffect(() => {
        if (showSidebarMenuCart) document.body.classList.add("scroll-overflow");
        return () => document.body.classList.remove("scroll-overflow");
    }, [showSidebarMenuCart])
    const closeModal = () => {
        setShowSidebarMenuCart(false);
    }
    const data = [];

    let iconHeight;
    switch (props.type) {
        case "shopMenu":
            iconHeight = "h-12"
            break;
        default:
            iconHeight = "h-6"
    }


    return (
        <span className={`block relative w-6 ${iconHeight}`}>
            {
                props.type !== "menu"
                &&
                <a
                    onClick={() => props.isMobile ? null : setShowSidebarMenuCart(true)}
                    href={props.isMobile ? "/homepage/cart" : "javascript:;"}
                    className={`block relative w-6 cursor-pointer ${iconHeight}`}
                >
                    <span className="absolute top-1 -right-1 font-600 text-[#777] text-xs">{qtyInCart(dataStore)}</span>
                    <Image
                        src={WEBASSETS + "/assets/images/cart.png"}
                        alt="carticon"
                        layout={`fill`}
                        objectFit={`contain`}
                    />
                </a>
            }
            {
                showSidebarMenuCart
                &&
                ReactDom.createPortal(<CartModal data={data} closeModal={closeModal.bind(this)}/>,
                    document.getElementById("cartside"))
            }
        </span>
    );
}

export default SidebarMenuCart;
export {CartModal}


