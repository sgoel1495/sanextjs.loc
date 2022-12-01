import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import returnSizes, {isInStock} from "../../../../helpers/returnSizes";
import {addToCart, getUserObject} from "../../../../helpers/addTocart";
import Toast from "../../../common/Toast";
import {connect} from "react-redux";
import {setCart} from "../../../../ReduxStore/reducers/shoppingCartSlice";
import ReactDom from "react-dom";
import NotifyMeModal from "../../../common/NotifyMeModal";
import SizeGuide from "../../SizeGuide";
import AskStylist from "../AskStylist";
import PriceDisplay from "../../../common/PriceDisplay";
import {addCartIntent} from "../../../../ReduxStore/reducers/intentSlice";

const DetailsSection = ({theme, data, selectedSize, setSelectedSize, hasLooks, ...props}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const [selected, setSelected] = useState(0)
    const [toastMsg, setToastMsg] = useState(null)
    const [showToast, setShowToast] = useState(false)
    const [showNotifyMe, setShowNotifyMe] = useState(false)
    const [sizeModal, setSizeModal] = useState(false)
    let description
    switch (selected) {
        case 0:
            description = data['description']
            break;
        case 1:
            description = data['details']
            break;
        case 2:
            description = [...data['fabric'], ...data['fabric_care']]
            break;
    }

    let feature_icons = {}
    const sizeData = returnSizes(data);
    data.icon_assets.forEach((icon) => {
        feature_icons = {...feature_icons, ...icon}
    })
    let tags = Object.keys(data).map((key) => {
        if (key.startsWith('filter') && key !== "filter-collection" && key !== "filter-multi-color" && data[key]) {
            return {
                "display": data[key].replace("-", " ") + (key.includes("sleeve") ? " Sleeves" : "") + (key.includes("fit") ? " Fit" : ""),
                "value": data[key]
            }
        }
    }).filter((key) => key)

    const saveToCart = async () => {
        if ((selectedSize == null || selectedSize === "") && !(sizeData.length === 1 && sizeData[0] === "F")) {
            setToastMsg("Please select a size first")
            setShowToast(true)
            return
        }
        const cart = {
            product_id: data.product_id ? data.product_id : data.asset_id,
            size: sizeData.length === 1 && sizeData[0] === "F" ? "f" : selectedSize,
            qty: "1",
            is_sale: false,
            is_tailor: false,
            sleeve_length: "",
            dress_length: ""
        }
        addToCart(props.userData, props.shoppingCart.cart, props.appConfig.apiToken, props.setCart, {cart: cart}).then(r => {
            if(r) {
                setToastMsg("Added to Cart")
                props.addCartIntent()
            }
            else{
                setToastMsg("Please try again")
            }
            setShowToast(true)
        })
    }

    const whatSizes = () => {

        let returnValue = null
        sizeData.forEach((size, index) => {
            returnValue = <>
                {returnValue}
                <span key={"item" + index}
                      className={"py-1.5 px-3.5 " + [(selectedSize == size) ? "border border-black text-black cursor-pointer" : "cursor-pointer border-t border-b border-transparent"] + [data.hide_sizes.includes(size.toLowerCase()) ? " line-through" : ""]}
                      onClick={() => data.hide_sizes.includes(size.toLowerCase()) ? {} : setSelectedSize(size)}
                >
                    {size}
                </span>
            </>
        })
        return <div className={"flex justify-between font-600 mb-4 text-black/60"}>
            {returnValue}
        </div>
    }

    return (
        <div className={[`flex-[5] p-4 text-${theme}`]}>
            <div className={"flex justify-between px-10"}>
                <span className={"block"}><PriceDisplay prod={data} isSale={data.product_id.split("-")[1] === "Sale"}/></span>
                <span className={"block"}>SHARE</span>
            </div>
            <div className="flex flex-col items-center text-center mt-20">
                <p className={"text-4xl font-600"}>{data.name}</p>
                <p className={"text-xl"}>{data.tag_line}</p>
                {
                    sizeData.length === 1 && sizeData[0] === "F" ?
                        null
                        :
                        <>
                            <div className={"my-5 flex items-center justify-center gap-10"}>
                                {whatSizes()}
                            </div>
                            <p className={"uppercase font-500 mb-4 cursor-pointer"} onClick={() => setSizeModal(true)}>size guide</p>
                        </>

                }
                {
                    ((data.show_sale_price && data.show_sale_price.toString() === "true") || data.product_id.split("-")[1] === "Sale") && <div className={"text-center mb-3"}>
                        <p className="text-[#f05c74] text-sm font-500">NOT VALID FOR RETURN / EXCHANGE</p>
                    </div>
                }
                {
                    isInStock(data) ||
                    <div className={"text-white bg-black text-[13px] mb-6 px-12 uppercase"}>
                        sold out
                    </div>
                }
                <button className={`border-2 border-${theme} w-10/12 hover:bg-black hover:text-white font-cursive italic font-600 pt-3 pb-1 text-2xl`}
                        onClick={() => {
                            if (isInStock(data))
                                saveToCart()
                            else
                                setShowNotifyMe(true)
                        }}
                >
                    {
                        isInStock(data) ?
                            <>i&lsquo;ll take it!</>
                            :
                            <>notify me!</>
                    }
                </button>
            </div>
            <div className={"flex flex-wrap justify-center my-10"}>
                {Object.keys(data.icons_fea).filter(key => data.icons_fea[key]).map((key, index) => (
                    <div className={"text-center flex flex-col justify-center items-center w-[33%]"} key={index}>
                        <div className={"relative aspect-square h-11 grayscale fill-black"}>
                            <Image src={WEBASSETS + feature_icons[key]} alt='' layout={"fill"} objectFit={`cover`}/>
                        </div>
                        <span className={"block"}>{key.replace("9_", "9-").replace(/_/g, " ")}</span>
                    </div>
                ))}
            </div>
            <div className='flex items-center flex-wrap justify-start'>
                {tags.map((item, index) => {
                    return <Link href={"/group/" + item.value} key={index}>
                        <p className={"rounded-full bg-[#d3d3d35c] py-2 px-5 text-black font-500 mr-4 mb-4 capitalize cursor-pointer"} key={index}>{item.display}</p>
                    </Link>
                })}
            </div>
            <div className='my-8'>
                <div className={"flex items-end justify-start gap-10 font-600 mb-2"}>
                    <p className={"uppercase cursor-pointer relative " + [selected === 0 && "description-active"]} onClick={() => setSelected(0)}>Description</p>
                    <p className={"uppercase cursor-pointer relative " + [selected === 1 && "description-active"]} onClick={() => setSelected(1)}>details</p>
                    <p className={"uppercase cursor-pointer relative " + [selected === 2 && "description-active"]} onClick={() => setSelected(2)}>fabric & care</p>
                </div>
                <ul className='list-disc text-sm font-500 pl-5'>
                    {description.map((value, index) => value.length > 0 && <li className={""} key={index}>{value}</li>)}
                </ul>
            </div>
            <p className={"text-center font-500 text-sm mb-5"}>At SALT you can customize and tailor make your clothing</p>
            <div className={"flex mb-8"}>
                <div className={"text-center flex flex-col justify-center items-center w-[33%]"}>
                    <div className={"relative aspect-square h-11"}>
                        <Image src={WEBASSETS + "/assets/images/measure_yourself.svg"} alt='' layout={"fill"} objectFit={`cover`}/>
                    </div>
                    <p className={"font-600 text-sm"}>MADE TO MEASURE</p>
                </div>
                <div className={"text-center flex flex-col justify-center items-center w-[33%]"}>
                    <div className={"relative aspect-square h-11"}>
                        <Image src={WEBASSETS + "/assets/images/free_shipping.svg"} alt='' layout={"fill"} objectFit={`cover`}/>
                    </div>
                    <p className={"font-600 text-sm"}>FREE SHIPPING</p>
                </div>
                <div className={"text-center flex flex-col justify-center items-center w-[33%]"}>
                    <div className={"relative aspect-square h-11"}>
                        <Image src={WEBASSETS + "/assets/images/perfect_fit.svg"} alt='' layout={"fill"} objectFit={`cover`}/>
                    </div>
                    <p className={"font-600 text-sm"}>PERFECT FIT GUARANTEE</p>
                </div>
            </div>
            <div className={"flex justify-between items-center text-sm"}>
                <AskStylist product={data}/>
                {
                    hasLooks && <a className={"uppercase font-500 hover:underline"} href={"#complete-the-look"}>complete the look</a>
                }
            </div>
            <Toast show={showToast} hideToast={() => {
                setShowToast(false)
            }}>
                <p>{toastMsg}</p>
            </Toast>
            {sizeModal &&
                ReactDom.createPortal(
                    <SizeGuide closeModal={() => setSizeModal(false)} isMobile={props.appConfig.isMobile}/>,
                    document.getElementById("measurementmodal"))
            }
            {showNotifyMe &&
                ReactDom.createPortal(
                    <NotifyMeModal
                        closeModal={() => setShowNotifyMe(false)}
                        isMobile={props.appConfig.isMobile}
                        userO={getUserObject(props.userData)}
                        product={data}
                    />,
                    document.getElementById("measurementmodal"))
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        shoppingCart: state.shoppingCart,
        appConfig: state.appConfig,
        userConfig: state.userConfig
    }
}

export default connect(mapStateToProps, {setCart,addCartIntent})(DetailsSection);