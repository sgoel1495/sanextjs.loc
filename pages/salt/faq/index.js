import React, {Fragment, useContext, useEffect, useRef, useState} from 'react';
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import InfoBand from "../../../components/info-band/InfoBand";
import LooksNavbar from "../../../components/navbar/LookNavbar";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import Accordion from "../../../components/common/accordion";

/**
 * @todo Pincode check
 * @todo @Sambhav pls do css
 * @returns {JSX.Element}
 * @constructor
 */

const FAQItemAnswer = ({item}) => {
    const createMarkup = () => {
        return {__html: item.para};
    }
    const main = <div className={`${item.check ? 'flex-1' : null}`} dangerouslySetInnerHTML={createMarkup()} />;
    const Check = (
        <div className={`flex items-start gap-x-2`}>
            <span className="block w-5 h-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"/>
                </svg>
            </span>
            {main}
        </div>
    )
    return item.check ? Check : main;
}

function FaqPage() {
    const {dataStore} = useContext(AppWideContext);

    // NavBar Controls
    const [navControl, setNavControl] = useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    React.useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => window.removeEventListener('scroll', controller)
    }, []);

    const category = "faq";

    const faqData = require("../../../store/faqData.json");

    const showFaq = () => {
        let showFaqData = null;
        faqData.forEach(ele => {
            let answersData = null;
            ele.answers.forEach(answer => {
                answersData = (
                    <>
                        {answersData}
                        <FAQItemAnswer item={answer}/>
                    </>
                );
            });
            showFaqData = (
                <>
                    {showFaqData}
                    <Accordion style={`text-h6 font-500 uppercase`} title={ele.question}>
                        {answersData}
                    </Accordion>
                </>
            );
        });
        return showFaqData;
    }

    const mobileView = null;
    const browserView = showFaq()
    return (
        <Fragment>
            <PageHead url="/salt/faq" id="faq" isMobile={dataStore.mobile}/>
            <div className={"navigator fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white/90' : ' bg-white/80']}>
                <InfoBand/>
                <LooksNavbar isMobile={dataStore.mobile}/>
            </div>
            <CategoryHeaderImage category={category}/>
            <section className="container my-20 grid grid-cols-2 gap-x-10 gap-y-5">
                {(dataStore.mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )
}


export default FaqPage;
