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

function UsersAddressBookPage() {
    const router = useRouter();
    const [mobile, setMobile] = useState(false);
    const {dataStore} = useContext(AppWideContext);
    const [edit, setEdit] = useState(null)
    const [userAddresses, setUserAddresses] = useState([])

    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])

    useEffect(() => {
        apiCall("userAddresses", dataStore.apiToken, {user: {email: dataStore.userServe.email}})
            .then(pData => {
                if (pData.status === 200 && pData.response) {
                    setUserAddresses(pData.response)
                }
            })
            .catch(e => console.log(e.message))
    }, [dataStore.userServe.email, dataStore.apiToken]);
    useEffect(() => {
        setMobile(isMobile)
    }, [])


    let address = edit >= 0 ? userAddresses[edit] : {
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
    console.log(address)

    const mobileView = <UserPageTemplate mobile={true}>
        {
            edit !== null ?
                <AddressForm index={edit} address={address} setEdit={setEdit}/>
                :
                <>
                    <p className="text-[28px] ml-3">Default Addresses</p>
                    <DefaultAddressBookInformation mobile={true} showEdit={true} setEdit={setEdit}/>
                    <p className="text-[28px] mt-4 ml-3">Additional Addresses</p>
                    <DisplayAdditionalAddresses mobile={true} setEdit={setEdit} userAddresses={userAddresses}/>
                </>
        }

    </UserPageTemplate>

    const browserView = () => {
        return (
            <UserPageTemplate>
                <p className="text-[28px]">Default Addresses</p>
                <DefaultAddressBookInformation mobile={false} manage={false}/>
                <p className="text-[28px] mt-4">Additional Addresses</p>
                <DisplayAdditionalAddresses mobile={false} userAddresses={userAddresses}/>
            </UserPageTemplate>
        );
    }


    return (
        <Fragment>
            <PageHead url={"/users/profile"} id={"profile"} isMobile={mobile}/>
            <Header type={mobile ? "minimal" : "shopMenu"} isMobile={mobile}/>
            {(mobile) ? mobileView : browserView()}
            <Footer isMobile={mobile} minimal={true}/>
        </Fragment>
    )
}

export default UsersAddressBookPage;
