import AppWideContext from "../../store/AppWideContext";
import React, {useContext, useEffect, useState} from "react";
import PageHead from "../PageHead";
import useApiCall from "../../hooks/useApiCall";
import Header from "../navbar/Header";
import DesktopView from "./desktop-view/DesktopView";

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

    const resp = useApiCall("getProduct", dataStore.apiToken, {product_id: props.hpid});
    useEffect(() => {
        if (resp
            && resp.hasOwnProperty("status")
            && resp.status === 200
            && resp.hasOwnProperty("response")
        )
            setData(resp.response);
    }, [resp]);



    console.log(resp)
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