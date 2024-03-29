import React from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import fetchShopData from "../../components/shop-page/fetchShopData";
function ShopTailoredPantsPage(props){
    return <ShopPage  category={"tailored-pants"} hpid={"shop-tailored-pants"} data={props.data}/>
}

export async function getStaticProps() {
    return {
        props: {
            data:await fetchShopData("pants")
        },
        revalidate: 3600,
    }
}


export default ShopTailoredPantsPage
