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
import {isMobile} from "react-device-detect";
import GroupDesignHeader from "../../../components/group/GroupDesignHeader";
import Loader from "../../../components/common/Loader";
import {connect} from "react-redux";

/**
 * @TODO FORM SUBMISSION LOGIC
 * @returns {JSX.Element}
 * @constructor
 */

function GroupDesignPage({appConfig}) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    // we are dealing with design here.
    const router = useRouter();
    const resp = useApiCall("getPreferencesData", appConfig.apiToken);
    const [callData,setCallData] = useState(null)
    const [data, setData] = useState(null);
    const [visibleData, setVisibleData] = useState([]);
    const [mobile, setMobile] = useState(false)

    React.useEffect(() => {
        setMobile(isMobile)
    }, [])

    const query = router.query;
    let design = query.groupdesign;
    let img = ""

    useEffect(() => {
        if (design && data==null) {
            apiCall("getProducts", appConfig.apiToken,
                {category: query.groupdesign, limit: 10000, skip: 0}
            ).then(response => {
                if (response.status === 200) {
                    setCallData(response)
                    const vData = response.response.data.filter(item => item.is_visible)
                    setData(vData)
                    setVisibleData(vData)
                } else
                    setData([])
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

    const mobileView = data
        ? <Fragment>
            {img &&
            <img
                src={WEBASSETS + img}
                alt={design}
            />}
            <CategoryHeaderMobile group={true} category={design} groups={resp ? resp.response : []}/>
            {data.map((item, index) => <ProductCard prod={item} key={index} isMobile={true} wide={true}/>)}
        </Fragment>
        : null

    const browserView = data
        ? <Fragment>
            <GroupDesignHeader category={design}  />
            {data.map((item, index) => <main className={`grid grid-cols-3 gap-5 container pb-20`} key={index}>
                {visibleData && visibleData.map((prod, index) => {
                    return <ProductCard prod={prod} key={index}
                                        isAccessory={false} isMobile={false} wide={true} />
                })}
            </main>)}
        </Fragment>
        : null



    return data==null
        ? <Loader />
        : <Fragment>
            <PageHead url="/salt/group" id="group" isMobile={mobile}/>
            <Header type={"shopMenu"} isMobile={mobile}/>
            <section className="container select-none bg-[#faf4f0]">
                {(mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={mobile}/>
        </Fragment>


}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(GroupDesignPage);
