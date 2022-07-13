import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import UsersSideMenu from "../../../components/user/UsersSideMenu";
import ContactInformation from "../../../components/user/ContactInformation";
import DefaultAddressBookInformation from "../../../components/user/DefaultAddressBookInformation";
import {useRouter} from "next/router";
import UserPageTemplate from "../../../components/user/UserPageTemplate";
import UserScreenTemplate from "../../../components/user/mobile/UserScreenTemplate";
import formatTwoDecimal from "../../../helpers/formatTwoDecimal";

function UsersProfilePage() {
    const router = useRouter();
    const {dataStore} = useContext(AppWideContext);
    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])

    const mobileView = () => {
        return (<UserScreenTemplate>
            <ContactInformation mobile={true}/>
            {/*<MyWalletInformation/>*/}
            <div className={"p-4 bg-[#f1f2f3]"}>
                <p className="text-xl font-500 mb-2 mt-1 w-full">My Wallet</p>
                <p className="font-700 pb-10">{dataStore.currSymbol} {formatTwoDecimal(dataStore.userWallet.WalletAmount)}</p>
            </div>
            <DefaultAddressBookInformation mobile={true} manage={true}/>
        </UserScreenTemplate>)
    }
    const browserView = () => {
        return (
            <UserPageTemplate>
                <ContactInformation mobile={false}/>
                <DefaultAddressBookInformation mobile={false} manage={true}/>
            </UserPageTemplate>
        );
    }


    return (
        <Fragment>
            <PageHead url={"/users/profile"} id={"profile"} isMobile={dataStore.mobile}/>
            <Header type={dataStore.mobile?"minimal":"shopMenu"} isMobile={dataStore.mobile}/>
            {(dataStore.mobile) ? mobileView() : browserView()}
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )
}

export default UsersProfilePage;
