import React, {Fragment} from 'react';
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import {connect} from "react-redux";
import Image from "next/image";

const Index = ({isMobile}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    return (
        <Fragment>
            <PageHead url="/salt/get-appointment" id="getappointment" isMobile={isMobile}/>
            <Header type={"shopMenu"} isMobile={isMobile}/>
            <span className={`block relative w-full aspect-[23/8]`}>
                    <Image src={WEBASSETS + "/assets/images/ContactUs.2_v2.jpg"} alt={"INFINITI MALAD"} layout={`fill`} objectFit={`contain`}/>
                </span>
            <section className={"select-none" + [isMobile ? " px-4 pb-20 pt-5 bg-[#f3e9e3]" : " mx-auto w-8/12"]}>
                <div className={"text-center grid py-8 text-lg border-b tracking-wider"}>
                    <span className={"text-xl font-600 pb-6"}>Book An Appointment In Store</span>
                    <span>DLF MEGA MALL</span>
                    <span>LG-51, DLF MEGA MALL, GOLF COURSE ROAD, GURUGRAM, HARYANA 122002</span>
                    <span>CONTACT: +91 124 4116917</span>
                    <span>STORE TIMINGS:11:00 AM - 08:00 PM, OPEN ALL 7 DAYS</span>
                </div>
                <div className={"text-center py-12"}>Thank you!</div>
            </section>
            <Footer isMobile={isMobile}/>

        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        isMobile: state.appConfig.isMobile
    }
}

export default connect(mapStateToProps)(Index);