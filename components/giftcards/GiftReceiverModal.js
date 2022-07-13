import React, {useReducer, useState} from 'react';
import Toast from "../common/Toast";
import isValidEmail from "../../helpers/isValidEmail";

const GiftReceiverModal = (props) => {
    const [error, setError] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [payload, setPayload] = useReducer((state, e) => {
        if (error === e.target.name) {
            setError("")
        }
        let temp = {...state}
        temp[e.target.name] = e.target.value;
        return temp
    }, {})


    const save = () => {
        //sender check
        if (!payload['sender_name']) {
            setErrorMsg("Please Fill Sender Name")
            setError("sender_name")
            return;
        }
        if (!payload['sender_email']) {
            setError("sender_email")
            setErrorMsg("Please Fill Sender Email")
            return;
        }
        if (!isValidEmail(payload['sender_email'])) {
            setError("sender_email")
            setErrorMsg("Please Fill Valid Sender Email")
            return;
        }
        if (!payload['sender_telephone']) {
            setError("sender_telephone")
            setErrorMsg("Please Fill Sender Phone")
            return;
        }
        //recipient check
        if (!payload['recipient_name']) {
            setError("recipient_name")
            setErrorMsg("Please Fill Recipient Name")
            return;
        }
        if (!payload['recipient_email']) {
            setError("recipient_email")
            setErrorMsg("Please Fill Recipient Email")
            return;
        }
        if (!isValidEmail(payload['recipient_email'])) {
            setError("recipient_email")
            setErrorMsg("Please Fill Valid Recipient Email")
            return;
        }
        if (!payload['recipient_telephone']) {
            setError("recipient_telephone")
            setErrorMsg("Please Fill Recipient Phone")
            return;
        }
        //    add to cart code
    }

    return (
        <div className={"fixed top-0 left-0 bg-black/50 w-[100vw] h-[100vh] z-[90] px-5 py-10 "}>
            <div className={'overflow-scroll bg-[#eceaea] border-[#b9b0b0] border-4 h-full w-full'}>
                <div className={"text-right pr-1 font-800"}>
                    <button onClick={() => {
                        props.setShowModal(false);
                        console.log("x clicked")
                    }}>X
                    </button>
                </div>
                <div className={"font-700 text-center"}>
                    <h3 className={"text-base"}>{props.gc_title} - INR {props.gc_price}</h3>
                    <h3 className={"text-lg"}>Enter Gift Receiver Details </h3>
                </div>
                <div className={"flex flex-col gap-2 mt-1 p-4"}>
                <span className={"font-700"}>
                    Sender Details
                </span>
                    <div className={"flex flex-col gap-2"}>
                        <input type="text"
                               placeholder="Sender Name"
                               name="sender_name"
                               maxLength="255"
                               className={"bg-[#f1f2f3] w-full h-full p-[3%] border-white " + [error === "sender_name" && "border-rose-500"]}
                               value={payload["sender_name"]}
                               onChange={setPayload}
                        />
                        <input type="email"
                               placeholder="Sender Email"
                               name="sender_email"
                               maxLength="255"
                               value={payload["sender_email"]}
                               className={"bg-[#f1f2f3] w-full h-full p-[3%] border-white " + [error === "sender_email" && "border-rose-500"]}
                               onChange={setPayload}
                        />
                        <input type="mobile"
                               placeholder="Sender Phone"
                               name="sender_telephone"
                               maxLength="255"
                               value={payload["sender_telephone"]}
                               className={"bg-[#f1f2f3] w-full h-full p-[3%] border-white " + [error === "sender_telephone" && "border-rose-500"]}
                               onChange={setPayload}
                        />
                    </div>
                </div>
                <div className={"flex flex-col gap-2 mt-1 p-4"}>
                <span className={"font-700"}>
                    Receiver Details
                </span>
                    <div className={"flex flex-col gap-2"}>
                    <span className={"flex items-center gap-2 font-500"}>
                        <input type="checkbox"
                               name="same_as_sender"
                               maxLength="255"
                               className={"bg-[#f1f2f3]"}
                        />
                        <span className={"flex-9"}>Same as Sender Details</span>
                    </span>
                        <input type="text"
                               placeholder="Recipient Name"
                               name="recipient_name"
                               maxLength="255"
                               value={payload["recipient_name"]}
                               className={"bg-[#f1f2f3] w-full h-full p-[3%] border-white " + [error === "recipient_name" && "border-rose-500"]}
                        />
                        <input type="email"
                               placeholder="Recipient Email"
                               name="recipient_email"
                               maxLength="255"
                               value={payload["recipient_email"]}
                               className={"bg-[#f1f2f3] w-full h-full p-[3%] border-white " + [error === "recipient_email" && "border-rose-500"]}
                        />
                        <input type="mobile"
                               placeholder="Recipient Phone"
                               name="recipient_telephone"
                               maxLength="255"
                               value={payload["recipient_telephone"]}
                               className={"bg-[#f1f2f3] w-full h-full p-[3%] border-white " + [error === "recipient_telephone" && "border-rose-500"]}
                        />
                    </div>
                </div>

                <div className={"flex flex-col gap-2 mt-1 p-4"}>
                <span className={"font-700"}>
                    Message
                </span>
                    <input type="text"
                           placeholder="Message"
                           name="message"
                           maxLength="255"
                           value={payload["message"]}
                           className={"bg-[#f1f2f3] w-full h-full p-[3%] border-white"}
                           onChange={setPayload}
                    />
                </div>
                <div className={"text-center mb-4"}>
                    <button className={"text-white bg-black border-[#b9b0b0] border-2 p-4 p-[3%] w-[75%]"} onClick={save}>
                        Continue
                    </button>
                </div>
            </div>
            <Toast show={errorMsg} hideToast={() => setErrorMsg(null)}>
                <span>{errorMsg}</span>
            </Toast>
        </div>
    );
};

export default GiftReceiverModal;
