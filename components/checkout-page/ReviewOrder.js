import { Fragment, useContext } from "react";
import AppWideContext from "../../store/AppWideContext";
import Accordion from "../common/accordion";
import ProductCartView from "../common/ProductCartView";

function ReviewOrder() {
    const { dataStore } = useContext(AppWideContext);

    const mobileView = null
    const browserView = (
        <Fragment>
            <Accordion
                style={"mt-5"}
                animationDuration={"duration-200"}
                titleStyle={`bg-[#f1f2f3] py-5 px-8`}
                title={
                    <div className="text-xl mb-2">Review Order - <span className="text-base font-500">{(dataStore.userCart.length === 0) ? 0 : dataStore.userCart.length} item in bag</span></div>
                }
                bodyStyle={`bg-[#f1f2f3] px-8`}
            >
                <ProductCartView />
            </Accordion>
        </Fragment>
    )

    return (dataStore.mobile) ? mobileView : browserView
}

export default ReviewOrder