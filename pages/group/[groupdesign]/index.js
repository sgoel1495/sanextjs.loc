import React, {Fragment, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderMobile from "../../../components/shop-page/CategoryHeaderMobile";
import useApiCall from "../../../hooks/useApiCall";
import {apiCall} from "../../../helpers/apiCall";
import ProductCard from "../../../components/shop-page/ProductCard";

/**
 * @TODO FORM SUBMISSION LOGIC
 * @returns {JSX.Element}
 * @constructor
 */

function GroupDesignPage() {
    // we are dealing with design here.
    const {dataStore} = useContext(AppWideContext);
    const router = useRouter();
    const query = router.query;
    const design = query.groupdesign;
    const [data, setData] = useState([]);
    useEffect(() => {
        if (design) {
            apiCall("getProducts", dataStore.apiToken,
                {category: design, limit: 10000, skip: 0}
            ).then(resp => {
                if (resp.status === 200) {
                    setData(resp.response.data.filter(item => item.is_visible));
                }
            })
        }
    }, [design])

    const mobileView = <Fragment>
        <CategoryHeaderMobile group={true} category={design && design.replace("-", " ")}/>
        {data.map((item, index) => <ProductCard prod={item} key={index} isMobile={true} wide={true}/>)}
    </Fragment>;
    const browserView = <Fragment>
        {design}
    </Fragment>;


    return (
        <Fragment>
            <PageHead url="/salt/group" id="group" isMobile={dataStore.mobile}/>
            <Header type={"shopMenu"} isMobile={dataStore.mobile}/>
            <section className="container select-none bg-[#faf4f0]">
                {(dataStore.mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>
    )


}

export default GroupDesignPage;
