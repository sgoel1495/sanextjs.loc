import React, {Fragment, useEffect, useState} from "react";
import PageHead from "../../../components/PageHead";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/navbar/Header";
import {isMobile} from "react-device-detect";
import UserLogin from "../../../components/user/login/UserLogin";
import {useRouter} from "next/router";
import {connect} from "react-redux";

function HomepageSignInPage({userData}) {

    const [mobile, setMobile] = useState(false)
    const router = useRouter();

    useEffect(() => {
        if (userData.userServe.email) {
            router.push("/")
        }
        setMobile(isMobile)
    }, [])

    const mobileView = <UserLogin isMobile={true} inBody={true} closeModal={router.back}/>;

    const browserView = <></>;

    return (
        <Fragment>
            <PageHead
                url="/homepage/signin"
                id="signin"
                isMobile={mobile}
            />
            <Header
                type={mobile ? "minimal" : "shopMenu"}
                isMobile={mobile}
            />
            {mobile ? mobileView : browserView}
            <Footer isMobile={mobile} minimal={true} color={"#f5f5f5"}/>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData
    }
}

export default connect(mapStateToProps)(HomepageSignInPage);
