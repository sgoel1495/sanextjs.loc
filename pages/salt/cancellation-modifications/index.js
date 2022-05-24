import React, { Fragment, useContext, useState } from 'react';
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import cancellationModificationsData from "../../../store/cancellationModificationsData.json";
import Image from "next/image";
import LinkParser from "../../../components/common/LinkParser";
import Accordion from "../../../components/common/accordion";
import Header from "../../../components/navbar/Header";

/**
 * @todo @Sambhav pls do css
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

function SaltCancellationModificationsPage() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext);

    const category = "Cancellation & Modifications";

    const showSR = (ssrData) => {
        let showSRData = null;
        ssrData.forEach(ele => {
            let answersData = null;
            ele.answers.forEach(answer => {
                answersData = (
                    <>
                        {answersData}
                        <AnswerBlock item={answer} />
                    </>
                );
            });
            showSRData = <Fragment>
                {showSRData}
                <Accordion
                    title={ele.question}
                    titleIcon={<Image src={WEBASSETS + ele.icon} alt="question" layout={`fill`} objectFit={`cover`} />}
                    titleStyle={"bg-black/10 py-4 px-6"}
                    titleTextStyle={`text-sm text-[#777] font-500 uppercase`}
                    bodyStyle={"bg-black/5"}
                >
                    <div className="px-6 py-4">
                        {answersData}
                    </div>
                </Accordion>
            </Fragment>;
        });
        return (dataStore.mobile
            ? <div className={'px-5 flex flex-col gap-y-2 mt-4 mb-44'}>
                <p className='text-center text-h2 leading-[1.25]'>Cancellation & Modifications</p>
                {showSRData}
            </div>
            : <div className={'w-3/4 mx-auto my-20 grid grid-cols-2 gap-x-20'}>
                {showSRData}
            </div>
        );
    }

    // const mobileView = null;
    const mobileView = showSR(cancellationModificationsData);
    const browserView = showSR(cancellationModificationsData);
    return (
        <Fragment>
            <PageHead url="/salt/cancellation-modifications" id="cancellationmodifications" isMobile={dataStore.mobile} />
            <Header type={dataStore.mobile ? "minimal" : "shopMenu"} isMobile={dataStore.mobile} />
            <CategoryHeaderImage category={category} />
            <section>
                {(dataStore.mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={dataStore.mobile} />
        </Fragment>
    )
}


export default SaltCancellationModificationsPage;
