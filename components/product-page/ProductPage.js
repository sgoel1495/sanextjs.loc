import AppWideContext from "../../store/AppWideContext";
import React, { Fragment, useContext, useEffect, useState, useCallback } from "react";
import PageHead from "../PageHead";
import Header from "../navbar/Header";
import DesktopView from "./desktop-view/DesktopView";
import { apiDictionary } from "../../helpers/apiDictionary";
import MobileView from "./mobile-view/MobileView";
import useNavControl from "../../hooks/useNavControl";
import {connect} from "react-redux";

/**
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

function ProductPage(props) {
    const [data, setData] = useState(null);
    const navControl = useNavControl(0)

    const fetchData = useCallback(() => {
        const callObject = apiDictionary("getProduct", props.appConfig.apiToken, { product_id: props.hpid });

        fetch(callObject.url, callObject.fetcher)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json && json.status === 200)
                    setData(json.response);
            })
    }, [props.appConfig.apiToken, props.hpid])


    useEffect(() => {
        fetchData();
    }, [fetchData, props.hpid]);

    if (data)
        return <div>
            <PageHead url={"/" + props.hpid} id={props.hpid} isMobile={props.appConfig.isMobile} />
            <Header type={!props.appConfig.isMobile && navControl ? "minimal" : "shopMenu"} isMobile={props.appConfig.isMobile} />
            {(props.appConfig.isMobile) ? <MobileView hpid={props.hpid} data={data} /> : <DesktopView hpid={props.hpid} data={data} />}
        </div>;
    else
        return <></>
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(ProductPage);