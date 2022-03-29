import React, {useContext, useState} from 'react';
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import Accordion from "../../../components/common/accordion";
import LinkParser from "../../../components/common/LinkParser";
import faqData from "../../../store/faqData.json";
import NavBar from "../../../components/navbar";

/**
 * @todo Pincode check
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

function FaqPage() {
    const {dataStore} = useContext(AppWideContext);

    const category = "FAQ";

    const showFaq = (col) => {
        let showFaqData = null;
        faqData.forEach(ele => {
            if (col === "left" && ele.id < 19 || col === "right" && ele.id > 18 || col === "all") {
                let answersData = null;
                ele.answers.forEach(answer => {
                    answersData = (
                        <>
                            {answersData}
                            <AnswerBlock item={answer}/>
                        </>
                    );
                });
                showFaqData = (
                    <>
                        {showFaqData}
                        <Accordion
                            title={ele.question}
                            titleStyle={"bg-black/10 py-7 px-6"}
                            titleTextStyle={`text-[#777] text-sm font-500 uppercase`}
                            bodyStyle={"bg-black/5"}
                        >
                            <div className="px-6 py-4">
                                {answersData}
                            </div>
                        </Accordion>
                    </>
                );
            }
        });
        return showFaqData;
    }

    const mobileView = null;
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
            <PageHead url="/salt/faq" id="faq" isMobile={dataStore.mobile}/>
            <NavBar type={"mimoto"}/>
            <CategoryHeaderImage category={category}/>
            <section >
                {(dataStore.mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={dataStore.mobile}/>
        </>
    )
}


export default FaqPage;
