import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";
function ShopTailoredPantsPage(props){
    return <ShopPage  category={"pants"} hpid={"shop-tailored-pants"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchShopData("pants")
        }
    }
}


export default ShopTailoredPantsPage
