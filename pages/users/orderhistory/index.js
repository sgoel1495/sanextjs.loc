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

const mockData = [
    {
        title: "Aurora",
        orderID: "1657789049726-0",
        qty: 1,
        size: 'S',
        date: "14-07-2022, 14:27",
        img: "/assets/Dresses-Candolim-LinenShirtDress/thumb.jpg",
        label: "V-neck Top",
        price: "3150",
    }, {
        title: "Aurora",
        orderID: "1657789049726-0",
        qty: 1,
        size: 'S',
        date: "14-07-2022, 14:27",
        img: "/assets/Dresses-Candolim-LinenShirtDress/thumb.jpg",
        label: "V-neck Top",
        price: "3150",
    },
]


function UsersOrderHistoryPage() {

    const [mobile, setMobile] = useState(false);
    const router = useRouter();
    const {dataStore} = useContext(AppWideContext);

    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])
    useEffect(() => {
        setMobile(isMobile)
    }, [])

    const MyOrderProducts = (props) => {
        const mobileView = <>
            {
                props.productData.map((product, productIndex) => {
                    return <MyOrderProductCard key={productIndex} product={product}/>
                })
            }
        </>

        const browserView = <> </>

        return mobile ? mobileView : browserView
    }


    const mobileView = (
        <UserPageTemplate mobile={true}>
            <p className="text-[28px] mb-2 mx-2">My Orders</p>
            <MyOrderProducts productData={mockData}/>
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
            <Footer isMobile={mobile}/>
        </Fragment>
    )
}

export default UsersOrderHistoryPage;
