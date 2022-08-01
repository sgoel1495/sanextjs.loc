import React, {Fragment, useContext, useEffect, useState} from "react";
import PageHead from "../../../../components/PageHead";
import Header from "../../../../components/navbar/Header";
import Footer from "../../../../components/footer/Footer";
import AppWideContext from "../../../../store/AppWideContext";
import StylingServices from "../../../../components/blog/StylingServices";
import FreeAlterations from "../../../../components/blog/FreeAlterations";
import PremiumFabricQuality from "../../../../components/blog/PremiumFabricQuality";
import NoInventoryNoMassProduction from "../../../../components/blog/NoInventoryNoMassProduction";
import EthicalFairTreatment from "../../../../components/blog/EthicalFairTreatment";
import Link from "next/link";
import WhyCustomTailoredClothing from "../../../../components/blog/WhyCustomTailoredClothing";

function BlogNoInventoryNoMassProductionPage(){
    const {dataStore} = useContext(AppWideContext);


    const mobileView =  (
        <section className={`container`}>
              <Link  href="/blog/about-salt" passHref>
                   <p className=' uppercase font-bold underline mt-28'> Back</p>
                </Link>
            <div className="col-span-3">
                <NoInventoryNoMassProduction isMobile={true} main={true}/>
                <WhyCustomTailoredClothing isMobile={true} main={false}/>
                <StylingServices isMobile={true} main={false}/>
                <FreeAlterations isMobile={true} main={false}/>
                <PremiumFabricQuality isMobile={true} main={false}/>
                <EthicalFairTreatment isMobile={true} main={false}/>
            </div>
        </section>
    );
    const browserView = (
        <section className={`container grid grid-cols-5`}>
            <div className={`col-span-1 flex flex-col justify-center h-screen sticky top-0 font-cursive`}>
                <Link href="/blog/about-salt">
                    <a className="font-700 text-xl">About Salt</a>
                </Link>
                <p className={`tracking-wide`}>Our Values</p>
            </div>
            <div className="col-span-3 mt-28">
                <NoInventoryNoMassProduction isMobile={false} main={true}/>
                <WhyCustomTailoredClothing isMobile={false} main={false}/>
                <StylingServices isMobile={false} main={false}/>
                <FreeAlterations isMobile={false} main={false}/>
                <PremiumFabricQuality isMobile={false} main={false}/>
                <EthicalFairTreatment isMobile={false} main={false}/>
            </div>
        </section>
    );

    return (
        <Fragment>
            <PageHead url="/blog/about-salt/no-inventory-no-mass-production" id="no-inventory-no-mass-production" isMobile={dataStore.mobile}/>
                <Header type={dataStore.mobile?"minimal":""} isMobile={dataStore.mobile}/>
            {(dataStore.mobile) ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>);

}

export default BlogNoInventoryNoMassProductionPage;
