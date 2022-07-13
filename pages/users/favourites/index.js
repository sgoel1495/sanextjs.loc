import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import {useRouter} from "next/router";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import UserPageTemplate from "../../../components/user/UserPageTemplate";
import Image from "next/image";
import {isMobile} from "react-device-detect";

const mockData = [
    {
        title: "Aurora",
        img: "/assets/Tops-Aurora-V-neckTop/thumb.jpg",
        label: "V-neck Top",
        price: "2,150",
        sizes: ["XS", "S", "M", "L", "XL", "XXL",]
    }, {
        title: "Aurora",
        img: "/assets/Tops-Aurora-V-neckTop/thumb.jpg",
        label: "V-neck Top",
        price: "2,150",
        sizes: ["XS", "S", "M", "L", "XL", "XXL",]
    },
]


function UsersFavouritesPage() {
    const [mobile, setMobile] = useState(false);
    const router = useRouter();
    const {dataStore} = useContext(AppWideContext);
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    // const [favProductData, setFavProductData] = useState(mockData)

    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])

    useEffect(() => {
        setMobile(isMobile)
    }, [])
    const FavProdCard = ({favProduct}) => {
        return (<>
            {
                favProduct.map((item, index) => {
                    return (
                        <div className={"m-3 flex gap-3"}>
                            <div>
                                <Image src={WEBASSETS + item.img} alt="cart" width="54" height="88"/>
                            </div>
                            <div className={"flex flex-1 flex-col text-[#777]"}>
                                <span> {item.title} </span>
                                <span> {item.label} </span>
                                <span> {item.price} </span>
                                <ul className={"flex justify-between my-1"}>
                                    {
                                        item.sizes.map(s => <li>{s}</li>)
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

    const mobileView = <UserPageTemplate mobile={true}>
        <p className="text-[28px] mb-2 ml-3">Favourites</p>
        {
            mockData
                ? <>
                    <FavProdCard favProduct={mockData}/>
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
        <UserPageTemplate>
            <p className="text-[28px] mb-2">Favourites</p>
            <p className="text-[#777] text-lg">No Favourites Found!</p>
        </UserPageTemplate>
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
