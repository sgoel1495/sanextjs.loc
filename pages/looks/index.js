import React, {Fragment, useContext, useEffect, useState} from 'react';
import LooksNavbar from "../../components/navbar/LookNavbar";
import PageHead from "../../components/PageHead";
import AppWideContext from "../../store/AppWideContext";
import InfoBand from "../../components/info-band/InfoBand";
import Footer from "../../components/footer/Footer";
import useApiCall from "../../hooks/useApiCall";
import appSettings from "../../store/appSettings";
import Image from "next/image";
import Link from "next/link";

function LooksPage() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [data, setData] = useState(null);
    const [expandLook, setExpandLook] = useState(null);

    const currCurrency = dataStore.currCurrency;
    const currencyData = appSettings("currency_data");
    const currencySymbol = currencyData[currCurrency].curr_symbol;

    const resp = useApiCall("getLooksData",dataStore.apiToken,{look_id:"",limit:10});
    useEffect(()=>{
       if (resp
            && resp.hasOwnProperty("status")
            && resp.status == 200
            && resp.hasOwnProperty("response")
            && resp.response.hasOwnProperty("prod")
            && resp.response.hasOwnProperty("look")
        )
            setData(resp.response);
    },[resp]);


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
    const expandData = ()=>{
        let products = null;
        let prod = null;
        let prodDetails = null;
        if(expandLook.products && expandLook.products.length>0) {
            prod = expandLook.products[0];
            prodDetails = data.prod[prod];
            console.log(prodDetails);
            products = <Fragment>
                <div>
                    <div>
                        <Image src={WEBASSETS + "/assets/" + prod + "/square-crop.jpg"}
                               alt={prodDetails.name}  width="200" height="200" />
                    </div>
                    <div>
                        <div>{prodDetails.name}</div>
                        <div>{prodDetails.tag_line}</div>
                        <div>{currencySymbol}{(currCurrency == "inr") ? prodDetails.price : prodDetails.usd_price}</div>
                        <Link href={"/" + prod}>
                            <a>BUY NOW</a>
                        </Link>
                    </div>
                </div>
            </Fragment>;
        }
        if(expandLook.products && expandLook.products.length>1) {
            prod = expandLook.products[1];
            prodDetails = data.prod[prod];
            products = <Fragment>
                {products}
                <div>
                    <div>
                        <div>{prod.name}</div>
                        <div>{prod.tag_line}</div>
                        <div>{currencySymbol}{(currCurrency == "inr") ? prod.price : prod.usd_price}</div>
                        <Link href={"/" + prod}>
                            <a>BUY NOW</a>
                        </Link>
                    </div>
                    <div>
                        <Image src={WEBASSETS + "/assets/" + prod + "/square-crop.jpg"}
                               alt={prodDetails.name}  width="200" height="200" />
                    </div>
                </div>
            </Fragment>;
        }
        return <div>
            <div onClick={()=>setExpandLook(null)}>CLOSE</div>
            <div>~ {expandLook.heading} ~</div>
            <div>
                <div>
                    <Image src={WEBASSETS + expandLook.img_path} alt={expandLook.name}  width="200" height="200" />
                </div>
                <div>
                    {products}
                </div>
            </div>
        </div>;
    }

    const lookData =()=>{
        let showLookData = null;
        if(!data || !data.hasOwnProperty("look") || data.look.length < 1)
            return null;
        else {
            data.look.forEach(look=>{
               showLookData =  <Fragment>
                   {showLookData}
                   <div onClick={()=>setExpandLook(look)}>
                       <Image src={WEBASSETS + look.img_path} alt={look.name}  width="200" height="200" />
                       <div>Heading {look.heading}</div>
                       <div>Detail {look.details}</div>
                   </div>
                   {(expandLook && expandLook.look_id == look.look_id) ? expandData() : null }
               </Fragment>;
            });
        }
        return showLookData;
    }

    const mobileView = null;
    const browserView = <Fragment>
        <PageHead url="/looks" id="looks" isMobile={dataStore.mobile}/>
        <div>
            <InfoBand />
            <LooksNavbar isMobile={dataStore.mobile}/>
        </div>
        <div>
            <div>SHOP THE LOOK</div>
            <div>LOOKS <span>WE</span> LOVE</div>
        </div>
        {(data) ? lookData():null}

        <Footer isMobile={dataStore.mobile}/>
    </Fragment>;

    return dataStore.mobile ? mobileView : browserView
}


export default LooksPage;
