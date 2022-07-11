import React, {Fragment, useContext, useEffect, useState} from "react";
import PageHead from "../../components/PageHead";
import Footer from "../../components/footer/Footer";
import AppWideContext from "../../store/AppWideContext";
import Header from "../../components/navbar/Header";

function HomePage() {
    const {dataStore} = useContext(AppWideContext);
    const category = "Contact Us";
    const mobileView = (<> </>);
    const browserView = (<></>);

    return (
        <Fragment>
            <PageHead
                url="/homepage/"
                id="homepage"
                isMobile={dataStore.mobile}
            />
            <Header
                type={dataStore.mobile ? "minimal" : "shopMenu"}
                isMobile={dataStore.mobile}
            />
            {dataStore.mobile ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile} minimal={true} color={"#f5f5f5"}/>
        </Fragment>
    );
}

export default HomePage;
