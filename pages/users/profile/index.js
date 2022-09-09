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
import {apiCall} from "../../../helpers/apiCall"
import {connect} from "react-redux";

function UsersProfilePage({appConfig,userData,userConfig}) {
    const [mobile, setMobile] = useState(false);
    const router = useRouter();
    const [walletAmount,setWalletAmount] = useState(null);
    useEffect(() => {
        if (userData.userServe.email == null)
            router.replace("/"); //illegal direct access
    }, [userData.userServe.email, router])
    useEffect(() => {
        setMobile(isMobile)
    }, [])

    useEffect(()=>{
        apiCall("userWallet", appConfig.apiToken,{contact:userData.userServe.email})
            .then(pData=>{
                if (pData.msg === 'Found' && pData.user){
                    setWalletAmount(pData.user.WalletAmount)
                }
            })
            .catch(e=>console.log(e.message))
    },[userData.userServe.email,appConfig.apiToken]);

    const mobileView = () => {
        return (<UserPageTemplate mobile={true}>
            <ContactInformation mobile={true}/>
            {/*<MyWalletInformation/>*/}
            <div className={"p-4 bg-[#f1f2f3]"}>
                <p className="text-xl font-500 mb-2 mt-1 w-full">My Wallet</p>
                {userConfig.currSymbol} {walletAmount && <p className="font-700 pb-10">{formatTwoDecimal(walletAmount)}</p>}
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
            <Footer isMobile={mobile} minimal={true}/>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig,
        userConfig:state.userConfig
    }
}

export default connect(mapStateToProps)(UsersProfilePage);
