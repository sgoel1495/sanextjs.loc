import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import {useRouter} from "next/router";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import UserPageTemplate from "../../../components/user/UserPageTemplate";
import {isMobile} from "react-device-detect";
import Image from "next/image";
import Toast from "../../../components/common/Toast";


function UsersMyReferralsPage() {
    const router = useRouter();
    const {dataStore} = useContext(AppWideContext);
    const [mobile, setMobile] = useState(false);
    const [showToaster, setShowToaster] = useState(false)

    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])

    useEffect(() => {
        setMobile(isMobile)
    }, [])

    const mobileView = (
        <UserPageTemplate mobile={true}>
            <p className="text-[28px] mb-2">My Referral</p>
             <p className="text-[#777] text-lg">No Record Found!</p>
        </UserPageTemplate>
    )
    const browserView = (
        <UserPageTemplate>
            <p className="text-[28px] mb-2">My Referral</p>
            <p className="text-[#777] text-lg">No Record Found!</p>
        </UserPageTemplate>
    )
    return (
        <Fragment>
            <PageHead url={"/users/my-referral"} id={"profile"} isMobile={dataStore.mobile}/>
            <Header type={dataStore.mobile ? "minimal" : "shopMenu"} isMobile={dataStore.mobile}/>
            {mobile ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile}/>
            <Toast show={showToaster} hideToast={() => setShowToaster(false)}>
                <span>Referral Code copied to share</span>
            </Toast>
        </Fragment>

    )
}

export default UsersMyReferralsPage;
