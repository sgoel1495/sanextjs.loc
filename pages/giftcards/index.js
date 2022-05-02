import React, {Fragment, useContext, useEffect, useState} from "react";
import PageHead from "../../components/PageHead";
import Header from "../../components/navbar/Header";
import Footer from "../../components/footer/Footer";
import AppWideContext from "../../store/AppWideContext";
import appSettings from "../../store/appSettings";
import useApiCall from "../../hooks/useApiCall";
import Image from "next/image";
import NewArrivalsBlock from "../../components/giftcards/NewArrivalsBlock";
import OurSaleSection from "../../components/giftcards/OurSaleSection";
import WishListButton from "../../components/common/WishListButton";
import BlockHeader from "../../components/common/blockHeader";


const ImageBlock = (props) => (
    <span className={`block relative w-full aspect-square`}>
        <Image src={props.src} alt={props.name} layout={`fill`} objectFit={`cover`}/>
    </span>
)

function GiftcardsPage() {
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

    const showGiftCards = () => {
        let sgc = null;
        if (data)
            data.forEach(card => {
                if (card.is_visible && card.category === "giftcards")
                    sgc = (
                        <>
                            {sgc}
                            <div className={"block bg-white text-center relative z-0 group"}>
                                <WishListButton className={`absolute right-4 top-4 z-10`} pid={card.asset_id}/>
                                <ImageBlock src={WEBASSETS + card.look_thumb} alt={card.display_name}/>
                                <div className="flex items-center justify-center h-16 relative">
                                    <p className={`font-cursive text-2xl`}>{card.display_name}</p>
                                    <div className="hidden group-hover:grid place-items-center content-center absolute inset-0 bg-black text-white">
                                        <p className={`font-600 text-white/50`}>ADD TO BAG</p>
                                        <p className={`text-xs font-600`}>{currencySymbol}{(currCurrency === "inr") ? card.price : card.usd_price}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
            });
        return sgc;
    }

    const mobileView = null;
    const browserView = (
        <>
            <section className={`container my-20`}>
                <BlockHeader
                    line
                    space={"py-12"}
                    titleStyle={"font-600 font-cursive flex justify-center items-center gap-3 leading-none"}
                >
                    <span className={"tracking-widest text-h4 uppercase"}>SALT GIFT CARDS</span>
                </BlockHeader>
                <div className="grid grid-cols-3 gap-12">
                    {showGiftCards()}
                </div>
            </section>
            <section className={`bg-[#F6F9FB] py-20 text-center relative my-20`} title={`Code Redeem`}>
                <div className="h-8 w-24 mx-auto absolute top-0 inset-x-0 -translate-y-1/2">
                    <Image src={WEBASSETS + "/assets/images/SALT_logo.png"} alt="salt logo" layout={`fill`} objectFit={`contain`} />
                </div>
                <form className={`container flex flex-col gap-y-5 items-center font-cursive`}>
                    <div>
                        <p className={`text-h1`}>Have a gift card?</p>
                        <p>Check your balance</p>
                    </div>
                    <input
                        className={`block w-1/3 text-center border-0 border-b-2 border-black focus:border-black bg-transparent focus:ring-offset-0 focus:ring-0`}
                        type="text" maxLength="50" name="gc_number" placeholder="Enter gift card code" id="gc_number"
                    />
                    <div>
                        <p>Your Balance - <span id="gift_amount"/></p>
                        <p>This code is already redeemed</p>
                    </div>
                    <button type="button" className={`bg-black text-white pt-3 pb-2 px-10 text-sm`}>CHECK BALANCE</button>
                </form>
            </section>
            <NewArrivalsBlock isMobile={dataStore.mobile} currencySymbol={currencySymbol} currCurrency={currCurrency} apiToken={dataStore.apiToken}/>
            <OurSaleSection isMobile={dataStore.mobile} currencySymbol={currencySymbol} currCurrency={currCurrency} apiToken={dataStore.apiToken}/>
        </>
    );

    return (
        <Fragment>
            <PageHead url="/" id="home" isMobile={dataStore.mobile}/>
                <Header type={dataStore.mobile?"minimal":""} isMobile={dataStore.mobile}/>
            {(dataStore.mobile) ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    );

}

export default GiftcardsPage;
