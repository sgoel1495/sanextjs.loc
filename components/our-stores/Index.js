import React from 'react';
import Image from "next/image";

const Index = () => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    return (
        <div className={"bg-[#f3e9e3] p-5"}>
            <span className={"block uppercase tracking-widest"}>
                our stores
            </span>
            <span className={"block"}>
                Experience Salt Attire
            </span>
            <div className={"py-7"}>
                <span className={"block relative w-full h-[70vw]"}>
                    <Image src={WEBASSETS + "/assets/images/our_store_800_v1.jpg"} layout={`fill`} objectFit={`cover`}/>
                </span>
                <div className={"bg-[#fffffc] shadow-sm"}>
                    <span className={"block"}>
                        DLF MEGA MALL
                    </span>
                    <span className={"block"}>GURUGRAM</span>
                </div>
            </div>
            <div>
                <span className={"block"}>
                    LG-51 DLF MEGA MALL
                </span>
                <span className={"block"}>
                    GOLF COURSE ROAD, GURUGRAM, HARYANA 122002
                </span>
                <span className={"block"}>
                    OPEN ALL 7 DAYS
                </span>
            </div>
            <div>
                <span className={"block"}>
                    STORE TIMINGS:
                </span>
                <span className={"block"}>
                11:00 AM - 08:30 PM
                </span>
            </div>
            <div>
                <div>
                    <span className={"block"}>our store is open!</span>
                    <span className={"block"}>visits are by appointment only</span>
                </div>
                <div>
                    <span className={"block"}>Book an Appointment</span>
                    <span className={"block"}>(In-person/Virtual)</span>
                </div>
                <div className={"grid grid-cols-2"}>
                    <select className={"col-span-2"}>
                        <option value="">SELECT APPOINTMENT TYPE</option>
                        <option value="physical">Store Appointment</option>
                        <option value="virtual">Virtual Styling Session (Zoom/Google Meet))</option>
                    </select>
                    <input placeholder={"CHOOSE DATE"} type="date" />
                {/*    add min tomorrows date */}
                <input/>
                </div>
            </div>
        </div>
    );
};

export default Index;