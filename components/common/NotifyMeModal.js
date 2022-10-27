import React, {Fragment, useState} from "react";
import isValidEmail from "../../helpers/isValidEmail";
import {apiCall} from "../../helpers/apiCall";
import Toast from "./Toast";
import Loader from "./Loader";

function NotifyMeModal({closeModal, isMobile, userO, product, setError, setErrorShow}) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState(userO.email)
    const [phone, setPhone] = useState("")
    const [size, setSize] = useState("")
    const [msg, setMsg] = useState("")

    const [loading, setLoading] = useState(false)

    const validateAndNotify = () => {
        if (!name) {
            setError("Please enter valid name.");
            if (setErrorShow) {
                setErrorShow(true)
            }
            return;
        }
        if (!isValidEmail(email)) {
            setError("Please enter valid email.");
            if (setErrorShow) {
                setErrorShow(true)
            }
            return;
        }
        if (!isNaN(parseInt(phone)) && phone.length < 10) {
            setError("Please enter valid phone.");
            if (setErrorShow) {
                setErrorShow(true)
            }
            return;
        }
        setLoading(true)
        notifyMe();
    }

    const notifyMe = async () => {
        const formData = new FormData()
        formData.append("product[notify_data][name]", name)
        formData.append("product[notify_data][phone]", phone)
        formData.append("product[notify_data][email]", email)
        formData.append("product[notify_data][size]", size)
        formData.append("product[notify_data][message]", msg)
        formData.append("product[notify_data][product_id]", (product.product_id) ? product.product_id : product.asset_id)
        const resp = await apiCall("notifyMe", "noapitokenrequried", formData)
        if (resp.msg && resp.msg === "successfully submit") {
            if (isMobile) {
                setError("Thank you, we will notify you shortly!")
            }
            closeModal(false)
        }
    }

    const inputClass = "w-full border border-black placeholder:font-500 placeholder:text-black focus:bg-white focus:ring-transparent focus:border-black text-[15px] p-[5px]"
    const mobileInputClass = "w-full border border-[#997756] placeholder:text-[#997756] text-xs p-[5px] my-2 font-500"

    const mobileView = <div className={['bg-black/60 h-screen fixed inset-0 z-[90] grid place-items-center py-[8%] px-[5%]']}>
        <div className={"bg-white h-full w-full rounded-[8vw] border-4 border-[#b3aeab] flex flex-col items-center py-5"}>
            <div className={"relative flex flex-col items-center tracking-widest text-lg text-[#997756]"}>
                <button className="absolute top-[-1rem] right-4 text-2xl z-50" onClick={() => closeModal(false)}>X</button>
                <span>Notify Me!</span>
                <span className={"text-center"}>When {product.name} is available</span>
                <br/>
                <div className={"px-6"}>
                    <input className={mobileInputClass} type="text" id="name" name="name" value={name} placeholder="Name" onChange={e => setName(e.target.value)}/>
                    <input className={mobileInputClass} type="text" id="email" name="email" value={email} placeholder="Email Id" onChange={e => setEmail(e.target.value)}/>
                    <input className={mobileInputClass} type="text" id="phone" name="phone" value={phone} placeholder="Phone Number" onChange={e => setPhone(e.target.value)}/>
                    <input className={mobileInputClass} type="text" id="size" name="size" value={size} placeholder="Size" onChange={e => setSize(e.target.value)}/>
                    <textarea className={mobileInputClass} id="msg" name="msg" value={msg} placeholder="Message" onChange={e => setMsg(e.target.value)}/>
                </div>
                {
                    loading ?
                        <Loader className={"mt-4"}/>
                    :
                    <button className={`font-500 px-4 py-2 bg-[#e5d5c5] text-[#997756] text-sm mt-2 tracking-wider leading-none`} onClick={validateAndNotify}>
                    <span className={`uppercase`}>NOTIFY ME</span>
                    </button>
                }
            </div>
        </div>
    </div>

    const browserView = () => {
        return (
            <div className="bg-transparent h-screen w-screen fixed inset-0 z-50 grid items-start justify-center" onClick={() => closeModal(false)}>
                <div className="bg-white border border-black/20 relative w-[50vw] flex flex-col items-center gap-y-3 mt-[125px] px-[5%] py-[35px]"
                     onClick={e => e.stopPropagation()}>
                    <button className="absolute top-2 right-4 text-2xl z-50" onClick={() => closeModal(false)}>X</button>
                    <p className="text-[18px] font-700 text-center mb-4">
                        Notify Me ! <br/>
                        when {product.name} is available
                    </p>
                    <input className={inputClass} type="text" id="name" name="name" value={name} placeholder="Name" onChange={e => setName(e.target.value)}/>
                    <input className={inputClass} type="text" id="email" name="name" value={email} placeholder="Email Id" onChange={e => setEmail(e.target.value)}/>
                    <input className={inputClass} type="text" id="phone" name="phone" value={phone} placeholder="Phone Number" onChange={e => setPhone(e.target.value)}/>
                    <input className={inputClass} type="text" id="size" name="size" value={size} placeholder="Size" onChange={e => setSize(e.target.value)}/>
                    <textarea className={inputClass + " mt-2"} type="text" id="msg" name="msg" value={msg} placeholder="Message" onChange={e => setMsg(e.target.value)}/>
                    {
                        loading ?
                            <Loader className={"mt-4"}/>
                            : <button className={`font-500 px-4 py-2 bg-black text-white text-sm mt-2 tracking-wider leading-none`} onClick={validateAndNotify}>
                                <span className={`uppercase`}>NOTIFY ME</span>
                            </button>
                    }
                </div>
            </div>
        )
    }

    return (isMobile) ? mobileView : browserView();
}

export default NotifyMeModal