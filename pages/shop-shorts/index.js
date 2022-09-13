import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";
function ShopShortsPage(props){
    return <ShopPage  category={"shorts"} hpid={"shop-shorts"} data={props.data}/>
}

export async function getServerSideProps() {
    return {
        props: {
            data:await fetchShopData("shorts")
        }
    }
}


export default ShopShortsPage
