import React, {useEffect, useState} from 'react';
import Image from "next/image";
import ReactDom from "react-dom";
import SearchModal from "./SearchModal";
import CurrencySwitcher from "../navbar/CurrencySwitcher";

/**
 * @params {isMobile} props
 * @constructor
 */

function SearchMenu(props) {

    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [showMenuSearch, setShowMenuSearch] = useState(false);

    useEffect(() => {
        if (showMenuSearch) document.body.classList.add("scroll-overflow");
        return () => document.body.classList.remove("scroll-overflow");
    }, [showMenuSearch])

    const closeModal = () => {
        setShowMenuSearch(false);
    }

    let iconHeight;
    switch (props.type) {
        case "shopMenu":
            iconHeight = "h-12"
            break;
        default:
            iconHeight = "h-6"
    }

    return (
        <>
            {
                props.type === "hamMenu" ?
                    <div className={"px-4 py-3 flex"}>
                        <div className={"border-b-2 p-1 w-full text-xs border-gray-600"} onClick={() => setShowMenuSearch(true)}>
                            search
                        </div>
                        <button onClick={props.closeModal} className={"float-right ml-8"}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6`} viewBox="0 0 24 24">
                                <path
                                    d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/>
                            </svg>
                        </button>
                    </div>
                    :
                    <span className={`block relative w-6 ${iconHeight}`}>
                        {
                            props.type !== "menu" &&
                            <span onClick={() => setShowMenuSearch(true)} className={`block relative w-6 cursor-pointer ${iconHeight}`}>
                                <Image
                                    src={WEBASSETS + "/assets/images/search_icon.svg"}
                                    alt="searchicon"
                                    layout={`fill`}
                                    objectFit={`contain`}
                                />
                            </span>
                        }
                    </span>
            }
            {showMenuSearch && ReactDom.createPortal(
                <SearchModal closeModal={closeModal.bind(this)} isMobile={props.isMobile}/>,
                document.getElementById("searchmenu"))
            }
        </>
    )

}

export default SearchMenu;
