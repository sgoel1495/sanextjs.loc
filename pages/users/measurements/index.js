import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import {useRouter} from "next/router";
import MeasurementBlock from "../../../components/user/MeasurementBlock";
import emptyMeasurement from "../../../store/emptyMeasurement.json";
import {apiCall} from "../../../helpers/apiCall";
import UserPageTemplate from "../../../components/user/UserPageTemplate";
import {isMobile} from "react-device-detect";
import {getUserObject} from "../../../helpers/addTocart";
import TailoredSize from "../../../components/product-page/TailoredSize";
import {connect} from "react-redux";

function UsersMeasurementsPage({appConfig, userData}) {
    const router = useRouter();
    const [userMeasurements, setUserMeasurements] = useState({});
    const [currentMeasurement, setCurrentMeasurement] = useState(emptyMeasurement)
    const getMeasurements = () => {
        apiCall("userMeasurements", appConfig.apiToken, {
            user: getUserObject(userData)
        })
            .then(pData => {
                if (pData.status === 200 && pData.response && Object.keys(pData.response).length > 0) {
                    setUserMeasurements(pData.response)
                }
            })
            .catch(e => console.log(e.message))
    }

    useEffect(() => {
        if (userData.userServe.email == null) router.replace("/");
        getMeasurements()
    }, []);

    const saveMeasurement = () => {
        apiCall("addMeasurements", appConfig.apiToken, {
            user: getUserObject(userData),
            "measurments": {...currentMeasurement, "measure_id": (new Date()).getTime().toString() + "_m"}
        })
            .then(pData => {
                if (pData.status === 200) {
                    getMeasurements()
                }
            })
            .catch(e => console.log(e.message))
            .finally(() => {
                setCurrentMeasurement(emptyMeasurement)
            })
    }

    const measurementBlocks = () => {
        return Object.keys(userMeasurements).map((key, index) => {
            return (
                <MeasurementBlock
                    measurement={userMeasurements[key]}
                    // showModal={showModal.bind(this)}
                    deleteMeasurement={deleteMeasurement}
                    refresh={getMeasurements}
                    index={index}
                    key={index}
                    mobile={mobile}
                />
            )
        });
    };

    const deleteMeasurement = async (m) => {
        let temp = JSON.parse(JSON.stringify(userMeasurements));
        delete temp[m]
        await apiCall("removeMeasurements", appConfig.apiToken, {
            user: getUserObject(userData),
            measurments: {
                measure_id: m
            }
        });
        setUserMeasurements(temp)
    };

    const mobileView = () => {
        return (
            <UserPageTemplate mobile={true}>
                <p className="text-[28px]">Measurement Summary</p>
                <div className="flex flex-col gap-8 w-full">
                    <div className="flex-1 px-6 py-8 font-600 text-[#555]">
                        <p>User Id: {userData.userServe.email}</p>
                        <p>Total Measurement(s): {Object.keys(userMeasurements).length}</p>
                    </div>
                    <div className="flex-1 grid place-items-center">
                        <TailoredSize isMobile={true} currentMeasurement={currentMeasurement} setCurrentMeasurement={setCurrentMeasurement} setSize={() => {
                        }} edit={true} saveMeasurement={saveMeasurement} addNew={true}/>

                    </div>
                </div>
                <div>
                    <p className="text-[28px] mt-4">Measurements</p>
                    {Object.keys(userMeasurements).length > 0 ? (
                        <>{measurementBlocks()}</>
                    ) : (
                        <div className="bg-[#f1f1f1] p-5 text-[#777] font-500">
                            <p>No measurement found!</p>
                            <p>Please add measurement.</p>
                        </div>
                    )}
                </div>
            </UserPageTemplate>
        );
    };

    const browserView = () => {
        return (
            <UserPageTemplate>
                <p className="text-[28px]">Measurement Summary</p>
                <div className="flex gap-8 w-full">
                    <div className="flex-1 bg-[#f1f2f3] px-6 py-8 font-600 text-[#555]">
                        <p>User Id: {userData.userServe.email}</p>
                        <p>Total Measurement(s): {Object.keys(userMeasurements).length}</p>
                    </div>
                    <div className="flex-1 bg-[#f1f2f3] grid place-items-center">
                        <TailoredSize isMobile={false} currentMeasurement={currentMeasurement} setCurrentMeasurement={setCurrentMeasurement} setSize={() => {
                        }} edit={true} saveMeasurement={saveMeasurement} addNew={true}/>
                    </div>
                </div>
                <>
                    <p className="text-[28px] mt-4">Measurements</p>
                    {Object.keys(userMeasurements).length > 0
                        ? measurementBlocks()
                        : <div className="bg-[#f1f1f1] p-5 text-[#777] font-500">
                            <p>No measurement found!</p>
                            <p>Please add measurement.</p>
                        </div>
                    }
                </>
            </UserPageTemplate>
        );
    };

    return (
        <Fragment>
            <PageHead url={"/users/profile"} id={"profile"} isMobile={appConfig.isMobile}/>
            <Header type={appConfig.isMobile ? "minimal" : "shopMenu"} isMobile={appConfig.isMobile}/>
            {appConfig.isMobile ? mobileView() : browserView()}
            <Footer isMobile={appConfig.isMobile} minimal={true}/>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(UsersMeasurementsPage);
