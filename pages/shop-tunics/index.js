import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";

function ShopTunicsPage(props){
    return <ShopPage  category={"tunics"} hpid={"shop-tunics"} data={props.data}/>
}

export async function getServerSideProps() {
    return {
        props: {
            data:await fetchShopData("tunics")
        }
    }
}
export default ShopTunicsPage

