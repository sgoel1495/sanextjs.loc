import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import {apiCall} from "../../helpers/apiCall";
function ShopTailoredSkirtsPage(props){
    return <ShopPage  category={"skirts"} hpid={"shop-tailored-skirts"} data={props.data}/>
}

export async function getStaticProps() {
    const fetchData = async () => {
        let gotData = false;
        const callObject = await apiCall("getProducts", process.env.API_TOKEN,
            {category: "skirts",limit: 10000,skip: 0}
        )
        if (callObject.hasOwnProperty("response") && callObject.response.hasOwnProperty("data")) {
            if (callObject
                && callObject.response
                && callObject.response.data
            )
                gotData = true;
        }
        return (gotData) ? callObject.response : null
    }

    const data = await fetchData()
    return {
        props: {
            data:data
        }
    }
}

export default ShopTailoredSkirtsPage
