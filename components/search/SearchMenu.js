import React, {useEffect, useState} from 'react';
import Image from "next/image";
import ReactDom from "react-dom";
import SearchModal from "./SearchModal";

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
            <span onClick={() => setShowMenuSearch(true)} className={`block relative w-6 cursor-pointer ${iconHeight}`}>
                <Image
                    src={WEBASSETS + "/assets/images/search_icon.svg"}
                    alt="searchicon"
                    layout={`fill`}
                    objectFit={`contain`}
                />
            </span>
            {showMenuSearch && ReactDom.createPortal(
                <SearchModal closeModal={closeModal.bind(this)} isMobile={props.isMobile}/>,
                document.getElementById("searchmenu"))
            }
        </>
    )

}

export default SearchMenu;
