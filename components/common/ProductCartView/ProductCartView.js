import Image from "next/image";
import React, {useContext, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import {removeFromCart, updateCart} from "../../../helpers/addTocart";
import Toast from "../Toast";
import MeasurementModal from "./MeasurementModal";
import {connect} from "react-redux";
import {setCart} from "../../../ReduxStore/reducers/shoppingCartSlice";

function ProductCartView({isMobile,userData,appConfig,shoppingCart,userConfig,...props}) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [toastMsg, setToastMsg] = useState(null)
    const [showMeasure, setShowMeasure] = useState({
        edit: false,
        product: null
    })

    const changeQty = async (product, updatedQty) => {
        if (updatedQty === 0) {
            setToastMsg("Minimum Quantity Selected")
            return
        }
        let item = {...product, qty: updatedQty}
        await updateCart(userData, appConfig.apiToken, props.setCart, item)
    }

    const productCartView = () => {
        let returnValues = null;
        shoppingCart.cart.forEach((p, index) => {
            returnValues = (
                <>
                    {returnValues}
                    <div className={"flex gap-x-2 items-center bg-white p-3"}>
                        <div className="border p-1">
                            <div className="relative h-40 aspect-[9/16]">
                                <Image src={WEBASSETS + p.asset_id} alt={p.cart_id}
                                       id={p.cart_id + index.toString()}
                                       layout="fill"
                                       objectFit="cover"
                                />
                            </div>
                        </div>
                        <div className="flex-1 inline-flex flex-col gap-y-2 text-left relative">
                            <button className="absolute top-0 right-0" onClick={() => removeFromCart(userData, appConfig.apiToken, props.setCart, p)}>X
                            </button>
                            <div>
                                <p className="font-600 text-sm leading-none">{p.name}</p>
                                <p className="text-[10px]">{p.tag_line}</p>
                            </div>
                            {
                                p.product_id.toLowerCase().includes("giftcard") ? "" :
                                    <div className="text-[#777] uppercase">
                                        <p className="text-[10px]">COLOR: {(p.multi_color) ? "multicolor" : p.color.name}</p>
                                        <p className="text-[10px]">SIZE: {p.is_tailor ? "Tailored" : p.size}</p>
                                        {
                                            p.is_tailor && <div>
                                                <span className={"text-[11px] underline text-[#777] mr-1"} onClick={() => setShowMeasure({
                                                    edit: true,
                                                    product: p
                                                })}>EDIT</span>
                                                <span className={"text-[11px] underline text-[#777] ml-1"} onClick={() => setShowMeasure({
                                                    edit: false,
                                                    product: p
                                                })}>VIEW</span>
                                            </div>
                                        }
                                    </div>
                            }
                            <div className="inline-flex gap-4 text-sm items-center">
                                Qty
                                <div className="text-[#555]" onClick={() => changeQty(p, p.qty - 1)}>-</div>
                                <div>{p.qty}</div>
                                <div className="text-[#555]" onClick={() => changeQty(p, p.qty + 1)}>+</div>
                            </div>
                            <p className="text-right text-[#777] text-xs">
                                {userConfig.currSymbol} {(userConfig.currCurrency == "inr") ? (p.price * p.qty) : (p.usd_price * p.qty)}
                            </p>
                        </div>
                    </div>
                </>
            )
        })

        return returnValues
    }

    const mobileProductCartView = () => {
        let returnValues = null;
        shoppingCart.cart.forEach((p, index) => {
            returnValues = (
                <>
                    {returnValues}
                    <div className="flex gap-x-2 items-center bg-white p-3">
                        <div className="relative h-40 aspect-[9/16]">
                            <Image src={WEBASSETS + p.asset_id} alt={p.cart_id}
                                   id={p.cart_id + index.toString()}
                                   layout="fill"
                                   objectFit="cover"
                            />
                        </div>
                        <div className="flex-1 inline-flex flex-col gap-y-2 text-left relative">
                            <p className="text-[#777] text-xs">
                                {userConfig.currSymbol} {(userConfig.currCurrency === "inr") ? (p.price * p.qty) : (p.usd_price * p.qty)}
                            </p>
                            <div>
                                <p className="font-600 text-sm leading-none">{p.name}</p>
                                <p className="text-[10px]">{p.tag_line}</p>
                            </div>
                            {
                                p.product_id.toLowerCase().includes("giftcard") ? "" :
                                    <div className="text-[#777]">
                                        <p className="text-[10px]">Color:{p.color.name}</p>
                                        <p className="text-[10px]">Size: {p.is_tailor ? "Tailored" : p.size}</p>
                                        {
                                            p.is_tailor && <div>
                                                <span className={"text-[11px] underline text-[#777] mr-1"} onClick={() => setShowMeasure({
                                                    edit: true,
                                                    product: p
                                                })}>EDIT</span>
                                                <span className={"text-[11px] underline text-[#777] ml-1"} onClick={() => setShowMeasure({
                                                    edit: false,
                                                    product: p
                                                })}>VIEW</span>
                                            </div>
                                        }
                                    </div>
                            }
                            <div className="inline-flex gap-4 text-sm items-center">
                                Qty:
                                <div className="text-[#555] cursor-pointer"
                                     onClick={() => changeQty(p, p.qty - 1)}>-</div>
                                <div>{p.qty}</div>
                                <div className="text-[#555] cursor-pointer" onClick={() => changeQty(p, p.qty + 1)}>+
                                </div>
                            </div>

                        </div>
                        <div className={"flex items-center"}>
                            <Image height={"16px"} width={"16px"} src={WEBASSETS + "/assets/images/cart_delete.png"}
                                   alt="cancel"
                                   onClick={() => removeFromCart(userData, appConfig.apiToken, props.setCart, p)}
                            />
                        </div>
                    </div>
                </>
            )
        })

        return returnValues
    }

    return <>
        {isMobile ? mobileProductCartView() : productCartView()}
        {
            showMeasure.product !== null &&
            <MeasurementModal
                data={showMeasure.product}
                edit={showMeasure.edit}
                closeModal={() => setShowMeasure({
                    edit: false,
                    product: null
                })}
                isMobile={isMobile}
            />
        }
        <Toast show={toastMsg} hideToast={setToastMsg}>
            {toastMsg}
        </Toast>
    </>
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig,
        shoppingCart: state.shoppingCart,
        userConfig:state.userConfig
    }
}

export default connect(mapStateToProps,{setCart})(ProductCartView)
