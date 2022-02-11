import React, {Fragment, useContext, useEffect, useState} from "react";
import useApiCall from "../../hooks/useApiCall";
import Image from "next/image";
import Link from "next/link";

/**
 * @todo API not available
 * @todo @Sambhav css pls
 * {currCurrency, currencySymbol, isMobile, apiToken } props
 */

function OurSaleSection(props){
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const [data, setData] = useState(null);
    const resp = useApiCall("giftcards", props.apiToken);
    useEffect(() => {
        if (resp
            && resp.hasOwnProperty("msg")
            && resp.msg == "found"
            && resp.hasOwnProperty("giftcards")
        )
            setData(resp.giftcards);
    }, [resp]);

    console.log("GIFT CARD DATA", data);

    const showSaleSection = ()=>{
        let sgc = null;
        if(data)
            data.forEach(product=>{
                sgc = <Fragment>
                    {sgc}
                    <Link href="/sale/Sweaters-Sale-Flurry-V-NeckSleevelessSweater">
                        <a>
                            <i className="fa fa-heart-o"></i>
                            <Image src={WEBASSETS + "/assets/Sweaters-Flurry-V-NeckSleevelessSweater/new.jpg"}
                                   alt="Sweaters-Sale-Flurry-V-NeckSleevelessSweater" width="400" height="400" />
                            <div>Flurry</div>
                            <div>v-neck sleevless sweater</div>
                            <div>
                                <div>SIZE</div>
                                <div>Only 13 left</div>
                                <div>(M,L,XL)</div>
                            </div>
                            <div>
                                <div>ADD TO BAG</div>
                                <div><span>{props.currencySymbol}1,950</span><span>{props.currencySymbol}1,268</span></div>
                            </div>
                        </a>
                    </Link>
                </Fragment>;
            });

        return sgc;
    }

    const mobileView = null;
    const browserView = <div>
    </div>;

    return <div>
        <div>OUR SALE SECTION</div>
        {showSaleSection()}
        <div> &gt; CLICK FOR MORE &lt; </div>
    </div>;

}

export default OurSaleSection;
