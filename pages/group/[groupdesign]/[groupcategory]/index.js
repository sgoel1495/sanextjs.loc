import React, {Fragment, useContext} from "react";
import {useRouter} from "next/router";
import AppWideContext from "../../../../store/AppWideContext";
import PageHead from "../../../../components/PageHead";
import Header from "../../../../components/navbar/Header";
import CategoryHeaderImage from "../../../../components/common/CategoryHeaderImage";
import Footer from "../../../../components/footer/Footer";

/**
 * @TODO FORM SUBMISSION LOGIC
 * @returns {JSX.Element}
 * @constructor
 */

function GroupCategoryPage() {
    // we are dealing with color and cateogry
    const {dataStore} = useContext(AppWideContext);
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

export default GroupCategoryPage;
