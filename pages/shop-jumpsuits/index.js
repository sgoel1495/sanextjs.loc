import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";
function ShopJumpsuitsPage(props){
    return <ShopPage  category={"jumpsuits"} hpid={"shop-jumpsuits"} data={props.data}/>
}

export async function getServerSideProps() {
    return {
        props: {
            data:await fetchShopData("jumpsuits")
        }
    }
}


export default ShopJumpsuitsPage