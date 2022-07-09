import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";

import fetchShopData from "../../components/shop-page/fetchShopData";
function ShopOuterwearPage(props){
    return <ShopPage  category={"outerwear"} hpid={"shop-pants"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchShopData("pants")
        }
    }
}


export default ShopOuterwearPage
