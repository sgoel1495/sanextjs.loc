import React, {Fragment, useReducer, useState} from 'react';
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import Toast from "../../../components/common/Toast";
import {connect} from "react-redux";
import Loader from "../../../components/common/Loader";
import {apiDictionary} from "../../../helpers/apiDictionary";
import {useRouter} from "next/router";
import {updateUserDataAfterLogin} from "../../../helpers/updateUserDataAfterLogin";
import {setCart} from "../../../ReduxStore/reducers/shoppingCartSlice";
import {setUserState} from "../../../ReduxStore/reducers/userSlice";
import {setOrderHistory} from "../../../ReduxStore/reducers/orderSlice";

const Index = ({isMobile, apiToken, userData, shoppingCart, setCart, setUserState, setOrderHistory}) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [payload, setPayload] = useReducer((state, e) => {
        // if (e.target.name === "otp") {
        //     if (e.target.value.toString().length > 4) {
        //         return state
        //     }
        // }
        return {...state, [e.target.name]: e.target.value}
    }, {
        otp: "",
        new_password: "",
        confirm_password: ""
    })

    React.useEffect(() => {
        if (!router.asPath.includes("token")) {
            router.push("/new-arrivals/all")
        }
    }, [])

    const saveUserDataAfterSuccessfulLogin = async (username) => {
        const updateData = await updateUserDataAfterLogin({...userData, email: username}, apiToken, userData.measurements, shoppingCart.cart);
        setCart(updateData.shoppingCart)
        setUserState(updateData.userState);
        setOrderHistory(updateData.orderHistory);
        router.push("/")
    }

    const verifyOTP = () => {
        if (payload["otp"].length < 4) {
            setError("Please enter a valid otp")
            return
        }
        if (payload["new_password"].length < 4) {
            setError("Please enter a Password of minimum 6 characters")
            return
        }
        if (payload["new_password"] !== payload["confirm_password"]) {
            setError("Password and Confirm Password dont match")
            return
        }
        setLoading(true)
        let api = apiDictionary("validateOTP", apiToken, {
            user: {
                "contact": "",
                "otp": payload["otp"],
                "password": payload["new_password"],
                "token": router.query.token
            }
        })
        fetch(api.url, api.fetcher).then((response) => {
            if (response.status === 200) {
                response.json().then(respData => {
                    if (respData['status'] === 200) {
                        setError("Password has ben reset")
                        saveUserDataAfterSuccessfulLogin(respData.response.userEmail)
                    } else {
                        setError("Please try again")
                    }
                })
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const inputStyle = "placeholder:text-black/30 border-black focus:ring-0 focus:border-black focus:shadow-none border py-2 px-4 text-sm leading-none "+(isMobile ? "w-[75%]" : "w-[50%]");
    const buttonStyle = "uppercase border py-3 px-6 text-sm text-white font-600 tracking-wider bg-black";
    return (
        <Fragment>
            <PageHead url={"/users/favourites"} id={"profile"} isMobile={isMobile}/>
            <Header type={isMobile ? "minimal" : "shopMenu"} isMobile={isMobile}/>
            <div className={"container grid place-items-center gap-5 mt-24 mb-44"}>
                <div className={"text-center uppercase tracking-widest font-600 text-[#333]"}>
                    change password
                </div>
                <input
                    type="number"
                    placeholder="OTP"
                    className={`${inputStyle}`}
                    disabled={loading}
                    name={"otp"}
                    max={9999}
                    value={payload["otp"]}
                    onChange={setPayload}
                />
                <input
                    type="text"
                    placeholder="New Password"
                    className={`${inputStyle}`}
                    disabled={loading}
                    name={"new_password"}
                    onChange={setPayload}
                />
                <input
                    type="text"
                    placeholder="Confirm Password"
                    className={`${inputStyle}`}
                    disabled={loading}
                    name={"confirm_password"}
                    onChange={setPayload}
                />
                <button
                    type="submit"
                    className={`${buttonStyle}`}
                    disabled={loading}
                    onClick={verifyOTP}
                >
                    {
                        loading ?
                            <Loader className="text-grey"/>
                            :
                            <>Submit</>
                    }
                </button>
            </div>
            <Footer isMobile={isMobile} minimal={true}/>
            <Toast show={!!error} hideToast={() => setError(null)}>
                {error}
            </Toast>
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        isMobile: state.appConfig.isMobile,
        apiToken: state.appConfig.apiToken,
        userData: state.userData,
        shoppingCart: state.shoppingCart,
    }
}

export default connect(mapStateToProps, {setCart, setUserState, setOrderHistory})(Index);