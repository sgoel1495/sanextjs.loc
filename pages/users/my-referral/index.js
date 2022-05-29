import React, { Fragment, useContext, useEffect } from "react";
import AppWideContext from "../../../store/AppWideContext";
import { useRouter } from "next/router";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import UserPageTemplate from "../../../components/user/UserPageTemplate";

function UsersMyReferralsPage() {
    const router = useRouter();
    const { dataStore } = useContext(AppWideContext);
    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])

    const mobileView = null;
    const browserView = (
        <UserPageTemplate>
            <p className="text-[28px] mb-2">My Referral</p>
            <p className="text-[#777] text-lg">No Record Found!</p>
        </UserPageTemplate>
    )
    return (
        <Fragment>
            <PageHead url={"/users/my-referral"} id={"profile"} isMobile={dataStore.mobile} />
            <Header type={"shopMenu"} />
            {(dataStore.mobile) ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile} />
        </Fragment>
    )
}

export default UsersMyReferralsPage;