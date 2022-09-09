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
import AddressForm from "../../../components/user/AddressForm";
import {apiCall} from "../../../helpers/apiCall";
import Toast from "../../../components/common/Toast";
import {connect} from "react-redux";

function UsersAddressBookPage({appConfig,userData}) {
    const router = useRouter();
    const [mobile, setMobile] = useState(false);
    const [edit, setEdit] = useState(null)
    const [userAddresses, setUserAddresses] = useState([])
    const [showToaster, setShowToaster] = useState(false)

    useEffect(() => {
        if (userData.userServe.email == null)
            router.replace("/"); //illegal direct access
    }, [userData.userServe.email, router])

    useEffect(() => {
        apiCall("userAddresses", appConfig.apiToken, {user: {email: userData.userServe.email}})
            .then(pData => {
                if (pData.status === 200 && pData.response) {

                    setUserAddresses(pData.response)
                }
            })
            .catch(e => console.log(e.message))
    }, [userData.userServe.email, appConfig.apiToken]);

    useEffect(() => {
        setMobile(isMobile)
    }, [])

    const deleteAddress = (i) => {
        apiCall("removeAddressBook", appConfig.apiToken, {user: {email: userData.userServe.email}, address: {index: i}})
            .then(pData => {
                if (pData.status === 200 && pData.response) {
                    setUserAddresses(userAddresses.filter((_, index) => index !== i))
                    setShowToaster(true)
                }
            })
            .catch(e => console.log(e.message))
    }

    let address = edit >= 0 ? userAddresses[edit] : {
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
        {
            edit !== null ?
                <AddressForm index={edit} address={address} setEdit={setEdit}/>
                :
                <>
                    <p className="text-[28px] ml-3">Default Addresses</p>
                    <DefaultAddressBookInformation mobile={true} showEdit={true} setEdit={setEdit}/>
                    <p className="text-[28px] mt-4 ml-3">Additional Addresses</p>
                    <DisplayAdditionalAddresses mobile={true} setEdit={setEdit} userAddresses={userAddresses} deleteAddress={deleteAddress}/>
                </>
        }

    </UserPageTemplate>

    const browserView = <UserPageTemplate>
        {
            edit !== null ?
                <AddressForm index={edit} address={address} setEdit={setEdit}/>
                :
                <>
                    <p className="text-[28px]">Default Addresses</p>
                    <DefaultAddressBookInformation mobile={false} showEdit={true} setEdit={setEdit}/>
                    <p className="text-[28px] mt-4">Additional Addresses</p>
                    <DisplayAdditionalAddresses mobile={false} setEdit={setEdit} userAddresses={userAddresses} deleteAddress={deleteAddress}/>
                </>
        }
    </UserPageTemplate>


    return (
        <Fragment>
            <PageHead url={"/users/profile"} id={"profile"} isMobile={mobile}/>
            <Header type={mobile ? "minimal" : "shopMenu"} isMobile={mobile}/>
            {(mobile) ? mobileView : browserView}
            <Footer isMobile={mobile} minimal={true}/>
            <Toast show={showToaster} hideToast={() => setShowToaster(false)}>
                <span>Successfully Deleted</span>
            </Toast>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(UsersAddressBookPage);
