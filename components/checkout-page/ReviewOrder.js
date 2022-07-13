import { Fragment, useContext } from "react";
import AppWideContext from "../../store/AppWideContext";
import Accordion from "../common/accordion";
import ProductCartView from "../common/ProductCartView";

function ReviewOrder(props) {
    const { dataStore } = useContext(AppWideContext);

    const address = {
        name: "test",
        lastname: "test",
        email: "shailaja.s@algowire.com",
        phone: 1234567890,
        address: "abc block",
        landmark: "",
        country: "india",
        zip_code: 110096,
        state: "Delhi",
        city: "New Delhi",
    };
    const mobileView = (
        <Fragment>
            <Accordion
                style={"mt-5"}
                animationDuration={"duration-200"}
                titleStyle={`py-5 px-5`}
                title={
                    <div className='text-xl mb-2'>
                        Review Order - <span className='text-base font-500'>{dataStore.userCart.length === 0 ? 0 : dataStore.userCart.length} item in bag</span>
                    </div>
                }
                bodyStyle={`px-8 grid grid-cols-1 gap-10 border-solid`}
            >
                <ProductCartView mockData={dataStore.userCart} />
            </Accordion>
            <div className='px-5'>
                <p className='font-bold text-l mt-4'>Deliver To</p>
                <div className='p-4 border border-solid border-[#f1f2f3] mb-4'>
                    <div className='flex flex-col gap-y-1 mb-5 text-[#777]'>
                        <p className='font-500'>
                            {address.name} {address.lastname}
                        </p>
                        <p className='text-xs text-[#555]'>
                            {address.address}, {address.landmark}
                        </p>
                        <p className='text-xs text-[#555]'>
                            {address.city}, {address.state} {address.zip_code}
                        </p>
                        <p className='text-xs text-[#555]'>{address.country}</p>
                        <p className='text-xs text-[#555]'>T: {address.phone}</p>
                    </div>
                </div>

                <div className='flex justify-between'>
                    <p className='font-bold text-l'>Amount to be paid</p>
                    <p>$232342</p>
                </div>
                <p className='font-bold text-l mt-4'>Your Size info</p>
                <div className='uppercase my-4'>
                    <p className='pl-4 pb-3'>Brand</p>
                    <p className='pl-4 pb-3'>Top Size</p>
                    <p className='pl-4 pb-3'>Bottom Size</p>
                </div>
            </div>
            <div className='bg-white text-center grid grid-cols-2 fixed h-auto w-full left-0 right-0 bottom-0 mt-4'>
                <div
                    onClick={() => {
                        props.setActive(4);
                    }}
                    className='cursor-pointer font-600 text-black py-2'
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
