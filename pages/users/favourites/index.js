import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import {useRouter} from "next/router";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import UserPageTemplate from "../../../components/user/UserPageTemplate";
import Image from "next/image";
import {isMobile} from "react-device-detect";
import {apiCall} from "../../../helpers/apiCall";
import formatTwoDecimal from "../../../helpers/formatTwoDecimal";
import UsersMenu from "../../../components/user/UsersMenu";
import Link from "next/link";


function UsersFavouritesPage() {

    const [mobile, setMobile] = useState(false);
    const router = useRouter();
    const {dataStore} = useContext(AppWideContext);
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [favProductData, setFavProductData] = useState([])

    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])

    useEffect(() => {
        setMobile(isMobile)
    }, [])

    useEffect(()=>{
        const loadData = async (pid)=>{
            const favCall = await apiCall("getProduct",dataStore.apiToken,{product_id:pid})
            if(favCall.status===200 && favCall.response && favCall.response.product_id){
                const p = favCall.response
                return {
                    product_id: pid,
                    title: p.name,
                    img: "/assets/" + pid + "/thumb.jpg",
                    label: p.tag_line,
                    price: formatTwoDecimal(p.price),
                    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
                }
            } else
                return null
        }
        const newData = async ()=>{
            let newDataArray = []
            for(let x=0;x<dataStore.userServe.favorites.length;x++){
                const d = await loadData(dataStore.userServe.favorites[x])
                if(d)
                    newDataArray.push(d)
            }
            return newDataArray
        }
        if(dataStore.userData.contact
            && dataStore.userServe
            && dataStore.userServe.favorites
            && dataStore.userServe.favorites.length >0
            && favProductData.length===0
        ){
            newData()
                .then(resp=>setFavProductData(resp))
                .catch(e=>console.log(e.message))
        }
    },[dataStore.userData.contact, dataStore.userServe, dataStore.userServe.favorites, dataStore.userServe.favorites.length])

    console.log("-------------- DATASTORE",dataStore
    )

    const removeFromFav = async (i)=>{
        const queryO = {
            product: favProductData[i].product_id,
            email: dataStore.userData.contact,
            token: dataStore.apiToken
        }
        const removeCall = await apiCall("removeFromFav",dataStore.apiToken,queryO)
        if(removeCall.status === 200){
            setFavProductData(favProductData.filter((d,k)=> {
                return (k !== i)
            } ))
        }

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
                                        item.sizes.map((s,index) => <li key={index}>{s}</li>)
                                    }
                                </ul>
                                <span className={"text-m my-1 font-500"}> ADD TO BAG</span>
                            </div>
                            <div className={"mr-1 mt-1"}>
                                <Image src={WEBASSETS + "/assets/images/cancel.png"} alt="cart" width="16" height="16"/>
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
                                        item.sizes.map((s,index) => <li key={index}>{s}</li>)
                                    }
                                </ul>
                                <span className={"text-m my-1 font-500"}> ADD TO BAG</span>
                            </div>
                            <div className={"mr-1 mt-1"} onClick={()=>removeFromFav(index)}>
                                <Image src={WEBASSETS + "/assets/images/cancel.png"} alt="cart" width="16" height="16"/>
                            </div>
                        </div>
                    )
                })
            }
        </>)
    }

    /*
    @TODO AddToCart needs to be finished then add all to cart
     */
    const moveAllToCart = ()=>{

    }

    const mobileView = <UserPageTemplate mobile={true}>
        <p className="text-[28px] mb-2 ml-3">Favourites</p>
        {
            favProductData
                ? <>
                    <FavProdCardMobile favProduct={favProductData}/>
                    <div className={"flex flex-col"}>
                        <button className={"bg-[#222] py-3 mx-5 text-white"}>
                            MOVE ALL PRODUCTS TO BAG
                        </button>

                        <div className={"mt-4 text-center font-500"}>
                            <span className={"text-xs"}>&lt;</span> <span>BACK TO SHOPPING</span>
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
                        <FavProdCardBrowser favProduct={favProductData} />
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
            <Footer isMobile={mobile}/>
        </Fragment>
    )
}

export default UsersFavouritesPage;
