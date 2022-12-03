import React, {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import HomePageHeaderSwiper from "../../../components/swipers/HomePageHeaderSwiper";
import BlockHeader from "../../../components/common/blockHeader";
import ProductCard from "../../../components/new-Arrivals/ProductCard";
import Footer from "../../../components/footer/Footer";
import {apiCall} from "../../../helpers/apiCall";
import {useRouter} from "next/router";
import MobileProductCard from "../../../components/shop-page/ProductCard"
import {isMobile} from "react-device-detect";
import {connect} from "react-redux";
import Loader from "../../../components/common/Loader";

function NewArrivalsIdPage(props) {
    const loaderRef = React.useRef()
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [carousal, setCarousal] = useState({});
    const [mobile, setMobile] = useState(false);
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(props.appConfig.isMobile ? 5 : 1)
    const [total, setTotal] = useState(-1)
    const [visibleData, setVisibleData] = useState([])
    const router = useRouter()

    React.useEffect(() => {
        setMobile(isMobile)
    }, [])

    const fetchData = useCallback((io) => {
        if (total <= page * 18) {
            return
        }
        if (io) {
            if (!io.isIntersecting) {
                return;
            }
        }
        if (loading) {
            return;
        }
        setLoading(true);
        apiCall("datedNewArrivals", props.appConfig.apiToken, {
            home: {
                date: router.query.id,
                skip: page * 18,
                limit: 18,
            }
        })
            .then(resp => {
                if (resp.new_items) {
                    setVisibleData([...visibleData, ...resp.new_items.filter(item => item.is_visible)])
                    setPage(page + 1)
                }
            })
            .catch(e => console.log(e.message))
            .finally(() => {
                setLoading(false)
            })
    }, [visibleData, loading, page, total,router.query.id])

    useEffect(() => {
        const observer = new IntersectionObserver((io) => fetchData(io[0]), {
            root: null,
            rootMargin: "0px",
            threshold: 0.1
        });
        if (loaderRef && loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        return () => {
            if (loaderRef && loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [loaderRef, fetchData]);

    useEffect(() => {
        const fetchCarousal = async () => {
            let gotData = false;
            const callObject = await apiCall("getProducts", process.env.API_TOKEN, {category: "new-arrivals", limit: 1, skip: 0})
            if (callObject.hasOwnProperty("response") && callObject.response.hasOwnProperty("data"))
                gotData = true;

            return gotData ? callObject.new_arr_carousal : {
                "foreground_path": "",
                "imgs": [],
                "imgs_path": [],
                "transition_time": 4000
            }
        }
        fetchCarousal().then(r => setCarousal(r))
        if (router.query.id) {
            apiCall("datedNewArrivals", props.appConfig.apiToken, {
                home: {
                    date: router.query.id,
                    skip: 0,
                    limit: 18
                }
            })
                .then(resp => {
                    if (resp.msg && resp.msg === "Successfully Get" && resp.new_items) {
                        setVisibleData(resp.new_items.filter(item => item.is_visible))
                        setTotal(resp.count)
                    }

                })
                .catch(e => console.log(e.msg))
        }
    }, [props.appConfig.apiToken, router.query.id])

    const loader = <span className={"col-span-3 flex justify-center items-center"} key="loader">
                            <span className={"block relative w-14 aspect-square"}>
                                <Image src={WEBASSETS + "/assets/images/loader.gif"} layout={`fill`} objectFit={`cover`}
                                       alt={"loader"}/>
                            </span>
                    </span>

    const mobileView = <section className={"bg-[#faf4f0] pb-20"}>
        <div className="flex tracking-widest text-h4 items-center justify-center">
            <span>~</span>
            <span className="text-center p-2">Newly Launched<br/>Products</span>
            <span>~</span>
        </div>
        {(visibleData)
            ? <main className={`px-5`}>
                {visibleData.filter(prod => prod.is_visible).slice(0, 8).map((prod, index) => {
                    return <div className={"py-4"} key={index}>
                        <MobileProductCard prod={prod} isMobile={true} wide={index <= 7}/>
                    </div>
                })}
                <div className={"grid grid-cols-2 gap-5"}>
                    {visibleData.filter(prod => prod.is_visible).slice(8).map((prod, index) => {
                        return <div className={"py-4"} key={index}>
                            <MobileProductCard prod={prod} isMobile={true}/>
                        </div>
                    })}
                    {
                        total <= page * 18 || <div className={`flex justify-center col-span-2`} ref={loaderRef}>
                            <Loader/>
                        </div>
                    }
                </div>

            </main>
            : loader
        }
    </section>;
    const browserView = (
        <>

            <section className={`bg-[#E6E1DB] pb-20`}>
                <BlockHeader
                    line
                    space={"py-12"}
                    titleStyle={"font-600 flex justify-center items-center gap-3 leading-none"}
                >
                    <span className={"tracking-widest text-h4 uppercase"}>New Arrivals</span>
                </BlockHeader>
                {(visibleData)
                    ? <main className={`px-10 grid grid-cols-3 gap-10`}>
                        {visibleData.map((prod, index) => {
                            return <ProductCard prod={prod} isMobile={false} key={index} isAccessory={false}/>
                        })}
                        {
                            total <= page * 18 || <div className={`flex justify-center col-span-3`} ref={loaderRef}>
                                <Loader/>
                            </div>
                        }
                    </main>
                    : loader
                }
            </section>
        </>
    );

    return <>
        <PageHead url="//new-arrivals/all" id="new-arrivals-all" isMobile={mobile}/>
        <Header type={mobile ? "shopMenu" : ""} isMobile={mobile}/>
        {
            Object.keys(carousal).length && <HomePageHeaderSwiper page={"newArrival"} isMobile={mobile} slides={carousal}/>
        }
        {mobile ? mobileView : browserView}
        <Footer isMobile={mobile}/>
    </>
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(NewArrivalsIdPage)