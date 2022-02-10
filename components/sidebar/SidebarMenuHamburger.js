import Image from "next/image";
import React, {Fragment, useState} from "react";
import ReactDom from "react-dom";
import Link from "next/link";
import {New} from "../common/tags";
import Accordion from "../common/accordion";

/**
 * @todo We do not have to api to list the menu
 * @params {isMobile } props
 * @constructor
 */

const navigationData = [];
for(let i=0;i<=3;i++){
    navigationData.push(
        {
            title: `Link Normal`,
            description: `Link Description`,
            link: `#`
        },
        {
            title: `Link w Child`,
            description: `Link Description`,
            child: [
                {
                    title: `Child Link New`,
                    new: true,
                    link: `#`
                },
                {
                    title: `Child Link Normal`,
                    link: `#`
                }
            ]
        },
        {
            title: `Link New`,
            description: `Link Description`,
            new: true,
            link: `#`
        },
        {
            title: `Link New w Child`,
            description: `Link Description`,
            new: true,
            child: [
                {
                    title: `Child Link Normal`,
                    link: `#`
                },
                {
                    title: `Child Link New`,
                    new: true,
                    link: `#`
                }
            ]
        }
    )
}

console.log(navigationData)

const SelfLink = (props) => {
    return (
        <Link href={props.link}>
            <a className={`block px-4 py-3 text-black/70 hover:bg-black/5`}>
                <span className={`block leading-none`}>
                    {props.title}
                    {props.new && <New/>}
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
                        {props.new && <New/>}
                    </div>
                    {props.description && <span className="text-xs block leading-none">{props.description}</span>}
                </>
            }
            titleStyle={`px-4 py-3 ${viewState ? 'bg-black/5' : 'group-hover:bg-black/5'}`}
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
            bodyStyle={`my-2 ml-2`}
        >
            {props.child &&
            <ul className={`bg-white`}>
                {props.child.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link href={item.link} key={index}>
                                <a className={`block px-4 py-1 hover:bg-black/5 text-sm`}>
                                    {item.title}
                                    {item.new && <New/>}
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

    return (
        <div className={`bg-theme-900/50 fixed top-0 left-0 z-20 h-full w-full`} onClick={closeModal}>
            <div
                className="max-w-[300px] h-full bg-white overflow-x-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-theme-200">
                    <span className="font-600">Menu</span>
                    <button onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6`} viewBox="0 0 24 24">
                            <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/>
                        </svg>
                    </button>
                </div>
                <div className={`flex-1 overflow-y-auto font-500`}>
                    {navigationData.map((item, index) => (
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
                                />
                            }
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}


function SidebarMenuHamburger(props) {

    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [showSidebarMenu, setShowSidebarMenu] = useState(false);

    React.useEffect(() => {
        if (showSidebarMenu) document.body.classList.add("scroll-overflow");
        return () => document.body.classList.remove("scroll-overflow");
    }, [showSidebarMenu])

    const closeModal = () => {
        setShowSidebarMenu(false);
    }
    const data = [];

    const mobileView = null;

    let iconHeight;
    switch (props.type) {
        case "looksPage":
            iconHeight = "h-12"
            break;
        default:
            iconHeight = "h-6"
    }

    const browserView = (
        <>
            <span onClick={() => setShowSidebarMenu(true)} className={`block relative cursor-pointer w-6 ${iconHeight}`}>
                <Image
                    src={WEBASSETS + "/assets/images/menuicon_v1.png"}
                    alt="menuicon"
                    layout={`fill`}
                    objectFit={`contain`}
                />
            </span>
            {showSidebarMenu && ReactDom.createPortal(
                <HamburgerModal data={data} closeModal={closeModal.bind(this)}/>,
                document.getElementById("hamburger"))}
        </>
    );

    return props.isMobile ? mobileView : browserView
}

export default SidebarMenuHamburger;
