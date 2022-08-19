import Image from "next/image";
import React, {Fragment, useContext, useEffect, useState} from "react";
import ReactDom from "react-dom";
import Link from "next/link";
import {NewTag} from "../common/Tags";
import Accordion from "../common/accordion";
import AppWideContext from "../../store/AppWideContext";
import {isMobile} from "react-device-detect";
import SearchMenu from "../search/SearchMenu";
import CurrencySwitcher from "../navbar/CurrencySwitcher";
import UserLogin from "../user/login/UserLogin";

/**
 * @todo account signin pending
 * @params {isMobile } props
 * @constructor
 */


const navigationDataInit = [
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
                link: `/salt/contact-us`
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
                link: `/salt/terms-and-condition`
            },
            {
                title: `PRIVACY POLICY`,
                link: `/salt/privacy-policy`
            }
        ]
    }
];
const mobileNavigationDataInit = [
    {
        title: `NEW ARRIVALS`,
        description: `Recently Launched`,
        link: "/new-arrivals/all"
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
        description: `Flat Price`,
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
        title: `SHOP BY PREFERENCES`,
        description: `Preferred Your Style First`,
        child: [
            {
                title: `COTTON & LINENS`,
                link: `/group/cottons-&-linens`
            },
            {
                title: `POLKA DOTS`,
                link: `/group/polka`
            },
            {
                title: `STRIPES`,
                link: `/group/stripes`
            },
            {
                title: `BOARDROOM DRESSES`,
                link: `/group/boardroom-dresses`
            },
            {
                title: `FORMAL JACKETS & BLAZERS`,
                link: `/group/formal-jackets-&-blazers`
            },
            {
                title: `FLORAL PRINT`,
                link: `/group/floral-&-foliage-print`
            },
            {
                title: `ALL THINGS SOLIDS`,
                link: `/group/solids`
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
                link: `/salt/contact-us`
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
        description: `Online Styling`,
        new: true,
        link: `/get-virtual-appointment`
    },
    {
        title: `IN-STORE APPOINTMENT`,
        description: `Styling Assistance`,
        new: true,
        link: `/get-appointment`
    },
    {
        id: "login",
        title: `Login/Signup`,
        description: ``,
        link: `/homepage/signin`,
        centered: true,
        style: "!mt-12",
        subStyle: "italic !font-700 !text-xs text-black/60",
        icon: "/assets/images/usericon.png"
    },
    {
        title: `SHIPPING & RETURNS`,
        description: ``,
        link: `/salt/shipping-returns`,
        centered: true,
    },
    {
        title: `CANCELLATION & MODIFICATIONS`,
        description: ``,
        centered: true,
        link: `/salt/cancellation-modifications`
    },
    {
        title: `FAQ`,
        description: ``,
        centered: true,
        link: `/salt/faq`
    },
    {
        title: `SITEMAP`,
        description: ``,
        centered: true,
        link: `#`
    },
    {
        title: `CONTACT US`,
        description: ``,
        centered: true,
        link: `/salt/contact-us`
    }
];

const SelfLink = (props) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const mobileView = <a className={`block px-4 py-3 text-black tracking-[-0.5px] capitalize ` + [props.style ? props.style : ""]}>
                <span className={`block leading-none font-900 capitalize`}>
                    {props.title.toLowerCase()}
                    {props.new && <sup><NewTag white={true}/></sup>}
                </span>
        {props.description && <span className="text-xs block leading-none">{props.description}</span>}
    </a>;
    const mobileCenteredView = <a className={`block px-4 py-3 text-black tracking-[-0.5px] text-center mt-2 flex flex-col items-center ` + [props.style ? props.style : ""]}>
        {
            props.icon &&
            <span className={`block relative h-6 w-6 mb-1`}>
                    <Image
                        src={WEBASSETS + props.icon}
                        alt="user icon"
                        layout={`fill`}
                        priority={false}
                        objectFit={`contain`}
                    />
                </span>
        }
        <span className={`block leading-none font-200 capitalize text-sm ` + [props.subStyle ? props.subStyle : ""]}>
                    {props.title.toLowerCase()}
            {props.new && <sup><NewTag white={true}/></sup>}
                </span>
        {props.description && <span className="text-xs block leading-none">{props.description}</span>}
    </a>;
    const browserView = <a className={`block px-4 py-3 text-black/70 hover:bg-black/5 ` + [props.style ? props.style : ""]}>
                <span className={`block leading-none font-600`}>
                    {props.title}
                    {props.new && <NewTag/>}
                </span>
        {props.description && <span className="text-xs block leading-none">{props.description}</span>}
    </a>;
    if (props.link)
        return (
            <Link href={props.link}>
                {props.isMobile ? props.centered ? mobileCenteredView : mobileView : browserView}
            </Link>
        )
    else
        return <div onClick={(e) => {
            e.stopPropagation();
            props.onClick();
        }}>
            {props.isMobile ? props.centered ? mobileCenteredView : mobileView : browserView}
        </div>
}

const ChildLink = props => {
    const [viewState, setViewState] = useState(false);

    let browserTitle = <>
        <div className={`leading-none font-600`}>
            {props.title}
            {props.new && <NewTag/>}
        </div>
        {props.description && <span className="text-xs block leading-none">{props.description}</span>}
    </>;
    let mobileTitle = <div className={props.centered && " text-center mr-[-3rem]"}>
        <div className={`text-black leading-none font-900 capitalize tracking-[-0.5px]`}>
            {props.title.toLowerCase()}
            {props.new && <sup><NewTag white={true}/></sup>}
        </div>
        {props.description && <span className="text-xs block leading-none capitalize">{props.description}</span>}
    </div>;

    return (
        <Accordion
            onClick={() => setViewState(!viewState)}
            style={"relative group text-black/70 pb-2 " + [viewState ? 'bg-[#f7f7f7] ' : ""] + props.style}
            animationDuration={"duration-200"}
            title={props.isMobile ? mobileTitle : browserTitle}
            titleStyle={`px-4 py-3 `}
            accordionIconOpen={
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5`} fill={`currentColor`} fillOpacity={0.5} viewBox="0 0 24 24">
                    <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"/>
                </svg>
            }
            accordionIconClose={
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5`} fill={`currentColor`} fillOpacity={0.5} viewBox="0 0 24 24">
                    <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"/>
                </svg>
            }
            bodyStyle={`ml-2 ${viewState ? 'my-2' : ''}`}
        >
            {props.child &&
            <ul>
                {props.child.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link href={item.link} key={index}>
                                <a className={props.isMobile ? props.centered ? "block text-center py-2 text-xs capitalize font-600 text-black/80" : `block pl-8 py-2 text-xs capitalize font-600 text-black/80` : `block px-4 py-1 hover:bg-black/5 text-sm`}>
                                    {item.title.toLowerCase()}
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
        {(props.data && props.data.length > 0)
            ? <>
                <div className={`bg-theme-900/50 fixed top-0 z-50 h-full w-full` + [props.visible ? " left-0" : " hidden"]} onClick={closeModal}/>
                <div
                    className={"w-[300px] z-[51] h-screen bg-white overflow-x-hidden flex flex-col fixed top-0 transition-[left] duration-300 " + [props.visible ? "left-0" : "left-[-300px]"]}
                    onClick={(e) => e.stopPropagation()}
                >
                    {
                        props.isMobile ||
                        <div className="flex items-center justify-between p-4 border-b border-theme-200">
                            <span className="font-600">Menu</span>
                            <button onClick={closeModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6`} viewBox="0 0 24 24">
                                    <path
                                        d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/>
                                </svg>
                            </button>
                        </div>
                    }

                    <div className={`flex-1 overflow-y-auto font-500 pb-40`}>
                        {
                            props.isMobile && <>
                                <SearchMenu type={"hamMenu"} mobile={true} closeModal={closeModal}/>
                                <div className={"px-4 py-3 flex justify-start items-center"}>
                                    <span className={"italic normal-case text-xs text-gray-400 font-600"}>Shipping Outside India ?</span>
                                    <CurrencySwitcher isMobile={true} type={"hamMenu"} className={"text-[0.6rem] py-0 h-5"}/>
                                </div>
                            </>
                        }
                        {props.data.map((item, index) => item.child
                            ? <ChildLink
                                key={index}
                                title={item.title}
                                description={item.description}
                                new={item.new}
                                child={item.child}
                                isMobile={props.isMobile}
                                centered={item.centered}
                                style={item.style}
                            />
                            : <SelfLink
                                key={index}
                                link={item.link}
                                onClick={item.onClick}
                                title={item.title}
                                description={item.description}
                                new={item.new}
                                style={item.style}
                                isMobile={props.isMobile}
                                centered={item.centered}
                                subStyle={item.subStyle}
                                icon={item.icon}
                            />)}
                    </div>
                </div>
            </>
            : null
        }
    </Fragment>;
}


function SidebarMenuHamburger(props) {
    const {dataStore} = useContext(AppWideContext);
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [navigationData, setNavigationData] = useState([]);
    const [showSidebarMenu, setShowSidebarMenu] = useState(false);
    const [showLogin, setShowLogin] = useState(false)
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        setMobile(isMobile)
    }, [])
    useEffect(() => {
        if (showSidebarMenu) document.body.classList.add("scroll-overflow");
        return () => document.body.classList.remove("scroll-overflow");
    }, [showSidebarMenu]);

    useEffect(() => {
        if (mobile) {
            if (dataStore.userData.contact != null) {
                let navigation = mobileNavigationDataInit.map(item => {
                    if (item.id !== "login") {
                        return item
                    } else {
                        return {
                            title: "My Account",
                            description: dataStore.userServe.user_name,
                            link: `#`,
                            centered: true,
                            style: "!mt-12",
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
                        }
                    }
                })
                setNavigationData(navigation)
            } else {
                setNavigationData(mobileNavigationDataInit)
            }
        } else if (dataStore.userData.contact != null) {
            setNavigationData([
                {
                    title: dataStore.userServe.user_name,
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
                    onClick: () => setShowLogin(true)
                }, ...navigationDataInit]);
        }
    }, [dataStore.userData.contact, dataStore.userServe.user_name, mobile]);

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

    return <Fragment>
        {(navigationData.length > 0)
            ? <span className={`relative w-6 ${iconHeight}`}>
                {
                    props.type !== "menu" && <div onClick={() => setShowSidebarMenu(true)}
                                                  className={`relative cursor-pointer w-6 ${iconHeight}`}>
                        <Image
                            src={WEBASSETS + "/assets/images/menuicon_v1.png"}
                            alt="menuicon"
                            layout={`fill`}
                            objectFit={`contain`}
                        />

                    </div>
                }
                <HamburgerModal data={navigationData} closeModal={closeModal.bind(this)} visible={showSidebarMenu} isMobile={mobile}/>
                {showLogin && ReactDom.createPortal(
                    <UserLogin closeModal={()=>setShowLogin(false)} setShowSidebarMenuUser={()=>setShowLogin(false)}/>,
                    document.getElementById("userband"))}
            </span>
            : <Fragment/>}
    </Fragment>;
}

export default SidebarMenuHamburger;
