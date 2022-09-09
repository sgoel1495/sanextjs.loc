import React, {useContext} from 'react';
import Image from "next/image";
import {addToCart, updateCartMeasurement} from "../../../helpers/addTocart";
import AppWideContext from "../../../store/AppWideContext";
import {connect} from "react-redux";
import {setCart} from "../../../ReduxStore/reducers/shoppingCartSlice";

const MeasurementModal = ({data, closeModal, edit, isMobile, userData, appConfig, ...props}) => {
    const [measurement, setMeasurement] = React.useReducer((state, e) => {
        return {...state, [e.target.name]: e.target.value}
    }, data.meas)
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const inputField = 'w-[100px] border border-[#a2a2a2] p-1 bg-white placeholder:text-black focus:bg-white focus:ring-transparent focus:border-black text-sm';

    const save = () => {
        if (edit) {
            let cart = {
                "product_id": data.product_id,
                "size": data.size,
                "qty": 1,
                "is_sale": data.is_sale,
                "is_tailor": true,
                "sleeve_length": measurement.selected_sleeve,
                "dress_length": measurement.selected_length,
                "measurment_id": measurement.measure_id
            }
            updateCartMeasurement(userData, appConfig.apiToken, props.setCart, data.cart_id, {cart: cart, measurments: measurement}).then(r => {
            })
        }
        closeModal();
    }

    return (
        <div className={'bg-white h-screen fixed inset-y-0 z-modal p-4' + [isMobile ? " inset-x-0" : " right-0 max-w-[400px] w-full"]}>
            <div className={"font-cursive text-3xl italic text-center font-500 relative"}>
                <span>Edit</span>
                <span className="top-0 right-0 absolute" onClick={closeModal}>
                    <Image src={WEBASSETS + "/assets/images/cancel.png"} height={"20px"} width={"20px"} alt={""}/>
                </span>
            </div>
            <div className={"text-center text-xl font-800 tracking-wider uppercase my-2"}>{data.name}</div>
            <div className={"text-center text-sm text-[#606060] font-800 uppercase mt-12 mb-6"}>measurements (inches)</div>
            <div className={"grid grid-cols-2 place-items-center text-[#606060] text-xs tracking-wide"}>
                <div className={"my-2"}>
                    <p className={"uppercase text-center"}>bust</p>
                    <input className={inputField} name={"bust"} value={measurement.bust} onChange={setMeasurement} disabled={!edit}/>
                </div>
                <div className={"my-2"}>
                    <p className={"uppercase text-center"}>waist</p>
                    <input className={inputField} name={"waist"} value={measurement.waist} onChange={setMeasurement} disabled={!edit}/>
                </div>
                <div className={"my-2"}>
                    <p className={"uppercase text-center"}>wearing waist <br/> / stomach</p>
                    <input className={inputField} name={"wearing_waist"} value={measurement.wearing_waist} onChange={setMeasurement} disabled={!edit}/>
                </div>
                <div className={"my-2"}>
                    <p className={"uppercase text-center"}>hips</p>
                    <input className={inputField} name={"hips"} value={measurement.hips} onChange={setMeasurement} disabled={!edit}/>
                </div>
                <div className={"my-2"}>
                    <p className={"uppercase text-center"}>biceps</p>
                    <input className={inputField} name={"biceps"} value={measurement.biceps} onChange={setMeasurement} disabled={!edit}/>
                </div>
                <div className={"my-2"}>
                    <p className={"uppercase text-center"}>height</p>
                    <div className={"flex gap-x-2"}>
                        <input className={inputField + [" w-[46px]"]} name={"height_f"} value={measurement.height_f} onChange={setMeasurement} disabled={!edit}/>
                        <input className={inputField + [" w-[46px]"]} name={"height_i"} value={measurement.height_i} onChange={setMeasurement} disabled={!edit}/>
                    </div>
                </div>
                <div className={"my-2"}>
                    <p className={"uppercase text-center"}>shoulder</p>
                    <input className={inputField} name={"shoulder"} value={measurement.shoulder} onChange={setMeasurement} disabled={!edit}/>
                </div>
                <div className={"col-span-2 my-2"}>
                    <p className={"uppercase text-center"}>others</p>
                    <input className={inputField + [" w-[200px]"]} name={"others"} value={measurement.others} onChange={setMeasurement} disabled={!edit}/>
                </div>
                <div className={"col-span-2 my-6"}>
                    <button className={"bg-black text-white px-2 py-1 uppercase text-base"} onClick={save}>{edit ? "save" : "close"}</button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) =>{
    return {
        userData: state.userData,
        appConfig: state.appConfig,
        shoppingCart: state.shoppingCart
    }
}

export default connect(mapStateToProps,{setCart})(MeasurementModal);