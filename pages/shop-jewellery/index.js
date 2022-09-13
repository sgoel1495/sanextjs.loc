import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";
function ShopJewelleryPage(props){
    return <ShopPage  category={"jewellery"} hpid={"shop-jewellery"} data={props.data}/>
}

export async function getServerSideProps() {
    return {
        props: {
            data:await fetchShopData("jewellery")
        }
    }
}


export default ShopJewelleryPage
