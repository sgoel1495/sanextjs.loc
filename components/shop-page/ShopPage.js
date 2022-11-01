/**
 *
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */


import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {connect} from "react-redux";
import {applyFilters, setFilterCheckbox, setSortBy} from "../../ReduxStore/reducers/filterSlice";
import BrowserView from "./BrowserView";
import MobileView from "./MobileView";
import {fetchQueryData} from "./fetchShopData";
import {apiCall} from "../../helpers/apiCall";


function ShopPage(props) {
    const loaderRef = React.useRef()
    const router = useRouter();
    const [route, setRoute] = useState("")
    //all paths start with shop-
    const {category, hpid, appConfig} = props
    const [data,setData] = useState(props.data)
    const [loading, setLoading] = useState(false)

    const [query, setQuery] = useState({
        category: props.category.replace("tailored-", ""),
        skip: 0,
        limit: 18,
        filter_by: {}
    })
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(data.total_products_exist)
    const [visibleData, setVisibleData] = useState(data.data.filter(item => item.is_visible))

    const fetchData = useCallback((io) => {
        if (total <= page * 18) {
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
        apiCall("getProducts", props.appConfig.apiToken, {...query, skip: page * 18})
            .then(resp => {
                if (resp.response && resp.response.data) {
                    setVisibleData([...visibleData, ...resp.response.data.filter(item => item.is_visible)])
                    setData(resp.response)
                    setQuery({...query, skip: page * 18})
                    setPage(page + 1)
                }
            })
            .catch(e => console.log(e.message))
            .finally(() => {
                setLoading(false)
            })
    }, [visibleData, loading, page, query, total])

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
        if (route) {
            fetchQueryData(props, data, setLoading, query, setQuery, setVisibleData, setTotal, setPage,setData)
        }
    }, [props.refreshFilter])

    React.useEffect(() => {
        if (router.route !== route) {
            if (router.query.sorted_by) {
                props.setSortBy(router.query.sorted_by)
            } else {
                props.setSortBy("")
            }
            props.setFilterCheckbox({})
            setTimeout(() => {
                setRoute(router.route)
                props.applyFilters()
            }, 100)

        }
    }, [router.route])

    React.useEffect(()=>{
        console.log(data)
    },[data])

    React.useEffect(() => {
        if (router.query.sorted_by) {
            props.setSortBy(router.query.sorted_by)
        }
    }, [router.query])


    /**
     * @todo API - Please tell the api which gives the tagline for categories << HArdcoded
     *
     * @type {string}
     */

    return appConfig.isMobile ? <MobileView hpid={hpid} category={category} visibleData={visibleData} data={data} ref={loaderRef} skip={page * 18} total={total}/> :
        <BrowserView hpid={hpid} category={category} visibleData={visibleData} data={data} ref={loaderRef} skip={page * 18} total={total}/>
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig,
        refreshFilter: state.filters.refreshFilter,
        filterCheckboxes: state.filters.filterCheckboxes,
        sortBy: state.filters.sortBy
    }
}

export default connect(mapStateToProps, {setFilterCheckbox, setSortBy, applyFilters})(ShopPage);
