import React, {Fragment, useContext, useState} from 'react';
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import shippingData from "../../../store/shippingData.json";
import returnsData from "../../../store/returnsData.json";
import Image from "next/image";
import Accordion from "../../../components/common/accordion";
import LinkParser from "../../../components/common/LinkParser";
import Header from "../../../components/navbar/Header";
import {isMobile} from "react-device-detect";

/**
 * @todo @Sambhav pls do css
 * @returns {JSX.Element}
 * @constructor
 */

const AnswerBlock = ({item}) => {
    const main = (
        <div className={`${item.check ? 'flex-1' : null} text-[13px] font-300`}>
            <LinkParser para={item.para}/>
        </div>
    );
    const check = (
        <div className={`flex items-start gap-x-2`}>
            <span className="block w-5 h-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"/>
                </svg>
            </span>
            {main}
        </div>
    )
    return item.check ? check : main;
}

function SaltShippingNReturnsPage() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [mobile, setMobile] = useState(false)
    const category = "Shipping & Returns";

    React.useEffect(() => {
        setMobile(isMobile)
    }, [])

    const showSR = (ssrData) => {
        let showSRData = null;
        ssrData.forEach(ele => {
            let answersData = null;
            ele.answers.forEach(answer => {
                answersData = (
                    <>
                        {answersData}
                        <AnswerBlock item={answer}/>
                    </>
                );
            });
            showSRData = (
                <>
                    {showSRData}
                    <Accordion
                        title={ele.question}
                        titleIcon={<Image src={WEBASSETS + ele.icon} alt="question" layout={`fill`} objectFit={`cover`}/>}
                        titleStyle={"bg-black/10 py-4 px-6"}
                        titleTextStyle={`text-black font-500 uppercase tracking-wider ` + [mobile ? 'text-sm' : 'text-[13px]']}
                        bodyStyle={"bg-black/5"}
                    >
                        <div className="px-6 py-4">
                            {answersData}
                        </div>
                    </Accordion>
                </>
            );
        });
        return showSRData;
    }

    return (
        <Fragment>
            <PageHead url="/salt/shipping-returns" id="shippingnreturns" isMobile={mobile}/>
            <Header type={mobile ? "minimal" : "shopMenu"} isMobile={mobile}/>
            <CategoryHeaderImage category={category} isMobile={mobile}/>
            <section className={"container my-20" + [mobile ? " px-4" : " grid gap-x-20 grid-cols-2"]}>
                {mobile && <span className={"block text-center text-2xl font-500 capitalize"}>Shipping & returns</span>}
                <div className={`flex flex-col gap-y-2`}>
                    <p className={`text-xl text-center mt-5 mb-2`}>Shipping Policy</p>
                    {showSR(shippingData)}
                </div>
                <div className={`flex flex-col gap-y-2`}>
                    <p className={`text-xl text-center mt-5 mb-2`}>Returns Policy</p>
                    {showSR(returnsData)}
                </div>
            </section>
            <Footer isMobile={mobile} minimal={true} color="#f5f5f5"/>
        </Fragment>
    )
}


export default SaltShippingNReturnsPage;
