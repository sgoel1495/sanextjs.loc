import React, {Fragment, useContext, useState} from 'react';
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import InfoBand from "../../../components/info-band/InfoBand";
import LooksNavbar from "../../../components/navbar/LookNavbar";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import cancellationModificationsData from "../../../store/cancellationModificationsData.json";
import Image from "next/image";
import LinkParser from "../../../components/common/LinkParser";
import Accordion from "../../../components/common/accordion";

/**
 * @todo @Sambhav pls do css
 * @returns {JSX.Element}
 * @constructor
 */

const AnswerBlock = ({item}) => {
    const main = (
        <div className={`${item.check ? 'flex-1' : null}`}>
            <LinkParser para={item.para} />
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

function CancellationModificationsPage() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);

    // NavBar Controls
    const [navControl, setNavControl] = useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    React.useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => window.removeEventListener('scroll', controller)
    }, []);

    const category = "Cancellation & Modifications";

    const showSR = (ssrData)=>{
        let showSRData = null;
        ssrData.forEach(ele=>{
            let answersData = null;
            ele.answers.forEach(answer=>{
                answersData = (
                    <>
                        {answersData}
                        <AnswerBlock item={answer}/>
                    </>
                );
            });
            showSRData = <Fragment>
                {showSRData}
                <Accordion
                    title={ele.question}
                    titleIcon={<Image src={WEBASSETS + ele.icon} alt="question" layout={`fill`} objectFit={`cover`}/>}
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
        return (
            <div className={'w-3/4 mx-auto my-20 grid grid-cols-2 gap-x-20'}>
                {showSRData}
            </div>
        );
    }

    const mobileView = null;
    const browserView = showSR(cancellationModificationsData);
    return (
        <Fragment>
            <PageHead url="/salt/cancellation-modifications" id="cancellationmodifications" isMobile={dataStore.mobile}/>
            <div className={"fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white/90' : ' bg-white/80']}>
                <InfoBand/>
                <LooksNavbar isMobile={dataStore.mobile}/>
            </div>
            <CategoryHeaderImage category={category}/>
            <section>
                {(dataStore.mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )
}


export default CancellationModificationsPage;
