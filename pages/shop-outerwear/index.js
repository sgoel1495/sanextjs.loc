import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";

import fetchShopData from "../../components/shop-page/fetchShopData";
function ShopOuterwearPage(props){
    return <ShopPage  category={"outerwear"} hpid={"shop-outerwear"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchShopData("outerwear")
        },
        revalidate: 3600,
    }
}


export default ShopOuterwearPage
