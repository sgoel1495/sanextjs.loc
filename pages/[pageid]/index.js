import {useRouter} from "next/router";
import React, {Fragment, useContext} from "react";

import ShopPage from "../../components/shop-page/ShopPage";
import ProductPage from "../../components/product-page/ProductPage";
import MimotoPage from "../../components/mimoto-page/MimotoPage";

function PageById(){
    const router = useRouter();
    const query = router.query;

    return <Fragment>
        {(router && query && query.pageid && query.pageid.startsWith("shop-"))
            ?<ShopPage  hpid={query.pageid}/>
            :(router && query && query.pageid && query.pageid.startsWith("mimoto-"))
                ?<MimotoPage  hpid={query.pageid}/>
                :<ProductPage hpid={query.pageid}/>
        }
    </Fragment>;
}

export default PageById;
