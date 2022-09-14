import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";
function ShopJewelleryPage(props){
    return <ShopPage  category={"jewellery"} hpid={"shop-jewellery"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchShopData("jewellery")
        },
        revalidate: 3600,
    }
}


export default ShopJewelleryPage
