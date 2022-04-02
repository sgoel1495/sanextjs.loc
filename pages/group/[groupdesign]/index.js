import React, {Fragment, useContext} from "react";
import {useRouter} from "next/router";
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import Footer from "../../../components/footer/Footer";

/**
 * @TODO FORM SUBMISSION LOGIC
 * @returns {JSX.Element}
 * @constructor
 */

function GroupDesign() {
    // we are dealing with design here.
    const {dataStore} = useContext(AppWideContext);
    const router = useRouter();
    const query = router.query;
    const design = query.groupdesign;

    const mobileView = <Fragment>
        {design}
    </Fragment>;
    const browserView = <Fragment>
        {design}
    </Fragment>;;


    return (
        <Fragment>
            <PageHead url="/salt/group" id="group" isMobile={dataStore.mobile}/>
            <Header type={dataStore.mobile?"minimal":"shopMenu"} isMobile={dataStore.mobile}/>
            <CategoryHeaderImage category={design}/>
            <section className="container my-20 select-none">
                {(dataStore.mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )


}

export default GroupDesign;
