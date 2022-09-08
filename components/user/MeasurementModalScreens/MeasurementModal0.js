import React, {useContext} from 'react';
import AppWideContext from '../../../store/AppWideContext';
import emptyMeasurement from '../../../store/emptyMeasurement.json';
import Image from 'next/image';
import {PastOrderItem} from "./PastOrders";

function MeasurementModal0({closeModal, isMobile, addNew, pastOrders, measureProduct, showPastOrders, product}) {

    const getCategory = (i) => {
        const splitItem = i.split('-');
        return splitItem[0];
    };

    const buttonClass = 'border-2 border-black px-8 py-4 font-800 text-[#777] cursor-pointer ';
    const buttonClassMobile = 'border-[1.5vw] border-white p-[5%] font-800 text-center text-[3.75vw] w-[80%] rounded-[5vw] shadow-xl bg-[#faede3] tracking-[1px]';

    const mobileView = () => {
        return (
            <div className={['bg-black/60 h-screen fixed inset-0 z-modal grid place-items-center py-[8%] px-[3%]']} onClick={closeModal}>
                <div className='bg-white border-[1.2vw] border-[#b3aeab] text-[#997756] rounded-[10vw] h-full w-full relative flex flex-col overflow-hidden'
                     onClick={(e) => e.stopPropagation()}>
                    <div className='overflow-auto flex-1'>
                        <button className='absolute top-2 right-4 text-2xl z-50' onClick={closeModal}>
                            X
                        </button>
                        <p className='uppercase font-700 text-center my-3'>SELECT MEASUREMENTS</p>
                        <div className='grid place-items-center place-content-center gap-5 h-full'>
                            <div className={buttonClassMobile + ' ' + [pastOrders.length && "!bg-[#4eb16d] text-white"]} onClick={showPastOrders}>
                                CHOOSE MEASUREMENTS FROM PAST ORDERS
                            </div>
                            {measureProduct && <PastOrderItem item={measureProduct} setCurrentMeasurementProduct={()=>{}} gap={"gap-10"}/>}
                            <div className='font-800 text-[#777]'>OR</div>
                            <div className={buttonClassMobile}
                                 onClick={() => addNew({...emptyMeasurement, "selected_length": product.dress_length, "selected_sleeve": product.sleeve_length})}>
                                ENTER NEW MEASUREMENTS
                            </div>
                        </div>
                    </div>
                    <div className='bg-white py-3 text-center flex flex-col items-center'  onClick={() => addNew(null)}>
                        <button className='font-600'>
                            CONTINUE &gt;
                        </button>
                        <p className='text-xs uppercase'>BODY MEASUREMENTS</p>
                    </div>
                </div>
            </div>
        );
    };
    const browserView = () => {
        return (
            <div className={['bg-black/60 h-screen w-screen fixed inset-0 z-50 grid place-items-center py-[8%] px-[10%]']} onClick={closeModal}>
                <div className='bg-white border-2 border-black relative h-full w-[920px] flex flex-col' onClick={(e) => e.stopPropagation()}>
                    <div className='overflow-auto flex-1'>
                        <button className='absolute top-0 right-8 text-2xl z-50' onClick={closeModal}>
                            X
                        </button>
                        <p className='uppercase text-xl font-500 text-[#777] text-center my-5'>SELECT MEASUREMENTS</p>
                        <div className='grid place-items-center place-content-center gap-5'>
                            <div className={buttonClass + ' mt-20 uppercase text-center w-full '+[pastOrders.length && "!text-white bg-[#333231]"]} onClick={showPastOrders}>
                                {
                                    measureProduct ?
                                        <>
                                            selected measurements of:
                                            <p className={"font-400"}>({getCategory(measureProduct.asset_id)}) {measureProduct.name}</p>
                                        </>
                                        :
                                        "CHOOSE MEASUREMENTS FROM PAST ORDERS"
                                }

                            </div>
                            <div className='font-800 text-[#777]'>OR</div>
                            <div className={buttonClass+" px-20"} onClick={() => addNew({...emptyMeasurement, "selected_length": product.dress_length, "selected_sleeve": product.sleeve_length})}>
                                ENTER NEW MEASUREMENTS
                            </div>
                        </div>
                    </div>
                    <div className='bg-white py-3 text-center flex flex-col items-center cursor-pointer'  onClick={() => addNew(null)}>
                        <button className='font-600'>
                            CONTINUE &gt;
                        </button>
                        <p className='text-xs uppercase'>BODY MEASUREMENTS</p>
                    </div>
                </div>
            </div>
        );
    };

    return isMobile ? mobileView() : browserView();
}

export default MeasurementModal0;
