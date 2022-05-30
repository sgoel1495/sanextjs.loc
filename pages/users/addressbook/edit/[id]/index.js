import React, { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AppWideContext from "../../../../../store/AppWideContext";
import UsersSideMenu from "../../../../../components/user/UsersSideMenu";
import PageHead from "../../../../../components/PageHead";
import Header from "../../../../../components/navbar/Header";
import AddressForm from "../../../../../components/user/AddressForm";
import UserPageTemplate from "../../../../../components/user/UserPageTemplate";

function AddAddressEditByIdPage() {
    const router = useRouter();
    const { dataStore } = useContext(AppWideContext);
    const query = router.query
    const addressId = query.pageid
    useEffect(() => {
        if (!addressId || dataStore.userData.contact == null || !dataStore.userAddresses || dataStore.userAddresses.length < (addressId + 1))
            router.replace("/"); // no illegal access
    }, [addressId, dataStore.userData.contact, dataStore.userAddresses, dataStore.userAddresses.length, router])


    const address = dataStore.userAddresses[addressId];

    const mobileView = null;
    const browserView = () => {
        return (
            <UserPageTemplate>
                <AddressForm index={addressId} address={address} />
            </UserPageTemplate>
        );
    }


    return (
        <Fragment>
            <PageHead url={"/users/profile"} id={"profile"} isMobile={dataStore.mobile} />
            <Header type={"shopMenu"} />
            {(dataStore.mobile) ? mobileView : browserView()}
        </Fragment>
    )
}

export default AddAddressEditByIdPage;