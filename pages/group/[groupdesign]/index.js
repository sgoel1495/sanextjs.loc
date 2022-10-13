import React, {Fragment, useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderMobile from "../../../components/shop-page/CategoryHeaderMobile";
import useApiCall from "../../../hooks/useApiCall";
import {apiCall} from "../../../helpers/apiCall";
import ProductCard from "../../../components/shop-page/ProductCard";
import GroupDesignHeader from "../../../components/group/GroupDesignHeader";
import {connect} from "react-redux";
import AppLoading from "../../../components/common/AppLoading";
import Loader from "../../../components/common/Loader";
import GroupProductCard from "../../../components/group/GroupProductCard";

/**
 * @TODO FORM SUBMISSION LOGIC
 * @returns {JSX.Element}
 * @constructor
 */

function GroupDesignPage({appConfig}) {
    const loaderRef = React.useRef()
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    // we are dealing with design here.
    const router = useRouter();
    const resp = useApiCall("getPreferencesData", appConfig.apiToken);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(Number.MAX_SAFE_INTEGER)
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState({
        category: router.query.groupdesign,
        skip: 0,
        limit: 18,
    })



    let design = router.query.groupdesign;
    let img = ""


    const fetchData = useCallback((io) => {
        if (total <= page * 18 || query.category===undefined) {
            return
        }
        if (io) {
            if (!io.isIntersecting) {
                return;
            }
        }
        if (loading) {
            return;
        }
        setLoading(true);
        apiCall("getProducts", appConfig.apiToken, {...query, skip: page * 18})
            .then(resp => {
                if (resp.response && resp.response.data) {
                    setData([...data, ...resp.response.data.filter(item => item.is_visible)])
                    setQuery({...query, skip: page * 18})
                    setPage(page + 1)
                    setTotal(resp.response.total_products_exist)
                }
            })
            .catch(e => console.log(e.message))
            .finally(() => {
                setLoading(false)
            })
    }, [data, loading, page, query, total])

    useEffect(() => {
        const observer = new IntersectionObserver((io) => fetchData(io[0]), {
            root: null,
            rootMargin: "0px",
            threshold: 0.1
        });
        if (loaderRef && loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        return () => {
            if (loaderRef && loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [loaderRef, fetchData]);

    useEffect(() => {
        setQuery({
            category: router.query.groupdesign,
            skip: 0,
            limit: 18,
        })
    }, [router.query])


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
            {
                data.map((item, index) => <ProductCard prod={item} key={index} isMobile={true} wide={true}/>)
            }
            {
                total <= page * 18 || <div className={"flex justify-center col-span-3"} ref={loaderRef}>
                    <Loader/>
                </div>
            }
        </Fragment>
        : null
    console.log(data[0])
    const browserView = data
        ? <Fragment>
            <GroupDesignHeader category={design}/>
            <main className={`grid grid-cols-3 gap-14 container pb-20`}>
                {
                    data.map((item, index) => <GroupProductCard prod={item} key={index} portrait={true}
                                                           isAccessory={false} isMobile={false}/>
                    )
                }
                {
                    total <= page * 18 || <div className={"flex justify-center col-span-3"} ref={loaderRef}>
                        <Loader/>
                    </div>
                }
            </main>
        </Fragment>
        : null


    return data == null
        ? <AppLoading/>
        : <Fragment>
            <PageHead url="/salt/group" id="group" isMobile={appConfig.isMobile}/>
            <Header type={"shopMenu"} isMobile={appConfig.isMobile}/>
            <section className="select-none bg-[#faf4f0]">
                {(appConfig.isMobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={appConfig.isMobile}/>
        </Fragment>


}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(GroupDesignPage);
