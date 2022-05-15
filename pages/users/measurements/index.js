import React, { Fragment, useContext } from "react";
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import { useRouter } from "next/router";
import Link from "next/link";
import UsersSideMenu from "../../../components/user/UsersSideMenu";
import MeasurementBlock from "../../../components/user/MeasurementBlock";

function MeasurementsPage() {
    const router = useRouter();
    const { dataStore } = useContext(AppWideContext);
    if (dataStore.userData.contact == null)
        router.replace("/"); //illegal direct access

    const measurementKeys = Object.keys(dataStore.userMeasurements);

    const measurementBlocks = () => {
        let returnValue = null;
        measurementKeys.forEach((key, index) => {
            returnValue = <Fragment>
                {returnValue}
                <MeasurementBlock measurement={dataStore.userMeasurements[key]} index={index} mobile={dataStore.mobile} />
            </Fragment>
        });
    }

    const mobileView = null;
    const browserView = () => {
        return (
            <div className="xl:w-3/5 mx-auto flex divide-x gap-x-8 mt-28">
                <UsersSideMenu mobile={false} />
                <div className="pl-8 flex-[3] flex flex-col items-start gap-4">
                    <p className="text-[28px]">Measurement Summary</p>
                    <div className="flex gap-8 w-full">
                        <div className="flex-1 bg-[#f1f2f3] px-6 py-8 font-600 text-[#555]">
                            <p>User Id: {dataStore.userData.contact}</p>
                            <p>Total Measurement(s): {measurementKeys.length}</p>
                        </div>
                        <div className="flex-1 bg-[#f1f2f3] grid place-items-center">
                            <Link href="/users/measurements/add">
                                <a className="bg-black px-4 py-1.5 block text-white uppercase text-sm font-500 tracking-wide shadow-md my-2">ADD NEW</a>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <p className="text-[28px] mt-4">Measurements</p>
                        {(measurementKeys.length > 0)
                            ? <div>{measurementBlocks()}</div>
                            : <div className="bg-[#f1f1f1] p-5 text-[#777] font-500">
                                <p>No measurement found!</p>
                                <p>Please add measurement.</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }


    return (
        <Fragment>
            <PageHead url={"/users/profile"} id={"profile"} isMobile={dataStore.mobile} />
            <Header type={"shopMenu"} />
            {(dataStore.mobile) ? mobileView : browserView()}
        </Fragment>
    )
}

export default MeasurementsPage;