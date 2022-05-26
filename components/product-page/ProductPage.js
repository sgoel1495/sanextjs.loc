import AppWideContext from "../../store/AppWideContext";
import React, { Fragment, useContext, useEffect, useState, useCallback } from "react";
import PageHead from "../PageHead";
import Header from "../navbar/Header";
import DesktopView from "./desktop-view/DesktopView";
import { apiDictionary } from "../../helpers/apiDictionary";
import MobileView from "./mobile-view/MobileView";

/**
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

function ProductPage(props) {
    const { dataStore } = useContext(AppWideContext);
    const [data, setData] = useState(null);

    const [navControl, setNavControl] = React.useState(false);
    const controller = useCallback(() => {
        const isSet = (window.scrollY > 0)
        if(isSet!==navControl)
            setNavControl(isSet)
    },[navControl])
    React.useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => {
            window.removeEventListener('scroll', controller)
        };
    }, [controller]);

    const fetchData = useCallback(() => {
        const callObject = apiDictionary("getProduct", dataStore.apiToken, { product_id: props.hpid });

        fetch(callObject.url, callObject.fetcher)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json && json.status === 200)
                    setData(json.response);
            })
    }, [dataStore.apiToken, props.hpid])


    useEffect(() => {
        fetchData();
    }, [fetchData, props.hpid]);


    console.log(data)

    if (data)
        return <div>
            <PageHead url={"/" + props.hpid} id={props.hpid} isMobile={dataStore.mobile} />
            <Header type={!dataStore.mobile && navControl ? "minimal" : "shopMenu"} isMobile={dataStore.mobile} />
            {(props.isMobile) ? <MobileView hpid={props.hpid} data={data} /> : <DesktopView hpid={props.hpid} data={data} />}
        </div>;
    else
        return <></>
}

export default ProductPage;