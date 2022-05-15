import React, { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AppWideContext from "../../../../store/AppWideContext";
import UsersSideMenu from "../../../../components/user/UsersSideMenu";
import MeasurementForm from "../../../../components/user/MeasurementForm";
import PageHead from "../../../../components/PageHead";
import Header from "../../../../components/navbar/Header";

function AddMeasurementPage() {
    const router = useRouter();
    const { dataStore } = useContext(AppWideContext);
    if (dataStore.userData.contact == null)
        router.replace("/"); //illegal direct access

    const measurement = require("../../../../store/emptyMeasurement.json");

    const mobileView = null;
    const browserView = () => {
        return (
            <div className="xl:w-3/5 mx-auto flex divide-x gap-x-8 mt-28">
                <UsersSideMenu mobile={false} />
                <div className="pl-8 flex-[3]">
                    <MeasurementForm index={-1} measurement={measurement} />
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

export default AddMeasurementPage;