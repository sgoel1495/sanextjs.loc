import React, {useState} from 'react';
import Toast from "../common/Toast";

const GiftReceiverModal = (props) => {
    const [toastMsg, setToastMsg] = useState("No error hardcoded message")
    const [showToast, setShowToast] = useState(false)

    return (
        <div className={"bg-[#00000080] w-[100vw] h-[100vh] relative z-20 overflow-scroll"}>
            <div
                className={'content overflow-scroll absolute top-10 left-5 block z-20 bg-[#eceaea] border-[#b9b0b0] border-4 h-[85vh] w-[90vw]'}>
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
                <form action="">
                    <div className={"flex flex-col gap-2 mt-1 p-4"}>
                <span className={"font-700"}>
                    Sender Details
                </span>
                        <div className={"flex flex-col gap-2"}>
                            <input type="text"
                                   placeholder="Sender Name"
                                   id="senderName"
                                   maxLength="255"
                                   required={true}
                                   className={"bg-[#f1f2f3] w-full h-full p-[3%] border-white"}
                            />
                            <input type="email"
                                   placeholder="Sender Email"
                                   id="senderEmail"
                                   maxLength="255"
                                   required={true}
                                   className={"bg-[#f1f2f3] w-full h-full p-[3%] border-white "}
                            />
                            <input type="mobile"
                                   placeholder="Sender Phone"
                                   id="senderPhone"
                                   maxLength="255"
                                   required={true}
                                   className={"bg-[#f1f2f3] w-full h-full p-[3%] border-white"}
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
                               id="same_as_sender"
                               maxLength="255"
                               className={"bg-[#f1f2f3]"}
                               required={true}
                        />
                        <span className={"flex-9"}>Same as Sender Details</span>
                    </span>
                            <input type="text"
                                   placeholder="Sender Name"
                                   id="senderName"
                                   maxLength="255"
                                   required={true}
                                   className={"bg-[#f1f2f3] w-full h-full p-[3%] border-white"}
                            />
                            <input type="email"
                                   placeholder="Sender Email"
                                   id="senderEmail"
                                   maxLength="255"
                                   required={true}
                                   className={"bg-[#f1f2f3] w-full h-full p-[3%] border-white"}
                            />
                            <input type="mobile"
                                   placeholder="Sender Phone"
                                   id="senderPhone"
                                   maxLength="255"
                                   required={true}
                                   className={"bg-[#f1f2f3] w-full h-full p-[3%] border-white"}
                            />
                        </div>
                    </div>

                    <div className={"flex flex-col gap-2 mt-1 p-4"}>
                <span className={"font-700"}>
                    Message
                </span>
                        <input type="text"
                               placeholder="Message"
                               id="senderPhone"
                               maxLength="255"
                               className={"bg-[#f1f2f3] w-full h-full p-[3%] border-white"}
                        />
                    </div>
                    <div className={"text-center mb-4"}>
                        <button className={"text-white bg-black border-[#b9b0b0] border-2 p-4 p-[3%] w-[75%]"}
                                onClick={() => {        //click to see error message
                                    setShowToast(true)
                                }}
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
            {
                showToast
                    ? <Toast customBg={"#323232"} show={showToast} hideToast={() => {
                        setShowToast(false)
                    }}>
                        <p>{toastMsg}</p>
                    </Toast>
                    : ''
            }
        </div>
    );
};

export default GiftReceiverModal;
