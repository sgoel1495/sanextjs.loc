import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";
function ShopTopsPage(props){
    return <ShopPage  category={"tops"} hpid={"shop-tops"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchShopData("tops")
        }
    }
}

export default ShopTopsPage
