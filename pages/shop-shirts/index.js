import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";

function ShopShirtsPage(props){
    return <ShopPage  category={"shirts"} hpid={"shop-shirts"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchShopData("shirts")
        },
        revalidate: 3600,
    }
}

export default ShopShirtsPage

