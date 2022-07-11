import React, {useContext, useState} from 'react';
import Image from "next/image";
import {DateTime, Interval} from "luxon";
import {apiDictionary} from "../../helpers/apiDictionary";
import AppWideContext from "../../store/AppWideContext";
import Toast from "../common/Toast";

const focusStyle = "focus:ring-0 focus:border-white focus:shadow-none focus:ring-offset-transparent";
const inputStyle = "border border-white px-1 text-sm text-center bg-[#f6f1ef] text-[#797979] tracking-[1px] " + focusStyle;

const Index = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);

    const [type, setType] = useState("")
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const bookApointment = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target)
        let queryObject = {};
        let flag = false
        formData.forEach(function (value, key) {
            queryObject[key] = value;
            if (!value) {
                flag = true
            }
        });
        if (flag) {
            setError(true)
            return
        }
        if (type === "virtual") {
            queryObject["store_location"] = ""
        }
        queryObject["is_fitting"] = ""
        queryObject["bring_text"] = ""
        const callObject = apiDictionary("bookAppointmentMob", dataStore.apiToken, queryObject);
        fetch(callObject.url, callObject.fetcher)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.status === 200) {
                    setSuccess(true)
                    e.target.reset()
                    setTimeout(() => {
                        setSuccess(false)
                    }, 5000)
                }
            }).finally(() => {
            setLoading(false)
        });
    }

    return (
        <div className={"bg-[#f3e9e3] pt-5 pb-10"} id={"book_now_link"}>
            <h2 className={"text-h1 font-900 uppercase tracking-wider mx-4 text-[#db8b7d]"}>our stores</h2>
            <h3 className={"text-h2 font-cursive italic leading-none mx-4 mb-6 text-[#db8b7d]"}>Experience Salt Attire</h3>
            <div className={"mx-4"}>
                <div className={"relative w-full h-[70vw]"}>
                    <Image src={WEBASSETS + "/assets/images/our_store_800_v1.jpg"} layout={`fill`} objectFit={`cover`} alt='Address'/>
                </div>
                <div className={"mb-8 bg-white text-center uppercase tracking-widest pt-7 pb-5"}>
                    <p className='font-cursive italic leading-none text-lg font-600 leading-[.75]'>DLF MEGA MALL</p>
                    <p className='text-xs'>GURUGRAM</p>
                </div>
                <div className="text-center leading-0 tracking-wider text-[11px]">
                    <p className='font-900 text-xs text-black/70'>LG-51 DLF MEGA MALL</p>
                    <p>GOLF COURSE ROAD, GURUGRAM, HARYANA 122002</p>
                    <p className='mb-5'>OPEN ALL 7 DAYS</p>
                    <p className='font-900 text-xs text-black/70'>STORE TIMINGS:</p>
                    <p>11:00 AM - 08:30 PM</p>
                </div>
                <div className='my-8 text-center uppercase tracking-wider text-[#db8b7d]'>
                    <p className='font-900 text-lg'>our store is open!</p>
                    <p className='text-xs'>visits are by appointment only</p>
                </div>
                <div className='my-8 text-center font-cursive italic font-600 text-h3 text-black/60'>
                    <p>Book an Appointment</p>
                    <p>(In-person/Virtual)</p>
                </div>
                <form onSubmit={bookApointment}>
                    <div className="grid grid-cols-2 gap-3">
                        <select value={type} name={"apt_type"} className={inputStyle + " col-span-2 py-4"} onChange={(e) => setType(e.target.value)}>
                            <option value="" >SELECT APPOINTMENT TYPE</option>
                            <option value="physical">Store Appointment</option>
                            <option value="virtual">Virtual Styling Session (Zoom/Google Meet)</option>
                        </select>
                        {
                            type === "physical" && <select defaultValue="DLF MEGA MALL" className={inputStyle + " col-span-2 py-4"} name={"store_location"}>
                                <option value="DLF MEGA MALL">DLF MEGA MALL</option>
                            </select>
                        }
                        <input name={"appt_date"} className={inputStyle + " w-full"} type="date" min={DateTime.now().plus({days: 1}).toISODate()}/>
                        <select defaultValue="" name={"time"} className={inputStyle}>
                            <option value="">SELECT TIME</option>
                            {
                                (new Interval.fromDateTimes(DateTime.now().set({hour: 1, minute: 0}), DateTime.now().set({
                                    hour: 23,
                                    minute: 30
                                }))).splitBy({minute: 30}).map((item, index) => {
                                    return <option value={item.start.toFormat("T")} key={index}>{item.start.toFormat("t")}</option>
                                })
                            }
                        </select>
                        <input className={inputStyle} type="text" placeholder='FIRST NAME' name={"f_name"}/>
                        <input className={inputStyle} type="text" placeholder='LAST NAME' name={"l_name"}/>
                        <input className={inputStyle + " col-span-2"} type="email" placeholder='EMAIL ID' name={"email"}/>
                        <input className={inputStyle + " col-span-2"} type="tel" placeholder='PHONE NUMBER' name={"phone"}/>
                        <div className={"my-2 col-span-2 text-center"}>
                            <label className={"text-xs font-400"}>HAVE YOU SHOPPED WITH US BEFORE ?</label>
                            <select defaultValue="" className={focusStyle + " border-none  bg-transparent text-xs font-600 text-center text-[#797979] h-8 py-1"} name={"is_custome"}>
                                <option value="">PLEASE SELECT</option>
                                <option value="yes">YES</option>
                                <option value="no">NO</option>
                            </select>
                        </div>
                    </div>
                    {
                        loading ?
                            <div className='py-1 w-full flex justify-center'>
                                <span className="block relative w-14 aspect-square">
                                    <Image src={WEBASSETS + "/assets/images/loader.gif"} layout={`fill`} objectFit={`cover`} alt={"loader"}/>
                                </span>
                            </div>
                            :
                            success ?
                                <button className='font-cursive border-[1px] border-[#4a4847] py-2 pt-3 w-full font-600 tracking-wider text-[#4a4847] italic text-center'>Thank
                                    You!</button>
                                :
                                <button type="submit" className='bg-red-300 uppercase py-2 w-full font-600 tracking-wide bg-[#4a4847] text-white'>Submit & Book</button>
                    }
                </form>
            </div>
            <Toast show={error} hideToast={() => {
                setError(false)
            }}>
                <p>Please fill all mandatory field!</p>
            </Toast>
        </div>
    );
};

export default Index;