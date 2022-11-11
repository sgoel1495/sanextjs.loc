import React, {Fragment} from 'react';
import Image from "next/image";
import PageHead from "../../components/PageHead";
import Header from "../../components/navbar/Header";
import Footer from "../../components/footer/Footer";
import {connect} from "react-redux";

const Index = ({appConfig}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const mobile = appConfig.isMobile;
    const mobileView = <div className={"w-full pt-20"}>
        <h2 className={"text-[2rem] font-900 uppercase tracking-wider text-[#db8b7d] font-cursive"}>our stores</h2>
        <h3 className={"text-3xl font-cursive leading-none mb-6 text-[#db8b7d]"}>Experience Salt Attire</h3>
        <div className={"bg-white"}>
            <span className={"block relative w-full aspect-[6/5]"}>
                <Image src={WEBASSETS + "/assets/images/our_store_800_v1.jpg"} layout={`fill`} objectFit={`cover`} alt={""}/>
            </span>
            <div className={"py-7 text-center"}>
                <span className={"block text-xl font-500 font-cursive tracking-widest text-[#333231]"}>SALT ATTIRE-MEGA MALL</span>
                <span className={"block text-[#333231] text-xs tracking-widest"}>GURUGRAM</span>
            </div>
        </div>
        <div className="text-center flex flex-col pt-[10%] pb-[5%] text-xs text-[#595756] font-cursive tracking-widest">
            <span className="store_add_1">LG-51 DLF MEGA MALL</span>
            <span className="store_add_2">GOLF COURSE ROAD, GURUGRAM, HARYANA 122002</span>
            <span className="store_add_2">OPEN ALL 7 DAYS</span>
        </div>
        <div className="text-center flex flex-col pb-[5%] text-xs text-[#595756] font-cursive tracking-widest">
            <span className="store_add_2">STORE TIMINGS:</span>
            <span className="store_add_2">11:00 AM - 08:30 PM</span>
        </div>
        <div className={"bg-white"}>
            <span className={"block relative w-full aspect-[6/5]"}>
                <Image src={WEBASSETS + "/assets/images/our_store_800_v2.jpg"} layout={`fill`} objectFit={`cover`} alt={""}/>
            </span>
            <div className={"py-7 text-center"}>
                <span className={"block text-xl font-500 font-cursive tracking-widest text-[#333231]"}>SALT ATTIRE-INFINITI</span>
                <span className={"block text-[#333231] text-xs tracking-widest"}>MUMBAI</span>
            </div>
        </div>
        <div className="text-center flex flex-col pt-[10%] pb-[5%] text-xs text-[#595756] font-cursive tracking-widest">
            <span className="store_add_1">INFINITI MALAD</span>
            <span className="store_add_2">123, FIRST FLOOR, MALAD, MUMBAI, MAHARASHTRA</span>
            <span className="store_add_2">OPEN ALL 7 DAYS</span>
            <span className="store_add_2">CONTACT: +91 8976892273</span>
        </div>
        <div className="text-center flex flex-col pb-[5%] text-xs text-[#595756] font-cursive tracking-widest">
            <span className="store_add_2">STORE TIMINGS:</span>
            <span className="store_add_2">11:00 AM - 10:00 PM</span>
        </div>
        <div className={"bg-white"}>
            <span className={"block relative w-full aspect-[6/5]"}>
                <Image src={WEBASSETS + "/assets/images/our_store_800_v3.jpg"} layout={`fill`} objectFit={`cover`} alt={""}/>
            </span>
            <div className={"py-7 text-center"}>
                <span className={"block text-xl font-500 font-cursive tracking-widest text-[#333231]"}>SALT ATTIRE-PHOENIX</span>
                <span className={"block text-[#333231] text-xs tracking-widest"}>MUMBAI</span>
            </div>
        </div>
        <div className="text-center flex flex-col pt-[10%] pb-[5%] text-xs text-[#595756] font-cursive tracking-widest">
            <span className="store_add_1">5A, THIRD FLOOR, EAST ZONE, PHOENIX PALLADIUM</span>
            <span className="store_add_2">SENAPATI BAPAT ROAD, MUMBAI, MAHARASHTRA</span>
            <span className="store_add_2">OPEN ALL 7 DAYS</span>
            <span className="store_add_2">CONTACT: +91 8976892272</span>
        </div>
        <div className="text-center flex flex-col pb-[5%] text-xs text-[#595756] font-cursive tracking-widest">
            <span className="store_add_2">STORE TIMINGS:</span>
            <span className="store_add_2">11:00 AM - 10:00 PM</span>
        </div>
        <div className={"text-center tracking-widest text-xl text-[#db8b7d] font-cursive pt-[7.5%] pb-[5%]"}>
            OUR STORE IS OPEN!
        </div>
    </div>;
    const browserView = (
        <>
            <section className={`relative mb-8`}>
                <span className={`block relative w-full aspect-[3/1]`}>
                    <Image src={WEBASSETS + "/assets/images/ContactUs.2_v1.jpg"} alt={"DLF MEGA MALL"} layout={`fill`} objectFit={`contain`}/>
                </span>
                <div className={"text-center grid text-[#595756] text-sm tracking-widest mt-2"}>
                    <span className={"font-900 text-lg"}>DLF MEGA MALL</span>
                    <span>LG-51, DLF MEGA MALL, GOLF COURSE ROAD, GURUGRAM, HARYANA 122002</span>
                    <span>CONTACT: +91 124 4116917</span>
                    <span className={"font-900 mt-3"}>STORE TIMINGS:</span>
                    <span>11:00 AM - 08:00 PM, OPEN ALL 7 DAYS</span>
                </div>
            </section>
            <section className={`relative mb-8`}>
                <span className={`block relative w-full aspect-[3/1]`}>
                    <Image src={WEBASSETS + "/assets/images/ContactUs.2_v3.jpg"} alt={"PHOENIX PALLADIUM"} layout={`fill`} objectFit={`contain`}/>
                </span>
                <div className={"text-center grid text-[#595756] text-sm tracking-widest mt-2"}>
                    <span className={"font-900 text-lg"}>PHOENIX PALLADIUM</span>
                    <span>5A, THIRD FLOOR, EAST ZONE, PHOENIX PALLADIUM</span>
                    <span>SENAPATI BAPAT ROAD, MUMBAI, MAHARASHTRA</span>
                    <span>CONTACT: +91 8976892272</span>
                    <span className={"font-900 mt-3"}>STORE TIMINGS:</span>
                    <span>11:00 AM - 10:00 PM, OPEN ALL 7 DAYS</span>
                </div>
            </section>
            <section className={`relative`}>
                <span className={`block relative w-full aspect-[3/1]`}>
                    <Image src={WEBASSETS + "/assets/images/ContactUs.2_v2.jpg"} alt={"INFINITI MALAD"} layout={`fill`} objectFit={`contain`}/>
                </span>
                <div className={"text-center grid text-[#595756] text-sm tracking-widest mt-2"}>
                    <span className={"font-900 text-lg"}>INFINITI MALAD</span>
                    <span>123, FIRST FLOOR, INFINITI MALAD, MUMBAI, MAHARASHTRA</span>
                    <span>CONTACT: +91 8976892273</span>
                    <span className={"font-900 mt-3"}>STORE TIMINGS:</span>
                    <span>11:00 AM - 10:00 PM, OPEN ALL 7 DAYS</span>
                </div>
            </section>
            <div className={"text-[#DB8B7D] text-center font-900 text-2xl my-10"}>
                OUR STORE IS OPEN!
            </div>
        </>
    );

    return (
        <Fragment>
            <PageHead url="/our-stores" id="our-stores" isMobile={mobile}/>
            <Header type={mobile ? "minimal" : "shopMenu"} isMobile={mobile}/>
            <section className={"select-none" + [mobile ? " px-4 pb-20 pt-5 bg-[#f3e9e3]" : " mx-auto w-8/12 my-20"]}>
                {(mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={mobile}/>
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(Index);