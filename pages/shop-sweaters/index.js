import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";

function ShopSweatersPage(props){
    return <ShopPage  category={"sweaters"} hpid={"shop-sweaters"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchShopData("sweaters")
        }
    }
}


export default ShopSweatersPage

