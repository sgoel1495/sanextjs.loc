import React from 'react';
import Image from "next/image";


export const PastOrderItem = ({item, setCurrentMeasurementProduct, gap}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const getCategory = (i) => {
        const splitItem = i.split('-');
        return splitItem[0];
    };

    return <div className={"grid grid-cols-2 cursor-pointer " + gap} onClick={() => setCurrentMeasurementProduct(item)}>
        <div className={"relative w-full aspect-[9/16]"}>
            <Image src={WEBASSETS + "/assets/" + item.asset_id + "/thumb.mob.jpg"} layout={`fill`} objectFit={`cover`}/>
            <div className={"absolute bottom-0 text-[11px] text-[#5A5958] text-center bg-[#f3f3f3] w-full"}>{item.name}</div>
        </div>
        <div className={"text-[#997756] my-auto"}>
            <p className={"uppercase font-800 text-wider text-xs leading-none"}>{getCategory(item.asset_id)}:</p>
            <p className={"uppercase font-800 text-wider text-xs "}>{item.name}</p>
            <p className={"uppercase font-800 text-wider text-xs mt-2"}>measurements</p>
            <p className={"uppercase text-[11px]"}>bust : {item.bust}</p>
            <p className={"uppercase text-[11px]"}>waist : {item.waist}</p>
            <p className={"uppercase text-[11px]"}>wearing waist : {item.wearing_waist}</p>
            <p className={"uppercase text-[11px]"}>hips : {item.hips}</p>
            <p className={"uppercase text-[11px]"}>biceps : {item.biceps}</p>
            <p className={"uppercase text-[11px]"}>height : {item.height_f} ft {item.height_i} inch</p>
            <p className={"uppercase text-[11px]"}>shoulder : {item.shoulder}</p>
        </div>
    </div>
}


const PastOrders = ({isMobile, closeModal, pastOrders, setCurrentMeasurementProduct, setCurrentMeasurement}) => {


    const selectItem = (item) => {
        setCurrentMeasurementProduct(item)
        setCurrentMeasurement({
            "measure_id": "",
            "bust": item.bust,
            "waist": item.waist,
            "hips": item.hips,
            "height_f": item.height_f,
            "height_i": item.height_i,
            "wearing_waist": item.wearing_waist,
            "biceps": item.biceps,
            "fitting": item.fitting,
            "abdomen": item.abdomen,
            "biceps_fit": item.biceps_fit,
            "others": item.others,
            "shoulder": item.shoulder,
            "length": item.length,
            "size": item.size,
            "bre_size": item.bre_size,
            "bra_size_other": item.bra_size_other,
            "jeans_pant": item.jeans_pant,
            "jeans_pant_other": item.jeans_pant_other,
            "brand_top": item.brand_top,
            "brand_top_other": item.brand_top_other,
            "brand_top_size": item.brand_top_size,
            "brand_top_size_other": item.brand_top_size_other,
            "brand_pant": item.brand_pant,
            "brand_pant_other": item.brand_pant_other,
            "brand_pant_size": item.brand_pant_size,
            "brand_pant_size_other": item.brand_pant_size_other,
            "brand_dress": item.brand_dress,
            "brand_dress_other": item.brand_dress_other,
            "brand_dress_size": item.brand_dress_size,
            "brand_dress_size_other": item.brand_dress_size_other,
            "selected_sleeve": item.selected_sleeve,
            "selected_length": item.selected_length
        })
        closeModal()
    }

    const items = (gap) => {
        return pastOrders.map(item => <PastOrderItem item={item} setCurrentMeasurementProduct={selectItem} closeModal={closeModal} gap={gap}/>)
    }

    let mobileView = <div className={['bg-black/60 h-screen fixed inset-0 z-modal2 grid place-items-center']} onClick={closeModal}>
        <div className='bg-white h-full w-full relative flex flex-col overflow-hidden'
             onClick={(e) => e.stopPropagation()}>
            <button className='absolute top-2 right-4 text-2xl z-50' onClick={closeModal}>
                X
            </button>
            <p className={"uppercase font-800 text-center mt-6 tracking-wider"}>tap to select item</p>
            <div className={"grid grid-cols-1 gap-8 mx-[15%] overflow-auto py-8"}>
                {items("gap-10")}
            </div>
        </div>
    </div>

    let browserView = <div className={['bg-black/60 h-screen w-screen fixed inset-0 z-modal grid place-items-center py-[8%] px-[10%]']} onClick={closeModal}>
        <div className='bg-white border-2 border-black relative h-full w-[920px] flex flex-col overflow-auto' onClick={(e) => e.stopPropagation()}>
            <button className='absolute top-0 right-8 text-2xl z-50' onClick={closeModal}>
                X
            </button>
            <p className={"uppercase font-800 text-center mt-6 tracking-wider"}>tap to select item</p>
            <div className={"overflow-auto"}>
                <div className={"grid grid-cols-2 gap-14 mx-[15%] my-8 gap-x-10"}>
                    {items("gap-8")}
                </div>
            </div>
        </div>
    </div>

    return isMobile ? mobileView : browserView;
};

export default PastOrders;