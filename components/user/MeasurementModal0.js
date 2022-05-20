import {Fragment, useContext} from "react";
import AppWideContext from "../../store/AppWideContext";
import emptyMeasurement from "../../store/emptyMeasurement.json"
import Image from "next/image";

function MeasurementModal0 ({ closeModal, isMobile, addNew, pastOrders, measureProduct }) {
    const { dataStore, updateDataStore } = useContext(AppWideContext)
    const getCategory=(i)=>{
        const splitItem = i.split("-")
        return splitItem[0]
    }

    const mobileView = null;
    const browserView = ()=>{
        return <Fragment>
            <div onClick={closeModal}>X</div>
            <div>SELECT MEASUREMENTS</div>
            {(dataStore.userData.contact)
                ?(measureProduct)
                    ?<div onClick={pastOrders}>
                        <div>({getCategory(measureProduct.asset_id)}) {measureProduct.name}</div>
                        <div>
                            <Image src={WEBASSETS+"/assets/"+measureProduct.asset_id+"/thumb.mob.jpg"} layout={`fill`} objectFit={`cover`} />
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
                    :<div onClick={pastOrders}>CHOOSE MEASUREMENTS FROM PAST ORDERS</div>
                :<div onClick={()=>updateDataStore("showSidebarMenuUser", true)}>CHOOSE MEASUREMENTS FROM PAST ORDERS</div>
            }
            <div>OR</div>
            <div onClick={()=>addNew(emptyMeasurement)}>ENTER NEW MEASUREMENTS</div>
            <div onClick={()=>addNew(emptyMeasurement)}>CONTINUE %gt;</div>
            <div>BODY MEASUREMENTS</div>
        </Fragment>

    };


    return (isMobile) ? mobileView : browserView();
}

export default MeasurementModal0;