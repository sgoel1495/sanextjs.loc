import Image from "next/image";
import React, {Fragment, useContext, useEffect, useState} from "react";
import ReactDom from "react-dom";
import Link from "next/link";
import {NewTag} from "../common/Tags";
import Accordion from "../common/accordion";
import AppWideContext from "../../store/AppWideContext";

/**
 * @todo account signin pending
 * @params {isMobile } props
 * @constructor
 */


const navigationDataInit = [];
navigationDataInit.push(
    {
        title: `NEW ARRIVALS`,
        description: `Recently Launched`,
        child: [
            {
                title: `ALL NEW ARRIVALS`,
                link: `/new-arrivals/all`
            },
            {
                title: `NITTO - knits: for the snug season`,
                link: `/mimoto-knit`
            },
            {
                title: `NOOR - spreading light`,
                link: `/mimoto-noor`
            },
            {
                title: `SALT - the signature collection`,
                link: `/mimoto-salt`
            },
            {
                title: `MOYO - poetry in prints`,
                link: `/mimoto-moyo`
            },
            {
                title: `MRIDU - playing dress up`,
                link: `/mimoto-mridu`
            }
        ]
    },
    {
        title: `POPULAR`,
        description: `Our Bestselling items`,
        link: `/best-selling`
    },
    {
        title: `GIFT CARDS`,
        description: `Show Your Love`,
        link: `/giftcards`
    },
    {
        title: `STEAL DEAL`,
        description: `UPTO 60% Off`,
        new: true,
        link: `/end-of-season-sale`
    },
    {
        title: `SHOP THE LOOK`,
        description: `Looks We Love`,
        link: `/looks`
    },
    {
        title: `COTTON MASKS`,
        description: `For Your Protection`,
        new: true,
        link: `/shop-masks`
    },
    {
        title: `TOPS`,
        description: `Blouses, Shirts & Tunics`,
        child: [
            {
                title: `BLOUSES`,
                link: `/shop-tops`
            },
            {
                title: `SHIRTS`,
                link: `/shop-shirts`
            },
            {
                title: `TUNICS`,
                link: `/shop-tunics`
            }
        ]
    },
    {
        title: `JUMPSUITS`,
        description: `Easy To Wear & Stylish`,
        new: true,
        link: `/shop-jumpsuits`
    },
    {
        title: `DRESSES`,
        description: `Desk to Dinner`,
        link: `/shop-dresses`
    },
    {
        title: `SWEATERS`,
        description: `Winter Wears`,
        new: true,
        link: `/shop-sweaters`
    },
    {
        title: `TROUSERS`,
        description: `Tailored Trousers`,
        link: `/shop-tailored-pants`
    },
    {
        title: `SHORTS`,
        description: `Raise Your Chic`,
        new: true,
        link: `/shop-shorts`
    },
    {
        title: `SKIRTS`,
        description: `Tailored Skirts`,
        link: `/shop-tailored-skirts`
    },
    {
        title: `OUTERWEAR`,
        description: `Jackets & Capes`,
        link: `/shop-outerwear`
    },
    {
        title: `ACCESSORIES`,
        description: `Scarves, Belts & Jewellery`,
        child: [
            {
                title: `SCARVES`,
                link: `/shop-scarves`
            },
            {
                title: `BELTS`,
                link: `/shop-belts`
            },
            {
                title: `JEWELLERY`,
                new: true,
                link: `/shop-jewellery`
            },
            {
                title: `MASKS`,
                new: true,
                link: `/shop-masks`
            }
        ]
    },
    {
        title: `REVIEWS`,
        description: `What Customers Say About Us`,
        link: `/reviews`
    },
    {
        title: `DISCOVER SALT`,
        description: `Our Philosophy`,
        child: [
            {
                title: `OUR STORY`,
                link: `/salt/about-us`
            },
            {
                title: `OUR DESIGN`,
                link: `/salt/about-us/our-design`
            },
            {
                title: `FABRIC`,
                link: `/salt/about-us/fabric`
            },
            {
                title: `SIZE & FIT`,
                link: `/salt/about-us/size-fit`
            },
            {
                title: `FINISHING & DETAILS`,
                link: `/salt/about-us/finishing-details`
            },
            {
                title: `WHY SALT?`,
                link: `/salt/about-us/why-salt`
            },
            {
                title: `CONTACT US`,
                link: `/salt/about-us/contact-us`
            }
        ]
    },
    {
        title: `ABOUT US`,
        description: `Our Services`,
        new: true,
        link: `/blog/about-salt`
    },
    {
        title: `VIRTUAL APPOINTMENT`,
        description: `Raise Your Chic`,
        new: true,
        link: `/get-virtual-appointment`
    },
    {
        title: `IN-STORE APPOINTMENT`,
        description: `Raise Your Chic`,
        new: true,
        link: `/get-appointment`
    },
    {
        title: `SHIPPING & RETURNS`,
        description: ``,
        link: `/salt/shipping-returns`,
        style: "mt-12"
    },
    {
        title: `CANCELLATION & MODIFICATIONS`,
        description: ``,
        link: `/salt/cancellation-modifications`
    },
    {
        title: `FAQ`,
        description: ``,
        link: `/salt/faq`
    },
    {
        title: `SITEMAP`,
        description: ``,
        link: `#`
    },
    {
        title: `CONTACT US`,
        description: ``,
        link: `/salt/contact-us`
    },
    {
        title: `LEGAL & COOKIES`,
        description: ``,
        child: [
            {
                title: `TERMS & CONDITIONS`,
                link: `/salt/terms-condition`
            },
            {
                title: `PRIVACY POLICY`,
                link: `/salt/privacy-policy`
            }
        ]
    }
);

const SelfLink = (props) => {
    return (
        <Link href={props.link}>
            <a className={`block px-4 py-3 text-black/70 hover:bg-black/5 ` + [props.style ? props.style : ""]}>
                <span className={`block leading-none`}>
                    {props.title}
                    {props.new && <NewTag/>}
                </span>
                {props.description && <span className="text-xs block leading-none">{props.description}</span>}
            </a>
        </Link>
    )
}

const ChildLink = props => {
    const [viewState, setViewState] = useState(false);

    return (
        <Accordion
            onClick={() => setViewState(!viewState)}
            style={"group text-black/70"}
            animationDuration={"duration-200"}
            title={
                <>
                    <div className={`leading-none`}>
                        {props.title}
                        {props.new && <NewTag/>}
                    </div>
                    {props.description && <span className="text-xs block leading-none">{props.description}</span>}
                </>
            }
            titleStyle={`px-4 py-3 ${viewState ? 'bg-black/5' : 'group-hover:bg-black/5'}`}
            accordionIconOpen={
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5`} fill={`currentColor`} fillOpacity={0.5}
                     viewBox="0 0 24 24">
                    <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"/>
                </svg>
            }
            accordionIconClose={
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5`} fill={`currentColor`} fillOpacity={0.5}
                     viewBox="0 0 24 24">
                    <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"/>
                </svg>
            }
            bodyStyle={`ml-2 ${viewState ? 'my-2' : ''}`}
        >
            {props.child &&
                <ul className={`bg-white`}>
                    {props.child.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link href={item.link} key={index}>
                                    <a className={`block px-4 py-1 hover:bg-black/5 text-sm`}>
                                        {item.title}
                                        {item.new && <NewTag/>}
                                    </a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            }
        </Accordion>
    )
}

function HamburgerModal(props) {

    const {closeModal} = props;

    return <Fragment>
        {(props.data && props.data.length>0)
        ?<div className={`bg-theme-900/50 fixed top-0 left-0 z-20 h-full w-full`} onClick={closeModal}>
            <div
                className="max-w-[300px] h-full bg-white overflow-x-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-theme-200">
                    <span className="font-600">Menu</span>
                    <button onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6`} viewBox="0 0 24 24">
                            <path
                                d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/>
                        </svg>
                    </button>
                </div>
                <div className={`flex-1 overflow-y-auto font-500 pb-40`}>
                    {props.data.map((item, index) => (
                        <>
                            {item.child
                                ? <ChildLink
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    new={item.new}
                                    child={item.child}
                                />
                                : <SelfLink
                                    key={index}
                                    link={item.link}
                                    title={item.title}
                                    description={item.description}
                                    new={item.new}
                                    style={item.style}
                                />
                            }
                        </>
                    ))}
                </div>
            </div>
        </div>
        :null}
    </Fragment>;
}


function SidebarMenuHamburger(props) {
    const {dataStore} = useContext(AppWideContext);
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const [navigationData,setNavigationData] = useState([]);
    const [showSidebarMenu, setShowSidebarMenu] = useState(false);
    useEffect(() => {
        if (showSidebarMenu) document.body.classList.add("scroll-overflow");
        return () => document.body.classList.remove("scroll-overflow");
    }, [showSidebarMenu]);

    useEffect(() => {
        if (dataStore && dataStore.hasOwnProperty("userData") && dataStore.userData.contact!=null) {
            setNavigationData([
                {
                    title: dataStore.userData.contact,
                    description: ``,
                    link: `#`,
                    child: [
                        {
                            title: `MY PROFILE`,
                            link: `/users/profile`
                        },
                        {
                            title: `MY ORDERS`,
                            link: `/users/orderhistory`
                        },
                        {
                            title: `MY WALLET`,
                            link: `/users/wallet`
                        },
                        {
                            title: `REDEEM VOUCHER`,
                            link: `/users/wallet`
                        },
                        {
                            title: `MY FAVOURITES`,
                            link: `/users/favourites`
                        },
                        {
                            title: `MY MEASUREMENTS`,
                            link: `/users/measurements`
                        },
                        {
                            title: `MY REFERRAL`,
                            link: `/users/my-referral`
                        },
                        {
                            title: `LOGOUT`,
                            link: `/users/logout`
                        }
                    ]
                }, ...navigationDataInit]);
        } else {
            setNavigationData([
                {
                    title: `ACCOUNT`,
                    description: `Login/Signup`,
                    link: `#`
                }, ...navigationDataInit]);
        }
    }, [dataStore.userData.contact]);

    const closeModal = () => {
        setShowSidebarMenu(false);
    }

    let iconHeight;
    switch (props.type) {
        case "shopMenu":
            iconHeight = "h-12"
            break;
        default:
            iconHeight = "h-6"
    }

    const mobileView = (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="h-6 w-6">
                <rect y="3" width="50" height="2"/>
                <rect y="17" width="50" height="2"/>
                <rect y="31" width="50" height="2"/>
                <rect y="45" width="50" height="2"/>
            </svg>
        </div>
    );

    const browserView = <Fragment>
        {(navigationData.length > 0)
            ? <Fragment>
                <div onClick={() => setShowSidebarMenu(true)}
                     className={`relative cursor-pointer w-6 ${iconHeight}`}>
                    <Image
                        src={WEBASSETS + "/assets/images/menuicon_v1.png"}
                        alt="menuicon"
                        layout={`fill`}
                        objectFit={`contain`}
                    />
                </div>
                {showSidebarMenu && ReactDom.createPortal(
                    <HamburgerModal data={navigationData} closeModal={closeModal.bind(this)}/>,
                    document.getElementById("hamburger"))}
            </Fragment>
            : <Fragment>TeaCii Loading</Fragment>}
    </Fragment>;

    return props.isMobile ? mobileView : browserView
}

export default SidebarMenuHamburger;
