import React from 'react';
import PageHead from "../../components/PageHead";
import CategoryHeaderImage from "../../components/common/CategoryHeaderImage";
import Footer from "../../components/footer/Footer";
import AppWideContext from "../../store/AppWideContext";
import {Fragment, useContext, useEffect, useState} from "react";
import Header from "../../components/navbar/Header";
import {apiCall} from "../../helpers/apiCall";
import Toast from "../../components/common/Toast";
import {isMobile} from "react-device-detect";
import Image from "next/image";

/**
 * @TODO FORM SUBMISSION LOGIC
 * @returns {JSX.Element}
 * @constructor
 */

function GetVirtualAppointmentPage() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [mobile, setMobile] = useState(false);
    const [show, setShow] = useState(false)
    const [msg, setMsg] = useState(null);
    const [formData, setFormData] = useState({
        date: "", time: "", lastname: "", phonenumber: "", message: "",
        firstname: "", shoppedbefore: "", somethingspecific: "", email: ""
    })
    const [refresh,setRefresh]=useState(false)

    useEffect(() => {
        setMobile(isMobile)
    }, [])

    const focusStyle = "focus:ring-offset-0 focus:ring-0"
    const labelStyle = "block mb-1 font-500";
    const inputStyle = `block w-full border-none bg-black/5 px-4 py-3 ${focusStyle}`;
    const mobileInputStyle = `block w-full text-[#999593] bg-[#f6f1ef] border-2 border-white bg-black/5 px-4 py-3 ${focusStyle}`
    const textareaStyle = `${inputStyle} min-h-[100px]`;

    const timeOptionsArray = [
        "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM", "03:00 AM", "03:30 AM", "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM", "06:00 AM", "06:30 AM",
        "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
        "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
        "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
    ]

    const timeOptions = () => {
        let returnValue = null;
        timeOptionsArray.forEach(e => {
            returnValue = <Fragment>
                {returnValue}
                <option value={e}>{e}</option>
            </Fragment>
        })
        return returnValue
    }

    const updateData = (key, value) => {
        formData[key] = value;
        setFormData(formData)
        setRefresh(!refresh)
    }

    const bookAppointment = async () => {
        let valid = true;
        let missingKeys = "";
        Object.keys(formData).forEach(key => {
            if (key !== "message" && key !== "somethingspecific")
                if (formData[key] == "") {
                    valid = false
                    missingKeys += " " + key
                }
            if (formData[key] == "phonenumber")
                formData[key] = formData[key].replace("+", "")
            if (formData[key] == "time")
                formData[key] = formData[key].replace(" AM", "")
            if (formData[key] == "time")
                formData[key] = formData[key].replace(" PM", "")
        })
        if (!valid) {
            setMsg("Please fill all mandatory fields.")
            setShow(true)
        } else {
            const query = {
                "appt_date": formData.date,
                "time": formData.time,
                "f_name": formData.firstname,
                "l_name": formData.lastname,
                "email": formData.email,
                "phone": formData.phonenumber,
                "apt_type": "physical",
                "is_custome": (dataStore.userData.contact) ? "yes" : "no",
                "is_fitting": "Message: " + formData.message + " Specific: " + formData.somethingspecific
            }

            const resp = await apiCall("bookAppointmentMob", dataStore.apiToken, query);

            if (resp.response && resp.response == "Done") {
                setMsg("Appointment done")
                setShow(true);
            } else {
                setMsg("Something went wrong")
                setShow(true);
            }
        }
    }

    const browserView = (
        <>
            <div>
                DLF MEGA MALL
                LG-51, DLF MEGA MALL, GOLF COURSE ROAD, GURUGRAM, HARYANA 122002
                CONTACT: +91 124 4116917
                STORE TIMINGS:
                11:00 AM - 08:00 PM, OPEN ALL 7 DAYS

                PHOENIX PALLADIUM
                5A, THIRD FLOOR, EAST ZONE, PHOENIX PALLADIUMSENAPATI BAPAT ROAD, MUMBAI, MAHARASHTRA
                CONTACT: +91 8976892272

                STORE TIMINGS:
                11:00 AM - 10:00 PM, OPEN ALL 7 DAYS

                INFINITI MALAD
                123, FIRST FLOOR, INFINITI MALAD, MUMBAI, MAHARASHTRA
                CONTACT: +91 8976892273

                STORE TIMINGS:
                11:00 AM - 10:00 PM, OPEN ALL 7 DAYS

                OUR STORE IS OPEN!
            </div>
            <div className={`text-2xl font-600 text-center mb-12`}>Book An Online Styling Session</div>
            <form className={`grid grid-cols-2 gap-x-20 gap-y-5`}>
                <div className={`grid grid-cols-2 gap-x-10 gap-y-8`}>
                    <div>
                        <label className={labelStyle} htmlFor="date">Choose Date</label>
                        <input className={inputStyle} id="date" type="date" onChange={e => updateData("date", e.target.value)}/>
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="time">Preferred Time</label>
                        <select className={inputStyle} value={formData.time} id="time" onChange={e => updateData("time", e.target.value)}>
                            <option value="">Please Select</option>
                            {timeOptions()}
                        </select>
                    </div>
                    <div className={`col-span-2`}>
                        <label className={labelStyle} htmlFor="lastname">Last Name</label>
                        <input className={inputStyle} id="lastname" type="text" onChange={e => updateData("lastname", e.target.value)}/>
                    </div>
                    <div className={`col-span-2`}>
                        <label className={labelStyle} htmlFor="phonenumber">Phone Number</label>
                        <input className={inputStyle} id="phonenumber" type="tel" onChange={e => updateData("phonenumber", e.target.value)}/>
                    </div>
                    <div className={`col-span-2`}>
                        <label className={labelStyle} htmlFor="message">Anything you would like to tell us?</label>
                        <textarea className={textareaStyle} id="message" placeholder="Optional..." onChange={e => updateData("message", e.target.value)}/>
                    </div>
                </div>
                <div className={`flex flex-col gap-y-8`}>
                    <div>
                        <label className={labelStyle} htmlFor="firstname">First Name</label>
                        <input className={inputStyle} id="firstname" type="text" onChange={e => updateData("firstname", e.target.value)}/>
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="email">Email</label>
                        <input className={inputStyle} id="email" type="email" onChange={e => updateData("email", e.target.value)}/>
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="shoppedbefore">Have you shopped with us before?</label>
                        <select className={inputStyle} id="shoppedbefore" onChange={e => updateData("shoppedbefore", e.target.value)}>
                            <option value="">Please Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="somethingspecific">Looking for something specific?</label>
                        <textarea className={textareaStyle} id="somethingspecific" placeholder="Optional" onChange={e => updateData("somethingspecific", e.target.value)}/>
                    </div>
                </div>
            </form>
            <div className={`col-span-2  mt-10 flex justify-center`}>
                <button className={`bg-black text-white font-500 text-sm tracking-wide py-3 px-16`} onClick={bookAppointment}>
                    BOOK A VIRTUAL STYLING SESSION
                </button>
            </div>
        </>
    );

    const mobileView = <div className={"w-full"}>
        <h2 className={"text-2xl font-900 uppercase tracking-wider text-[#db8b7d] font-cursive"}>styling appointment</h2>
        <h3 className={"text-h3 font-cursive leading-none mb-6 text-[#db8b7d]"}>Experience Salt Attire</h3>
        <span className={"block relative w-full aspect-[6/5]"}>
            <Image src={WEBASSETS + "/assets/images/our_store_800_v1.jpg"} layout={`fill`} objectFit={`cover`}/>
        </span>
        <div className={`text-2xl font-100 text-center my-5 font-cursive text-[#595756]`}>Book An Online Styling Session</div>
        <div className={`grid grid-cols-2 gap-x-10 gap-y-4`}>
            <div>
                <input className={mobileInputStyle} id="date" type="date" onChange={e => updateData("date", e.target.value)} placeholder={"Choose Date"}/>
            </div>
            <div>
                <select className={mobileInputStyle} value={formData.time} id="time" onChange={e => updateData("time", e.target.value)}>
                    <option value="">Preferred Time</option>
                    {timeOptions()}
                </select>
            </div>
            <div>
                <input className={mobileInputStyle} id="firstname" type="text" onChange={e => updateData("firstname", e.target.value)} placeholder={"First Name"}/>
            </div>
            <div>
                <input className={mobileInputStyle} id="lastname" type="text" onChange={e => updateData("lastname", e.target.value)} placeholder={"Last Name"}/>
            </div>
            <div className={`col-span-2`}>
                <input className={mobileInputStyle} id="email" type="email" onChange={e => updateData("email", e.target.value)} placeholder={"Email"}/>
            </div>
            <div className={`col-span-2`}>
                <input className={mobileInputStyle} id="phonenumber" type="tel" onChange={e => updateData("phonenumber", e.target.value)} placeholder={"Phone Number"}/>
            </div>
            <div className={`col-span-2`}>
                <textarea className={mobileInputStyle} id="message" placeholder="Anything you would like to tell us?" onChange={e => updateData("message", e.target.value)}/>
            </div>
            <div className={`col-span-2`}>
                <textarea className={mobileInputStyle} id="somethingspecific" onChange={e => updateData("somethingspecific", e.target.value)}
                          placeholder={"Looking for something specific?"}/>
            </div>
            <div className={`col-span-2`}>
                <select className={mobileInputStyle} id="shoppedbefore" onChange={e => updateData("shoppedbefore", e.target.value)}>
                    <option value="">Have you shopped with us before?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
        </div>
        <div className={`col-span-2  mt-10 flex justify-center`}>
            <button className={`bg-[#4a4847] text-[#f3e9e3] font-800 text-sm tracking-widest py-3 px-16 uppercase w-full`} onClick={bookAppointment}>
                Submit & Book
            </button>
        </div>
    </div>;


    const category = "Get Virtual Appointment"

    return (
        <Fragment>
            <PageHead url="/salt/get-virtual-appointment" id="virtualappointment" isMobile={mobile}/>
            <Header type={"shopMenu"} isMobile={mobile}/>
            {mobile || <CategoryHeaderImage category={category}/>}
            <section className={" select-none " + [mobile ? " px-4 pb-20 pt-5 bg-[#f3e9e3]" : " mx-auto w-3/5 my-20"]}>
                {(mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={mobile}/>
            <Toast isMobile={mobile} show={show} hideToast={() => {
                setShow(false)
            }}>{msg}
            </Toast>
        </Fragment>
    )


}

export default GetVirtualAppointmentPage;
