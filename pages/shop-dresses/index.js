import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";
function ShopDresses(props){
    return <ShopPage  category={"dresses"} hpid={"shop-dresses"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchShopData("dresses")
        },
        revalidate: 3600,
    }
}


export default ShopDresses
