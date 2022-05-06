import React, { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AppWideContext from "../../../../../store/AppWideContext";
import UsersSideMenu from "../../../../../components/user/UsersSideMenu";
import PageHead from "../../../../../components/PageHead";
import Header from "../../../../../components/navbar/Header";
import AddressForm from "../../../../../components/user/AddressForm";

function AddAddressEditByIdPage() {
    const router = useRouter();
    const { dataStore } = useContext(AppWideContext);
    const addressId = query.pageid;
    if( !addressId || dataStore.userData.contact==null || !dataStore.userAddresses.length < (addressId+1) )
        router.replace("/"); // no illegal access

    const address = dataStore.userAddresses[addressId];

    const mobileView = null;
    const browserView = () => {
        return (
            <div className="xl:w-3/5 mx-auto flex divide-x gap-x-8 mt-28">
                <UsersSideMenu mobile={false} />
                <div className="pl-8 flex-[3]">
                    <AddressForm index={addressId} address={address} />
                </div>
            </div>
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