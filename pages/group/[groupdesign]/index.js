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
import Image from "next/image";
import {isMobile} from "react-device-detect";

/**
 * @TODO FORM SUBMISSION LOGIC
 * @returns {JSX.Element}
 * @constructor
 */

function GroupDesignPage() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    // we are dealing with design here.
    const {dataStore} = useContext(AppWideContext);
    const router = useRouter();
    const resp = useApiCall("getPreferencesData", dataStore.apiToken);
    const [data, setData] = useState([]);
    const [mobile, setMobile] = useState(false)

    React.useEffect(() => {
        setMobile(isMobile)
    }, [])

    const query = router.query;
    let design = query.groupdesign;
    let img = ""

    useEffect(() => {
        if (design) {
            apiCall("getProducts", dataStore.apiToken,
                {category: query.groupdesign, limit: 10000, skip: 0}
            ).then(resp => {
                if (resp.status === 200) {
                    setData(resp.response.data.filter(item => item.is_visible));
                }
            })
        }
    }, [design])

    if (resp) {
        let group = resp.response.find(item => item.home_url.includes(design))
        if (group !== undefined) {
            design = group.display_name;
            img = group.home_mob_img
        }
    }

    const mobileView = <Fragment>
        {img &&
        <img
            src={WEBASSETS + img}
            alt={design}
        />}
        <CategoryHeaderMobile group={true} category={design} groups={resp ? resp.response : []}/>
        {data.map((item, index) => <ProductCard prod={item} key={index} isMobile={true} wide={true}/>)}
    </Fragment>;
    const browserView = <Fragment>
        {design}
    </Fragment>;


    return (
        <Fragment>
            <PageHead url="/salt/group" id="group" isMobile={mobile}/>
            <Header type={"shopMenu"} isMobile={mobile}/>
            <section className="container select-none bg-[#faf4f0]">
                {(mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={mobile}/>
        </Fragment>
    )


}

export default GroupDesignPage;
