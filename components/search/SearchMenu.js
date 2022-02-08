import React from 'react';
import Image from "next/image";
import ReactDom from "react-dom";
import {useEffect, useState, useRef} from "react";

/**
 * @params {isMobile} props
 * @constructor
 */

function SearchModal(props) {
    /*
    *@todo @Sambahav Please complete the modal asy ou see correct
    */
    const {closeModal} = props;
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const searchInput = useRef(null);

    const searchExecution = () => {
        const searchTerm = searchInput.current.value;
        /*
        *@todo @team complete Search logic
         */
    }

    const mobileView = null;

    const browserView = (
        <div className={`fixed inset-0 z-20 bg-white/90`}>
            <div className="container">
                <form onSubmit={searchExecution} className={`mt-10 flex`}>
                    <input
                        type="text"
                        name="searchInput"
                        ref={searchInput}
                        placeholder="Enter your search text"
                        className={`flex-1 text-xl border-0 border-b-2 border-black focus:border-black bg-transparent focus:ring-offset-0 focus:ring-0 focus:ring-offset-transparent focus:shadow-none`}
                    />
                    <button
                        type="submit"
                        className={`bg-black text-white px-8`}
                    >SEARCH</button>
                </form>
                <button className={`w-10 h-10 absolute right-10 top-10`} onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-10 h-10`} viewBox="0 0 24 24">
                        <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/>
                    </svg>
                </button>
            </div>
        </div>);

    return props.isMobile ? mobileView : browserView
}

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
            <span onClick={() => setShowMenuSearch(true)} className={`block relative w-6 ${iconHeight}`}>
                <Image
                    src={WEBASSETS + "/assets/images/search_icon.svg"}
                    alt="searchicon"
                    layout={`fill`}
                    objectFit={`contain`}
                />
            </span>
            {showMenuSearch && ReactDom.createPortal(
                <SearchModal closeModal={closeModal.bind(this)}/>,
                document.getElementById("searchmenu"))
            }
        </>
    );

    return props.isMobile ? mobileView : browserView

}

export default SearchMenu;
