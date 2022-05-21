import React, { Fragment, useContext } from "react";
import { useRouter } from "next/router";
import AppWideContext from "../../../../store/AppWideContext";
import UsersSideMenu from "../../../../components/user/UsersSideMenu";
import AddressForm from "../../../../components/user/AddressForm";
import PageHead from "../../../../components/PageHead";
import Header from "../../../../components/navbar/Header";

function AddAddressPage() {
    const router = useRouter();
    const { dataStore } = useContext(AppWideContext);
    if (dataStore.userData.contact == null)
        router.replace("/"); //illegal direct access

    const address = {
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

    const mobileView = null;
    const browserView = () => {
        return (
            <div className="xl:w-3/5 mx-auto flex divide-x gap-x-8 mt-28">
                <UsersSideMenu mobile={false} />
                <div className="pl-8 flex-[3]">
                    <AddressForm index={-1} address={address} />
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

export default AddAddressPage;