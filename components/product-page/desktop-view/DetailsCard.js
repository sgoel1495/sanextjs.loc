import React, {useContext, useState} from 'react';
import WishlistButton from "../../common/WishListButton";
import appSettings from "../../../store/appSettings";
import AppWideContext from "../../../store/AppWideContext";
import Link from "next/link";
import {apiCall} from "../../../helpers/apiCall";
import ReactDom from "react-dom";
//import MeasurementModal1 from "../../user/MeasurementModal1";
import SizeGuide from "../SizeGuide";
import Toast from "../../common/Toast";

/**
 * @Sambhav look at line 61. We need a bar(border) above and below if the size has been selected
 * @param data
 * @param hpid
 * @returns {JSX.Element}
 * @constructor
 */

const DetailsCard = ({ data, hpid }) => {
    const { dataStore, updateDataStore } = useContext(AppWideContext);
    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;
    const [deliveryAvailable,setDeliveryAvailable] = useState(null);
    const [pincode,setPinCode] = useState(null);
    const [sizeModal,setSizeModal]=useState(false);
    const [selectedSize,setSelectedSize]=useState(null);
    //for toast
    const [toastMsg,setToastMsg]=useState(null);
    const [showToast,setShowToast]=useState(false);


    const checkDelivery = async ()=>{
        if(pincode==null)
            return;
        const resp = await apiCall("cityByZipcode",dataStore.apiToken,{zipcode:pincode});
        setDeliveryAvailable( (resp.response_data && resp.response_data.city)?true:false )
    }

    const addToCart=async ()=>{
        //check if there is a size
        if(selectedSize==null || selectedSize==""){
            setToastMsg("Please select a size first")
            setShowToast(true)
            return
        }
        // lets add to cart
        /*
        "{
   ""user"" : { ""email"" : """",
     ""is_guest"" : true,
     ""temp_user_id"" : ""1599477182""
   },
   ""cart"" : { ""product_id"" : ""Tops-Colva-NotchNeckLinenTop"",
       ""size"" : ""M"",
       ""qty"" : ""1"",
       ""is_sale"" : ""false"",
       ""is_tailor"" : ""false"",
       ""sleeve_length"" : """",
       ""dress_length"" : """"
   },
  ""token"" : ""b16ee1b2bcb512f67c3bca5fac24a924fcc2241bcbfe19ddfdde33ecd24114a0""
}"

         */
        let userO = null;
        let tempId=null;
        if(!dataStore.userServe.temp_user_id || dataStore.userServe.temp_user_id==""){
            tempId=Date.now()
            dataStore.userServe.temp_user_id=tempId
            updateDataStore("userServe",dataStore.userServe)
        } else
            tempId=dataStore.userServe.temp_user_id

        if(dataStore.userData.contact){
            userO={ email : dataStore.userData.contact,
                is_guest : false,
                temp_user_id : tempId
            }
        } else {
            userO={ email : "",
                is_guest : true,
                temp_user_id : tempId
            }
        }

        const cart={ product_id : hpid,
            size : selectedSize,
            qty : "1",
            is_sale : false,
            is_tailor : false,
            sleeve_length : "",
            dress_length : ""
        }

        const resp = await apiCall("addToCart",dataStore.apiToken,{user:userO,cart:cart})
        if(resp.response && resp.response=="success") {
            setToastMsg("Added to Cart")
            setShowToast(true)
            // refresh the cart
            const respCart = await apiCall("getCart",dataStore.apiToken,{user:userO})
            if(respCart.response && Array.isArray(respCart.response))
                updateDataStore("userCart",respCart.response)
            console.log("Cart",respCart)
        }
        console.log("ADD TO CART RESP",resp)

    }

    return (
        <div>
            <div className={"bg-white p-4 shadow-xl"}>
                <div className={"flex items-center justify-between text-black/60 text-sm font-500 mb-4"}>
                    <span>{currencySymbol} {currCurrency === "inr" ? data.price : data.usd_price}</span>
                    <div className='flex items-center gap-2'>
                        <WishlistButton pid={hpid}/>
                        <span>Icon</span>
                    </div>
                </div>
                <div className={"text-center mb-4"}>
                    <p className={"text-2xl"}>{data.name}</p>
                    <p className={"text-sm text-black/50 font-500"}>{data.tag_line}</p>
                </div>

                <div className={"flex justify-between font-600 mb-4 text-black/60"}>
                    {["XS","S","M","L","XL","XXL"].map((item, index) => {
                        if (index > 0)
                            return <>
                                <span className={""} key={"div" + index}>|</span>
                                <span className={(selectedSize==item)?"":""} key={index} onClick={()=>setSelectedSize(item)}>{item}</span>
                            </>
                        return <span className={(selectedSize==item)?"":""} key={index}  onClick={()=>setSelectedSize(item)}>{item}</span>
                    })}
                </div>
                <p
                    className={"text-sm text-center uppercase mb-2 text-black/60 font-500 text-xs"}
                    onClick={()=>setSizeModal(true)}
                >
                    size guide
                </p>
                <div className={"flex justify-center items-center gap-2 font-700 text-sm text-black/60 mb-4"}>
                    <span className={"uppercase underline"}>tailor it</span>
                    <span className={""}>/</span>
                    <span className={"uppercase underline"}>customise</span>
                </div>
                <div className="flex items-center justify-center mb-5">
                    <button className="bg-black/90 text-white px-10 italic font-cursive text-xl pb-1 pt-3" onClick={addToCart}>
                        i&lsquo;ll take it
                    </button>
                </div>
                <div className={"flex items-center"}>
                    <span className='leading-none'>+</span>
                    <p className={"uppercase text-sm"}>product details</p>
                </div>
                <div className="flex items-center justify-center mb-5">5.0 ★ ★ ★ ★ ★</div>
                <div>
                    <span className={"block"}>More Colors</span>
                    <div className={"flex"}>
                        <span className={"w-10 h-10 rounded-full bg-[red]"} />
                        <span className={"w-10 h-10 rounded-full bg-[blue]"} />
                    </div>
                </div>
            </div>
            <div className={"bg-white mt-2 flex justify-evenly text-xs border-4 border-black/10 py-2"}>
                <Link href={"/salt/shipping-returns"}>
                    <a className={"uppercase underline"}>return policy</a>
                </Link>
                <Link href={"/salt/faq"}>
                    <a className={"uppercase underline"}>faq</a>
                </Link>
            </div>
            <div className={"bg-white mt-2 border-4 border-black/10 p-1"}>
                <p className={"text-[10px] tracking-tight font-600 mb-1"}> Please enter PIN to check delivery availability.</p>
                <div className={"inline-flex justify-between"}>
                    <input placeholder={"Enter pincode"} type="number"
                           className='border border-black text-sm w-3/5 placeholder:text-black font-500'
                           onChange={e=>setPinCode(e.target.value)}
                    />
                    <button
                        className={"bg-black text-white uppercase text-sm px-2"}
                        onClick={checkDelivery}
                    >Submit</button>
                </div>
                {(deliveryAvailable==null)
                    ?null
                    :(deliveryAvailable)
                    ?<div>Delivery Available!</div>
                    :<div>
                    Sorry! Delivery not available to this location.
                            <Link href="/salt/contact-us">
                                <a> Contact Us </a>
                            </Link>
                    if you do not see your pincode.
                    </div>
                }
            </div>
            {sizeModal &&
                ReactDom.createPortal(
                    <SizeGuide closeModal={()=>setSizeModal(false)} isMobile={dataStore.isMobile} />,
                    document.getElementById("measurementmodal"))
            }
            <Toast show={showToast} hideToast={() => {
                setShowToast(false)
            }}>
                <p>{toastMsg}</p>
            </Toast>
        </div>
    );
};

export default DetailsCard;