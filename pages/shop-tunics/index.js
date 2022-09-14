import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";

function ShopTunicsPage(props){
    return <ShopPage  category={"tunics"} hpid={"shop-tunics"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchShopData("tunics")
        },
        revalidate: 3600,
    }
}
export default ShopTunicsPage

