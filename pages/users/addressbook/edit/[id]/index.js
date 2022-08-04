import React, {Fragment, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import AppWideContext from "../../../../../store/AppWideContext";
import PageHead from "../../../../../components/PageHead";
import Header from "../../../../../components/navbar/Header";
import AddressForm from "../../../../../components/user/AddressForm";
import UserPageTemplate from "../../../../../components/user/UserPageTemplate";
import {isMobile} from "react-device-detect";

function AddAddressEditByIdPage() {
    const router = useRouter();
    const {dataStore} = useContext(AppWideContext);
    const addressId = router.query.id
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
        setMobile(isMobile)
    }, [])
    useEffect(() => {
        if (!addressId || dataStore.userData.contact == null || !dataStore.userAddresses || dataStore.userAddresses.length < (addressId + 1)) {
            router.replace("/"); // no illegal access
        }
    }, [addressId, dataStore.userData.contact, dataStore.userAddresses, dataStore.userAddresses.length, router])


    const address = dataStore.userAddresses[addressId];

    const mobileView = <UserPageTemplate mobile={true}>
        <AddressForm index={addressId} address={address}/>
    </UserPageTemplate>
    const browserView = () => {
        return (
            <UserPageTemplate>
                <AddressForm index={addressId} address={address}/>
            </UserPageTemplate>
        );
    }


    return (
        <Fragment>
            <PageHead url={"/users/profile"} id={"profile"} isMobile={mobile}/>
            <Header type={mobile ? "minimal" : "shopMenu"} isMobile={mobile}/>
            {(mobile) ? mobileView : browserView()}
        </Fragment>
    )
}

export default AddAddressEditByIdPage;
