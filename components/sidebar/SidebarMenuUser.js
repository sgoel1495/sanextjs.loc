import Image from "next/image";
import React, {useContext, useState} from "react";
import ReactDom from "react-dom";
import UserLogin from "../user/login/UserLogin";
import AppWideContext from "../../store/AppWideContext";
import UserMenu from "../user/UserMenu";

/**
 * @todo API login to be done.
 * @params {isMobile} props
 * @constructor
 * @todo name avatar to be taken from first name when we have the api for basic details
 */

function SidebarMenuUser(props) {

    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [showSidebarMenuUser, setShowSidebarMenuUser] = useState(false);
    const {dataStore, updateDataStore} = useContext(AppWideContext);

    React.useEffect(() => {
        let userData = localStorage.getItem("userData");
        if (userData)
            updateDataStore("userData", JSON.parse(userData))
    }, [])

    React.useEffect(() => {
        if (showSidebarMenuUser) document.body.classList.add("scroll-overflow");
        return () => document.body.classList.remove("scroll-overflow");
    }, [showSidebarMenuUser])

    const closeModal = () => {
        setShowSidebarMenuUser(false);
    }
    console.log(dataStore.userData.contact)
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
        <span onClick={() => setShowSidebarMenuUser(true)} className={`block relative w-6 ${iconHeight}`}>
            {
                dataStore.userData.contact ?
                    <div className="rounded-full bg-slate-400 text-center cursor-pointer">
                        <span className="text-sm text-white font-600 text-center">{dataStore.userData.contact[0].toUpperCase()}</span>
                    </div>
                    :
                    <Image
                        src={WEBASSETS + "/assets/images/usericon.png"}
                        className={"cursor-pointer"}
                        alt="menuicon"
                        layout={`fill`}
                        objectFit={`contain`}
                    />
            }
            </span>
            {showSidebarMenuUser && ReactDom.createPortal(
                dataStore.userData.contact ? <UserMenu closeModal={closeModal.bind(this)}/> : <UserLogin closeModal={closeModal.bind(this)}/>,
                document.getElementById("userband"))}
        </>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default SidebarMenuUser;


