import React, { Fragment, useContext, useEffect, useState } from "react";
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import UsersSideMenu from "../../../components/user/UsersSideMenu";
import ContactInformation from "../../../components/user/ContactInformation";
import DefaultAddressBookInformation from "../../../components/user/DefaultAddressBookInformation";
import { useRouter } from "next/router";

function UsersProfilePage() {
    const router = useRouter();
    const { dataStore } = useContext(AppWideContext);
    useEffect(()=>{
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    },[dataStore.userData.contact,router])

    const mobileView = null;
    const browserView = () => {
        return (
            <div className="xl:w-3/5 mx-auto flex divide-x gap-x-7 mt-28">
                <UsersSideMenu mobile={false} />
                <div className="pl-7 flex-[3] flex flex-col items-start gap-10">
                    <ContactInformation mobile={false} />
                    <DefaultAddressBookInformation mobile={false} manage={true}/>
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

export default UsersProfilePage;