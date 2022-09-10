import React, {Fragment, useContext, useEffect, useReducer, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import {useRouter} from "next/router";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import UserPageTemplate from "../../../components/user/UserPageTemplate";
import {isMobile} from "react-device-detect";
import {apiCall} from "../../../helpers/apiCall";
import Toast from "../../../components/common/Toast";
import {connect} from "react-redux";

const basicFields = [
    {
        fieldName: "user_name",
        label: "First Name",
        inputType: "text",
        columnSpace: 2,
        mobColumnSpace: 4,
    },
    {
        fieldName: "last_name",
        label: "Last Name",
        inputType: "text",
        columnSpace: 2,
        mobColumnSpace: 4,
    },
    {
        fieldName: "contact",
        label: "Email Address",
        inputType: "text",
        columnSpace: 4,
        mobColumnSpace: 4,
    },
    {
        fieldName: "birthday",
        label: "Birth Date",
        inputType: "date",
        columnSpace: 2,
        mobColumnSpace: 4,
    },
    {
        fieldName: "anniversary",
        label: "Anniversary Date",
        inputType: "date",
        columnSpace: 2,
        mobColumnSpace: 4,
    },
    {
        fieldName: "bust",
        label: "Bust",
        inputType: "text",
        columnSpace: 1,
        mobColumnSpace: 2,
    },
    {
        fieldName: "waist",
        label: "Waist",
        inputType: "text",
        columnSpace: 1,
        mobColumnSpace: 2,
    },
    {
        fieldName: "hip",
        label: "Hips",
        inputType: "text",
        columnSpace: 1,
        mobColumnSpace: 2,
    },
    {
        fieldName: "anyother",
        label: "Any Other",
        inputType: "text",
        columnSpace: 1,
        mobColumnSpace: 2,
    },
]

const passwordFields = [
    {
        fieldName: "new",
        label: "New Password",
        inputType: "password",
        columnSpace: 4
    },
    {
        fieldName: "confirm",
        label: "Confirm New Password",
        inputType: "password",
        columnSpace: 4
    }
]

function UsersAccountPage({appConfig,userData}) {
    const [mobile, setMobile] = useState(false);
    const [show, setShow] = useState(false)
    const [changePasswordCheckbox, setChangePasswordCheckbox] = useState(false)
    const [error, setError] = useState(-1)
    const [data, setData] = useReducer((state, e) => {
        if (e.target.id !== "contact") {
            return {...state, [e.target.id]: e.target.value}
        }
        return state
    }, {
        "contact": userData.userServe.email,
        "user_name": userData.userServe.user_name,
        "last_name": userData.userServe.last_name,
        "birthday": userData.userServe.birthday,
        "anniversary": userData.userServe.anniversary,
        "bust": userData.userServe.bust,
        "waist": userData.userServe.waist,
        "hip": userData.userServe.hip,
        "anyother": userData.userServe.anyother,
    })
    const [password, setPassword] = useReducer(() => {
    }, {new: "", confirm: ""})
    const router = useRouter();
    useEffect(() => {
        if (!userData.userServe.email)
            router.replace("/"); //illegal direct access
    }, [userData.userServe.email, router])

    useEffect(() => {
        setMobile(isMobile)
    }, [])

    const save = (e) => {
        e.preventDefault();
        if (changePasswordCheckbox) {
            if (password.new.length < 6) {
                setError(0)
                return
            }
            if (password.confirm.length < 6) {
                setError(1)
                return
            }
            if (password.new !== password.confirm) {
                setError(2)
                return
            }
        }
        let payload = {
            ...data, account: {
                change_password: changePasswordCheckbox,
                password: changePasswordCheckbox ? password.new : ""
            }
        }
        apiCall("updateUserDetails", appConfig.apiToken, {user: payload})
            .then(pData => {
                if (pData.status === 200) {
                    setShow(true)
                }
            })
            .catch(e => console.log(e.message))
    }

    const labelClass = "block text-[14px] mb-1";
    const focusClass = " focus:bg-white focus:border-[#5d6d86] focus:ring-transparent";
    const inputClass = "block w-full leading-6 bg-[#f1f2f3] border border-[#f1f2f3] outline-0 px-4 py-2" + focusClass;

    const mobileView = <UserPageTemplate mobile={true}>
        <div className={"mx-5"}>
            <p className="text-[28px] mb-2">Account</p>
            <form action="#" onSubmit={save}>
                <div className="grid grid-cols-4 gap-6 mb-5">
                    {basicFields?.map((item, index) => {
                        return (
                            <div className={`col-span-${item[!mobile ? "columnSpace" : "mobColumnSpace"]}`}
                                 key={index}>
                                <label className={labelClass} htmlFor={item.fieldName}>{item.label}</label>
                                <input className={inputClass} type={item.inputType} id={item.fieldName} value={data[item.fieldName]} onChange={setData}/>
                            </div>
                        )
                    })}
                    <label className={labelClass + " flex gap-2 items-center"}>
                        <input type="checkbox" className={"text-[#777] focus:ring-transparent"} name="" id=""
                               onChange={(e) => {
                                   setChangePasswordCheckbox(e.target.checked)
                               }}/>
                        <span>Change&nbsp;Password</span>
                    </label>
                    {changePasswordCheckbox ? passwordFields.map((item, index) => {
                        return (
                            <div className={`col-span-${item.columnSpace}`} key={index}>
                                <label className={labelClass} htmlFor={item.fieldName}>{item.label}</label>
                                <input className={inputClass + [error === index || error === 2 ? " border-rose-500" : ""]} type={item.inputType} id={item.fieldName}
                                       value={password[item.fieldName]} onChange={setPassword}/>
                                {
                                    error === index ?
                                        error === 0 ?
                                            <div className={"text-[#E82515] text-xs"}>Password Should be 6 digit long.</div>
                                            :
                                            <div className={"text-[#E82515] text-xs"}>Confirm Password Should be 6 digit long.</div>
                                        : ""
                                }
                                {
                                    error === 2 ?
                                        index === 0 ?
                                            <div className={"text-[#E82515] text-xs"}>Password should be same as Confirm Password.</div>
                                            :
                                            <div className={"text-[#E82515] text-xs"}>Confirm Password should be same as Password.</div>
                                        : ""
                                }
                            </div>
                        )
                    }) : ''}
                </div>
                <button type="submit" className="uppercase bg-black text-sm px-5 py-1.5 text-white">Save</button>
            </form>
        </div>
    </UserPageTemplate>

    const browserView = (
        <UserPageTemplate>
            <p className="text-[28px] mb-2">Account</p>
            <form onSubmit={save}>
                <div className="grid grid-cols-4 gap-6 mb-5">
                    {basicFields?.map((item, index) => {
                        return (
                            <div className={`col-span-${item.columnSpace}`} key={index}>
                                <label className={labelClass} htmlFor={item.fieldName}>{item.label}</label>
                                <input className={inputClass} type={item.inputType} id={item.fieldName} value={data[item.fieldName]} onChange={setData}/>
                            </div>
                        )
                    })}
                    <div className={`col-span-4`}>
                        <label htmlFor="" className={labelClass + " flex gap-2 items-center"}>
                            <input type="checkbox" className={"text-[#777] focus:ring-transparent"} name="" id=""
                                   onChange={(e) => {
                                       setChangePasswordCheckbox(e.target.checked)
                                   }}
                            />
                            <span>Change Password </span>
                        </label>
                    </div>
                    {changePasswordCheckbox && passwordFields.map((item, index) => {
                        return (
                            <div className={`col-span-${item.columnSpace}`} key={index}>
                                <label className={labelClass} htmlFor={item.fieldName}>{item.label}</label>
                                <input className={inputClass + [error === index || error === 2 ? " border-rose-500" : ""]} type={item.inputType} id={item.fieldName}
                                       value={password[item.fieldName]} onChange={setPassword}/>
                                {
                                    error === index ?
                                        error === 0 ?
                                            <div className={"text-[#E82515] text-xs"}>Password Should be 6 digit long.</div>
                                            :
                                            <div className={"text-[#E82515] text-xs"}>Confirm Password Should be 6 digit long.</div>
                                        : ""
                                }
                                {
                                    error === 2 ?
                                        index === 0 ?
                                            <div className={"text-[#E82515] text-xs"}>Password should be same as Confirm Password.</div>
                                            :
                                            <div className={"text-[#E82515] text-xs"}>Confirm Password should be same as Password.</div>
                                        : ""
                                }
                            </div>
                        )
                    })}
                </div>
                <button type="submit" className="uppercase bg-black text-sm px-5 py-1.5 text-white">Save</button>
            </form>
        </UserPageTemplate>
    )
    return (
        <Fragment>
            <PageHead url={"/users/account"} id={"profile"} isMobile={mobile}/>
            <Header type={mobile ? "minimal" : "shopMenu"} isMobile={mobile}/>
            {(mobile) ? mobileView : browserView}
            <Footer isMobile={mobile} minimal={true}/>
            <Toast isMobile={mobile} show={show} hideToast={() => setShow(false)}>
                Profile updated successfully
            </Toast>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        userData:state.userData,
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(UsersAccountPage);
