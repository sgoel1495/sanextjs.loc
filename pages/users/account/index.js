import React, { Fragment, useContext, useEffect } from "react";
import AppWideContext from "../../../store/AppWideContext";
import { useRouter } from "next/router";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import UserPageTemplate from "../../../components/user/UserPageTemplate";

function UsersAccountPage() {
    const router = useRouter();
    const { dataStore } = useContext(AppWideContext);
    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])

    const mobileView = null;
    const browserView = (
        <UserPageTemplate>
            Account
        </UserPageTemplate>
    )
    return (
        <Fragment>
            <PageHead url={"/users/account"} id={"profile"} isMobile={dataStore.mobile} />
            <Header type={"shopMenu"} />
            {(dataStore.mobile) ? mobileView : browserView}
        </Fragment>
    )
}

export default UsersAccountPage;