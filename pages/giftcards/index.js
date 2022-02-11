import React, {Fragment, useContext, useEffect, useState} from "react";
import PageHead from "../../components/PageHead";
import InfoBand from "../../components/info-band/InfoBand";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import AppWideContext from "../../store/AppWideContext";
import appSettings from "../../store/appSettings";
import useApiCall from "../../hooks/useApiCall";
import Image from "next/image";
import NewArrivalsBlock from "../../components/giftcards/NewArrivalsBlock";
import OurSaleSection from "../../components/giftcards/OurSaleSection";

/**
 * @todo API not available - we get more than 3 cards / does not tally with website
 * @todo @Sambhav css pls
 */

function GiftcardsPage(){
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;

    const [data, setData] = useState(null);
    const resp = useApiCall("giftcards", dataStore.apiToken);
    useEffect(() => {
        if (resp
            && resp.hasOwnProperty("msg")
            && resp.msg == "found"
            && resp.hasOwnProperty("giftcards")
        )
            setData(resp.giftcards);
    }, [resp]);

    console.log("GIFT CARD DATA", data);

    // Nav Controller
    const [navControl, setNavControl] = React.useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    React.useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => window.removeEventListener('scroll', controller)
    }, []);

    const showGiftCards = ()=>{
        let sgc = null;
        if(data)
            data.forEach(card=>{
                if(card.is_visible && card.category=="giftcards")
                    sgc = <Fragment>
                        {sgc}
                        <div>
                            <Image src={WEBASSETS + card.look_thumb} alt={card.display_name} width="300" height="300" />
                            <div>
                                <div>{card.display_name}</div>
                                <div>ADD TO BAG</div>
                                <div>{currencySymbol}{(currCurrency=="inr")?card.price:card.usd_price}</div>
                            </div>
                        </div>
                    </Fragment>;
            });

        return sgc;
    }

    const mobileView = null;
    const browserView = <div>
        <div>
            {showGiftCards()}
        </div>
        <div>
            <Image src={WEBASSETS + "/assets/images/SALT_logo.png"} alt="salt logo" width="100" height="100" />
        </div>
        <div>
            <h4>Have a gift card?</h4>
            <p>Check your balance</p>
            <form>
                <div>
                        <input type="text" maxLength="50" name="gc_number" placeholder="Enter gift card code"
                               id="gc_number" />
                </div>
                <div>
                    <p>Your Balance - <span id="gift_amount"></span></p>
                </div>
                <div>
                    <p>This code is already redeemed</p>
                </div>
                <button type="button">CHECK BALANCE</button>
            </form>
        </div>
        <NewArrivalsBlock isMobile={dataStore.mobile} currencySymbol={currencySymbol} currCurrency={currCurrency} apiToken={dataStore.apiToken} />
        <OurSaleSection isMobile={dataStore.mobile} currencySymbol={currencySymbol} currCurrency={currCurrency} apiToken={dataStore.apiToken} />
    </div>;

    return (
        <Fragment>
            <PageHead url="/" id="home" isMobile={dataStore.mobile}/>
            <div className={"navigator fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white' : ' bg-white/60']}>
                <InfoBand/>
                <Navbar isMobile={dataStore.mobile}/>
            </div>
            {(dataStore.mobile) ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    );

}

export default GiftcardsPage;
