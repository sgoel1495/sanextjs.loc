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


function UserModal(props) {
    /*
    *@todo @team complete login logic
    */
    const {closeModal} = props;
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const username = useRef(null);
    const password = useRef(null);
    const {updateDataStore} = useContext(AppWideContext);

    const signIn = (uname, pwd) => {
    };
    const signUp = (uname, pwd) => {
    };
    const forgotPassword = (uname) => {
    };
    const loginOtp = (uname) => {
    };
    const loginFacebook = () => {
    };

    const saveUserDataAfterSuccessfulLogn = (userData) => {
        updateDataStore("userData", userData);
    }

    const signInAction = (action) => {
        switch (action) {
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

    const inputStyle = "flex-1 placeholder:text-black/30 border-black focus:ring-0 focus:border-black focus:shadow-none border py-1 px-4 text-sm font-500 leading-none";
    const buttonStyle = "uppercase border py-2 px-4 min-w-fit text-sm text-black/60 font-600 tracking-wider border-black/30 hover:border-black duration-100";

    const mobileView = null;

    const browserView = (
        <div className={`bg-theme-900/50 fixed inset-0 z-20`} onClick={closeModal}>
            <div
                className="h-fit w-full bg-white overflow-hidden p-10 flex flex-col gap-y-8 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button className={`w-8 h-8 absolute right-10 top-10`} onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8`} viewBox="0 0 24 24">
                        <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/>
                    </svg>
                </button>
                <div className={`flex items-center gap-x-4 text-sm uppercase text-black/60`}>
                    <span onClick={() => signInAction("signIn")} className={`underline text-black/80`}>Sign In</span>
                    <span>|</span>
                    <div onClick={() => signInAction("signUp")}>Sign Up</div>
                    <span>|</span>
                    <div onClick={() => signInAction("forgot")}>Forgot your password?</div>
                </div>
                <form className={`flex gap-x-4 2xl:gap-x-8`}>
                    <input
                        type="text"
                        name='username'
                        ref={username}
                        placeholder="email/phone (required)"
                        className={`${inputStyle}`}
                    />
                    <input
                        type="password"
                        name='password'
                        ref={password}
                        className={`${inputStyle}`}
                    />
                    <div className={`flex items-center gap-x-4 2xl:gap-x-8 justify-start`}>
                        <button
                            type="submit"
                            onClick={() => signInAction("signIn")}
                            className={`${buttonStyle}`}
                        >
                            Sign In
                        </button>
                        <span>or</span>
                        <button
                            type="button"
                            onClick={() => signInAction("otp")}
                            className={`${buttonStyle}`}
                        >
                            Login Using OTP
                        </button>
                        <button
                            type="button"
                            onClick={() => signInAction("facebook")}
                            className={`${buttonStyle} flex items-center gap-x-3`}
                        >
                            <Image src={WEBASSETS + "/assets/images/fb-icon.png"} alt="fb-icon" width={20} height={20} objectFit="contain"/>
                            <span>LOGIN</span>
                        </button>
                    </div>
                    <div className={`flex-auto`}>
                        <div className="bg-black text-white grid place-items-center py-2">
                            Value
                        </div>
                    </div>
                </form>
            </div>
        </div>);

    return props.isMobile ? mobileView : browserView
}

function SidebarMenuUser(props) {

    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [showSidebarMenuUser, setShowSidebarMenuUser] = useState(false);
    const {dataStore, updateDataStore} = useContext(AppWideContext);

    React.useEffect(() => {
        let userData = localStorage.getItem("userData");
        if (userData)
            updateDataStore("userData", JSON.parse(userData))
    }, [updateDataStore])

    React.useEffect(() => {
        if (showSidebarMenuUser) document.body.classList.add("scroll-overflow");
        return () => document.body.classList.remove("scroll-overflow");
    }, [showSidebarMenuUser])

    const closeModal = () => {
        setShowSidebarMenuUser(false);
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
        <span onClick={() => setShowSidebarMenuUser(true)} className={`block relative w-6 ${iconHeight}`}>
            {
                props.type === "shopMenu" ?
                    <div className={"float-right text-right"}>
                        <span className={"block text-sm tracking-wide"}>Account</span>
                        <span className={"block text-[10px] tracking-wider"}>{dataStore.userData.contact||"Login/Signup"}</span>
                    </div>
                    :
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


