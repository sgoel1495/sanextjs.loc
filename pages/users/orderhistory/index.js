import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import {useRouter} from "next/router";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import UserPageTemplate from "../../../components/user/UserPageTemplate";
import {isMobile} from "react-device-detect";
import Image from "next/image";
import MyOrderProductCard from "../../../components/user/mobile/MyOrderProductCard";
import {apiCall} from "../../../helpers/apiCall";

function UsersOrderHistoryPage() {

    const [mobile, setMobile] = useState(false);
    const router = useRouter();
    const {dataStore} = useContext(AppWideContext);
    const [productData, setProductData] = useState({});

    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])
    useEffect(() => {
        setMobile(isMobile)
    }, [])
    useEffect(()=>{
        apiCall("userOrderHistory", dataStore.apiToken,{user:{token:dataStore.apiToken ,contact:dataStore.userData.contact}})
            .then(pData=>{
                if (pData.status === 200 && pData.response){
                    console.log('eerreeeeee', pData.response);
                    setProductData(pData.response);
                }
            })
            .catch(e=>console.log(e.message))
    },[dataStore.userData.contact, dataStore.apiToken])

    const MyOrderProducts = () => {
            let returnValue = null;
            productData && Object.keys(productData).forEach((key, productIndex) => {
                productData[key].item.forEach((item, itemIndex)=>{
                    returnValue = (
                        <Fragment>
                            {returnValue}
                            <MyOrderProductCard key={productIndex} product={productData[key]} itemIndex={itemIndex}/>
                        </Fragment>
                    );
                }          
            )});
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

export default UsersOrderHistoryPage;
