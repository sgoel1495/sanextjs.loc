import React, {useContext, useRef, useState} from 'react';
import {validateUsername} from "../../../helpers/loginSignUpHelpers";
import {apiDictionary} from "../../../helpers/apiDictionary";
import AppWideContext from "../../../store/AppWideContext";
import Loader from "../../common/loader";
import Image from "next/image";

const LoginForm = (props) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const username = useRef(null);
    const password = useRef(null);
    const [loading, setLoading] = useState(false);
    const [optSent, setOTPSent] = useState(false)
    const {dataStore, updateDataStore} = useContext(AppWideContext);

    React.useEffect(() => {
        loadFbLoginApi()
    }, [])

    const saveUserDataAfterSuccessfulLogin = (username) => {
        let userData = {
            contact: username
        }
        updateDataStore("userData", userData);
        localStorage.setItem("userData", JSON.stringify(userData));
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
            setLoading(true)
            let api = apiDictionary("userLogin", dataStore.apiToken, payload)
            fetch(api.url, api.fetcher).then((response) => {
                if (response.status === 200) {
                    response.json().then(data => {
                        if (data['status'] === 200) {
                            if (otp_login) {
                                setOTPSent(true)
                                props.showToast("We've sent an OTP to your Email or Phone!")
                            } else {
                                saveUserDataAfterSuccessfulLogin(uname)
                            }
                        } else {
                            props.showToast(data['response']['body'].toUpperCase());
                        }
                    })
                }
            }).finally(() => {
                setLoading(false)
            })
        };

        const loginOtp = (uname, otp) => {
            setLoading(true)
            let api = apiDictionary("userOTPLogin", dataStore.apiToken, {username: uname, otp: otp})
            fetch(api.url, api.fetcher).then((response) => {
                if (response.status === 200) {
                    response.json().then(data => {
                        if (data['status'] === 200) {
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
                    console.log('FB ID:' + response.id + 'Name:' + response.first_name + ',' + response.last_name + 'Email:' + response.email + 'Gender:' + response.gender)
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
        <form className={`grid grid-cols-4 gap-x-8`}>
            <input
                type="text"
                name='username'
                ref={username}
                placeholder="email/phone (required)"
                className={`${inputStyle}`}
                disabled={optSent}
            />
            <input
                type="password"
                name='password'
                ref={password}
                className={`${inputStyle}`}
                placeholder={optSent ? "Enter your OTP" : "Enter your password"}
            />
            <div className={`col-span-2 flex items-center gap-x-8 justify-start`}>
                <button
                    type="button"
                    onClick={() => signInAction(optSent ? "verifyOTP" : "signIn")}
                    className={`${buttonStyle}`}
                    disabled={loading}
                >
                    {
                        loading ?
                            <Loader className="text-grey"/>
                            :
                            optSent ? <>Verify OTP</> : <>Sign In</>
                    }
                </button>
                <span>or</span>
                <button
                    type="button"
                    onClick={() => signInAction("sendOTP")}
                    className={`${buttonStyle}`}
                    disabled={loading}
                >
                    {
                        loading ?
                            <Loader className="text-grey"/>
                            :
                            optSent ? <>Resend OTP</> : <>Login Using OTP</>
                    }
                </button>
                <button
                    type="button"
                    onClick={() => optSent ? setOTPSent(false) : signInAction("facebook")}
                    className={`${buttonStyle} flex items-center gap-x-3`}
                    disabled={loading}
                >
                    {
                        loading ?
                            <Loader className="text-grey"/>
                            :
                            optSent ? <>Back</> : <>
                                <Image src={WEBASSETS + "/assets/images/fb-icon.png"} alt="fb-icon" width={20} height={20} objectFit="contain"/>
                                <span>LOGIN</span>
                            </>

                    }
                </button>
            </div>
        </form>
    );
};

export default LoginForm;