import React, {useCallback, useEffect} from 'react';
import {connect} from "react-redux";
import {updateUserDataAfterLogin} from "../helpers/updateUserDataAfterLogin";
import {isMobile} from "react-device-detect";
import {setPrivilegedUser, setUserServe, setUserState} from "../ReduxStore/reducers/userSlice";
import {setCart} from "../ReduxStore/reducers/shoppingCartSlice";
import {setIsMobile} from "../ReduxStore/reducers/appConfigSlice";
import {setOrderHistory} from "../ReduxStore/reducers/orderSlice";
import {useRouter} from "next/router";
import {setShowSidebarMenu} from "../ReduxStore/reducers/userConfigSlice";
import {addBackFromPaymentIntent, addWithAddressIntent, addWithoutAddressIntent} from "../ReduxStore/reducers/intentSlice";
import {apiCall} from "../helpers/apiCall";

const AppWrapper = (props) => {
    const {userData, shoppingCart, appConfig} = props
    const router = useRouter()

    const routerEvent = useCallback((url, {shallow}) => {
        if (router.asPath === "/users/checkoutpage" || router.asPath === "/order/guestcheckout") {
            if (!url.startsWith("/salt/Thankyou") && !url.startsWith("/order/CCportal") && !url.startsWith("/users/checkoutpage") && !url.startsWith("/order/guestcheckout")) {
                if (props.orderSummary.address_index >= 0) {
                    props.addWithAddressIntent()
                } else {
                    props.addWithoutAddressIntent()
                }
            }
        }
        if (router.asPath.startsWith("/order/CCportal") && !url.startsWith("/salt/Thankyou")) {
            props.addBackFromPaymentIntent()
        }

        props.setShowSidebarMenu(false)
    }, [props.orderSummary, router.asPath])

    useEffect(() => {
        router.events.on('routeChangeStart', routerEvent)
        return () => {
            router.events.off('routeChangeStart', routerEvent)
        }
    }, [routerEvent])

    useEffect(() => {
        let flag = true;
        if (userData) {
            if (userData.userServe.email) {
                updateUserDataAfterLogin(userData.userServe, appConfig.apiToken, [], []).then(updateData => {
                    props.setCart(updateData.shoppingCart)
                    props.setUserState(updateData.userState);
                    props.setOrderHistory(updateData.orderHistory);
                })
                flag = false
            }
        }
        if (flag) {
            let userServe = {...userData.userServe, temp_user_id: Date.now().toString()}
            if (userData) {
                if (!userData.userServe.temp_user_id) {
                    props.setUserServe(userServe)
                }
            } else {
                props.setUserServe(userServe)
            }
        }
    }, [userData.userServe.email])

    useEffect(() => {
        if (appConfig.isMobile !== isMobile) props.setIsMobile(isMobile)
    }, [])

    useEffect(() => {
        if (props.intent.cart >= 7 && userData.userServe.email) apiCall("intentToBuy", appConfig.apiToken, {
            "process": userData.userServe.email, "cart": props.shoppingCart.cart.length, "user_stat": props.intent.cart, "call_from": "on payment portal"
        })
    }, [props.intent.cart])

    useEffect(() => {
        if (props.intent.checkout >= 2 && userData.userServe.email) apiCall("intentToBuy", appConfig.apiToken, {
            "process": userData.userServe.email, "cart": props.shoppingCart.cart.length, "user_stat": props.intent.checkout, "call_from": "Pressing checkout"
        })
    }, [props.intent.checkout])

    useEffect(() => {
        if (props.intent.withoutAddress >= 2 && userData.userServe.email) apiCall("intentToBuy", appConfig.apiToken, {
            "process": userData.userServe.email, "cart": props.shoppingCart.cart.length, "user_stat": props.intent.withoutAddress, "call_from": "without address back press count"
        })
    }, [props.intent.withoutAddress])

    useEffect(() => {
        if (props.intent.withAddress >= 2 && userData.userServe.email) apiCall("intentToBuy", appConfig.apiToken, {
            "process": userData.userServe.email, "cart": props.shoppingCart.cart.length, "user_stat": props.intent.withAddress, "call_from": "with address back press "
        })
    }, [props.intent.withAddress])

    useEffect(() => {
        if (props.intent.onPayment >= 2 && userData.userServe.email) apiCall("intentToBuy", appConfig.apiToken, {
            "process": userData.userServe.email, "cart": props.shoppingCart.cart.length, "user_stat": props.intent.onPayment, "call_from": "on payment portal"
        })
    }, [props.intent.onPayment])

    useEffect(() => {
        if (props.intent.backFromPayment >= 2 && userData.userServe.email) apiCall("intentToBuy", appConfig.apiToken, {
            "process": userData.userServe.email, "cart": props.shoppingCart.cart.length, "user_stat": props.intent.backFromPayment, "call_from": "back from payment portal"
        })
    }, [props.intent.backFromPayment])


    return props.children;
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData, shoppingCart: state.shoppingCart, appConfig: state.appConfig, orderSummary: state.orderData.orderSummary, intent: state.intent
    }
}

export default connect(mapStateToProps, {
    setUserServe,
    setUserState,
    setCart,
    setIsMobile,
    setOrderHistory,
    setShowSidebarMenu,
    setPrivilegedUser,
    addWithAddressIntent,
    addWithoutAddressIntent,
    addBackFromPaymentIntent
})(AppWrapper);