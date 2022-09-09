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
import {connect} from "react-redux";


function UsersMyReferralsPage({appConfig,userData}) {
    const router = useRouter();
    const [showToaster, setShowToaster] = useState(false)

    useEffect(() => {
        if (userData.userServe.email == null)
            router.replace("/"); //illegal direct access
    }, [userData.userServe.email, router])

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
            <PageHead url={"/users/my-referral"} id={"profile"} isMobile={appConfig.isMobile}/>
            <Header type={appConfig.isMobile ? "minimal" : "shopMenu"} isMobile={appConfig.isMobile}/>
            {appConfig.isMobile ? mobileView : browserView}
            <Footer isMobile={appConfig.isMobile}/>
            <Toast show={showToaster} hideToast={() => setShowToaster(false)}>
                <span>Referral Code copied to share</span>
            </Toast>
        </Fragment>

    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(UsersMyReferralsPage);
