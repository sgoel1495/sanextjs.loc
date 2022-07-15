import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import DefaultAddressBookInformation from "../../../components/user/DefaultAddressBookInformation";
import {useRouter} from "next/router";
import DisplayAdditionalAddresses from "../../../components/user/login/DisplayAdditionalAddresses";
import UserPageTemplate from "../../../components/user/UserPageTemplate";
import {isMobile} from "react-device-detect";

function UsersAddressBookPage() {
    const router = useRouter();
    const [mobile, setMobile] = useState(false);
    const {dataStore} = useContext(AppWideContext);
    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])
    useEffect(() => {
        setMobile(isMobile)
    }, [])

    const mobileView = <UserPageTemplate mobile={true}>
        <p className="text-[28px] ml-3">Default Addresses</p>
        <DefaultAddressBookInformation mobile={true} showEdit={true}/>
        <p className="text-[28px] mt-4 ml-3">Additional Addresses</p>
        <DisplayAdditionalAddresses mobile={true}/>
    </UserPageTemplate>

    const browserView = () => {
        return (
            <UserPageTemplate>
                <p className="text-[28px]">Default Addresses</p>
                <DefaultAddressBookInformation mobile={false} manage={false}/>
                <p className="text-[28px] mt-4">Additional Addresses</p>
                <DisplayAdditionalAddresses mobile={false}/>
            </UserPageTemplate>
        );
    }


    return (
        <Fragment>
            <PageHead url={"/users/profile"} id={"profile"} isMobile={mobile}/>
            <Header type={mobile ? "minimal" : "shopMenu"} isMobile={mobile}/>
            {(mobile) ? mobileView : browserView()}
            <Footer isMobile={mobile}/>
        </Fragment>
    )
}

export default UsersAddressBookPage;
