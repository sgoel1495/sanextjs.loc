import Image from "next/image";
import React, {useEffect} from "react";
import ReactDom from "react-dom";
import UserLogin from "../user/login/UserLogin";
import AccountMenu from "../user/AccountMenu";
import {connect} from "react-redux";
import {setShowLogin} from "../../ReduxStore/reducers/userConfigSlice";

/**
 * @todo API login to be done.
 * @params {isMobile} props
 * @constructor
 * @todo name avatar to be taken from first name when we have the api for basic details
 */


function SidebarMenuUser(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    useEffect(() => {
        if (props.showLogin) document.body.classList.add("scroll-overflow");
        return () => document.body.classList.remove("scroll-overflow");
    }, [props.showLogin])

    const closeModal = () => {
        props.setShowLogin(false);
    }

    const openModal = () => {
        props.setShowLogin(true);
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
                            <span className={"block text-[10px] tracking-wider cursor-pointer"}>{props.userData.userServe.user_name || "Login/Signup"}</span>
                        </div>
                        :
                        (props.userData.userServe.user_name !== "") ?
                            <div className="rounded-full bg-slate-400 text-center cursor-pointer w-6 h-6">
                                <span className="text-sm text-white font-600 text-center">{props.userData.userServe.user_name[0].toUpperCase()}</span>
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
            {props.showLogin && ReactDom.createPortal(
                props.userData.userServe.email ? <AccountMenu closeModal={closeModal}/> :
                    <UserLogin setShowLogin={setShowLogin} closeModal={closeModal} isMobile={props.isMobile}/>,
                document.getElementById("userband"))}
        </>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        showLogin: state.userConfig.showLogin
    }
}

export default connect(mapStateToProps, {setShowLogin})(SidebarMenuUser);
