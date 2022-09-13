import {useRouter} from "next/router";
import React, {Fragment, useCallback, useEffect, useState} from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import ProductPage from "../../components/product-page/ProductPage";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import Loader from "../../components/common/Loader";
import fetchMimotoData from "../../components/mimoto-page/fetchMimotoData";
import AppLoading from "../../components/common/AppLoading";
import fetchShopData from "../../components/shop-page/fetchShopData";
import {apiDictionary} from "../../helpers/apiDictionary";
import {connect} from "react-redux";

function PageById(props) {
    const router = useRouter();
    const query = router.query;
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const idParts = query.pageid.split("-")

    const fetchData = useCallback(() => {
        const callObject = apiDictionary("getProduct", props.appConfig.apiToken, {product_id: idParts[1]});
        fetch(callObject.url, callObject.fetcher)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json && json.status === 200)
                    setData(json.response);
            })
    }, [props.appConfig.apiToken, router.query])

    React.useEffect(() => {
        setLoading(true)
        switch (idParts[0]) {
            case "shop":
                fetchShopData(idParts[1]).then((resp) => {
                    setData(resp)
                }).finally(() => {
                    setLoading(false)
                })
                break
            case "mimoto":
                fetchMimotoData(idParts[1]).then((resp) => {
                    setData(resp)
                }).finally(() => {
                    setLoading(false)
                })
                break
            default:
                fetchData();
        }
    }, [router.query])

    const whereToGo = () => {
        if (!router || !query || !query.pageid)
            return <AppLoading/>
        switch (idParts[0]) {
            case "shop":
                return <ShopPage category={idParts[1]} hpid={query.pageid}/>
            case "mimoto":
                return <MimotoPage category={idParts[1]} hpid={query.pageid} data={data}/>
            default:
                return <ProductPage hpid={query.pageid} data={data}/>
        }
    }

    return loading ? <AppLoading/> : whereToGo()
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(PageById);
