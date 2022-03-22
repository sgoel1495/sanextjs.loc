import Link from "next/link";
import Image from "next/image";
import React, {Fragment, useState} from "react";
import ReactDom from "react-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay} from "swiper";
import "swiper/css";

SwiperCore.use([Autoplay]);

/**
 * @todo No api for media buzz or testimonial. Hardcoded.
 * @params {isMobile} props
 * @constructor
 */

function CartModal(props) {
    /*
    @Sambhav Please complete the modal as you see correct
     */
    const {closeModal} = props;

    const imageClass = "block relative w-40 h-40";
    const blockHeader = "border-4 border-theme-200 p-2 uppercase mb-5 tracking-wide"

    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const returnPolicy = (
        <>
            <Link href="#faq_slides">
                <a className={`block ${blockHeader}`}>
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
                                        <Image src={WEBASSETS + `/assets/faq/S${index + 1}.jpg`} alt="return policy" layout="fill" objectFit="cover"/>
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
                                                <Image src={WEBASSETS + "/assets/images/fb-icon-color.png"} alt={`Facebook Link`} layout="fill" objectFit="contain"/>
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

    const mobileView = null;

    const browserView = (
        <div className={`bg-theme-900/50 fixed inset-0 z-20`} onClick={closeModal}>
            <div
                className="max-w-[400px] h-full bg-white overflow-y-auto overflow-x-hidden ml-auto p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <button className={`w-8 h-8 float-right`} onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8`} viewBox="0 0 24 24">
                        <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/>
                    </svg>
                </button>
                <div className={`text-center font-600 tracking-wider mb-10`}>
                    <p className={`text-sm mb-6`}>YOUR CART</p>
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
                    <p className={`text-sm mb-4`}>There is nothing in your cart. Let's add some items.</p>
                    <Link href="/new-arrivals/all">
                        <a className="underline uppercase text-sm">Continue Shopping</a>
                    </Link>
                </div>
                {returnPolicy}
                {mediaBuzz()}
                {testimonials()}
            </div>
        </div>)
    ;

    return props.isMobile ? mobileView : browserView
}


function SidebarMenuCart(props) {
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
        case "looksPage":
            iconHeight = "h-12"
            break;
        default:
            iconHeight = "h-6"
    }

    const mobileView = null;
    const browserView = (
        <>
            <span onClick={() => setShowSidebarMenuCart(true)} className={`block relative w-6 cursor-pointer ${iconHeight}`}>
                <Image
                    src={WEBASSETS + "/assets/images/cart.png"}
                    alt="menuicon"
                    layout={`fill`}
                    objectFit={`contain`}
                />
            </span>
            {showSidebarMenuCart && ReactDom.createPortal(<CartModal data={data} closeModal={closeModal.bind(this)}/>,
                document.getElementById("cartside"))}
        </>
    );

    return props.isMobile ? browserView : browserView
}

export default SidebarMenuCart;


