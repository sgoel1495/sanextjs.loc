import React, {useState} from 'react';
import PageHead from "../../../components/PageHead";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import Accordion from "../../../components/common/accordion";
import LinkParser from "../../../components/common/LinkParser";
import faqData from "../../../store/faqData.json";
import Header from "../../../components/navbar/Header";
import {connect} from "react-redux";
import Link from "next/link";
import {apiCall} from "../../../helpers/apiCall";

/**
 * @todo Pincode check
 * @returns {JSX.Element}
 * @constructor
 */

const AnswerBlock = ({ item }) => {
    const main = (
        <div className={`${item.check ? 'flex-1' : null}`}>
            <LinkParser para={item.para} />
        </div>
    );
    const check = (
        <div className={`flex items-start gap-x-2`}>
            <span className="block w-5 h-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                </svg>
            </span>
            {main}
        </div>
    )
    return item.check ? check : main;
}

function SaltFaqPage({appConfig}) {

    const category = "FAQ";
    const [pincode, setPinCode] = useState(null)
    const [deliveryAvailable, setDeliveryAvailable] = useState(null)
    const checkDelivery = async () => {
        if (pincode == null)
            return;
        const resp = await apiCall("cityByZipcode", appConfig.apiToken, {zipcode: pincode});
        setDeliveryAvailable(!!(resp.response_data && resp.response_data.city))
    }

    const showFaq = (col) => {
        let showFaqData = null;
        faqData.forEach(ele => {
            if (col === "left" && ele.id < 19 || col === "right" && ele.id > 18 || col === "all") {
                let answersData = null;
                ele.answers.forEach(answer => {
                    answersData = (
                        <>
                            {answersData}
                            <AnswerBlock item={answer} />
                        </>
                    );
                });
                showFaqData = (
                    <>
                        {showFaqData}
                        <Accordion
                            title={ele.question}
                            titleStyle={"bg-black/10 px-4 py-5 lg:py-7 lg:px-6"}
                            titleTextStyle={`text-[#777] text-sm font-500 uppercase`}
                            bodyStyle={"bg-black/5"}
                        >
                            <div className="px-6 py-4">
                                {answersData}
                                {
                                    ele.id === 22 &&
                                    <div className={"bg-white mt-2 border-4 border-black/10 p-1"}>
                                        <p className={"text-[10px] tracking-tight font-600 mb-1"}> Please enter PIN to check delivery availability.</p>
                                        <div className={"inline-flex justify-between w-full gap-2 p-2"}>
                                            <input placeholder={"Enter pincode"} type="number"
                                                   className='border border-black text-sm w-full placeholder:text-black font-500'
                                                   onChange={e => setPinCode(e.target.value)}
                                            />
                                            <button
                                                className={"bg-black text-white uppercase text-sm px-2"}
                                                onClick={checkDelivery}
                                            >Submit
                                            </button>
                                        </div>
                                        {(deliveryAvailable == null)
                                            ? null
                                            : (deliveryAvailable)
                                                ? <div>Delivery Available!</div>
                                                : <div>
                                                    Sorry! Delivery not available to this location.
                                                    <Link href="/salt/contact-us" key="contact">
                                                        <a> Contact Us </a>
                                                    </Link>
                                                    if you do not see your pincode.
                                                </div>
                                        }
                                    </div>
                                }

                            </div>
                        </Accordion>
                    </>
                );
            }
        });
        return showFaqData;
    }

    const mobileView = (
        <div className={'px-5 flex flex-col gap-y-2 mt-4 mb-36'}>
            <p className='text-center text-h2 leading-[1.25]'>FAQ</p>
            <div className={`flex flex-col gap-y-2`}>
                {showFaq("all")}
            </div>
        </div>
    );
    const browserView = (
        <div className="w-3/4 mx-auto my-10 grid grid-cols-2 gap-x-36">
            <div className={`flex flex-col gap-y-2`}>
                {showFaq("left")}
            </div>
            <div className={`flex flex-col gap-y-2`}>
                {showFaq("right")}
            </div>
        </div>
    )
    return (
        <>
            <PageHead url="/salt/faq" id="faq" isMobile={appConfig.isMobile} />
            <Header type={appConfig.isMobile ? "minimal" : "shopMenu"} isMobile={appConfig.isMobile} />
            <CategoryHeaderImage category={category} />
            <section >
                {(appConfig.isMobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={appConfig.isMobile} minimal={true} color={"#f5f5f5"} />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(SaltFaqPage);
