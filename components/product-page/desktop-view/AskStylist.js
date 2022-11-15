import React from 'react';
import ReactDom from "react-dom";
import isValidEmail from "../../../helpers/isValidEmail";
import Toast from "../../common/Toast";
import {apiCall} from "../../../helpers/apiCall";
import {connect} from "react-redux";
import Loader from "../../common/Loader";

const AskStylist = ({product, apiToken}) => {
    const [error, setError] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [errorShow, setErrorShow] = React.useState(false)
    const [data, setData] = React.useReducer((state, e) => {
        return {...state, [e.target.name]: e.target.value}
    }, {})
    const [show, setShow] = React.useReducer((state) => !state, false)
    const save = (e) => {
        e.preventDefault()
        if (!isValidEmail(data['email'])) {
            setError("Please enter valid email.");
            setErrorShow(true)
            return;
        }
        if (!isNaN(parseInt(data["phone"])) && data['phone'].length < 10) {
            setError("Please enter valid phone.");
            setErrorShow(true)
            return;
        }
        if (!data["message"]) {
            setError("Please enter your Message.");
            setErrorShow(true)
            return;
        }
        setLoading(true)
        apiCall("askStylist", apiToken, {
            "product": {
                "Email": data['email'],
                "Phone": data["phone"],
                "Message": data["message"],
                "ProductName": product.name,
                "ProductId": product.product_id
            }
        }).then((response) => {
            if (response.status === 200) {
                setError("Thank you!");
                setErrorShow(true)
                setShow(false)
            } else {
                setError("Please try again");
                setErrorShow(true)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const inputClass = "w-full border border-[#777]] placeholder:font-500 placeholder:text-black focus:bg-white focus:ring-transparent focus:border-black text-[15px] p-[5px] my-3"

    return (
        <>
            <button className={"uppercase font-500 hover:underline"} onClick={setShow}>ask your stylist</button>
            {
                show &&
                ReactDom.createPortal(
                    <div className="bg-black/60 h-screen w-screen fixed inset-0 z-50 grid place-items-center" onClick={setShow}>
                        <div className="bg-white relative h-[90vh] w-[920px] flex flex-col overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
                            <button className="absolute top-2 right-4 text-2xl z-50" onClick={setShow}>x</button>
                            <div className={"text-2xl font-600"}>
                                Ask Our Stylist.
                            </div>
                            <div className={"text-[#777] my-8"}>
                                What size should you buy? What color shoes should you wear? We&apos;re always here to help.
                            </div>
                            <div className={"text-xl font-600"}>
                                {product.name}, {product.tag_line}
                            </div>
                            <form onSubmit={save}>
                                <input className={inputClass} type="email" name="email" value={data["email"]} placeholder="Email Id" onChange={setData}/>
                                <input className={inputClass} type="tel" name="phone" value={data["phone"]} placeholder="Phone Number" onChange={setData}/>
                                <div className={"text-[#777] my-3"}>
                                    Your privacy is important to us. See our <a className={"underline"} href={"/salt/privacy-policy"} rel="noreferrer" target={"_blank"}>Privacy
                                    Policy</a>.
                                </div>
                                <textarea className={inputClass} name="message" value={data["message"]} placeholder="Message" onChange={setData} rows={5}/>
                                <button className={"text-white bg-black px-4 py-1 text-sm"} type="submit" disabled={loading}>
                                    {
                                        loading ?
                                            <Loader/>
                                            :
                                            "SEND"
                                    }
                                </button>
                            </form>
                        </div>
                    </div>,
                    document.getElementById("measurementmodal"))
            }
            <Toast show={errorShow} hideToast={() => {
                setErrorShow(false)
            }}>
                <p>{error}</p>
            </Toast>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        apiToken: state.appConfig.apiToken,
    }
}

export default connect(mapStateToProps)(AskStylist);