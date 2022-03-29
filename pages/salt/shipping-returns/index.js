import React, {Fragment, useContext, useState} from 'react';
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import InfoBand from "../../../components/info-band/InfoBand";
import LooksNavbar from "../../../components/navbar/LookNavbar";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import shippingData from "../../../store/shippingData.json";
import returnsData from "../../../store/returnsData.json";
import Image from "next/image";
import Accordion from "../../../components/common/accordion";
import LinkParser from "../../../components/common/LinkParser";

/**
 * @todo @Sambhav pls do css
 * @returns {JSX.Element}
 * @constructor
 */

const AnswerBlock = ({item}) => {
    const main = (
        <div className={`${item.check ? 'flex-1' : null}`}>
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

function ShippingNReturnsPage() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);

    // NavBar Controls
    const [navControl, setNavControl] = useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    React.useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => window.removeEventListener('scroll', controller)
    }, []);

    const category = "Shipping & Returns";

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
                        titleTextStyle={`text-h6 text-[#777] font-400 uppercase`}
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
            <PageHead url="/salt/shipping-returns" id="shippingnreturns" isMobile={dataStore.mobile}/>
            <div className={"navigator fixed top-0 right-0 left-0 z-10 hover:bg-white/95 hover:shadow-lg bg-white/90"}>
                <InfoBand/>
                <LooksNavbar isMobile={dataStore.mobile}/>
            </div>
            <CategoryHeaderImage category={category}/>
            <section className={"container my-20 grid gap-x-20 "+[dataStore.mobile?"grid-cols-1":"grid-cols-2"]}>
                {dataStore.mobile&&<span className={"block text-center text-2xl font-bold"}>Shipping & returns</span>}
                <div className={`flex flex-col gap-y-2`}>
                    <p className={`text-xl text-center`}>Shipping Policy</p>
                    {showSR(shippingData)}
                </div>
                <div className={`flex flex-col gap-y-2`}>
                    <p className={`text-xl text-center`}>Returns Policy</p>
                    {showSR(returnsData)}
                </div>
            </section>
            <Footer isMobile={dataStore.mobile} minimal={true} color="#f5f5f5"/>
        </Fragment>
    )
}


export default ShippingNReturnsPage;
