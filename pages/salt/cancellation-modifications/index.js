import {Fragment, useContext, useEffect, useState} from 'react';
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import InfoBand from "../../../components/info-band/InfoBand";
import LooksNavbar from "../../../components/navbar/LookNavbar";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import cancellationModificationsData from "../../../store/cancellationModificationsData.json";
import Image from "next/image";

/**
 * @todo @Sambhav pls do css
 * @returns {JSX.Element}
 * @constructor
 */

function CancellationModificationsPage() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);

    const [navControl, setNavControl] = useState(false);
    const controller = () => {
        if (window.scrollY > 0) {
            setNavControl(true);
        } else {
            setNavControl(false);
        }        ;
    };
    useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => {
            window.removeEventListener('scroll', controller)
        };
    }, []);
    const category = "Cancellation & Modifications";

    const showSR = (ssrData)=>{
        let showSRData = null;
        ssrData.forEach(ele=>{
            let answersData = null;
            ele.answers.forEach(answer=>{
                answersData = <Fragment>
                    {answersData}
                    <div>{answer.check}</div>
                    <div>{answer.para}</div>
                </Fragment>;
            });
            showSRData = <Fragment>
                {showSRData}
                <div>
                    <span>
                    <Image src={WEBASSETS + ele.icon} alt="question" width="100" height="100" />
                    </span>
                    {ele.question}
                </div>
                {answersData}
            </Fragment>;
        });
        return showSRData;
    }

    const mobileView = null;
    const browserView = <div>
        {showSR(cancellationModificationsData)}
    </div>;
    return (
        <Fragment>
            <PageHead url="/salt/cancellation-modifications" id="cancellationmodifications" isMobile={dataStore.mobile}/>
            <div
                className={"fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white/90' : ' bg-white/80']}>
                <InfoBand/>
                <LooksNavbar isMobile={dataStore.mobile}/>
            </div>
            <CategoryHeaderImage category={category}/>
            {(dataStore.mobile) ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )
}


export default CancellationModificationsPage;
