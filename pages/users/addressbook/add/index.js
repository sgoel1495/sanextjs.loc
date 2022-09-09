import React, {Fragment, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import AppWideContext from "../../../../store/AppWideContext";
import UsersMenu from "../../../../components/user/UsersMenu";
import AddressForm from "../../../../components/user/AddressForm";
import PageHead from "../../../../components/PageHead";
import Header from "../../../../components/navbar/Header";
import UserPageTemplate from "../../../../components/user/UserPageTemplate";
import {isMobile} from "react-device-detect";

function UsersAddAddressPage({appConfig,userData}) {
    const router = useRouter();
    useEffect(() => {
        if (userData.userServe.email == null)
            router.replace("/"); //illegal direct access
    }, [userData.userServe.email, router])

    const address = {
        "name": "",
        "lastname": "",
        "email": userData.userServe.email,
        "phone": userData.userServe.phone_number,
        "address": "",
        "landmark": "",
        "country": "India",
        "zip_code": "",
        "state": "",
        "city": ""
    }

    const mobileView = <UserPageTemplate mobile={true}>
        <AddressForm index={-1} address={address}/>
    </UserPageTemplate>
    const browserView = () => {
        return (
            <UserPageTemplate>
                <AddressForm index={-1} address={address}/>
            </UserPageTemplate>
        );
    }


    return (
        <Fragment>
            <PageHead url={"/users/profile"} id={"profile"} isMobile={appConfig.isMobile}/>
            <Header type={appConfig.isMobile ? "minimal" : "shopMenu"} isMobile={appConfig.isMobile}/>
            {(appConfig.isMobile) ? mobileView : browserView()}
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig
    }
}

export default (mapStateToProps)(UsersAddAddressPage);
