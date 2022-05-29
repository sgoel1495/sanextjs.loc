import {Fragment, useContext} from "react";
import AppWideContext from "../../store/AppWideContext";
import ProductCartView from "../common/ProductCartView";

function ReviewOrder(){
    const { dataStore} = useContext(AppWideContext);

    const mobileView=null
    const browserView=<Fragment>
        <div>
            <div>Review Order - {(dataStore.userCart.length === 0) ? 0 : dataStore.userCart.length} item in bag</div>
            <div>^</div>
        </div>
        <ProductCartView />
    </Fragment>

    return (dataStore.mobile) ? mobileView : browserView
}

export default ReviewOrder