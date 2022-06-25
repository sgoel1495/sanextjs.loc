import { Fragment, useContext, useEffect, useState } from "react";
import AppWideContext from "../../store/AppWideContext";
import { apiCall } from "../../helpers/apiCall";
import getUserO from "../../helpers/getUserO";
import Toast from "../common/Toast";
import { updateUserDataAfterLogin } from "../../helpers/updateUserDataAfterLogin";
import Loader from "../common/Loader";

//function OtpModal({ otpVerified, closeModal, validity, otp }) {
function OtpModal(props) {
    const { dataStore, updateDataStore } = useContext(AppWideContext);
    const [otp, setOtp] = useState("")
    const [otpValidity, setOtpValidity] = useState(props.validity)
    const [canRequestOTPAgain, setCanRequestOTPAgain] = useState(false)
    const [requestedAgain,setRequestedAgain] = useState(false)
    const [orderPlaced,setOrderPlaced] = useState(false)
    const [placing, setPlacing] = useState(false)
    const [counter, setCounter] = useState(0)
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);


    useEffect(() => {
        const current = Date.now()
        if (otpValidity) {
            const seconds = Math.floor((otpValidity - current) / 1000) - 1
            if (otpValidity > current && seconds >= 0) {
                console.log("seconds Left", seconds)
                setTimeout(() => {
                    setCounter(seconds)
                }, 1000)
            } else if (otpValidity <= current || seconds < 0) {
                setCanRequestOTPAgain(true)
            }
        }
    }, [counter, otpValidity])

    const requestOTP = async () => {
        const otpCall = await apiCall("codOtp", dataStore.apiToken, {
            user: getUserO(dataStore, true),
            order: { order_id: dataStore.currentOrderId }
        })
        if (otpCall.hasOwnProperty("otp_valid_till")) {
            const unixTime = Date.parse(otpCall.otp_valid_till).getTime()
            setOtpValidity(unixTime)
            setCanRequestOTPAgain(false)
            setCounter(0)
        }
    }

    const resendOTP = async () => {
        await requestOTP()
        if(!requestedAgain)
            setRequestedAgain(true)
    }

    const verifyOtp = async () => {
        if (orderPlaced)
            return

        if (!requestedAgain) {
            if (otp === props.otp) {
                placeOrder()
            } else {
                setMessage("Please try again")
                setShow(true)
            }
        }
    }

    const placeOrder = ()=>{
        setPlacing(true)

        if (dataStore.userData.contact){

        } else {

        }

    }

    const resetDataStoreKeys = async ()=>{
        await updateUserDataAfterLogin(dataStore.userData.contact, dataStore.apiToken, {}, [])
        const toReset = {
            "orderPromo": {},
            "currentOrderId": 0,
            "currentOrderInCart": {
                "address": {},
                "measurement": {},
                "account": {},
                "order": {},
                "payment": {},
                "shipping_fee": 0,
                "otp_verified": false
            },
            "place_order_step1": {}
        }
        Object.keys(toReset).forEach(key => {
            updateDataStore(key, toReset[key])
        })
    }

    const browserView = (
        <Fragment>
            <div className="bg-black/60 h-screen w-screen fixed inset-0 z-50 flex justify-center items-start py-[5%] px-[10%]" onClick={props.closeModal}>
                <div className="bg-white relative flex flex-col items-center text-center py-10 px-16" onClick={e => e.stopPropagation()}>
                    <button className="absolute top-2 right-5 text-2xl z-50" onClick={props.closeModal}>X</button>
                    <p className="text-2xl mb-4">OTP Verification For COD</p>
                    <p className="text-[#777] mb-8">We have sent an OTP for COD verification on your below<br/>mentioned details:</p>
                    <div className="inline-flex gap-2 items-center text-[#777]">
                        <span>Email:</span>
                        <span>{dataStore.currentOrderInCart.address.email}</span>
                    </div>
                    <div className="inline-flex gap-2 items-center text-[#777]">
                        <span>Phone:</span>
                        <span>{dataStore.currentOrderInCart.address.phone}</span>
                    </div>
                    <input className="focus:ring-transparent focus:border-black border-black text-center text-sm mb-5 mt-8" type="text" id="otp" name="otp" placeholder="OTP" value={otp} onClick={e => { setOtp(e.target.value) }} />
                    {(orderPlaced)
                        ? null
                        : <button className="bg-black px-5 py-2 text-white shadow-lg" onClick={verifyOtp}>
                            VERIFY & PLACE ORDER
                        </button>
                    }
                    {(!orderPlaced && otpValidity && !canRequestOTPAgain)
                        ? <p className="text-[#777]">Resend OTP in {counter}s</p>
                        : null}
                    {(!orderPlaced && canRequestOTPAgain)
                        ? <button className="text-[#777]" onClick={resendOTP}>Resend OTP</button>
                        : null}
                    {(placing)
                        ? <button className="bg-black px-5 py-2 text-white shadow-lg">
                            PLACING ORDER
                            <Loader />
                        </button>
                        : (orderPlaced)
                            ?<button className="bg-black px-5 py-2 text-white shadow-lg">
                                ORDER PLACED SUCCESSFULLY
                            </button>
                            :null
                    }
                </div>
            </div>
            <Toast show={show} hideToast={() => setShow(false)}>
                <span>{message}</span>
            </Toast>
        </Fragment>
    )

    return browserView
}

export default OtpModal

/*
{
  "user" : { "contact" : "shailaja.s@algowire.com",
      "is_guest" : true,
      "temp_user_id" : "1602236718"
  },
  "order" : {
    "order_id": "1111111111135"
  },
  "token" : "b16ee1b2bcb512f67c3bca5fac24a924fcc2241bcbfe19ddfdde33ecd24114a0"
}

 */