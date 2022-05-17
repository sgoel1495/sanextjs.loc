import PageHead from "../../components/PageHead";
import Header from "../../components/navbar/Header";
import CategoryHeaderImage from "../../components/common/CategoryHeaderImage";
import Footer from "../../components/footer/Footer";
import AppWideContext from "../../store/AppWideContext";
import React, {Fragment, useContext, useEffect, useState} from "react";
import Toast from "../../components/common/Toast";
import {apiCall} from "../../helpers/apiCall";


/**
 * @TODO FORM SUBMISSION LOGIC
 * @returns {JSX.Element}
 * @constructor
 */

function GetAppointmentPage() {
    const {dataStore} = useContext(AppWideContext);

    const [show,setShow]=useState(false)
    const [msg,setMsg]=useState(null);
    const [formData,setFormData]=useState({
        date:"",time:"", lastname:"",phonenumber:"",message:"",storelocation:"dlfmegamall",
        firstname:"",shoppedbefore:"",somethingspecific:"", email:""
    })

    const focusStyle = "focus:ring-offset-0 focus:ring-0"
    const labelStyle = "block mb-1 font-500";
    const inputStyle = `block w-full border-none bg-black/5 px-4 py-3 ${focusStyle}`;
    const textareaStyle = `${inputStyle} min-h-[100px]`;

    const timeOptionsArray = [
        "01:00 AM","01:30 AM","02:00 AM","02:30 AM","03:00 AM","03:30 AM","04:00 AM","04:30 AM","05:00 AM","05:30 AM","06:00 AM","06:30 AM",
        "07:00 AM","07:30 AM","08:00 AM","08:30 AM","09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
        "12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM",
        "5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM",
        "10:00 PM","10:30 PM","11:00 PM","11:30 PM"
    ]

    const timeOptions=()=>{
        let returnValue=null;
        timeOptionsArray.forEach(e=>{
            returnValue=<Fragment>
                {returnValue}
                <option value={e}>{e}</option>
            </Fragment>
        })
        return returnValue
    }

    const updateData=(key,value)=>{
        formData[key]=value;
        setFormData(formData)
    }

    const bookAppointment = async ()=>{
        let valid=true;
        let missingKeys="";
        Object.keys(formData).forEach(key=>{
            if(key!=="message" && key!=="somethingspecific")
                if(formData[key]==""){
                    valid=false
                    missingKeys+=" "+key
                }
            if(formData[key]=="phonenumber")
                formData[key]=formData[key].replace("+","")
            if(formData[key]=="time")
                formData[key]=formData[key].replace(" AM","")
            if(formData[key]=="time")
                formData[key]=formData[key].replace(" PM","")
        })
        if(!valid){
            setMsg("Please fill all fields. "+missingKeys)
            setShow(true)
        } else {
            const query={
                    "appt_date":formData.date,
                    "time":formData.time,
                    "f_name":formData.firstname,
                    "l_name":formData.lastname,
                    "email":formData.email,
                    "phone":formData.phonenumber,
                    "apt_type":"physical",
                    "is_custome":(dataStore.userData.contact)?"yes":"no",
                    "is_fitting":"Message: "+formData.message+" Specific: "+formData.somethingspecific
            }
            console.log("query",query)
            const resp = await apiCall("bookAppointmentMob",dataStore.apiToken,query);
            console.log("result",resp)
            if(resp.response && resp.response=="Done"){
                setMsg("Appointment done")
                setShow(true);
            } else {
                setMsg("Something went wrong")
                setShow(true);
            }
        }
    }

    const mobileView = null;
    const browserView = (
        <>
            <div className={`border-b border-black/30 col-span-2 text-center pb-8 mb-16`}>
                <div className={`text-2xl font-600 mb-8`}>Book An Appointment In Store</div>
                <div className={`mb-8 font-500`}>
                    <p>SALT Experience Store, DLF Mega Mall</p>
                    <p>(Shop No LG-51, Golf Course Road, Gurgaon)</p>
                    <p>Open all 7 days</p>
                </div>
                <div className={`text-sm font-500`}>Store Timings: 11:00 am - 08:30 pm</div>
            </div>
            <form className={`grid grid-cols-2 gap-x-20 gap-y-5`}>
                <div className={`grid grid-cols-2 gap-x-10 gap-y-8`}>
                    <div>
                        <label className={labelStyle} htmlFor="date">Choose Date</label>
                        <input className={inputStyle} id="date" type="date" onChange={e=>updateData("date",e.target.value)}/>
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="time">Preferred Time</label>
                        <select className={inputStyle}  value={formData.time} id="time" onChange={e=>updateData("time",e.target.value)}>
                            <option value="">Please Select</option>
                            {timeOptions()}
                        </select>
                    </div>
                    <div className={`col-span-2`}>
                        <label className={labelStyle} htmlFor="lastname">Last Name</label>
                        <input className={inputStyle} id="lastname" type="text" onChange={e=>updateData("lastname",e.target.value)}/>
                    </div>
                    <div className={`col-span-2`}>
                        <label className={labelStyle} htmlFor="phonenumber">Phone Number</label>
                        <input className={inputStyle} id="phonenumber" type="tel" onChange={e=>updateData("phonenumber",e.target.value)}/>
                    </div>
                    <div className={`col-span-2`}>
                        <label className={labelStyle} htmlFor="message">Anything you would like to tell us?</label>
                        <textarea className={textareaStyle} id="message" placeholder="Optional..." onChange={e=>updateData("message",e.target.value)}/>
                    </div>
                    <div className={`col-span-2`}>
                        <label className={labelStyle} htmlFor="storelocation">Select Store Location</label>
                        <select className={inputStyle} id="storelocation" onChange={e=>updateData("storelocation",e.target.value)}>
                            <option value="dlfmegamall">DLF MEGA MALL</option>
                        </select>
                    </div>
                </div>
                <div className={`flex flex-col gap-y-8`}>
                    <div>
                        <label className={labelStyle} htmlFor="firstname">First Name</label>
                        <input className={inputStyle} id="firstname" type="text" onChange={e=>updateData("firstname",e.target.value)}/>
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="email">Email</label>
                        <input className={inputStyle} id="email" type="email" onChange={e=>updateData("email",e.target.value)}/>
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="shoppedbefore">Have you shopped with us before?</label>
                        <select className={inputStyle} id="shoppedbefore" onChange={e=>updateData("shoppedbefore",e.target.value)}>
                            <option value="">Please Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="somethingspecific">Anything you would like to tell us?</label>
                        <textarea className={textareaStyle} id="somethingspecific" placeholder="Optional"  onChange={e=>updateData("somethingspecific",e.target.value)}/>
                    </div>
                </div>
            </form>
            <div className={`col-span-2  mt-10 flex justify-center`}>
                <button className={`bg-black text-white font-500 text-sm tracking-wide py-3 px-16`} onClick={bookAppointment}>
                    BOOK AN APPOINTMENT
                </button>
            </div>
        </>
    );

    const category = "Get Virtual Appointment"

    return (
        <Fragment>
            <PageHead url="/salt/get-appointment" id="getappointment" isMobile={dataStore.mobile}/>
            <Header type={dataStore.mobile?"minimal":"shopMenu"} isMobile={dataStore.mobile}/>
            <CategoryHeaderImage category={category}/>
            <section className="container my-20 select-none">
                {(dataStore.mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={dataStore.mobile}/>
            <Toast show={show} hideToast={() => {
                setShow(false)
            }}>
                <p>{msg}</p>
            </Toast>
        </Fragment>
    )


}

export default GetAppointmentPage;

/*
{
"token":"b16ee1b2bcb512f67c3bca5fac24a924fcc2241bcbfe19ddfdde33ecd24114a0",
"appt_date":"2020-09-30",
"time":"03:00",
"f_name":"Test",
"l_name":"Test",
"email":"chandra.b@algowire.com",
"phone":"07739526906",
"apt_type":"physical",
"is_custome":"yes/no",
"is_fitting":""
}
 */