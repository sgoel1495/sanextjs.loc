import React, {Fragment} from "react";

function CreateMyAccount({isMobile, createAccount, updateCreateAccount, error}) {
    const labelClass = "block font-500 mb-1";
    const inputClass = "w-full border border-[#f1f2f3] bg-[#f1f2f3] placeholder:font-600 placeholder:text-black focus:bg-white focus:ring-transparent focus:border-black";

    return <Fragment>
        <label className={labelClass + " flex items-center gap-2"}>
            <input className="ms-2 focus:ring-transparent text-[#777]" type="checkbox" name="create" id="create_account" checked={createAccount.create}
                   onChange={updateCreateAccount}/>
            <span>Create My Account</span>
        </label>
        {(createAccount.create)
            ? <div className={"grid mb-4"+[!isMobile && " grid-cols-2 gap-x-8 justify-center"]}>
                <div>
                    <label className={labelClass} htmlFor="pwd1">Password</label>
                    <input className={inputClass + [error && (!createAccount.password || createAccount.password.length < 6) ? " border-red-500 mb-0 mb-0" : ""]}
                           type="password"
                           name="password" id={"pwd1"}
                           value={createAccount.password}
                           onChange={updateCreateAccount}/>
                    {
                        error && !createAccount.password ?
                            <div className={"text-red-500 mb-2"}>This is a required field.</div>
                            :
                            error && createAccount.password.length < 6 ?
                                <div className={"text-red-500 mb-2"}>Password must be 6 character long</div>
                                :
                                null
                    }
                </div>
                <div>
                    <label className={labelClass} htmlFor="pwd2">Confirm Password</label>
                    <input
                        className={inputClass + [error && (!createAccount.confirmPassword || createAccount.confirmPassword.length < 6 || createAccount.confirmPassword !== createAccount.password) ? " border-red-500 mb-0 mb-0" : ""]}
                        type="password"
                        name="confirmPassword" id={"pwd2"} value={createAccount.confirmPassword}
                        onChange={updateCreateAccount}/>
                    {
                        error && !createAccount.confirmPassword ?
                            <div className={"text-red-500 mb-2"}>This is a required field.</div>
                            :
                            error && createAccount.confirmPassword.length < 6 ?
                                <div className={"text-red-500 mb-2"}>Password must be 6 character long</div>
                                :
                                error && createAccount.confirmPassword !== createAccount.password ?
                                    <div className={"text-red-500 mb-2"}>Confirm password is not same as password</div>
                                    : null
                    }
                </div>
            </div>
            : null
        }
    </Fragment>

}

export default CreateMyAccount