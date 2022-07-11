import React, {Fragment, useContext} from 'react';
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import AppWideContext from "../../../store/AppWideContext";
import Image from "next/image";
import Link from "next/link";
import {CartModal} from "../../../components/sidebar/SidebarMenuCart";

const product = {
    price: 3000,
    title: 'Poise',
    subtitle: 'Dress with Boning Details',
    color: 'powder blue',
    size: 'Tailored (Siz:S, SLe:EB)',
    qty: 1

}
const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;


function HomepageCartPage() {
    const {dataStore} = useContext(AppWideContext);
    let totalPrice = 0
    const mobileView = (
        <>
            <div className="px-2 py-2 m-2 border-solid border-2 border-neutral-300">
            <span className={"flex justify-between"}>
                <span> YOUR CART: </span>
                <span>Rs. {totalPrice}</span>
               <span>
                    <img
                        src={WEBASSETS + "/assets/images/cancel.png"}
                        alt="cancel"
                        className="w-5"
                    />
               </span>
            </span>
                <div className={"my-1 border-solid border-b-2 border-neutral-300"}/>
                <div className={"m-2"}>
                    <div className={"flex flex-row"}>
                        <div className={"image-container"}>
                            <img src="https://saltattire.com/assets/Dresses-Poise-DresswithBoningDetail/thumb.jpg"
                                 alt="DresswithBoningDetail"/>
                        </div>
                        <div className={"ml-2"}>
                            <p>Rs. {product.price}</p>
                            <p>{product.title}</p>
                            <p>{product.subtitle}</p>
                            <p>{product.color}</p>
                            <p>{product.size}</p>
                            <p>{product.qty}</p>
                            <span className={'flex gap-1.5 underline'}>
                            <button>
                            Edit
                        </button>
                        <button>
                            View
                        </button>
                        </span>
                            <div>
                                Qty : <span> - </span><span> - </span><span> + </span>
                            </div>
                        </div>
                        <div className={"flex items-center"}>
                            <img className={"h-4 w-4"} src={WEBASSETS + "/assets/images/cart_delete.png"} alt="cancel"/>
                        </div>
                    </div>
                </div>
            </div>
            <button>
                Continue<br/>SHOPPING
            </button>
            <button>
                Proceed&nbsp;to<br/>checkout
            </button>
            <div className="px-2 py-2 m-6 border-solid border-4 border-neutral-300">
                <h2>
                    our return policy
                </h2>
                <p>
                    Money Back Guarantee For Pre-paid.
                    <br/>You can exchange the size,
                    <br/>get a store credit or get a full refund For Pre-paid.
                    <br/>No questions asked.
                </p>
            </div>

        </>
    );

    return <CartModal isMobile={true}/>
}

export default HomepageCartPage;

