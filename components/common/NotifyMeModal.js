import {Fragment, useState} from "react";
import isValidEmail from "../../helpers/isValidEmail";

function NotifyMeModal({ closeModal, isMobile, userO, product}) {
    const [name,setName] = useState("")
    const [email,setEmail] = useState(userO.email)
    const [phone,setPhone] = useState("")
    const [size,setSize] = useState("")
    const [msg,setMsg] = useState("")

    const notifyMe = async ()=>{
        if(isValidEmail(email)){
            //@TODO:No api available for notify as per Nitu
            closeModal(true)
        }
    }

    const mobileView = null
    const browserView = ()=>{
        return <Fragment>
            <div onClick={()=>closeModal(false)}>X</div>
            <input type="text" id="name" name="name" value={name} placeholder="Name" onChange={e=>setName(e.target.value)} />
            <input type="text" id="email" name="name" value={email} placeholder="Email Id" onChange={e=>setEmail(e.target.value)} />
            <input type="text" id="phone" name="phone" value={phone} placeholder="Phone Number" onChange={e=>setPhone(e.target.value)} />
            <input type="text" id="size" name="size" value={name} placeholder="Size" onChange={e=>setSize(e.target.value)} />
            <input type="text" id="msg" name="msg" value={msg} placeholder="Message" onChange={e=>setMsg(e.target.value)} />
            <div className={`font-800 cursor-pointer bg-black text-white h-full flex flex-col gap-2 justify-center leading-none`} onClick={() => notifyMe()}>
                <span className={`uppercase`} >NOTIFY ME</span>
            </div>
        </Fragment>
    }

    return (isMobile) ? mobileView : browserView();
}

export default NotifyMeModal