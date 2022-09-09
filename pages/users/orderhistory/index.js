import React, {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import UserPageTemplate from "../../../components/user/UserPageTemplate";
import {isMobile} from "react-device-detect";
import MyOrderProductCard from "../../../components/user/mobile/MyOrderProductCard";
import {apiCall} from "../../../helpers/apiCall";
import {connect} from "react-redux";
import {setOrderHistory} from "../../../ReduxStore/reducers/orderSlice";

function UsersOrderHistoryPage({appConfig, userData, orderHistory}) {

    const [mobile, setMobile] = useState(false);
    const router = useRouter();

    const getOrderHistory = () => {
        apiCall("userOrderHistory", appConfig.apiToken, {user: {token: appConfig.apiToken, contact: userData.userServe.email}})
            .then(pData => {
                if (pData.status === 200 && pData.response) {
                    setOrderHistory(pData.response);
                }
            })
            .catch(e => console.log(e.message))
    }

    useEffect(() => {
        if (!userData.userServe.email)
            router.replace("/"); //illegal direct access
    }, [userData.userServe.email, router])

    useEffect(() => {
        setMobile(isMobile)
    }, [])

    useEffect(() => {
        getOrderHistory()
    }, [userData.userServe.email])

    const MyOrderProducts = () => {
        let returnValue = null;
        orderHistory && Object.keys(orderHistory).forEach((key, productIndex) => {
            orderHistory[key].item.forEach((item, itemIndex) => {
                    returnValue = (
                        <Fragment>
                            {returnValue}
                            <MyOrderProductCard key={productIndex} product={orderHistory[key]} itemIndex={itemIndex} isMobile={mobile} getOrderHistory={getOrderHistory}/>
                        </Fragment>
                    );
                }
            )
        });
        return returnValue;
    };

    const mobileView = (
        <UserPageTemplate mobile={true}>
            <p className="text-[28px] mb-2 mx-2">My Orders</p>
            <MyOrderProducts/>
        </UserPageTemplate>
    )
    const browserView = (
        <UserPageTemplate>
            <p className="text-[28px] mb-2">My Orders</p>
            <MyOrderProducts/>
        </UserPageTemplate>
    )
    return (
        <Fragment>
            <PageHead url={"/users/orderhistory"} id={"profile"} isMobile={mobile}/>
            <Header type={mobile ? "minimal" : "shopMenu"} isMobile={mobile}/>
            {(mobile) ? mobileView : browserView}
            <Footer isMobile={mobile} minimal={true}/>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig,
        orderHistory: state.orderData.orderHistory
    }
}

export default connect(mapStateToProps, {setOrderHistory})(UsersOrderHistoryPage);
