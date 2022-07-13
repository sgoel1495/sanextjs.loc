import React, {Fragment, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import AppWideContext from "../../../../store/AppWideContext";
import UsersMenu from "../../../../components/user/UsersMenu";
import AddressForm from "../../../../components/user/AddressForm";
import PageHead from "../../../../components/PageHead";
import Header from "../../../../components/navbar/Header";
import UserPageTemplate from "../../../../components/user/UserPageTemplate";
import {isMobile} from "react-device-detect";

function UsersAddAddressPage() {
    const router = useRouter();
    const {dataStore} = useContext(AppWideContext);
    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
        setMobile(isMobile)
    }, [])

    const address = {
        "name": "",
        "lastname": "",
        "email": dataStore.userData.contact,
        "phone": dataStore.userServe.phone_number,
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
            <PageHead url={"/users/profile"} id={"profile"} isMobile={dataStore.mobile}/>
            <Header type={mobile ? "minimal" : "shopMenu"} isMobile={mobile}/>
            {(mobile) ? mobileView : browserView()}
        </Fragment>
    )
}

export default UsersAddAddressPage;
