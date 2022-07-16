import Image from "next/image";
import React, {useContext, useState} from "react";
import AppWideContext from "../../store/AppWideContext";
import {apiCall} from "../../helpers/apiCall";
import getUserO from "../../helpers/getUserO";
import {refreshCart, removeFromCart, updateCart} from "../../helpers/addTocart";
import Toast from "./Toast";

function ProductCartView({isMobile}) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const [toastMsg, setToastMsg] = useState(null)
    const userO = getUserO(dataStore)

    const changeQty = async (i, n) => {
        if (n == 1) {
            // increase
            dataStore.userCart[i].qty = (parseInt(dataStore.userCart[i].qty) + 1).toString();
        } else if (n == -1) {
            const cv = parseInt(dataStore.userCart[i].qty)
            if (cv > 1)
                dataStore.userCart[i].qty = (cv - 1).toString();
        }
        //update
        if (dataStore.userData.contact) {
            const updateProduct = {
                product_cart_id: dataStore.userCart[i].cart_id,
                qty: dataStore.userCart[i].qty
            }
            await apiCall("updateCart", dataStore.apiToken, {"user": userO, product: updateProduct});
        }
        await refreshCart(dataStore, updateDataStore)
    }

    const changeQty2 = async (product, updatedQty) => {
        if (updatedQty === 0) {
            setToastMsg("Minimum Quantity Selected")
            return
        }
        let item = {...product, qty: updatedQty}
        await updateCart(dataStore, updateDataStore, item)
    }

    const productCartView = () => {
        let returnValues = null;
        dataStore.userCart.forEach((p, index) => {
            if (p.is_tailor == "false")
                returnValues = (
                    <>
                        {returnValues}
                        <div>
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
                                <button className="absolute top-0 right-0" onClick={() => removeFromCart(p)}>X
                                </button>
                                <div>
                                    <p className="font-600 text-sm leading-none">{p.name}</p>
                                    <p className="text-[10px]">{p.tag_line}</p>
                                </div>
                                <div className="text-[#777] uppercase">
                                    <p className="text-[10px]">COLOR:{(p.multi_color) ? "multicolor" : p.color.name}</p>
                                    <p className="text-[10px]">SIZE:{p.size}</p>
                                </div>
                                <div className="inline-flex gap-4 text-sm items-center">
                                    Qty
                                    <div className="text-[#555]" onClick={() => changeQty(index, -1)}>-</div>
                                    <div>{p.qty}</div>
                                    <div className="text-[#555]" onClick={() => changeQty(index, 1)}>+</div>
                                </div>
                                <p className="text-right text-[#777] text-xs">
                                    {dataStore.currSymbol} {(dataStore.currCurrency == "inr") ? (p.price * p.qty) : (p.usd_price * p.qty)}
                                </p>
                            </div>
                        </div>
                    </>
                )

            else
                returnValues = (
                    <>
                        {returnValues}
                        <div className="flex gap-x-2 items-center bg-white p-3">
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
                                <button className="absolute top-0 right-0" onClick={() => removeFromCart(p)}>X
                                </button>
                                <div>
                                    <p className="font-600 text-sm leading-none">{p.name}</p>
                                    <p className="text-[10px]">{p.tag_line}</p>
                                </div>
                                <div className="text-[#777] uppercase">
                                    <p className="text-[10px]">COLOR:{p.color.name}</p>
                                    <p className="text-[10px]">SIZE:{p.size}</p>
                                </div>
                                {/* <div>
                                    <span onClick={() => quickEditTailored(p)}>EDIT</span>
                                    <span onClick={() => quickViewTailored(p)}>VIEW</span>
                                </div> */}
                                <div className="inline-flex gap-4 text-sm items-center">
                                    Qty:
                                    <div className="text-[#555] cursor-pointer"
                                         onClick={() => changeQty(index, -1)}>-</div>
                                    <div>{p.qty}</div>
                                    <div className="text-[#555] cursor-pointer" onClick={() => changeQty(index, 1)}>+
                                    </div>
                                </div>
                                <p className="text-right text-[#777] text-xs">
                                    {dataStore.currSymbol} {(dataStore.currCurrency == "inr") ? (p.price * p.qty) : (p.usd_price * p.qty)}
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
        dataStore.userCart.forEach((p, index) => {
            if (p.is_tailor === "false")
                returnValues = (
                    <>
                        {returnValues}
                        <div>
                            <div className="relative h-40 aspect-[9/16]">
                                <Image src={WEBASSETS + p.asset_id} alt={p.cart_id}
                                       id={p.cart_id + index.toString()}
                                       layout="fill"
                                       objectFit="cover"
                                />
                            </div>
                            <div className="flex-1 inline-flex flex-col gap-y-2 text-left relative">
                                <p className="text-right text-[#777] text-xs">
                                    {dataStore.currSymbol} {(dataStore.currCurrency == "inr") ? (p.price * p.qty) : (p.usd_price * p.qty)}
                                </p>
                                <div>
                                    <p className="font-600 text-sm leading-none">{p.name}</p>
                                    <p className="text-[10px]">{p.tag_line}</p>
                                </div>
                                <div className="text-[#777] uppercase">
                                    <p className="text-[10px]">COLOR:{(p.multi_color) ? "multicolor" : p.color.name}</p>
                                    <p className="text-[10px]">SIZE:{p.size}</p>
                                </div>
                                <div className="inline-flex gap-4 text-sm items-center">
                                    Qty
                                    <div className="text-[#555]" onClick={() => changeQty2(p, p.qty - 1)}>-</div>
                                    <div>{p.qty}</div>
                                    <div className="text-[#555]" onClick={() => changeQty2(p, p.qty + 1)}>+</div>
                                </div>

                            </div>
                            <div className={"flex items-center"}>
                                <img className={"h-4 w-4"} src={WEBASSETS + "/assets/images/cart_delete.png"}
                                     alt="cancel"
                                     onClick={() => removeFromCart(p)}
                                />
                            </div>
                        </div>
                    </>
                )

            else
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
                                    {dataStore.currSymbol} {(dataStore.currCurrency == "inr") ? (p.price * p.qty) : (p.usd_price * p.qty)}
                                </p>
                                <div>
                                    <p className="font-600 text-sm leading-none">{p.name}</p>
                                    <p className="text-[10px]">{p.tag_line}</p>
                                </div>
                                <div className="text-[#777] uppercase">
                                    <p className="text-[10px]">COLOR:{p.color.name}</p>
                                    <p className="text-[10px]">SIZE:{p.size}</p>
                                </div>
                                {/* <div>
                                    <span onClick={() => quickEditTailored(p)}>EDIT</span>
                                    <span onClick={() => quickViewTailored(p)}>VIEW</span>
                                </div> */}
                                <div className="inline-flex gap-4 text-sm items-center">
                                    Qty:
                                    <div className="text-[#555] cursor-pointer"
                                         onClick={() => changeQty2(p, p.qty - 1)}>-</div>
                                    <div>{p.qty}</div>
                                    <div className="text-[#555] cursor-pointer" onClick={() => changeQty2(p, p.qty + 1)}>+
                                    </div>
                                </div>

                            </div>
                            <div className={"flex items-center"}>
                                <img className={"h-4 w-4"} src={WEBASSETS + "/assets/images/cart_delete.png"}
                                     alt="cancel"
                                     onClick={() => removeFromCart(p)}
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
        <Toast show={toastMsg} hideToast={setToastMsg}>
            {toastMsg}
        </Toast>
    </>
}

export default ProductCartView
