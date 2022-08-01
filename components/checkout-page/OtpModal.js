import React, {Fragment, useCallback, useContext, useEffect, useReducer, useState} from "react";
import AppWideContext from "../../store/AppWideContext";
import {apiCall} from "../../helpers/apiCall";
import Toast from "../common/Toast";
import Loader from "../common/Loader";
import {getUserObject} from "../../helpers/addTocart";
import {useRouter} from "next/router";
import {updateUserDataAfterLogin} from "../../helpers/updateUserDataAfterLogin";

function OtpModal(props) {
    const router = useRouter()
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const [otp, setOtp] = useState("")
    const [startCounter, setStartCounter] = useState(false)
    const [placing, setPlacing] = useState(false)
    const [counter, setCounter] = useState(30)
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        let i = 30;
        let intv;
        if (startCounter) {
            setCounter(i);
            intv = setInterval(() => {
                if (i > 0) {
                    setCounter(--i);
                } else {
                    clearInterval(intv)
                    setStartCounter(false)
                }
            }, 1000)
        }
        return () => {
            if (intv) {
                clearInterval(intv)
            }
        }
    }, [startCounter])

    const requestOTP = useCallback(async () => {
        setCounter(30)
        const otpCall = await apiCall("codOtp", dataStore.apiToken, {
            user: getUserObject(dataStore, updateDataStore),
            order: {order_id: dataStore.currentOrderId}
        })
        if (otpCall.hasOwnProperty("status") && otpCall.status === 200) {
            setStartCounter(true)
        }

    }, [dataStore])

    useEffect(() => {
        requestOTP()
            .then(resp => console.log("OTP REQUEST SENT"))
    }, [])

    const verifyOtp = async () => {

        setPlacing(true)
        const queryObject = {
            "user": getUserObject(dataStore, updateDataStore),
            "order": {
                "order_id": dataStore.currentOrderId,
                "otp": otp
            }
        }
        const verifyCall = await apiCall("verifyOtp", dataStore.apiToken, queryObject)
        if (verifyCall.message
            && verifyCall.message === "OTP Verification Successful for COD Order and Order placed successfully") {
            setShow(true)
            setMessage("OTP Verified")
            if (dataStore.userServe.email) {
                let updateData = await updateUserDataAfterLogin(dataStore.userServe.email, dataStore.apiToken, dataStore.userMeasurements, dataStore.userCart);
                Object.keys(updateData).forEach((key) => {
                    updateDataStore(key, updateData[key]);
                })
            }
            await router.push("/salt/Thankyou?id=" + verifyCall.thank_you_order.order_id)

        } else {
            setMessage("Please try again")
            setShow(true)
        }
        setPlacing(false)
    }

    return (
        <Fragment>
            <div className={"bg-black/60 h-screen w-screen fixed inset-0 z-50 flex justify-center items-start" + [props.isMobile ? "" : " py-[5%] px-[10%]"]}
                 onClick={props.closeModal}>
                <div className={"bg-white relative flex flex-col items-center text-center " + [props.isMobile ? " h-full py-10 px-12" : " py-10 px-16"]}
                     onClick={e => e.stopPropagation()}>
                    <button className="absolute top-2 right-5 text-2xl z-50" onClick={props.closeModal}>X</button>
                    <p className="text-2xl mb-4">OTP Verification For COD</p>
                    <p className="text-[#777] mb-8">We have sent an OTP for COD verification on your below<br/>mentioned details:</p>
                    <div className="inline-flex gap-2 items-center self-start text-[#777]">
                        <span>Email:</span>
                        <span>{dataStore.orderSummary.address.email}</span>
                    </div>
                    <div className="inline-flex gap-2 items-center self-start text-[#777]">
                        <span>Phone:</span>
                        <span>{dataStore.orderSummary.address.phone}</span>
                    </div>
                    {
                        placing ?
                            <div className="py-2 flex text-xl text-[#777] justify-center items-center">
                                <Loader className={"mr-4"}/>PLACING ORDER
                            </div>
                            :
                            <>
                                <input
                                    className="focus:ring-transparent focus:border-black border-black text-center text-sm mb-5 mt-8"
                                    type="text" id="otp" name="otp" placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)}/>
                                <button className="bg-black px-5 py-2 text-white shadow-lg mb-4" onClick={verifyOtp}>
                                    VERIFY & PLACE ORDER
                                </button>
                                {counter ? <p className="text-[#777]">Resend OTP in {counter}s</p> :
                                    <button className="bg-black px-5 py-2 text-xs text-white shadow-lg" onClick={requestOTP}>Resend OTP</button>}
                            </>
                    }
                </div>
            </div>
            <Toast show={show} hideToast={() => setShow(false)}>
                <span>{message}</span>
            </Toast>
        </Fragment>
    )
}

export default OtpModal