import React, { Fragment, useContext, useEffect, useState } from "react";
import AppWideContext from "./store/AppWideContext";
import Toast from "./components/common/Toast";

function CreateMyAccount(props) {
    const { dataStore, updateDataStore } = useContext(AppWideContext);
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [createAccount, setCreateAccount] = useState(false)
    const [password, setPassword] = useState({ pwd1: "", pwd2: "" })
    const [refresh, setRefresh] = useState(false)

    const updatePwd = (key, value) => {
        password[key] = value
        setPassword(password)
        setRefresh(!refresh)
    }

    useEffect(() => {
        let completeness = true
        if (createAccount) {
            completeness = (
                password.pwd1 !== ""
                && password.pwd2 !== ""
                && password.pwd1 === password.pwd2
            )
        }
        if(completeness)
            dataStore.currentOrderInCart.account={
                create_account:createAccount,
                password:password.pwd1
            }
        updateDataStore("currentOrderInCart",dataStore.currentOrderInCart)
        if (completeness !== props.createAccount)
            props.updateCreateAccount(completeness)
    }, [refresh])

    const labelClass = "block font-500 mb-1";
    const inputClass = "w-full border border-[#f1f2f3] bg-[#f1f2f3] placeholder:font-600 placeholder:text-black focus:bg-white focus:ring-transparent focus:border-black";


    const mobileView = null
    const browserView = <Fragment>
        <label className={labelClass + " flex items-center gap-2"}>
            <input className="ms-2 focus:ring-transparent text-[#777]" type="checkbox" name="create_account" id="create_account" checked={createAccount}
                onChange={() => setCreateAccount(!createAccount)} />
            <span>Create My Account</span>
        </label>
        {(createAccount)
            ? <div className="grid grid-cols-2 gap-x-8 justify-center mb-4">
                <div>
                    <label className={labelClass} htmlFor="pwd1">Password</label>
                    <input className={inputClass} type="password" name="pwd1" id="pwd1" value={password.pw1}
                        onChange={e => updatePwd("pwd1", e.target.value)} />
                </div>
                <div>
                    <label className={labelClass} htmlFor="pwd2">Confirm Password</label>
                    <input className={inputClass} type="password" name="pwd2" id="pwd2" value={password.pw2}
                        onChange={e => updatePwd("pwd2", e.target.value)} />
                </div>
            </div>
            : null
        }
        <Toast show={show} hideToast={() => setShow(false)}>
            <span>{message}</span>
        </Toast>
    </Fragment>

    return (dataStore.mobile) ? mobileView : browserView
}

export default CreateMyAccount