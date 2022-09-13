import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";

import fetchShopData from "../../components/shop-page/fetchShopData";
function ShopMasks(props){
    return <ShopPage  category={"masks"} hpid={"shop-masks"} data={props.data}/>
}

export async function getServerSideProps() {
    return {
        props: {
            data:await fetchShopData("masks")
        }
    }
}


export default ShopMasks
