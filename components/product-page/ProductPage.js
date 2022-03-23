import AppWideContext from "../../store/AppWideContext";
import {useContext, useEffect, useState} from "react";
import PageHead from "../PageHead";
import useApiCall from "../../hooks/useApiCall";

/**
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

function ProductPage(props){
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [data, setData] = useState(null);

    const resp = useApiCall("getProduct", dataStore.apiToken, {product_id:props.hpid});
    useEffect(() => {
        if (resp
            && resp.hasOwnProperty("status")
            && resp.status == 200
            && resp.hasOwnProperty("response")
            && resp.response.hasOwnProperty("data")
        )
            setData(resp.response);
    }, [resp]);


    const mobileView = null;
    const browserView = null;

    return <div>
        <PageHead url={"/" + props.hpid} id={props.hpid} isMobile={dataStore.mobile}/>
        Product Page
        {(props.isMobile) ? mobileView:browserView }
    </div>;
}
export default ProductPage;