import { Fragment, useContext } from "react";
import AppWideContext from "../../store/AppWideContext";
import emptyMeasurement from "../../store/emptyMeasurement.json"
import Image from "next/image";

function MeasurementModal0({ closeModal, isMobile, addNew, pastOrders, measureProduct }) {
    const { dataStore, updateDataStore } = useContext(AppWideContext)
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS
    const getCategory = (i) => {
        const splitItem = i.split("-")
        return splitItem[0]
    }

    const buttonClass = "border-2 border-black px-8 py-4 font-800 text-[#777] cursor-pointer"

    const mobileView = null;
    const browserView = () => {
        return (
            <div className="bg-black/60 h-screen w-screen fixed inset-0 z-50 grid place-items-center py-[8%] px-[10%]" onClick={closeModal}>
                <div className="bg-white border-2 border-black relative h-full w-[920px] flex flex-col" onClick={e => e.stopPropagation()}>
                    <div className="overflow-auto flex-1">
                        <button className="absolute top-0 right-8 text-2xl z-50" onClick={closeModal}>X</button>
                        <p className="uppercase text-xl font-500 text-[#777] text-center my-5">SELECT MEASUREMENTS</p>
                        <div className="grid place-items-center place-content-center gap-5">
                            {(dataStore.userData.contact)
                                ? (measureProduct)
                                    ? <div onClick={pastOrders}>
                                        <div>({getCategory(measureProduct.asset_id)}) {measureProduct.name}</div>
                                        <div>
                                            <Image src={WEBASSETS + "/assets/" + measureProduct.asset_id + "/thumb.mob.jpg"}
                                                layout={`fill`} objectFit={`cover`} alt={measureProduct.asset_id} />
                                        </div>
                                        <div>
                                            <div>{getCategory(measureProduct.asset_id)}:</div>
                                            <div>{measureProduct.name}</div>
                                            <div>MEASUREMENTS</div>
                                            <div>BUST: {measureProduct.measurement.bust}</div>
                                            <div>WAIST: {measureProduct.measurement.waist}</div>
                                            <div>WEARING WAIST: {measureProduct.measurement.wearing_waist}</div>
                                            <div>HIPS: {measureProduct.measurement.hips}</div>
                                            <div>BICEPS: {measureProduct.measurement.biceps}</div>
                                            <div>HEIGHT: {measureProduct.measurement.height_f} FT {measureProduct.measurement.height_i} INCH</div>
                                            <div>SHOULDER: {measureProduct.measurement.shoulder}</div>
                                        </div>
                                    </div>
                                    : <div onClick={pastOrders}>CHOOSE MEASUREMENTS FROM PAST ORDERS</div>
                                : <div className={buttonClass + " mt-20"} onClick={() => updateDataStore("showSidebarMenuUser", true)}>CHOOSE MEASUREMENTS FROM PAST ORDERS</div>
                            }
                            <div className="font-800 text-[#777]">OR</div>
                            <div className={buttonClass} onClick={() => addNew(emptyMeasurement)}>ENTER NEW MEASUREMENTS</div>
                        </div>
                    </div>
                    <div className="bg-white py-3 text-center flex flex-col items-center">
                        <button className="font-600" onClick={() => addNew(emptyMeasurement)}>CONTINUE &gt;</button>
                        <p className="text-xs uppercase">BODY MEASUREMENTS</p>
                    </div>
                </div>
            </div>
        )

    };


    return (isMobile) ? mobileView : browserView();
}

export default MeasurementModal0;