import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";
function ShopScarvesPage(props){
    return <ShopPage  category={"scarves"} hpid={"shop-scarves"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchShopData("scarves")
        },
        revalidate: 3600,
    }
}


export default ShopScarvesPage