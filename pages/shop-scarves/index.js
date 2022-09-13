import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";
function ShopScarvesPage(props){
    return <ShopPage  category={"scarves"} hpid={"shop-scarves"} data={props.data}/>
}

export async function getServerSideProps() {
    return {
        props: {
            data:await fetchShopData("scarves")
        }
    }
}


export default ShopScarvesPage