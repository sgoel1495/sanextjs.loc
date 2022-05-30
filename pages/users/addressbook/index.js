import React, { Fragment, useContext, useEffect, useState } from "react";
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import UsersSideMenu from "../../../components/user/UsersSideMenu";
import ContactInformation from "../../../components/user/ContactInformation";
import DefaultAddressBookInformation from "../../../components/user/DefaultAddressBookInformation";
import { useRouter } from "next/router";
import DisplayAdditionalAddresses from "../../../components/user/login/DisplayAdditionalAddresses";
import UserPageTemplate from "../../../components/user/UserPageTemplate";

function UsersAddressBookPage() {
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
                <p className="text-[28px]">Default Addresses</p>
                <DefaultAddressBookInformation mobile={false} manage={false} />
                <p className="text-[28px] mt-4">Additional Addresses</p>
                <DisplayAdditionalAddresses mobile={false} />
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

export default UsersAddressBookPage;