import React, {useRef, useState} from 'react';
import {validateUsername} from "../../../helpers/loginSignUpHelpers";
import {apiDictionary} from "../../../helpers/apiDictionary";
import Loader from "../../common/Loader";
import Image from "next/image";
import {updateUserDataAfterLogin} from "../../../helpers/updateUserDataAfterLogin";
import {useRouter} from "next/router";
import {connect} from "react-redux";
import {setCart} from "../../../ReduxStore/reducers/shoppingCartSlice";
import {setUserState} from "../../../ReduxStore/reducers/userSlice";
import {setOrderHistory} from "../../../ReduxStore/reducers/orderSlice";


const LoginForm = (props) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const router = useRouter();
    const username = useRef(null);
    const password = useRef(null);
    const [loading, setLoading] = useState(false);
    const [otploading, setOtploading] = useState(false);
    const [signInloading, setSignInloading] = useState(false);
    const [otpSent, setOTPSent] = useState(false)

    React.useEffect(() => {
        loadFbLoginApi()
    }, [])


    const saveUserDataAfterSuccessfulLogin = async (username) => {
        const updateData = await updateUserDataAfterLogin({...props.userData, email: username}, props.appConfig.apiToken, props.userData.measurements, props.shoppingCart.cart);
        props.setCart(updateData.shoppingCart)
        props.setUserState(updateData.userState);
        props.setOrderHistory(updateData.orderHistory);
    }


    const loadFbLoginApi = () => {

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '463380238827998',
                cookie: true,
                xfbml: true,
                version: 'v2.12'
            });
            window.FB.AppEvents.logPageView();
        };

        // Load the SDK asynchronously
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    const signInAction = (action) => {

        const signIn = (uname, pwd, otp_login) => {
            let isValid = validateUsername(uname)
            if (!isValid["valid"]) {
                if (isValid['type'] === "email") {
                    props.showToast("Please enter a valid email address")
                } else {
                    props.showToast("Please enter a valid phone number")
                }
                return
            }
            let payload = {
                username: uname,
                password: pwd,
                otp_login: otp_login
            }
            // setLoading(true)
            if (action == 'sendOTP') {
                setOtploading(true)
            }
            if (action == 'verifyOTP' || action == 'signIn') {
                setSignInloading(true)
            }
            let api = apiDictionary("userLogin", props.appConfig.apiToken, payload)
            fetch(api.url, api.fetcher).then((response) => {
                if (response.status === 200) {
                    response.json().then(data => {
                        if (data['status'] === 200) {
                            if (otp_login) {
                                setOTPSent(true)
                                props.showToast("We've sent an OTP to your Email or Phone!")
                            } else {
                                props.showToast("Welcome");
                                saveUserDataAfterSuccessfulLogin(uname).then(() => {
                                    if (props.setShowLogin)
                                        props.setShowLogin(false)
                                    if (props.isMobile)
                                        router.push("/")
                                }).catch(e => console.log(e.message))
                            }
                        } else {
                            props.showToast(data['response']['body'].toUpperCase());
                        }
                    })
                }
            }).finally(() => {
                // setLoading(false)
                setOtploading(false)
                setSignInloading(false)
            })
        };

        const loginOtp = (uname, otp) => {
            setLoading(true)
            let api = apiDictionary("userOTPLogin", props.appConfig.apiToken, {username: uname, otp: parseInt(otp)})
            fetch(api.url, api.fetcher).then((response) => {
                if (response.status === 200) {
                    response.json().then(data => {
                        if (data['status'] === 200) {
                            if (props.setShowLogin)
                                props.setShowLogin(false)
                            if (props.isMobile)
                                router.push("/")
                            saveUserDataAfterSuccessfulLogin(uname)
                        } else {
                            props.showToast(data['response']['body'].toUpperCase());
                        }
                    })
                }
            }).finally(() => {
                setLoading(false)
            })
        };

        const statusChangeCallback = (response) => {
            if (response.status === 'connected') {
                window.FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender'}, function (response) {
                    saveUserDataAfterSuccessfulLogin(response.email)
                })
            } else {
                props.showToast("Facebook Login Failed");
            }
        }

        const checkLoginState = () => {
            window.FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });
        }

        const handleFBLogin = () => {
            window.FB.login((resp) => {
                checkLoginState()
            }, {scope: 'public_profile,email'});
        }

        switch (action) {
            case "signIn":
                signIn(username.current.value, password.current.value, false);
                break;
            case "sendOTP":
                signIn(username.current.value, "", true);
                break;
            case "verifyOTP":
                loginOtp(username.current.value, password.current.value);
                break;
            case "facebook":
                handleFBLogin();
                break;
            default:
                break;
        }
    };

    const inputStyle = "placeholder:text-black/30 border-black focus:ring-0 focus:border-black focus:shadow-none border py-2 px-4 text-sm leading-none";
    const buttonStyle = "uppercase border py-3 px-6 text-sm text-black/60 font-600 tracking-wider border-black/30 hover:border-black duration-100";
    return (
        <form className={`grid ` + [props.appConfig.isMobile ? "grid-cols-1 gap-y-4" : "grid-cols-4 gap-x-8 "]}>
            <input
                type="text"
                name='username'
                ref={username}
                placeholder="email/phone (required)"
                className={`${inputStyle}`}
                disabled={otpSent}
            />
            <input
                type="password"
                name='password'
                ref={password}
                className={`${inputStyle}`}
                placeholder={otpSent ? "Enter your OTP" : "Enter your password"}
            />
            <div className={` items-center gap-x-8 justify-start` + [props.appConfig.isMobile ? " grid grid-cols-1 gap-y-4 place-items-center" : " flex col-span-2 "]}>
                <button
                    type="button"
                    onClick={() => signInAction(otpSent ? "verifyOTP" : "signIn")}
                    className={`${buttonStyle}`}
                    disabled={signInloading}
                >
                    {
                        signInloading ?
                            <Loader className="text-grey"/>
                            :
                            otpSent ? <>Verify OTP</> : <>Sign In</>
                    }
                </button>
                <span>or</span>
                <button
                    type="button"
                    onClick={() => signInAction("sendOTP")}
                    className={`${buttonStyle}`}
                    disabled={otploading}
                >
                    {
                        otploading ?
                            <Loader className="text-grey"/>
                            :
                            otpSent ? <>Resend OTP</> : <>Login Using OTP</>
                    }
                </button>
                <button
                    type="button"
                    onClick={() => otpSent ? setOTPSent(false) : signInAction("facebook")}
                    className={`${buttonStyle} flex items-center gap-x-3`}
                    disabled={loading}
                >
                    {
                        loading ?
                            <Loader className="text-grey"/>
                            :
                            otpSent ? <>Back</> : <>
                                <Image src={WEBASSETS + "/assets/images/fb-icon.png"} alt="fb-icon" width={20} height={20} objectFit="contain"/>
                                <span>LOGIN</span>
                            </>

                    }
                </button>
            </div>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        shoppingCart: state.shoppingCart,
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps, {setCart, setUserState, setOrderHistory})(LoginForm);