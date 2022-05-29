import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "./store/AppWideContext";
import Toast from "./components/common/Toast";

function CreateMyAccount({createAccount, updateCreateAccount}){
    const { dataStore,updateDataStore } = useContext(AppWideContext);
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [createAccount,setCreateAccount] = useState(false)
    const [password,setPassword] = useState({pwd1:"",pwd2:""})
    const [refresh,setRefresh] = useState(false)

    const updatePwd = (key, value) => {
        password[key] = value
        setPassword(password)
        setRefresh(!refresh)
    }

    useEffect(()=>{
        let completeness = true
        if(createAccount){
            completeness = (
                password.pwd1!==""
                && password.pwd2!==""
                && password.pwd1===password.pwd2
            )
        }
        if(completeness !== createAccount)
            updateCreateAccount(completeness)
    },[refresh])

    const labelClass = "block text-[14px] mb-1";
    const focusClass = " focus:bg-white focus:border-[#5d6d86] focus:ring-transparent";
    const inputClass = "block w-full text-[14px] leading-6 bg-[#f1f2f3] border border-[#f1f2f3] outline-0 px-4 py-2" + focusClass;


    const mobileView=null
    const browserView=<Fragment>
        <label>
            <input type="checkbox" name="create_account" id="create_account" checked={createAccount}
                   onChange={()=>setCreateAccount(!createAccount)}/>
            <span>Create My Account</span>
        </label>
        {(createAccount)
            ?<div>
                <div>
                    <label className={labelClass} htmlFor="pwd1">Password</label>
                    <input className={inputClass} type="password" name="pwd1" id="pwd1" value={password.pw1}
                           onChange={e => updatePwd("pwd1", e.target.value)}/>
                </div>
                <div>
                    <label className={labelClass} htmlFor="pwd2">Confirm Password</label>
                    <input className={inputClass} type="password" name="pwd2" id="pwd2" value={password.pw2}
                           onChange={e => updatePwd("pwd2", e.target.value)}/>
                </div>
            </div>
            :null
        }
        <Toast show={show} hideToast={() => setShow(false)}>
            <span>{message}</span>
        </Toast>
    </Fragment>

    return (dataStore.mobile) ? mobileView : browserView
}

export default CreateMyAccount