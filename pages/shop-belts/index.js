import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";
function ShopTopsPage(props){
    return <ShopPage  category={"belts"} hpid={"shop-belts"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchShopData("belts")
        }
    }
}


export default ShopTopsPage
