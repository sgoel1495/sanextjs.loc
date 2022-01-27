import {useRouter} from "next/router";
import {Fragment, useContext} from "react";
import AppWideContext from "../../store/AppWideContext";
import ShopPage from "../../components/shop-page/ShopPage";
import ProductPage from "../../components/product-page/ProductPage";

function FromHomePageById(){
    const router = useRouter();
    const query = router.query;
    const {dataStore} = useContext(AppWideContext);

    return <Fragment>
        {(query.startsWith("shop-"))
            ?<ShopPage  isMobile={dataStore.mobile} query={query}/>
            :<ProductPage isMobile={dataStore.mobile} query={query}/>
        }
    </Fragment>;
}

export default FromHomePageById;