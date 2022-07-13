import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import {useRouter} from "next/router";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import UserPageTemplate from "../../../components/user/UserPageTemplate";
import {isMobile} from "react-device-detect";

const basicFields = [
    {
        fieldName: "first_name",
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
        fieldName: "email_address",
        label: "Email Address",
        inputType: "text",
        columnSpace: 4,
        mobColumnSpace: 4,
    },
    {
        fieldName: "birth_date",
        label: "Birth Date",
        inputType: "date",
        columnSpace: 2,
        mobColumnSpace: 4,
    },
    {
        fieldName: "anniversary_date",
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
        fieldName: "hips",
        label: "Hips",
        inputType: "text",
        columnSpace: 1,
        mobColumnSpace: 2,
    },
    {
        fieldName: "any_other",
        label: "Any Other",
        inputType: "text",
        columnSpace: 1,
        mobColumnSpace: 2,
    },
]

const passwordFields = [
    {
        fieldName: "first_name",
        label: "New Password",
        inputType: "password",
        columnSpace: 4
    },
    {
        fieldName: "first_name",
        label: "Confirm New Password",
        inputType: "password",
        columnSpace: 4
    }
]

function UsersAccountPage() {
    const [mobile, setMobile] = useState(false);
    const {dataStore} = useContext(AppWideContext);
    const [changePasswordCheckbox, setChangePasswordCheckbox] = useState(false)
    const router = useRouter();
    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])

    useEffect(() => {
        setMobile(isMobile)
    }, [])

    const labelClass = "block text-[14px] mb-1";
    const focusClass = " focus:bg-white focus:border-[#5d6d86] focus:ring-transparent";
    const inputClass = "block w-full leading-6 bg-[#f1f2f3] border border-[#f1f2f3] outline-0 px-4 py-2" + focusClass;

    const mobileView = <UserPageTemplate mobile={true}>
        <div className={"mx-5"}>
            <p className="text-[28px] mb-2">Account</p>
            <form action="#">
                <div className="grid grid-cols-4 gap-6 mb-5">
                    {basicFields?.map((item, index) => {
                        return (
                            <div className={`col-span-${item[!mobile ? "columnSpace" : "mobColumnSpace"]}`}
                                 key={index}>
                                <label className={labelClass} htmlFor={item.fieldName}>{item.label}</label>
                                <input className={inputClass} type={item.inputType}/>
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
                    {changePasswordCheckbox ? passwordFields?.map((item, index) => {
                        return (
                            <div className={`col-span-${item.columnSpace}`} key={index}>
                                <label className={labelClass} htmlFor={item.fieldName}>{item.label}</label>
                                <input className={inputClass} type={item.inputType}/>
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
            <form action="#">
                <div className="grid grid-cols-4 gap-6 mb-5">
                    {basicFields?.map((item, index) => {
                        return (
                            <div className={`col-span-${item.columnSpace}`} key={index}>
                                <label className={labelClass} htmlFor={item.fieldName}>{item.label}</label>
                                <input className={inputClass} type={item.inputType}/>
                            </div>
                        )
                    })}
                    <label htmlFor="" className={labelClass + " flex gap-2 items-center"}>
                        <input type="checkbox" className={"text-[#777] focus:ring-transparent"} name="" id=""/>
                        <span>Change Password</span>
                    </label>
                    {passwordFields?.map((item, index) => {
                        return (
                            <div className={`col-span-${item.columnSpace}`} key={index}>
                                <label className={labelClass} htmlFor={item.fieldName}>{item.label}</label>
                                <input className={inputClass} type={item.inputType}/>
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
            <Footer isMobile={mobile}/>
        </Fragment>
    )
}

export default UsersAccountPage;
