import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";
function ShopTailoredSkirtsPage(props){
    return <ShopPage  category={"skirts"} hpid={"shop-skirts"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchShopData("skirts")
        },
        revalidate: 3600,
    }
}

export default ShopTailoredSkirtsPage
