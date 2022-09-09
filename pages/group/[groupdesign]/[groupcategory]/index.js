import React, {Fragment} from "react";
import {useRouter} from "next/router";
import PageHead from "../../../../components/PageHead";
import Header from "../../../../components/navbar/Header";
import CategoryHeaderImage from "../../../../components/common/CategoryHeaderImage";
import Footer from "../../../../components/footer/Footer";
import {connect} from "react-redux";

/**
 * @TODO FORM SUBMISSION LOGIC
 * @returns {JSX.Element}
 * @constructor
 */

function GroupCategoryPage({appConfig}) {
    // we are dealing with color and cateogry
    const router = useRouter();
    const query = router.query;
    const design = query.groupdesign;
    const category = query.groupcategory;

    const mobileView = <Fragment>
        Color {design} Category {category}
    </Fragment>;
    const browserView = <Fragment>
        Color {design} Category {category}
    </Fragment>;;


    return (
        <Fragment>
            <PageHead url="/salt/group" id="group" isMobile={appConfig.isMobile}/>
            <Header type={appConfig.isMobile?"minimal":"shopMenu"} isMobile={appConfig.isMobile}/>
            <CategoryHeaderImage category={design}/>
            <section className="container my-20 select-none">
                {(appConfig.isMobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={appConfig.isMobile}/>
        </Fragment>
    )


}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(GroupCategoryPage);
