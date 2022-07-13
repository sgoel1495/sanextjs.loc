import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import ContactInformation from "../../../components/user/ContactInformation";
import DefaultAddressBookInformation from "../../../components/user/DefaultAddressBookInformation";
import {useRouter} from "next/router";
import UserPageTemplate from "../../../components/user/UserPageTemplate";
import formatTwoDecimal from "../../../helpers/formatTwoDecimal";
import {isMobile} from "react-device-detect";

function UsersProfilePage() {
    const [mobile, setMobile] = useState(false);
    const router = useRouter();
    const {dataStore} = useContext(AppWideContext);
    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])
    useEffect(() => {
        setMobile(isMobile)
    }, [])
    const mobileView = () => {
        return (<UserPageTemplate mobile={true}>
            <ContactInformation mobile={true}/>
            {/*<MyWalletInformation/>*/}
            <div className={"p-4 bg-[#f1f2f3]"}>
                <p className="text-xl font-500 mb-2 mt-1 w-full">My Wallet</p>
                <p className="font-700 pb-10">{dataStore.currSymbol} {formatTwoDecimal(dataStore.userWallet.WalletAmount)}</p>
            </div>
            <DefaultAddressBookInformation mobile={true} manage={true}/>
        </UserPageTemplate>)
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
            <PageHead url={"/users/profile"} id={"profile"} isMobile={mobile}/>
            <Header type={mobile ? "minimal" : "shopMenu"} isMobile={mobile}/>
            {(mobile) ? mobileView() : browserView()}
            <Footer isMobile={mobile}/>
        </Fragment>
    )
}

export default UsersProfilePage;
