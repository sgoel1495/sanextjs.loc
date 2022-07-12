import React, {Fragment, useContext, useEffect, useState} from "react";
import useApiCall from "../../hooks/useApiCall";
import Image from "next/image";
import Link from "next/link";
import BlockHeader from "../common/blockHeader";
import WishListButton from "../common/WishListButton";


/**
 * {currCurrency, currencySymbol, isMobile, apiToken } props
 */

const ImageBlock = (props) => (
    <span className={`block relative w-full aspect-square`}>
        <Image src={props.src} alt={props.alt} layout={`fill`} objectFit={`cover`}/>
    </span>
)

function NewArrivalsBlock(props) {
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

    const showNewArrivals = () => {
        let sgc = null;
        if (data)
            data.forEach((product, index) => {
                if (!props.isMobile && index < 3)
                    sgc = <Fragment>
                        {sgc}
                        <Link href="/sale/Sweaters-Sale-Flurry-V-NeckSleevelessSweater">
                            <a className={"block bg-white text-center relative z-0 group border-b"}>
                                <WishListButton className={`absolute right-4 top-4 z-10`}
                                                pid="Sweaters-Sale-Flurry-V-NeckSleevelessSweater"/>
                                <ImageBlock
                                    src={WEBASSETS + "/assets/Dresses-Crimson-Dream-FauxWrapPleatedMidiDress/new.jpg"}
                                    alt="Dresses-Crimson-Dream-FauxWrapPleatedMidiDress"/>
                                <div className="relative h-16 leading-none flex items-center">
                                    <div className={`bg-white w-full`}>
                                        <p className={`text-h5 font-600 font-cursive`}>Crimson Dream</p>
                                        <p className={`text-sm font-500`}>faux wrap pleated midi dress</p>
                                    </div>
                                    <div
                                        className={`hidden group-hover:grid grid-cols-2 items-center absolute inset-0 bg-white`}>
                                        <span className={`font-800`}>SIZE</span>
                                        <div
                                            className={`font-800 bg-black text-white h-full flex flex-col gap-2 justify-center leading-none`}>
                                            <span className={`uppercase text-white/50`}>Add to bag</span>
                                            <p className={`text-xs`}>{props.currencySymbol}1,268</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </Fragment>;
                if (props.isMobile && index < 4) {
                    sgc = <Fragment>
                        {sgc}
                        <Link href="/sale/Sweaters-Sale-Flurry-V-NeckSleevelessSweater">
                            <a className={"block bg-white text-center relative z-0 group border-b"}>
                                {props.isMobile ? '' : <WishListButton className={`absolute right-4 top-4 z-10`}
                                                                       pid="Sweaters-Sale-Flurry-V-NeckSleevelessSweater"/>}
                                <ImageBlock
                                    src={WEBASSETS + "/assets/Dresses-Crimson-Dream-FauxWrapPleatedMidiDress/new.jpg"}
                                    alt="Dresses-Crimson-Dream-FauxWrapPleatedMidiDress"
                                />
                                <div className="relative h-16 leading-none flex items-center">
                                    <div className={`bg-white w-full`}>
                                        <p className={`text-h5 font-600 font-cursive`}>Crimson Dream</p>
                                        <p className={`text-sm font-500`}>faux wrap pleated midi dress</p>
                                    </div>
                                    <div
                                        className={`hidden group-hover:grid grid-cols-2 items-center absolute inset-0 bg-white`}>
                                        <span className={`font-800`}>SIZE</span>
                                        <div
                                            className={`font-800 bg-black text-white h-full flex flex-col gap-2 justify-center leading-none`}>
                                            <span className={`uppercase text-white/50`}>Add to bag</span>
                                            <p className={`text-xs`}>{props.currencySymbol}1,268</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </Fragment>;
                }
            });

        return sgc;
    }

    const mobileView = <div className="grid grid-cols-2 gap-12 mb-10">
        {showNewArrivals()}
        <div className="justify-self-center">
            <button className={`bg-black text-white py-2 px-4`}> &gt; TAP FOR MORE &lt; </button>
        </div>
    </div>

    const browserView = <div className="grid grid-cols-3 gap-12">
        {showNewArrivals()}
        <div className="justify-self-center col-span-3">
            <button className={`bg-black text-white py-2 px-4 `}> &gt; CLICK FOR MORE &lt; </button>
        </div>
    </div>

    return (
        <section className={`container`} title={`New Arrivals`}>
            <BlockHeader
                space={"py-12"}
                titleStyle={"font-600 flex justify-center items-center gap-3 leading-none"}
            >
                <span className={"tracking-widest text-h4 uppercase"}>New Arrivals</span>
            </BlockHeader>
            {
                props.isMobile ? mobileView : browserView
            }
        </section>
    );

}

export default NewArrivalsBlock;
