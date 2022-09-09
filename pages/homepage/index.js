import React, {Fragment} from "react";
import PageHead from "../../components/PageHead";
import Footer from "../../components/footer/Footer";
import Header from "../../components/navbar/Header";
import {connect} from "react-redux";

function HomePage({appConfig}) {
    const mobileView = (<> </>);
    const browserView = (<></>);

    return (
        <Fragment>
            <PageHead
                url="/homepage/"
                id="homepage"
                isMobile={appConfig.isMobile}
            />
            <Header
                type={appConfig.isMobile ? "minimal" : "shopMenu"}
                isMobile={appConfig.isMobile}
            />
            {appConfig.isMobile ? mobileView : browserView}
            <Footer isMobile={appConfig.isMobile} minimal={true} color={"#f5f5f5"}/>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(HomePage);
