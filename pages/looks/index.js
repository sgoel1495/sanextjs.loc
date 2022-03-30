import React, {useContext, useEffect, useRef, useState} from 'react';
import PageHead from "../../components/PageHead";
import AppWideContext from "../../store/AppWideContext";
import Footer from "../../components/footer/Footer";
import useApiCall from "../../hooks/useApiCall";
import appSettings from "../../store/appSettings";
import Image from "next/image";
import Link from "next/link";
import BlockHeader from "../../components/common/blockHeader";
import WishListButton from "../../components/common/WishListButton";
import Header from "../../components/navbar/Header";

const LookDataBlockImage = (props) => (
    <span className={`block relative w-full h-full aspect-square`}>
        <Image src={props.src} alt={props.name} layout={`fill`} objectFit={`cover`} />
    </span>
)

// const data =[...Array(19).keys()]
//
// const renderData = data.reduce((all,one,i) => {
//     const ch = Math.floor(i/3);
//     all[ch] = [].concat((all[ch]||[]),one);
//     return all
// }, [])
//
// console.log(renderData);

function LooksPage() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext);
    const [data, setData] = useState(null);
    const [expandLook, setExpandLook] = useState(null);
    const expandedRef = useRef(null);

    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;

    /**
     *
     * @todo API issue. We have no idea about the number of products we should get. Please change the limit below accordingly
     */

    const resp = useApiCall("getLooksData", dataStore.apiToken, { look_id: "", limit: 10 });
    useEffect(() => {
        if (resp
            && resp.hasOwnProperty("status")
            && resp.status == 200
            && resp.hasOwnProperty("response")
            && resp.response.hasOwnProperty("prod")
            && resp.response.hasOwnProperty("look")
        )
            setData(resp.response);
    }, [resp]);

    React.useEffect(() => {
        if (expandedRef.current) {
            const element =
                expandedRef.current.getBoundingClientRect().top + window.scrollY - document.getElementsByClassName("navigator")[0].getBoundingClientRect().bottom
            window.scroll({
                top: element,
                behavior: "smooth"
            })
        }
    }, [expandLook])

    /*
    each look has
    after_color: ""
    bg_color: "#0c172f"
    bg_img_path: "/assets/look-757/Collage.v1.jpg"
    color: "#ffffff"
    details: "Aadya"
    heading: "Green Sheen"
    img_path: "/assets/look-757/Full.v1.jpg"
    is_img_left: false
    look_id: "look-757"
    name: "Green Sheen"
    products: ['Dresses-Aadya-RawSilkFestiveFitandA-LineDress']
    template: 2

    after_color: ""
    bg_color: "#5b4351"
    bg_img_path: "/assets/look-768/Collage.v1.jpg"
    color: "#ffffff"
    details: "Hibiscus,Earnest-Black"
    heading: "Subtle Floral"
    img_path: "/assets/look-768/Full.v1.jpg"
    is_img_left: true
    look_id: "look-768"
    name: "Subtle Floral"
    products: Array(2)
    0: "Tops-Hibiscus-FloralKnitV-NeckTop"
    1: "Pants-Earnest-Black-MidToHighRisePants"
    length: 2

    each product has
    category: "dresses"
    in_stock: "true"
    is_international: true
    name: "Aadya"
    price: 2850
    tag_line: "Raw Silk Festive Fit & A-Line Dress"
    usd_price: 50
     */
    const expandData = () => {

        const leadTextStyle = "text-h5 font-600";
        const textStyle = "text-xs";
        const buyNowButtonStyle = "bg-black/5 font-600 text-xs tracking-widest px-5 py-3 block mt-6";

        let products = null;
        let prod = null;
        let prodDetails = null;
        // the product
        if (expandLook.products && expandLook.products.length > 0) {
            prod = expandLook.products[0];
            prodDetails = data.prod[prod];
            products = (
                <>
                    <div className={`grid grid-cols-2 place-items-center`}>
                        <LookDataBlockImage src={WEBASSETS + "/assets/" + prod + "/square-crop.jpg"} alt={prodDetails.name} />
                        <div className={`text-center`}>
                            <p className={leadTextStyle}>{prodDetails.name}</p>
                            <p className={textStyle}>{prodDetails.tag_line}</p>
                            <p className={textStyle}>{currencySymbol}{(currCurrency === "inr") ? prodDetails.price : prodDetails.usd_price}</p>
                            <Link href={"/" + prod}>
                                <a className={`${buyNowButtonStyle}`}>BUY NOW</a>
                            </Link>
                        </div>
                    </div>
                </>
            );
        }
        // when the product has another item with it like top and bottom
        if (expandLook.products && expandLook.products.length > 1) {
            prod = expandLook.products[1];
            prodDetails = data.prod[prod];
            products = (
                <>
                    {products}
                    <div className={`grid grid-cols-2 place-items-center`}>
                        <div className={`text-center`}>
                            <p className={leadTextStyle}>{prodDetails.name}</p>
                            <p className={textStyle}>{prodDetails.tag_line}</p>
                            <p className={textStyle}>{currencySymbol}{(currCurrency === "inr") ? prodDetails.price : prodDetails.usd_price}</p>
                            <Link href={"/" + prod}>
                                <a className={`${buyNowButtonStyle}`}>BUY NOW</a>
                            </Link>
                        </div>
                        <LookDataBlockImage src={WEBASSETS + "/assets/" + prod + "/square-crop.jpg"} alt={prodDetails.name} />
                    </div>
                </>
            );
        }
        return (
            <div className={`col-span-3 relative`} ref={expandedRef}>
                <button
                    onClick={() => setExpandLook(null)}
                    className={`absolute top-0 right-0 uppercase float-right text-black/50 flex gap-x-2`}
                >
                    Close
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6`} fill={"currentColor"} viewBox="0 0 24 24">
                        <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z" />
                    </svg>
                </button>
                <BlockHeader
                    space={"py-10"}
                    titleStyle={"font-600 flex justify-center items-center gap-3 leading-none"}
                >
                    <span className={"text-h1"}>~</span>
                    <span className={'font-cursive italic text-h1'}>{expandLook.heading}</span>
                    <span className={"text-h1"}>~</span>
                </BlockHeader>
                <div className={`grid grid-cols-2`}>
                    <LookDataBlockImage src={WEBASSETS + expandLook.img_path} alt={expandLook.name} />
                    <div className={`place-self-center bg-white h-fit w-2/3`}>
                        {products}
                    </div>
                </div>
            </div>
        );
    }

    const lookData = () => {
        let showLookData = null;
        let look_ids = []
        if (!data || !data.hasOwnProperty("look") || data.look.length < 1) return null;
        else {
            data.look.forEach((look, index) => {
                look_ids.push(look.look_id)
                showLookData = (
                    <>
                        {showLookData}
                        <div
                            onClick={() => setExpandLook(look)}
                            className={`relative group cursor-pointer z-0`}
                        >
                            <WishListButton className={`absolute right-4 top-4 z-10`} />
                            <LookDataBlockImage src={WEBASSETS + look.img_path} alt={look.name} />
                            <div className={"hidden group-hover:grid place-items-center absolute inset-0 opacity-95 text-white text-center font-600 tracking-wider"}
                                style={{ background: look.bg_color }}>
                                <div className={`self-end`}>
                                    <p className={`mb-2 text-h5`}>{look.heading}</p>
                                    <p className={`text-h5 font-cursive italic`}>{look.details}</p>
                                </div>
                                <p className={`uppercase text-sm`}>{'>'} Shop the look</p>
                            </div>
                        </div>
                        {(index % 3 === 2 && expandLook && look_ids.slice(index - 2, index + 1).includes(expandLook.look_id)) ? expandData() : null}
                    </>
                );
            });
        }
        return showLookData;
    }

    const mobileView = null;
    const browserView = (
        <>
            <PageHead url="/looks" id="looks" isMobile={dataStore.mobile}/>
            <Header type={"mimoto"}/>
            <section className={`bg-[#E6E1DB] py-20`}>
                <BlockHeader
                    space={"py-5"}
                    titleStyle={"text-center py-10 tracking-wider"}
                >
                    <h3 className={`text-h4 font-600`}>SHOP THE LOOK</h3>
                    <h4 className={`text-h6 text-[#a76b2c] uppercase leading-none font-600`}>Looks <span className={`font-cursive italic text-h3 lowercase`}>we</span> Love</h4>
                </BlockHeader>
                <main className={`px-10 grid grid-cols-3 gap-7`}>
                    {(data) ? lookData() : null}
                </main>
            </section>
            <Footer isMobile={dataStore.mobile} />
        </>
    );

    return dataStore.mobile ? mobileView : browserView
}


export default LooksPage;
