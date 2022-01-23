import Link from "next/link";
import Image from "next/image";
import React, {Fragment, useContext, useRef, useState} from "react";
import ReactDom from "react-dom";
import AppWideContext from "../../store/AppWideContext";

/**
 * @todo API login to be done.
 * @params {isMobile} props
 * @constructor
 */

function UserModal(props) {
    /*
        @Sambahav Please complete the modal asy ou see correct
    */
    const {closeModal} = props;
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const username= useRef(null);
    const password= useRef(null);
    const {updateDataStore} = useContext(AppWideContext);

    const signIn = (uname,pwd)=>{};
    const signUp = (uname,pwd)=>{};
    const forgotPassword = (uname)=>{};
    const loginOtp = (uname)=>{};
    const loginFacebook = ()=>{};

    const saveUserDataAfterSuccessfulLogn = (userData)=>{
        updateDataStore("userData",userData);
    }

    const signInAction = (action)=>{
        switch (action){
            case "singIn":
                signIn(username.current.value, password.current.value);
                break;
            case "singUp":
                signUp(username.current.value, password.current.value);
                break;
            case "forgot":
                forgotPassword(username.current.value);
                break;
            case "otp":
                forgotPassword(username.current.value);
                break;
            case "facebook":
                forgotPassword();
                break;
            default:
                break;
        }
    };


    const mobileView = null;

    const browserView = (
        <div onClick={closeModal}>
            <div>
                <div onClick={()=>{signInAction("signIn")}}>SIGN IN</div>
                | <div onClick={()=>{signInAction("signUp")}}>SIGN UP</div>
                | <div onClick={()=>{signInAction("forgot")}}>FORGOT YOUR PASSWORD?</div>
            </div>
            <div>
                <form>
                    <input type="text" name='username' ref={username} placeholder="email/phone (required)" />
                    <input type="password" ref={password} name='password' />
                    <button type="submit" onClick={()=>{signInAction("signIn")}}>SIGN IN</button>
                    <div>OR</div>
                    <button type="submit" onClick={()=>{signInAction("otp")}}>LOGIN USING OTP</button>
                    <button type="submit" onClick={()=>{signInAction("facebook")}}>
                        <Image src={WEBASSETS + "/assets/images/fb-icon.png"} alt="fb-icon" />
                        <span>LOGIN</span>
                    </button>
                </form>
            </div>
        </div>);

    return props.isMobile ? mobileView : browserView
}

function SidebarMenuUser(props) {

    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [showSidebarMenu, setShowSidebarMenu] = useState(false);

    React.useEffect(() => {
        if (showSidebarMenu) document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = "unset"
    }, [showSidebarMenu])

    const closeModal = () => {
        setShowSidebarMenu(false);
    }

    const mobileView = null;

    const browserView = (
        <>
            <div onClick={() => setShowSidebarMenu(true)} className={"ml-2"}>
                <Image src={WEBASSETS + "/assets/images/usericon.png"} alt="menuicon" width="24" height="24"/>
            </div>
            {showSidebarMenu && ReactDom.createPortal(
                <UserModal data={data} closeModal={closeModal.bind(this)}/>,
                document.getElementById("userband"))}
        </>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default SidebarMenuUser;


