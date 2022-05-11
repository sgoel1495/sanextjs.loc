import React, { Fragment, useContext} from "react";
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

    const measurementBlocks = ()=>{
        let returnValue = null;
        measurementKeys.forEach((key,index)=>{
            returnValue=<Fragment>
                {returnValue}
                <MeasurementBlock measurement={dataStore.userMeasurements[key]} index={index} mobile={dataStore.mobile} />
            </Fragment>
        });
    }

    const mobileView = null;
    const browserView = ()=>{
        return <Fragment>
            <UsersSideMenu mobile={false} />
            <div className="xl:w-3/5 mx-auto flex divide-x gap-x-8 mt-28">
                <p className="text-[28px]">Measurement Summary</p>
                <div>
                    <div>
                        <div>User Id: {dataStore.userData.contact}</div>
                        <div>Total Measurement(s): {measurementKeys.length}</div>
                    </div>
                    <div>
                        <Link href="/users/measurements/add">
                            <a>ADD NEW</a>
                        </Link>
                    </div>
                </div>
                {(measurementKeys.length>0)
                    ?<Fragment>
                        <p className="text-[28px] mt-4">Measurements</p>
                        <div>{measurementBlocks()}</div>
                    </Fragment>
                    :null
                }
            </div>
        </Fragment>
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