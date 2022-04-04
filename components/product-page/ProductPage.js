import AppWideContext from "../../store/AppWideContext";
import React, {Fragment, useContext, useEffect, useState} from "react";
import PageHead from "../PageHead";
import Header from "../navbar/Header";
import DesktopView from "./desktop-view/DesktopView";
import {apiDictionary} from "../../helpers/apiDictionary";

/**
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

function ProductPage(props) {
    const {dataStore} = useContext(AppWideContext);
    const [data, setData] = useState(null);

    const [navControl, setNavControl] = React.useState(false);
    const controller = () => setNavControl(window.scrollY > window.innerHeight / 2);

    useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => {
            window.removeEventListener('scroll', controller)
        }
    }, [])

    useEffect(() => {
        fetchData();
    }, [props.hpid]);

    const fetchData = () =>{
        const callObject = apiDictionary("getProduct", dataStore.apiToken, {product_id: props.hpid});

        fetch(callObject.url, callObject.fetcher)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json && json.status === 200)
                    setData(json.response);
            })
    }


    const mobileView = null;

    if (data)
        return <div>
            <PageHead url={"/" + props.hpid} id={props.hpid} isMobile={dataStore.mobile}/>
            <Header type={navControl ? "minimal" : "shopMenu"}/>
            {(props.isMobile) ? mobileView : <DesktopView hpid={props.hpid} data={data}/>}
        </div>;
    else
        return <></>
}

export default ProductPage;