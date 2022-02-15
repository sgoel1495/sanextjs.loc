import {useRouter} from "next/router";
import {Fragment, useContext} from "react";
import AppWideContext from "../../store/AppWideContext";
import ShopPage from "../../components/shop-page/ShopPage";
import ProductPage from "../../components/product-page/ProductPage";

function PageById(){
    const router = useRouter();
    const query = router.query;
    const {dataStore} = useContext(AppWideContext);

    return <Fragment>
        {(query.pageid.startsWith("shop-"))
            ?<ShopPage  isMobile={dataStore.mobile} hpid={query.pageid}/>
            :<ProductPage isMobile={dataStore.mobile} hpid={query.pageid}/>
        }
    </Fragment>;
}

export default PageById;