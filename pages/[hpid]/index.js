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
        {(query.hpid.startsWith("shop-"))
            ?<ShopPage  isMobile={dataStore.mobile} hpid={query.hpid}/>
            :<ProductPage isMobile={dataStore.mobile} hpid={query.hpid}/>
        }
    </Fragment>;
}

export default FromHomePageById;