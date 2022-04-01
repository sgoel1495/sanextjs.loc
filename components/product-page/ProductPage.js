import AppWideContext from "../../store/AppWideContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import PageHead from "../PageHead";
import useApiCall from "../../hooks/useApiCall";
import Header from "../navbar/Header";
import Image from "next/image";
import Link from "next/link";
import appSettings from "../../store/appSettings";
import WishlistButton from "../common/WishListButton";
import DetailsCard from "./DetailsCard";

/**
 * @param props has isMobile and hpid
 * @returns {JSX.Element}
 * @constructor
 */

function ProductPage(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [data, setData] = useState({});
    const videoRef = useRef(null);

    const resp = useApiCall("getProduct", dataStore.apiToken, {product_id: props.hpid});
    useEffect(() => {
        if (resp
            && resp.hasOwnProperty("status")
            && resp.status === 200
            && resp.hasOwnProperty("response")
        )
            setData(resp.response);
    }, [resp]);

    useEffect(() => {
        videoRef.current?.load();
    }, [props.category]);

    console.log(resp)
    const mobileView = null;
    const browserView = <>
        <span className={"block relative w-[100vw] h-[100vh]"}>
            <video autoPlay muted className={`w-full h-fit`} loop style={{background: `no-repeat url("${WEBASSETS}/assets/${props.hpid}/Macro_.jpg")`}} ref={videoRef}>
                    <source
                        src={WEBASSETS + "/assets/" + props.hpid + "/ProductLoop.mp4"}
                        type="video/mp4"
                    />
                    Your browser does not support video tag.
                </video>
            <div className={"absolute top-[25%] bg-black left-0 text-white"}>
                <Link href={"/"}>
                    Home
                </Link>
                >
                <Link href={"/"}>
                    <span>{data.category}</span>
                </Link>
                > {data.name}
            </div>
            <div className={"absolute top-[15%] right-[12.5%] w-60"}>
                <DetailsCard data={data}/>
            </div>
        </span>
    </>;
    if (data)
        return <div>
            <PageHead url={"/" + props.hpid} id={props.hpid} isMobile={dataStore.mobile}/>
            <Header type={"shopMenu"}/>
            {(props.isMobile) ? mobileView : browserView}
        </div>;
    else
        return <></>
}

export default ProductPage;