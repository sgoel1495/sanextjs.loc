import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";
function ShopShortsPage(props){
    return <ShopPage  category={"shorts"} hpid={"shop-shorts"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchShopData("shorts")
        },
        revalidate: 3600,
    }
}


export default ShopShortsPage
