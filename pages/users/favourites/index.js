import React, {Fragment, useContext, useEffect, useReducer, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import {useRouter} from "next/router";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import UserPageTemplate from "../../../components/user/UserPageTemplate";
import Image from "next/image";
import {isMobile} from "react-device-detect";
import {apiCall} from "../../../helpers/apiCall";
import UsersMenu from "../../../components/user/UsersMenu";
import Link from "next/link";
import Toast from "../../../components/common/Toast";
import {addToCart} from "../../../helpers/addTocart";


function UsersFavouritesPage() {

    const [mobile, setMobile] = useState(false);
    const router = useRouter();
    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [favProductData, setFavProductData] = useState([])
    const [favorites, setFavorites] = useState([])
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState("")
    const [selectedSize, setSelectedSize] = useReducer((state, payload) => {
        return {...state, ...payload}
    }, {})


    const loadData = async (pid) => {
        const favCall = await apiCall("getProduct", dataStore.apiToken, {product_id: pid})
        if (favCall.status === 200 && favCall.response && favCall.response.product_id) {
            const p = favCall.response
            return {
                product_id: pid,
                title: p.name,
                img: "/assets/" + pid + "/thumb.jpg",
                label: p.tag_line,
                price: p.price,
                sizes: ["XS", "S", "M", "L", "XL", "XXL"],
                in_stock: p.in_stock === "true",
                sleeve_length: p.sleeve_length,
                dress_length: p.dress_length
            }
        } else
            return null
    }
    const newData = async () => {
        let newDataArray = []
        for (let x = 0; x < favorites.length; x++) {
            const d = await loadData(favorites[x])
            if (d)
                newDataArray.push(d)
        }
        return newDataArray
    }

    // useEffect(() => {
    //     if (dataStore.userData.contact == null)
    //         router.replace("/"); //illegal direct access
    // }, [dataStore.userData.contact, router])

    useEffect(() => {
        setMobile(isMobile)
    }, [])

    useEffect(() => {
        apiCall("userServe", dataStore.apiToken, {contact: dataStore.userData.contact})
            .then(pData => {
                if (pData.status === 200 && pData.response) {
                    setFavorites(pData.response.favorites)
                }
            })
            .catch(e => console.log(e.message))
    }, [dataStore.userData.contact, dataStore.apiToken]);


    useEffect(() => {

        if (dataStore.userData.contact) {
            newData()
                .then(resp => setFavProductData(resp))
                .catch(e => console.log(e.message))
        }
    }, [favorites])

    const removeFromFav = async (i) => {
        const queryO = {
            product: favProductData[i].product_id,
            email: dataStore.userData.contact,
            token: dataStore.apiToken
        }
        const removeCall = await apiCall("removeFromFav", dataStore.apiToken, queryO)
        if (removeCall.status === 200) {
            setFavProductData(favProductData.filter((d, k) => {
                return (k !== i)
            }))
        }
    }

    const addToBag = (index) => {
        if (!favProductData[index].in_stock) {
            setShow(true)
            setMessage(favProductData[index].title + " is SOLD OUT")
        }
        if (!selectedSize[favProductData[index].product_id]) {
            setShow(true)
            setMessage("Please Select a Size")
        }
        const cart = {
            "product_id": favProductData[index].product_id,
            "size": selectedSize[favProductData[index].product_id],
            "qty": 1,
            "is_sale": false,
            "is_tailor": false,
            "sleeve_length": favProductData[index].sleeve_length,
            "dress_length": favProductData[index].dress_length
        }
        addToCart(dataStore, updateDataStore, {cart: cart}).then(r => {
            setMessage(`${favProductData[index].title}: Size ${selectedSize[favProductData[index].product_id]} moved to your Bag!`)
            setShow(true)
            removeFromFav(index)
        })

    }

    const FavProdCardMobile = ({favProduct}) => {
        return (<>
            {
                favProduct.map((item, index) => {
                    return (
                        <div className={"m-3 flex gap-3"} key={index}>
                            <div>
                                <Image src={WEBASSETS + item.img} alt="cart" width="54" height="88"/>
                            </div>
                            <div className={"flex flex-1 flex-col text-[#777]"}>
                                <span> {item.title} </span>
                                <span> {item.label} </span>
                                <span> {item.price} </span>
                                <ul className={"flex justify-between my-1"}>
                                    {
                                        item.sizes.map((s, index) => <li key={index} className={"p-2 " + [selectedSize[item.product_id] === s && "border-[1px] border-[#777]"]}
                                                                         onClick={() => setSelectedSize({[item.product_id]: s})}>{s}</li>)
                                    }
                                </ul>
                                <span className={"text-m my-1 font-500"} onClick={() => addToBag(index)}> ADD TO BAG</span>
                            </div>
                            <div className={"mr-1 mt-1"}>
                                <Image onClick={() => removeFromFav(index)} src={WEBASSETS + "/assets/images/cancel.png"} alt="cart" width="16" height="16"/>
                            </div>
                        </div>
                    )
                })
            }
        </>)
    }
    const FavProdCardBrowser = ({favProduct}) => {
        return (<>
            {
                favProduct.map((item, index) => {
                    return (
                        <div className={"m-3 flex gap-3"} key={index}>
                            <div>
                                <Image src={WEBASSETS + item.img} alt="cart" width="54" height="88"/>
                            </div>
                            <div className={"flex flex-1 flex-col text-[#777]"}>
                                <span> {item.title} </span>
                                <span> {item.label} </span>
                                <span> {item.price} </span>
                                <ul className={"flex justify-between my-1"}>
                                    {
                                        item.sizes.map((s, index) => <li key={index}>{s}</li>)
                                    }
                                </ul>
                                <span className={"text-m my-1 font-500"}> ADD TO BAG</span>
                            </div>
                            <div className={"mr-1 mt-1"} onClick={() => removeFromFav(index)}>
                                <Image src={WEBASSETS + "/assets/images/cancel.png"} alt="cart" width="16" height="16"/>
                            </div>
                        </div>
                    )
                })
            }
        </>)
    }

    const moveAllToCart = async () => {
        let msg = []
        let toBeRemoved = []
        for (let i in favProductData) {
            if (!favProductData[i].in_stock) {
                msg.push(<p>{favProductData[i].title + " is SOLD OUT"}</p>)
                continue
            }
            if (!selectedSize[favProductData[i].product_id]) {
                msg.push(<p>Please Select a Size</p>)
                continue
            }
            const cart = {
                "product_id": favProductData[i].product_id,
                "size": selectedSize[favProductData[i].product_id],
                "qty": 1,
                "is_sale": false,
                "is_tailor": false,
                "sleeve_length": favProductData[i].sleeve_length,
                "dress_length": favProductData[i].dress_length
            }
            let resp = addToCart(dataStore, updateDataStore, {cart: cart})
            if (resp) {
                msg.push(<p>{`${favProductData[i].title}: Size ${selectedSize[favProductData[i].product_id]} moved to your Bag!`}</p>)
                toBeRemoved.push(favProductData[i].product_id)
            }
        }
        if (msg.length) {
            setShow(true)
            setMessage(msg)
        }
        if (toBeRemoved.length) {
            toBeRemoved.forEach((item) => {
                const queryO = {
                    product: item,
                    email: dataStore.userData.contact,
                    token: dataStore.apiToken
                }
                apiCall("removeFromFav", dataStore.apiToken, queryO)
            })
            setFavProductData(favProductData.filter((item) => !toBeRemoved.includes(item.product_id)))
        }
    }

    const mobileView = <UserPageTemplate mobile={true}>
        <p className="text-[28px] mb-2 ml-3">Favourites</p>
        {
            favProductData.length
                ? <>
                    <FavProdCardMobile favProduct={favProductData}/>
                    <div className={"flex flex-col"}>
                        <button className={"bg-[#222] py-3 mx-5 text-white"} onClick={moveAllToCart}>
                            MOVE ALL PRODUCTS TO BAG
                        </button>

                        <div className={"mt-4 text-center font-500"}>
                            <Link href={"/new-arrivals/all"}>
                                <span className={"text-xs"}>&lt;</span> <span>BACK TO SHOPPING</span>
                            </Link>
                        </div>
                    </div>
                </>
                : <p className="text-[#777] text-lg mx-5">No Favourites Found!</p>
        }
    </UserPageTemplate>
    const browserView = (
        <div className="xl:w-3/5 mx-auto flex divide-x items-start gap-x-8 min-h-[80vh]">
            <div className="flex-1 py-3">
                <UsersMenu/>
            </div>
            <div className="pl-8 flex-[3] flex flex-col items-start gap-4">
                {favProductData
                    ? <>
                        <p className="text-[28px] mb-2">Favourites</p>
                        <p className="text-[28px] mb-2">
                            <span>PRODUCTS</span>
                            <span>PRICE</span>
                            <span>SIZE</span>
                            <span>BAG</span>
                        </p>
                        <FavProdCardBrowser favProduct={favProductData}/>
                        <div className={"flex flex-col"}>
                            <button onClick={moveAllToCart} className={"bg-[#222] py-3 mx-5 text-white"}>
                                MOVE ALL PRODUCTS TO BAG
                            </button>

                            <div className={"mt-4 text-center font-500"}>
                                <span className={"text-xs"}>&lt;</span> <Link href={"/new-arrivals/all"}>BACK TO SHOPPING</Link>
                            </div>
                        </div>

                    </>
                    : <p className="text-[#777] text-lg">No Favourites Found!</p>
                }
            </div>
        </div>
    )
    return (
        <Fragment>
            <PageHead url={"/users/favourites"} id={"profile"} isMobile={mobile}/>
            <Header type={mobile ? "minimal" : "shopMenu"} isMobile={mobile}/>
            {(mobile) ? mobileView : browserView}
            <Footer isMobile={mobile} minimal={true}/>
            <Toast show={show} hideToast={() => setShow(false)}>
                {message}
            </Toast>
        </Fragment>
    )
}

export default UsersFavouritesPage;
