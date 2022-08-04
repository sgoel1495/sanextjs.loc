import {useRouter} from "next/router";
import React, {Fragment, useEffect, useState} from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import ProductPage from "../../components/product-page/ProductPage";
import MimotoPage from "../../components/mimoto-page/MimotoPage";
import Loader from "../../components/common/Loader";

function PageById(){
    const router = useRouter();
    const query = router.query;

    const whereToGo = ()=>{
        if(!router || !query || !query.pageid)
            return <Loader />
        const idParts = query.pageid.split("-")
        switch (idParts[0]){
            case "shop":
                return <ShopPage category={idParts[1]} hpid={query.pageid}/>
                break
            case "mimoto":
                return <MimotoPage category={idParts[1]} hpid={query.pageid}/>
                break
            default:
                return <ProductPage hpid={query.pageid}/>
                break
        }
    }

    const [forceRefresh,setForceRefresh] = useState(false)
    useEffect(()=>{
        if(!forceRefresh)
            setForceRefresh(true)
    },[forceRefresh])


    return forceRefresh
        ? whereToGo()
        : null
}

export default PageById;
