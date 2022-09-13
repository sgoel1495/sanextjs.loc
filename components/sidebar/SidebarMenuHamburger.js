import Image from "next/image";
import React, {Fragment, useContext, useEffect, useMemo, useState} from "react";
import ReactDom from "react-dom";
import Link from "next/link";
import {NewTag} from "../common/Tags";
import Accordion from "../common/accordion";
import AppWideContext from "../../store/AppWideContext";
import {isMobile} from "react-device-detect";
import SearchMenu from "../search/SearchMenu";
import CurrencySwitcher from "../navbar/CurrencySwitcher";
import UserLogin from "../user/login/UserLogin";
import useApiCall from "../../hooks/useApiCall";
import {connect} from "react-redux";
import {setShowLogin} from "../../ReduxStore/reducers/userConfigSlice";

/**
 * @todo account signin pending
 * @params {isMobile } props
 * @constructor
 */


const navigationDataInit = [
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
                                <SearchMenu type={"hamMenu"} isMobile={true} closeModal={closeModal}/>
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
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [navigationData, setNavigationData] = useState([]);
    const [showSidebarMenu, setShowSidebarMenu] = useState(false);
    const [mobile, setMobile] = useState(false)
    const navMenu = useApiCall("getHomePageMenu", props.appConfig.apiToken);
    const navData = useMemo(() => {
        if (!navMenu || navMenu.status !== 200) {
            return []
        }
        let nav = [
            ...navMenu.home_page_menu.sort((a, b) => a.sequence - b.sequence).map(item => {
                if ((mobile && item.is_mob_visible) || (!mobile && item.is_visible)) {
                    let temp = {
                        title: item.name,
                        description: item.tagline,
                        new: item.is_new

                    }
                    if (item.url) {
                        temp["link"] = item.url
                    } else {
                        temp["child"] = item.sub_menu.map((subItem) => {
                            return {
                                title: subItem.name,
                                link: subItem.url
                            }
                        })
                    }
                    return temp
                }
            }),
        ].filter(item => item !== undefined)
        if (mobile) {
            nav = nav.concat(mobileNavigationDataInit)
        } else {
            nav = nav.concat(navigationDataInit)
        }
        return nav
    }, [mobile, navMenu])

    useEffect(() => {
        setMobile(isMobile)
    }, [])
    useEffect(() => {
        if (showSidebarMenu) document.body.classList.add("scroll-overflow");
        return () => document.body.classList.remove("scroll-overflow");
    }, [showSidebarMenu]);

    useEffect(() => {
        if (mobile) {
            if (props.userData.userServe.email) {
                let navigation = navData.map(item => {
                    if (item.id !== "login") {
                        return item
                    } else {
                        return {
                            title: "My Account",
                            description: props.userData.userServe.user_name,
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
                setNavigationData(navData)
            }
        } else if (props.userData.userServe.email) {
            setNavigationData([
                {
                    title: props.userData.userServe.user_name,
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
                }, ...navData]);
        } else {
            setNavigationData([
                {
                    title: `ACCOUNT`,
                    description: `Login/Signup`,
                    onClick: () => props.setShowLogin(true)
                }, ...navData]);
        }
    }, [props.userData.userServe.user_name, props.userData.userServe.email, navData]);

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
            </span>
            : <Fragment/>}
    </Fragment>;
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps,{setShowLogin})(SidebarMenuHamburger);
