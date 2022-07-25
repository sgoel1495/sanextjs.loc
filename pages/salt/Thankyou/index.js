import React, {useContext, useEffect, useState} from 'react';
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import {isMobile} from "react-device-detect";
import SaltIcon from "../../../components/navbar/SaltIcon";
import AppWideContext from "../../../store/AppWideContext";
import Link from "next/link";
import Footer from "../../../components/footer/Footer";
import {useRouter} from "next/router";

const Thankyou = (props) => {
    const router = useRouter();
    const orderID = router.query.id;
    const {dataStore} = useContext(AppWideContext);
    const curr = dataStore.currCurrency.toUpperCase();
    const [mobile, setMobile] = useState(false)
    const [order, setOrder] = useState({})
    console.log(dataStore.userOrderHistory)
    useEffect(() => {
        if (dataStore.userOrderHistory[orderID]) {
            setOrder(dataStore.userOrderHistory[orderID])
        }
    }, [dataStore.userOrderHistory])
    const address = order.delivery_address || {}
    const cart = order.item || []
    useEffect(() => {
        setMobile(isMobile)
    }, [])
    let gross = order.total - order.discount;
    let wallet;
    if (gross !== order.pending_amount - order.delivery_charges) {
        wallet = gross - order.pending_amount + order.delivery_charges
    }
    return (
        <>
            <PageHead url="/salt/Thankyou" id="Thankyou" isMobile={mobile}/>
            <Header type={mobile ? "minimal" : "shopMenu"} isMobile={mobile}/>
            <div className={"mt-20 flex justify-center"}>
                <SaltIcon type={mobile ? "minimal" : "shopMenu"} isMobile={mobile}/>
            </div>
            <div className={mobile ? "" : "grid grid-cols-2 mx-36"}>
                <div className={"px-8 py-8"}>
                    <p className={"text-xl text-[#777] font-600"}>Your order is confirmed!</p>
                    <p className={"text-[#777] text-[15px] mb-4"}>Order No {order.order_id}.</p>
                    <p className={"text-[#777] text-[15px]"}>Thank you for shopping at Salt!</p>
                    <div className={"text-[15px] mt-10"}>
                        <h5 className={"font-600 text-[#333]"}>SHIPPING ADDRESS DETAILS</h5>
                        <p className={"text-[#777]"}>
                            {address.name} - {address.phone},<br/>
                            {address.address}, {address.landmark},<br/>
                            {address.city} - {address.zip_code},<br/>
                            {address.state}, {address.country}<br/>
                        </p>
                    </div>
                    <p className={"text-[13px] text-[#777] mt-8 font-500 tracking-wide"}>
                        Mimoto Technologies (P) Ltd.<br/>
                        Address: LG-51 DLF Mega Mall,<br/>
                        Golf Course Road, Gurugram,<br/>
                        Haryana-122002,<br/>
                        <div className={"flex"}>
                            <span>Contact:-&nbsp;</span>
                            <span>
                            18002709515<br/>
                            <span className={"text-xs font-600 text-[10px]"}>Mon to Fri - 9:00 am to 7:00 pm<br/>Sat - 9:00 am to 2:00 pm</span>
                        </span>
                        </div>
                        GST No: 06AAKCM3866F2Z9<br/>
                    </p>
                </div>
                <div className={"py-8 px-4"}>
                    <div className={"flex justify-between font-600 border-b pb-4"}>
                        <span className={"uppercase text-[15px] text-[#333]"}>order summary</span>
                        <span className={"text-[15px] text-[#333]"}><span className={"text-[13px]"}>Payment:</span>&nbsp;{order.payment_mode}</span>
                    </div>
                    <table className="mt-4">
                        <thead className={"bg-[#f9f9f9] text-[#222] text-[15px]"}>
                        <tr>
                            <th className={"p-1"} colSpan="4"/>
                            <th className="text-center border-b border-[#222] p-1" colSpan="3">{dataStore.currSymbol}</th>
                        </tr>
                        <tr>
                            <th className="text-center w-[10%] p-1">S.No.</th>
                            <th className="text-center w-[25%] p-1">Item Details</th>
                            <th className="text-center w-[10%] p-1">Size</th>
                            <th className="text-center w-[10%] p-1">Qty</th>
                            <th className="text-center w-[10%] p-1">Price</th>
                            <th className="text-center w-[10%] p-1">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            cart.map((item, index) => {
                                let price = curr === "INR" ? item.price : item.usd_price;
                                return <tr key={index} className={"text-[#777] text-[15px]"}>
                                    <td className="text-center">1</td>
                                    <td className="text-center">{item.name}<br/>{item.tagline}<br/>{item.color}<br/><span className={"text-xs"}>{item.size}</span></td>
                                    <td className="text-center">{item.size}</td>
                                    <td className="text-center">{item.qty}</td>
                                    <td className="text-center">{price}</td>
                                    <td className="text-center">{price * item.qty}</td>
                                </tr>
                            })
                        }

                        </tbody>
                        <tfoot className="font-600 text-[#777]">
                        <tr className="border-y">
                            <td colSpan="3" className={"p-2"}>Total</td>
                            <td colSpan="5" className="text-right font-600">{dataStore.currSymbol} {order.total}</td>
                        </tr>
                        {
                            order.discount ? <tr className={"border-y"}>
                                    <td colSpan="3" className={"p-2"}>Promo</td>
                                    <td colSpan="5" className="text-right">{dataStore.currSymbol} {order.discount}</td>
                                </tr>
                                : null
                        }
                        {
                            wallet && <>
                                <tr className={"border-y"}>
                                    <td colSpan="3" className={"p-2"}>Gross Total</td>
                                    <td colSpan="5" className="text-right">{dataStore.currSymbol} {gross}</td>
                                </tr>
                                <tr className={"border-y"}>
                                    <td colSpan="3" className={"p-2"}>Cash From Wallet</td>
                                    <td colSpan="5" className="text-right">{dataStore.currSymbol} {wallet}</td>
                                </tr>
                            </>
                        }
                        {
                            order.payment_mode === "COD" && <tr className={"border-y"}>
                                <td colSpan="3" className={"p-2"}>Cod Handling Charges**</td>
                                <td colSpan="5" className="text-right">{dataStore.currSymbol} 80</td>
                            </tr>
                        }
                        {
                            order.delivery_charges - (order.payment_mode === "COD" ? 80 : 0) ? <tr className={"border-y"}>
                                    <td colSpan="3" className={"p-2"}>Shipping Charges**</td>
                                    <td colSpan="5" className="text-right">{dataStore.currSymbol} {order.delivery_charges - 80}</td>
                                </tr>
                                : null
                        }
                        <tr className={"border-y"}>
                            <td colSpan="3" className={"p-2"}>Amount Payable *</td>
                            <td colSpan="5" className="text-right">{dataStore.currSymbol} {order.pending_amount}</td>
                        </tr>
                        <tr className={"border-y"}>
                            <td colSpan="8" className="p-2">
                                <span className={"block"}>* Inclusive GST</span>
                                <span className={"block"}>** Not Refundable</span>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>

            </div>
            <div className="grid place-items-center p-10">
                <Link href={"/new-arrivals/all"}>
                    <button className={"text-sm bg-black text-white py-2 px-4 uppercase"}>
                        continue shopping
                    </button>
                </Link>
            </div>
            <Footer isMobile={mobile} minimal/>
        </>
    );
};

export default Thankyou;