import React from 'react';
import PageHead from "../../../../components/PageHead";
import Header from "../../../../components/navbar/Header";
import {connect} from "react-redux";
import Footer from "../../../../components/footer/Footer";
import Link from "next/link";

const Index = ({isMobile}) => {

    const browserView = <section className={"mt-24 container flex justify-content-center"}>
        <div className={"w-7/12"}>
            <Link href={"/blog"}>
                <a className={"underline font-600 mx-4"}>BACK</a>
            </Link>
            <div className={"text-4xl font-cursive text-center mx-8 capitalize mt-8"}>
                Ace waist-up dressing while you Work from home
            </div>
        </div>
    </section>

    const mobileView = <section className={"mt-24 container"}>
        <Link href={"/blog"}>
            <a className={"underline font-600 mx-4"}>BACK</a>
        </Link>
        <div className={"text-3xl font-cursive text-center mx-8 capitalize mt-8"}>
            Ace waist-up dressing while you Work from home
        </div>
    </section>

    return (
        <>
            <PageHead url="/bolg/ace-waist-up/ace-waist-up" id="ace-waist-up" isMobile={isMobile}/>
            <Header type={isMobile ? "minimal" : ""} isMobile={isMobile}/>
            {isMobile ? mobileView : browserView}
            {
                isMobile && <Footer isMobile={true}/>
            }
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isMobile: state.appConfig.isMobile
    }
}

export default connect(mapStateToProps)(Index);