import { Fragment, useState } from "react";
import isValidEmail from "../../helpers/isValidEmail";
import {apiCall} from "../../helpers/apiCall";

function NotifyMeModal({ closeModal, isMobile, userO, product }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState(userO.email)
    const [phone, setPhone] = useState("")
    const [size, setSize] = useState("")
    const [msg, setMsg] = useState("")

    const notifyMe = async () => {
        if (isValidEmail(email)) {
            const formData = new FormData()
            formData.append("product[notify_data][name]",name)
            formData.append("product[notify_data][phone]",phone)
            formData.append("product[notify_data][email]",email)
            formData.append("product[notify_data][size]",size)
            formData.append("product[notify_data][message]",msg)
            formData.append("product[notify_data][product_id]",(product.product_id)?product.product_id:product.asset_id)
            const resp = await apiCall("notifyMe","noapitokenrequried",formData)
            if(resp.msg && resp.msg==="successfully submit")
                closeModal(true)
            else
                closeModal(null)
        } else
            closeModal(null)
    }

    const inputClass = "w-full border border-black placeholder:font-500 placeholder:text-black focus:bg-white focus:ring-transparent focus:border-black text-[15px] p-[5px]"

    const mobileView = null
    const browserView = () => {
        return (
            <div className="bg-transparent h-screen w-screen fixed inset-0 z-50 grid items-start justify-center" onClick={() => closeModal(false)}>
                <div className="bg-white border border-black/20 relative w-[50vw] flex flex-col items-center gap-y-3 mt-[125px] px-[5%] py-[35px]" onClick={e => e.stopPropagation()}>
                    <button className="absolute top-2 right-4 text-2xl z-50" onClick={() => closeModal(false)}>X</button>
                    <p className="text-[18px] font-700 text-center mb-4">
                        Notify Me ! <br />
                        when {product.name} is available
                    </p>
                    <input className={inputClass} type="text" id="name" name="name" value={name} placeholder="Name" onChange={e => setName(e.target.value)} />
                    <input className={inputClass} type="text" id="email" name="name" value={email} placeholder="Email Id" onChange={e => setEmail(e.target.value)} />
                    <input className={inputClass} type="text" id="phone" name="phone" value={phone} placeholder="Phone Number" onChange={e => setPhone(e.target.value)} />
                    <input className={inputClass} type="text" id="size" name="size" value={size} placeholder="Size" onChange={e => setSize(e.target.value)} />
                    <textarea className={inputClass + " mt-2"} type="text" id="msg" name="msg" value={msg} placeholder="Message" onChange={e => setMsg(e.target.value)} />
                    <button className={`font-500 px-4 py-2 bg-black text-white text-sm mt-2 tracking-wider leading-none`} onClick={() => notifyMe()}>
                        <span className={`uppercase`} >NOTIFY ME</span>
                    </button>
                </div>
            </div>
        )
    }

    return (isMobile) ? mobileView : browserView();
}

export default NotifyMeModal