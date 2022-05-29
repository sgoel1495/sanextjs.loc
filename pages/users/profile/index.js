import React, { Fragment, useContext, useEffect, useState } from "react";
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import UsersSideMenu from "../../../components/user/UsersSideMenu";
import ContactInformation from "../../../components/user/ContactInformation";
import DefaultAddressBookInformation from "../../../components/user/DefaultAddressBookInformation";
import { useRouter } from "next/router";
import UserPageTemplate from "../../../components/user/UserPageTemplate";

function UsersProfilePage() {
    const router = useRouter();
    const { dataStore } = useContext(AppWideContext);
    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])

    const mobileView = null;
    const browserView = () => {
        return (
            <UserPageTemplate>
                <ContactInformation mobile={false} />
                <DefaultAddressBookInformation mobile={false} manage={true} />
            </UserPageTemplate>
        );
    }


    return (
        <Fragment>
            <PageHead url={"/users/profile"} id={"profile"} isMobile={dataStore.mobile} />
            <Header type={"shopMenu"} />
            {(dataStore.mobile) ? mobileView : browserView()}
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )
}

export default UsersProfilePage;