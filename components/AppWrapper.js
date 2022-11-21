import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {updateUserDataAfterLogin} from "../helpers/updateUserDataAfterLogin";
import {isMobile} from "react-device-detect";
import {setPrivilegedUser, setUserServe, setUserState} from "../ReduxStore/reducers/userSlice";
import {setCart} from "../ReduxStore/reducers/shoppingCartSlice";
import {setIsMobile} from "../ReduxStore/reducers/appConfigSlice";
import {setOrderHistory} from "../ReduxStore/reducers/orderSlice";
import {useRouter} from "next/router";
import {setShowSidebarMenu} from "../ReduxStore/reducers/userConfigSlice";

const AppWrapper = (props) => {
    const {userData, shoppingCart, appConfig} = props
    const router = useRouter()
    useEffect(() => {
        router.events.on('routeChangeStart', (url, {shallow}) => {
            props.setShowSidebarMenu(false)
        })
        let flag = true;
        if (userData) {
            if (userData.userServe.email) {
                updateUserDataAfterLogin(userData.userServe, appConfig.apiToken, userData.measurements, shoppingCart.cart).then(updateData => {
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
        if (appConfig.isMobile !== isMobile)
            props.setIsMobile(isMobile)
    }, [])

    return props.children;
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        shoppingCart: state.shoppingCart,
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps, {setUserServe, setUserState, setCart, setIsMobile, setOrderHistory, setShowSidebarMenu, setPrivilegedUser})(AppWrapper);