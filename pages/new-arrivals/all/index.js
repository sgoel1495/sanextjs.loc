import React, {useCallback, useEffect, useState} from 'react';
import PageHead from "../../../components/PageHead";
import Footer from "../../../components/footer/Footer";
import Image from "next/image";
import Header from "../../../components/navbar/Header";
import HomePageHeaderSwiper from "../../../components/swipers/HomePageHeaderSwiper";
import ProductCard from "../../../components/new-Arrivals/ProductCard";
import MobileProductCard from "../../../components/shop-page/ProductCard"
import {apiCall} from "../../../helpers/apiCall";
import Loader from "../../../components/common/Loader";
import {connect} from "react-redux";

/**
 * @todo @team Swiper data
 * @todo @Sambhav Please do CSS
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

function NewArrivalsAllPage(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const loaderRef = React.useRef()
    const [carousal] = useState(props.carousal);
    const [data, setData] = useState(props.data)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(props.appConfig.isMobile ? 5 : 1)
    const [total, setTotal] = useState(data.total_products_exist)
    const [visibleData, setVisibleData] = useState(data.data.filter(item => item.is_visible))

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
        apiCall("getProducts", props.appConfig.apiToken, {
            category: "new-arrivals",
            limit: 18,
            skip: 18
        })
            .then(resp => {
                if (resp.response && resp.response.data) {
                    setVisibleData([...visibleData, ...resp.response.data.filter(item => item.is_visible)])
                    setData(resp.response)
                    setPage(page + 1)
                }
            })
            .catch(e => console.log(e.message))
            .finally(() => {
                setLoading(false)
            })
    }, [visibleData, loading, page, total])

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


    const loader = <span className={"col-span-3 flex justify-center items-center"} key="loader">
        <span className={"block relative w-14 aspect-square"}>
            <Image src={WEBASSETS + "/assets/images/loader.gif"} layout={`fill`} objectFit={`cover`}
                   alt={"loader"}/>
        </span>
    </span>

    const mobileView = <section className={"bg-[#faf4f0] pb-20"}>
        <div className="flex tracking-widest text-h4 items-center justify-center italic font-cursive font-600 pt-4">
            <span>~</span>
            <span className="text-center p-2">Newly Launched<br/>Products</span>
            <span>~</span>
        </div>
        {(visibleData)
            ? <main className={`px-5`}>
                {visibleData && visibleData.filter(prod => prod.is_visible).slice(0, 8).map((prod, index) => {
                    return <div className={"py-4"} key={index}>
                        <MobileProductCard prod={prod} isMobile={true} wide={true}/>
                    </div>
                })}
                <div className={"grid grid-cols-2 gap-5"}>
                    {visibleData && visibleData.filter(prod => prod.is_visible).slice(8).map((prod, index) => {
                        return <div className={"py-4"} key={index}>
                            <MobileProductCard prod={prod} isMobile={true}/>
                        </div>
                    })}
                    {
                        total <= page * 18 || <div className={`flex justify-center col-span-2`}>
                            <button className={"uppercase text-[10px] tracking-widest text-[#595765] bg-[#FAEDE3] border-4 border-white rounded-3xl py-2 px-10"}
                                    onClick={() => fetchData({isIntersecting: true})} disabled={loading}>
                                {
                                    loading ?
                                        <Loader/>
                                        :
                                        <>
                                            <p className={"font-900"}>tap here</p>
                                            <span>to load more</span>
                                        </>
                                }

                            </button>
                        </div>
                    }
                </div>

            </main>
            : loader
        }
    </section>;
    const browserView = (
        <section className={`bg-[#E6E1DB] pb-20`}>
            <div className={"container flex items-center justify-center gap-10 py-12"}>
                <hr className={"w-44 h-0.5 bg-[#888] "}/>
                <div className={"text-center leading-none flex justify-center items-center gap-3 leading-none"}>
                    <span className={"tracking-wide text-h4 uppercase"}>New Arrivals</span>
                </div>
                <hr className={"w-44 h-0.5 bg-[#888] "}/>
            </div>
            {(visibleData)
                ? <main className={`px-10 grid grid-cols-3 gap-10`}>
                    {visibleData && visibleData.filter(prod => prod.is_visible).map((prod, index) => {
                        return <ProductCard prod={prod} key={index}/>
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
    );

    return <>
        <PageHead url="/new-arrivals/all" id="new-arrivals-all" isMobile={props.appConfig.isMobile}/>
        <Header type={props.appConfig.isMobile ? "shopMenu" : ""} isMobile={props.appConfig.isMobile}/>
        <HomePageHeaderSwiper page={"newArrival"} isMobile={props.appConfig.isMobile} slides={carousal}/>
        {props.appConfig.isMobile ? mobileView : browserView}
        <Footer isMobile={props.appConfig.isMobile}/>
    </>
}

export async function getStaticProps() {
    const fetchData = async () => {
        let gotData = false;
        const callObject = await apiCall("getProducts", process.env.API_TOKEN, {
            category: "new-arrivals",
            limit: 18,
            skip: 0
        })
        if (callObject.hasOwnProperty("response") && callObject.response.hasOwnProperty("data"))
            gotData = true;

        return (gotData) ? callObject : {}
    }

    const newData = await fetchData()
    return {
        props: {
            data: newData.response,
            carousal: newData.new_arr_carousal
        },
        revalidate: 3600,
    }
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig,
    }
}

export default connect(mapStateToProps)(NewArrivalsAllPage);
