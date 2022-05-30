import React, {Fragment, useContext, useEffect, useState} from "react";
import useApiCall from "../../hooks/useApiCall";
import Image from "next/image";
import Link from "next/link";
import BlockHeader from "../common/blockHeader";
import WishListButton from "../common/WishListButton";

/**
 * @todo API: Image paths are not correct
  * {currCurrency, currencySymbol, isMobile, apiToken } props
 */

const ImageBlock = (props) => (
    <span className={`block relative w-full aspect-square`}>
        <Image src={props.src} alt={props.alt} layout={`fill`} objectFit={`cover`}/>
    </span>
)

function OurSaleSection(props) {
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

    const showSaleSection = () => {
        let sgc = null;
        if (data)
            data.forEach((product,index) => {
                if(index<3)
                    sgc = <Fragment>
                    {sgc}
                    <Link href="/sale/Sweaters-Sale-Flurry-V-NeckSleevelessSweater">
                        <a className={"block bg-white text-center relative z-0 group border-b"}>
                            <WishListButton className={`absolute right-4 top-4 z-10`} pid="Sweaters-Sale-Flurry-V-NeckSleevelessSweater"/>
                            <ImageBlock src={WEBASSETS + "/assets/Sweaters-Flurry-V-NeckSleevelessSweater/new.jpg"} alt="Sweaters-Sale-Flurry-V-NeckSleevelessSweater"/>
                            <div className="relative h-16 leading-none flex items-center">
                                <div className={`bg-white w-full`}>
                                    <p className={`text-h5 font-600 font-cursive`}>Flurry</p>
                                    <p className={`text-sm font-500`}>v-neck sleevless sweater</p>
                                </div>
                                <div className={`hidden group-hover:grid grid-cols-2 items-center absolute inset-0 bg-white`}>
                                    <div className={`font-800 bg-black text-white h-full flex flex-col gap-2 justify-center leading-none`}>
                                        <span className={`uppercase text-white`}>Size</span>
                                        <p className={`text-xs`}>
                                            <span className={`text-green-700`}>Only 13 left</span>
                                            &nbsp;&nbsp;
                                            <span>(M,L,XL)</span>
                                        </p>
                                    </div>
                                    <div className={`font-800 bg-white h-full flex flex-col gap-2 justify-center leading-none`}>
                                        <span className={`uppercase`}>Add to bag</span>
                                        <p className={`text-xs`}><del>{props.currencySymbol}1,950</del>&nbsp;&nbsp;<span className={`text-red-500`}>{props.currencySymbol}1,268</span></p>
                                    </div>
                                </div>
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

    return (
        <section className={`container mb-10`}>
            <BlockHeader
                space={"py-12"}
                titleStyle={"font-600 flex justify-center items-center gap-3 leading-none"}
            >
                <span className={"tracking-widest text-h4 uppercase"}>OUR SALE SECTION</span>
            </BlockHeader>
            <div className="grid grid-cols-3 gap-12">
                {showSaleSection()}
                <div className="justify-self-center col-span-3">
                    <button className={`bg-black text-white py-2 px-4`}> &gt; CLICK FOR MORE &lt; </button>
                </div>
            </div>
        </section>
    );

}

export default OurSaleSection;
