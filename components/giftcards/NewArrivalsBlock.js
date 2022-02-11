import React, {Fragment, useContext, useEffect, useState} from "react";
import useApiCall from "../../hooks/useApiCall";
import Image from "next/image";
import Link from "next/link";


/**
 * @todo API not available
 * @todo @Sambhav css pls
 * {currCurrency, currencySymbol, isMobile, apiToken } props
 */

function NewArrivalsBlock(props){
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

    const showNewArrivals = ()=>{
        let sgc = null;
        if(data)
            data.forEach(product=>{
                sgc = <Fragment>
                    {sgc}
                    <Link href="/sale/Sweaters-Sale-Flurry-V-NeckSleevelessSweater">
                        <a>
                            <i className="fa fa-heart-o"></i>
                            <Image src={WEBASSETS + "/assets/Dresses-Crimson-Dream-FauxWrapPleatedMidiDress/new.jpg"}
                                 alt="Dresses-Crimson-Dream-FauxWrapPleatedMidiDress" width="400" height="400" />
                            <div>Crimson Dream</div>
                            <div>faux wrap pleated midi dress</div>
                            <div>
                                <div>SIZE</div>
                            </div>
                            <div>
                                <div>ADD TO BAG</div>
                                <div>{props.currencySymbol}1,268</div>
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
        <div>NEW ARRIVALS</div>
        {showNewArrivals()}
        <div> &gt; CLICK FOR MORE &lt; </div>
    </div>;

}

export default NewArrivalsBlock;
