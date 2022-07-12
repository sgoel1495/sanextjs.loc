import Image from "next/image";
import React, {useContext, useEffect, useState} from "react";
import ReactDom from "react-dom";
import UserLogin from "../user/login/UserLogin";
import AppWideContext from "../../store/AppWideContext";
import AccountMenu from "../user/AccountMenu";

/**
 * @todo API login to be done.
 * @params {isMobile} props
 * @constructor
 * @todo name avatar to be taken from first name when we have the api for basic details
 */


function SidebarMenuUser(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const [showSidebarMenuUser, setShowSidebarMenuUser] = useState(dataStore.showSidebarMenuUser);
    console.log(dataStore.userServe)
    useEffect(() => {
        if (showSidebarMenuUser) document.body.classList.add("scroll-overflow");
        return () => document.body.classList.remove("scroll-overflow");
    }, [showSidebarMenuUser])

    const closeModal = () => {
        updateDataStore("showSidebarMenuUser",false);
        setShowSidebarMenuUser(false);
    }

    const openModal = ()=>{
        updateDataStore("showSidebarMenuUser",false);
        setShowSidebarMenuUser(true);
    }

    let iconHeight;
    switch (props.type) {
        case "shopMenu":
            iconHeight = "h-12 w-16"
            break;
        default:
            iconHeight = "h-6"
    }
    
    const mobileView = null;
    const browserView = (
        <>
        <span onClick={openModal} className={`block relative w-6 ${iconHeight}`}>
            {
                props.type === "shopMenu" ?
                    <div className={"float-right text-right"}>
                        <span className={"block text-sm tracking-wide"}>Account</span>
                        <span className={"block text-[10px] tracking-wider cursor-pointer"}>{dataStore.userServe.user_name||"Login/Signup"}</span>
                    </div>
                    :
                    (dataStore.userServe.user_name!=="") ?
                        <div className="rounded-full bg-slate-400 text-center cursor-pointer">
                            <span className="text-sm text-white font-600 text-center">{dataStore.userServe.user_name[0].toUpperCase()}</span>
                        </div>
                        :
                        <Image
                            src={WEBASSETS + "/assets/images/usericon.png"}
                            className={"cursor-pointer"}
                            alt="usericon"
                            layout={`fill`}
                            objectFit={`contain`}
                        />
            }
            </span>
            {showSidebarMenuUser && ReactDom.createPortal(
                dataStore.userData.contact ? <AccountMenu closeModal={closeModal.bind(this)} /> : <UserLogin closeModal={closeModal.bind(this)}/>,
                document.getElementById("userband"))}
        </>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default SidebarMenuUser;
