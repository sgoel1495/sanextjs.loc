import React, {useContext, useReducer, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import MeasurementForm from "../ShippingAddress/MeasurementForm";
import {apiCall} from "../../../helpers/apiCall";
import {getUserObject} from "../../../helpers/addTocart";
import {connect} from "react-redux";
import {setOrderSummary} from "../../../ReduxStore/reducers/orderSlice";

function AdditionalSizeDetail(props) {
    const [extraMeasure, setExtraMeasure] = useReducer((state, e) => {
            return {...state, [e.target.name]: e.target.value}
        }, {
            tops_brand: "",
            tops_brand_other: "",
            tops_size: "",
            tops_size_other: "",
            jeans_pants_size: 0,
            jeans_pants_size_other: 0,
        }
    );

    const updateMeasurements = () => {
        let measurements = {
            "tops_brand": extraMeasure.tops_brand || extraMeasure.tops_brand_other,
            "tops_size": extraMeasure.tops_size || extraMeasure.tops_size_other,
            "jeans_pants_size": extraMeasure.jeans_pants_size || extraMeasure.jeans_pants_size_other,
        }
        apiCall("measurmentForReview", props.appConfig.apiToken, {
            "user": getUserObject(props.userData),
            "order": {
                "order_id": props.currentOrderId
            },
            "measurements": measurements,
        })
        props.setOrderSummary({...props.orderSummary, "measurements": measurements})
        props.setActive(4);
    }

    return <section className="px-4">
        <div className="font-600 text-center text-2xl my-4">
            Let&apos;s understand your size better!
        </div>
        <div className="px-12">
            <MeasurementForm extraMeasure={extraMeasure} setExtraMeasure={setExtraMeasure} isMobile={true}/>
        </div>
        <div className='bg-white text-center grid grid-cols-2 fixed h-auto w-full left-0 right-0 bottom-0 mt-4'>
            <div
                onClick={() => {
                    props.setActive(2);
                }}
                className='cursor-pointer font-600 text-black py-2'
            >
                <button className='font-600'>&lt; BACK</button>
                <p className='text-xs uppercase'>Review Address</p>
            </div>
            <div
                onClick={updateMeasurements}
                className='bg-black py-2 cursor-pointer text-white'
            >
                <button className='font-600'> NEXT &gt;</button>
                <p className='text-xs uppercase'>Select Payment Mode</p>
            </div>
        </div>
    </section>;
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig,
        currentOrderId: state.orderData.currentOrderId,
        orderSummary: state.orderData.orderSummary
    }
}

export default connect(mapStateToProps, {setOrderSummary})(AdditionalSizeDetail);
