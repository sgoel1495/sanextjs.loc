import {useRouter} from "next/router";
import React, {Fragment, useEffect, useState} from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import ProductPage from "../../components/product-page/ProductPage";
import MimotoPage from "../../components/mimoto-page/MimotoPage";

function PageById(){
    const router = useRouter();
    const query = router.query;

    const [forceRefresh,setForceRefresh] = useState(false)
    useEffect(()=>{
        if(!forceRefresh)
            setForceRefresh(true)
    },[forceRefresh])


    return forceRefresh
        ?<Fragment>
            {(router && query && query.pageid && query.pageid.startsWith("shop-"))
                ?<ShopPage  hpid={query.pageid}/>
                :(router && query && query.pageid && query.pageid.startsWith("mimoto-"))
                    ?<MimotoPage  hpid={query.pageid}/>
                    :<ProductPage hpid={query.pageid}/>
            }
        </Fragment>
        : null
}

export default PageById;
