import React from 'react';
import Image from "next/image";

const focusStyle = "focus:ring-0 focus:border-white focus:shadow-none focus:ring-offset-transparent";
const inputStyle = "border border-white pb-6 px-1 pt-1 text-sm text-center bg-[#f6f1ef] " + focusStyle;

const Index = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    return (
        <div className={"bg-[#f3e9e3] pt-5 pb-10"}>
            <h2 className={"text-h1 font-900 uppercase tracking-wider mx-4 text-[#db8b7d]"}>our stores</h2>
            <h3 className={"text-h2 font-cursive italic leading-none mx-4 mb-6 text-[#db8b7d]"}>Experience Salt Attire</h3>
            <div className={"mx-4"}>
                <div className={"relative w-full h-[70vw]"}>
                    <Image src={WEBASSETS + "/assets/images/our_store_800_v1.jpg"} layout={`fill`} objectFit={`cover`} alt='Address' />
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
                <form>
                    <div className="grid grid-cols-2 gap-3">
                        <select className={inputStyle + " col-span-2"}>
                            <option value="" selected>SELECT APPOINTMENT TYPE</option>
                            <option value="physical">Store Appointment</option>
                            <option value="virtual">Virtual Styling Session (Zoom/Google Meet))</option>
                        </select>
                        <input className={inputStyle} type="date" />
                        <input className={inputStyle} type="time" />
                        <input className={inputStyle} type="text" placeholder='FIRST NAME' />
                        <input className={inputStyle} type="text" placeholder='LAST NAME' />
                        <input className={inputStyle + " col-span-2"} type="email" placeholder='EMAIL ID' />
                        <input className={inputStyle + " col-span-2"} type="tel" placeholder='PHONE NUMBER' />
                        <select className={"my-2 border-none col-span-2 bg-transparent text-center text-xs font-600"}>
                            <option value="" selected>HAVE YOU SHOPPED WITH US BEFORE</option>
                            <option value="physical">Store Appointment</option>
                            <option value="virtual">Virtual Styling Session (Zoom/Google Meet))</option>
                        </select>
                    </div>
                    <button type="button" className='bg-red-300 uppercase py-2 w-full font-600 tracking-wide bg-[#4a4847] text-white'>Submit & Book</button>
                </form>
            </div>
        </div>
    );
};

export default Index;