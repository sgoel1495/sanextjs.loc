import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";
function BestSellingPage(props){
    return <ShopPage  category={"best-selling"} hpid={"best-selling"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchShopData("best-selling")
        }
    }
}


export default BestSellingPage
