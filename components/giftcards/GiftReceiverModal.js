import React, {useContext, useReducer, useState} from 'react';
import Toast from "../common/Toast";
import isValidEmail from "../../helpers/isValidEmail";
import AppWideContext from "../../store/AppWideContext";
import {useRouter} from "next/router";
import {addToCart} from "../../helpers/addTocart";
import {connect} from "react-redux";
import {setCart} from "../../ReduxStore/reducers/shoppingCartSlice";

const GiftReceiverModal = (props) => {
    const router = useRouter();
    const [error, setError] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [copy, setCopy] = useState(false)
    const [payload, setPayload] = useReducer((state, e) => {
        if (error === e.target.name) {
            setError("")
        }
        let temp = {...state}
        temp[e.target.name] = e.target.value;
        return temp
    }, {})


    const checkSender = () => {
        if (!payload['sender_name']) {
            setErrorMsg("Please Fill Sender Name")
            setError("sender_name")
            return false;
        }
        if (!payload['sender_email']) {
            setError("sender_email")
            setErrorMsg("Please Fill Sender Email")
            return false;
        }
        if (!isValidEmail(payload['sender_email'])) {
            setError("sender_email")
            setErrorMsg("Please Fill Valid Sender Email")
            return false;
        }
        if (!payload['sender_telephone']) {
            setError("sender_telephone")
            setErrorMsg("Please Fill Sender Phone")
            return false;
        }
        if (isNaN(payload['sender_telephone']) || payload['sender_telephone'].length !== 10) {
            setError("sender_telephone")
            setErrorMsg("Please Fill 10 Digit Sender Phone Without Special Character")
            return false;
        }
        return true;
    }

    const checkRecipient = () => {
        if (!payload['recipient_name']) {
            setError("recipient_name")
            setErrorMsg("Please Fill Recipient Name")
            return false;
        }
        if (!payload['recipient_email']) {
            setError("recipient_email")
            setErrorMsg("Please Fill Recipient Email")
            return false;
        }
        if (!isValidEmail(payload['recipient_email'])) {
            setError("recipient_email")
            setErrorMsg("Please Fill Valid Recipient Email")
            return false;
        }
        if (!payload['recipient_telephone']) {
            setError("recipient_telephone")
            setErrorMsg("Please Fill Recipient Phone")
            return false;
        }
        if (isNaN(payload['recipient_telephone']) || payload['recipient_telephone'].length !== 10) {
            setError("recipient_telephone")
            setErrorMsg("Please Fill 10 Digit Recipient Phone Without Special Character")
            return false;
        }
        return true
    }

    const copySender = (e) => {
        if (e.target.checked && !checkSender()) {
            return
        }
        setPayload({
            target: {
                value: e.target.checked ? payload['sender_name'] : "",
                name: "recipient_name"
            }
        })
        setPayload({
            target: {
                value: e.target.checked ? payload['sender_email'] : "",
                name: "recipient_email"
            }
        })
        setPayload({
            target: {
                value: e.target.checked ? payload['sender_telephone'] : "",
                name: "recipient_telephone"
            }
        })

        setCopy(e.target.checked)
    }

    const save = () => {
        if (!checkSender() || !checkRecipient()) {
            return;
        }
        const displayCart = {
            "product_id": props.gc_asset_id,
            ...payload
        }
        addToCart(props.userData, props.shoppingCart.cart, props.appConfig.apiToken, props.setCart, {giftcard_details: displayCart}, "addGiftToCart").then(r => {
        })
        if (props.isMobile) {
            router.push("/homepage/cart")
        } else {
            props.setShowCart(true)
            props.setShowModal(true)
        }
    }

    const focusStyle = "focus:ring-offset-0 focus:ring-0 focus:outline-0"
    const inputStyle = `bg-[#f1f2f3] w-full p-[3%] border-0 text-sm ${focusStyle} `

    let mobileView = (
        <div className={"fixed top-0 left-0 bg-black/50 w-[100vw] h-[100vh] z-[90] px-5 py-10 "}>
            <div className={'overflow-scroll bg-[#eceaea] border-[#b9b0b0] border-4 h-full w-full'}>
                <div className={"text-right pr-1 font-800"}>
                    <button onClick={() => {
                        props.setShowModal(false);
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
                               className={inputStyle + [error === "sender_name" && "border-rose-500 border-[1px]"]}
                               value={payload["sender_name"]}
                               onChange={setPayload}
                        />
                        <input type="email"
                               placeholder="Sender Email"
                               name="sender_email"
                               maxLength="255"
                               value={payload["sender_email"]}
                               className={inputStyle + [error === "sender_email" && "border-rose-500 border-[1px]"]}
                               onChange={setPayload}
                        />
                        <input type="mobile"
                               placeholder="Sender Phone"
                               name="sender_telephone"
                               maxLength="255"
                               value={payload["sender_telephone"]}
                               className={inputStyle + [error === "sender_telephone" && "border-rose-500 border-[1px]"]}
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
                               className={`bg-[#f1f2f3] ${focusStyle}`}
                               onChange={copySender}
                               checked={copy}
                        />
                        <span className={"flex-9"}>Same as Sender Details</span>
                    </span>
                        <input type="text"
                               placeholder="Recipient Name"
                               name="recipient_name"
                               maxLength="255"
                               value={payload["recipient_name"]}
                               className={inputStyle + [error === "recipient_name" && "border-rose-500 border-[1px]"]}
                               onChange={setPayload}
                        />
                        <input type="email"
                               placeholder="Recipient Email"
                               name="recipient_email"
                               maxLength="255"
                               value={payload["recipient_email"]}
                               className={inputStyle + [error === "recipient_email" && "border-rose-500 border-[1px]"]}
                               onChange={setPayload}
                        />
                        <input type="mobile"
                               placeholder="Recipient Phone"
                               name="recipient_telephone"
                               maxLength="255"
                               value={payload["recipient_telephone"]}
                               className={inputStyle + [error === "recipient_telephone" && "border-rose-500 border-[1px]"]}
                               onChange={setPayload}
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
                           className={inputStyle}
                           onChange={setPayload}
                    />
                </div>
                <div className={"text-center mb-4"}>
                    <button className={"text-white bg-black border-[#b9b0b0] border-2 p-4 p-[3%] w-[75%]"} onClick={save}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
    let browserView = <div className={"fixed top-0 left-0 bg-black/50 w-[100vw] h-[100vh] z-[90]  grid place-items-center"}>
        <div className={'bg-[#eceaea] border-[#b9b0b0] border-4 w-1/2  px-5'}>
            <div className={"text-right pt-2 font-800"}>
                <button onClick={() => {
                    props.setShowModal(false);
                }}>X
                </button>
            </div>
            <div className={"text-center"}>
                <h3 className={"text-base"}>{props.gc_title} - INR {props.gc_price}</h3>
                <h3 className={"text-2xl mt-2"}>Enter Gift Receiver Details </h3>
            </div>
            <div className={"grid grid-cols-3"}>
                <div className={"flex flex-col gap-2 mt-1 p-4"}>
                <span className={"font-700"}>
                    Sender Details
                </span>
                    <div className={"flex flex-col gap-2"}>
                        <input type="text"
                               placeholder="Sender Name"
                               name="sender_name"
                               maxLength="255"
                               className={inputStyle + [error === "sender_name" && "border-rose-500 border-[1px]"]}
                               value={payload["sender_name"]}
                               onChange={setPayload}
                        />
                        <input type="email"
                               placeholder="Sender Email"
                               name="sender_email"
                               maxLength="255"
                               value={payload["sender_email"]}
                               className={inputStyle + [error === "sender_email" && "border-rose-500 border-[1px]"]}
                               onChange={setPayload}
                        />
                        <input type="mobile"
                               placeholder="Sender Phone"
                               name="sender_telephone"
                               maxLength="255"
                               value={payload["sender_telephone"]}
                               className={inputStyle + [error === "sender_telephone" && "border-rose-500 border-[1px]"]}
                               onChange={setPayload}
                        />
                    </div>
                </div>
                <div className={"flex flex-col gap-2 mt-1 p-4"}>
                <span className={"font-700"}>
                    Receiver Details
                </span>
                    <div className={"flex flex-col gap-2"}>
                        <input type="text"
                               placeholder="Recipient Name"
                               name="recipient_name"
                               maxLength="255"
                               value={payload["recipient_name"]}
                               className={inputStyle + [error === "recipient_name" && "border-rose-500 border-[1px]"]}
                               onChange={setPayload}
                        />
                        <input type="email"
                               placeholder="Recipient Email"
                               name="recipient_email"
                               maxLength="255"
                               value={payload["recipient_email"]}
                               className={inputStyle + [error === "recipient_email" && "border-rose-500 border-[1px]"]}
                               onChange={setPayload}
                        />
                        <input type="mobile"
                               placeholder="Recipient Phone"
                               name="recipient_telephone"
                               maxLength="255"
                               value={payload["recipient_telephone"]}
                               className={inputStyle + [error === "recipient_telephone" && "border-rose-500 border-[1px]"]}
                               onChange={setPayload}
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
                           className={inputStyle + [" h-full"]}
                           onChange={setPayload}
                    />
                </div>
            </div>
            <span className={"flex items-center gap-2 font-500"}>
                        <input type="checkbox"
                               name="same_as_sender"
                               maxLength="255"
                               className={`bg-[#f1f2f3] ${focusStyle}`}
                               onChange={copySender}
                               checked={copy}
                        />
                        <span className={"flex-9 text-sm"}>Recipient Details Same As Sender Details</span>
                    </span>
            <div className={"text-center my-4"}>
                <button className={"text-white bg-black px-5 py-1"} onClick={save}>
                    Save
                </button>
            </div>
        </div>
    </div>
    return <>
        {props.isMobile ? mobileView : browserView}
        <Toast show={errorMsg} hideToast={() => setErrorMsg(null)}>
            <span>{errorMsg}</span>
        </Toast>
    </>
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        shoppingCart: state.shoppingCart,
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps,{setCart})(GiftReceiverModal);
