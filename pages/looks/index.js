import React, {Fragment, useEffect, useState} from 'react';
import PageHead from "../../components/PageHead";
import Footer from "../../components/footer/Footer";
import Image from "next/image";
import BlockHeader from "../../components/common/blockHeader";
import Header from "../../components/navbar/Header";
import {apiCall} from "../../helpers/apiCall";

import {isMobile} from "react-device-detect";
import LooksItem from "../../components/looks-page/LooksItem";



function LooksPage(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [data, setData] = useState(props.data);
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        setMobile(isMobile)
    }, [])

    const loader = <span className={"col-span-3 flex justify-center items-center"} key="loader">
        <span className={"block relative w-14 aspect-square"}>
            <Image src={WEBASSETS + "/assets/images/loader.gif"} layout={`fill`} objectFit={`cover`}
                   alt={"loader"}/>
        </span>
    </span>

    const mobileView = <Fragment>
        <section className={`bg-[#222222] overflow-auto`}>
            <span className={"block relative w-full aspect-square"}>
                <Image src={WEBASSETS + "/assets/images/looks/looks.banner_v1.jpg"} layout={`fill`} objectFit={`cover`} alt={""}/>
            </span>
            <BlockHeader
                space={"py-[1.125rem]"}
                titleStyle={"text-center tracking-wider"}
            >
                <h3 className={`text-h4 font-400 text-white tracking-tight capitalize mb-1`}>Shop The Look</h3>
                <h4 className={`text-h6 text-[#fcc4a3] uppercase leading-none font-600`}>Looks <span
                    className={`font-cursive italic text-h3 lowercase`}>we</span> Love</h4>
            </BlockHeader>
            <div className={"text-center py-2.5"}>
                <span className={"text-white bg-[#333333] text-[0.9rem] py-2.5 px-[5%]"}>
                    ~Explore~
                </span>
            </div>
            {(data)
                ? <main className={`grid grid-cols-2`}>
                    <LooksItem data={data} isMobile={mobile}/>
                </main>
                : loader
            }
        </section>
    </Fragment>

    const browserView = <Fragment>
        <section className={`bg-[#E6E1DB] py-20 overflow-auto`}>
            <BlockHeader
                space={"py-5"}
                titleStyle={"text-center py-10 tracking-wider"}
            >
                <h3 className={`text-h4 font-600`}>SHOP THE LOOK</h3>
                <h4 className={`text-h6 text-[#a76b2c] uppercase leading-none font-600`}>Looks <span
                    className={`font-cursive italic text-h3 lowercase`}>we</span> Love</h4>
            </BlockHeader>
            {(data)
                ? <main className={`px-10 grid grid-cols-3 gap-7`}>
                    <LooksItem data={data} isMobile={mobile}/>
                </main>
                : loader
            }
        </section>

    </Fragment>

    return <>
        <PageHead url="/looks" id="looks" isMobile={mobile}/>
        <Header type={mobile ? "shopMenu" : "minimal"} isMobile={mobile}/>
        {mobile ? mobileView : browserView}
        <Footer isMobile={true}/>
    </>

}

export async function getStaticProps() {
    const fetchData = async () => {
        let gotData = false;
        const callObject = await apiCall("getLooksData", process.env.API_TOKEN, {look_id: "", limit: 10000, skip: 0})
        if (
            callObject.hasOwnProperty("response")
            && callObject.response.hasOwnProperty("look")
            && callObject.response.look.length > 0
        )
            gotData = true;

        return (gotData) ? callObject.response : []
    }

    return {
        props: {
            data: await fetchData()
        }
    }
}


export default LooksPage;