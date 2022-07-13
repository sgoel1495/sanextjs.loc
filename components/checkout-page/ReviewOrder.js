import { Fragment, useContext } from "react";
import AppWideContext from "../../store/AppWideContext";
import Accordion from "../common/accordion";
import ProductCartView from "../common/ProductCartView";

function ReviewOrder(props) {
    const { dataStore } = useContext(AppWideContext);

    const mobileView = (
        <Fragment>
            <Accordion
                style={"mt-5"}
                animationDuration={"duration-200"}
                titleStyle={`bg-[#f1f2f3] py-5 px-8`}
                title={
                    <div className='text-xl mb-2'>
                        Review Order - <span className='text-base font-500'>{dataStore.userCart.length === 0 ? 0 : dataStore.userCart.length} item in bag</span>
                    </div>
                }
                bodyStyle={`bg-[#f1f2f3] px-8 grid grid-cols-2 gap-10`}
            >
                <ProductCartView />
            </Accordion>
            <div className='bg-white text-center grid grid-cols-2 fixed h-auto w-full left-0 right-0 bottom-0 mt-4'>
                        <div
                            onClick={() => {
                                props.setActive(4);
                            }}
                            className='cursor-pointer font-600 text-black'
                        >
                            <button className='font-600'>&lt; BACK </button>
                            <p className='text-xs'>Edit Payment Mode</p>
                        </div>
                        <div
                            onClick={() => {
                                props.setActive();
                            }}
                            className='bg-black py-2 cursor-pointer text-white'
                        >
                            <button className='font-600 uppercase px-10'> Place order & pay</button>
                        </div>
                    </div>
        </Fragment>
    );
    const browserView = (
        <Fragment>
            <Accordion
                style={"mt-5"}
                animationDuration={"duration-200"}
                titleStyle={`bg-[#f1f2f3] py-5 px-8`}
                title={
                    <div className='text-xl mb-2'>
                        Review Order - <span className='text-base font-500'>{dataStore.userCart.length === 0 ? 0 : dataStore.userCart.length} item in bag</span>
                    </div>
                }
                bodyStyle={`bg-[#f1f2f3] px-8 grid grid-cols-2 gap-10`}
            >
                <ProductCartView />
            </Accordion>
        </Fragment>
    );

    return dataStore.mobile ? mobileView : browserView;
}

export default ReviewOrder;
