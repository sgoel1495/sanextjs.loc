import React, {Fragment, useCallback, useContext, useEffect, useRef, useState} from 'react';
import PageHead from "../../../components/PageHead";
import AppWideContext from "../../../store/AppWideContext";
import Footer from "../../../components/footer/Footer";
import Image from "next/image";
import Header from "../../../components/navbar/Header";
import HomePageHeaderSwiper from "../../../components/swipers/HomePageHeaderSwiper";
import BlockHeader from "../../../components/common/blockHeader";
import ProductCard from "../../../components/new-Arrivals/ProductCard";
import {apiCall} from "../../../helpers/apiCall";

/**
 * @todo @team Swiper data
 * @todo @Sambhav Please do CSS
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */



function NewArrivalsAllPage(props) {
    const category = "new-arrivals"
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const { dataStore } = useContext(AppWideContext);
    const [data, setData] = useState(null);
    const [carousal, setCarousal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        limit: 10000, skip: 0
    })

    useEffect(()=>{
        const fetchData = async () => {
            let gotData = false;
            const callObject = await apiCall("getProducts", dataStore.apiToken, {category: category, ...pagination})
            if (callObject.hasOwnProperty("response") && callObject.response.hasOwnProperty("data"))
                gotData = true;

            return (gotData) ? callObject : {}
        }

        if(!data && dataStore.apiToken && category && pagination){
            fetchData()
                .then(newData=>{
                    setData(newData.response)
                    setCarousal(newData.new_arr_carousal)
                })
                .catch(e=>console.log(e.message))
                .finally(()=>{
                    console.log("Data load complete")
                })
        }

    },[data, dataStore.apiToken, category, pagination])

    const fetchProducts = useCallback(async () => {
        if (loading)
            return

        setLoading(true)
        const newData = await fetchData(data, dataStore.apiToken, category, pagination)
        setData(newData.response)
        setCarousal(newData.new_arr_carousal)
        setPagination({
            skip: pagination.skip + pagination.limit,
            limit: pagination.limit
        })
        setLoading(false)
    }, [loading, data, dataStore.apiToken, category, pagination])

    /*
    const OldfetchData = useCallback((flag = true, io = null) => {
        if (io) {
            if (!io.isIntersecting)
                return
        }
        if (data && flag) {
            if (data.total_products_exist <= pagination.skip) {
                return
            }
        }
        setLoading(true)
        const callObject = apiDictionary("getProducts", dataStore.apiToken, { category: "new-arrivals", ...pagination });
        fetch(callObject.url, callObject.fetcher)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (!flag)
                    setCarousal(json.new_arr_carousal)
                if (data && flag)
                    json.response.data = data.data.concat(json.response.data)
                setData(json.response);
                setPagination({
                    skip: pagination.skip + pagination.limit,
                    limit: pagination.limit
                })
            }).finally(() => {
                setLoading(false);
            });
    }, [data, dataStore.apiToken, pagination])
    useEffect(() => {
        let forReturn = null
        const observer = new IntersectionObserver((io) => fetchData(true, io[0]), {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        })
        if (loaderRef && loaderRef.current) {
            observer.observe(loaderRef.current)
            forReturn = loaderRef.current
        }

        return () => {
            if (forReturn)
                observer.unobserve(forReturn)
        }
    }, [loaderRef, fetchData])
    useEffect(() => {
        fetchData(false)
    }, [fetchData])
    */

    const loader = <span className={"col-span-3 flex justify-center items-center"} key="loader">
                            <span className={"block relative w-14 aspect-square"}>
                                <Image src={WEBASSETS + "/assets/images/loader.gif"} layout={`fill`} objectFit={`cover`}
                                       alt={"loader"}/>
                            </span>
                    </span>

    const mobileView = null;
    const browserView = (
        <>
            <PageHead url="//new-arrivals/all" id="new-arrivals-all" isMobile={dataStore.mobile} />
            <Header type={dataStore.mobile ? "minimal" : ""} isMobile={dataStore.mobile} />
            <HomePageHeaderSwiper page={"newArrival"} isMobile={dataStore.mobile} slides={carousal} />
            <section className={`bg-[#E6E1DB] pb-20`}>
                <BlockHeader
                    line
                    space={"py-12"}
                    titleStyle={"font-600 flex justify-center items-center gap-3 leading-none"}
                >
                    <span className={"tracking-widest text-h4 uppercase"}>New Arrivals</span>
                </BlockHeader>
                {(data)
                    ?<main className={`px-10 grid grid-cols-3 gap-10`}>
                        {data && data.data && data.data.map((prod, index) => {
                            return <ProductCard prod={prod} key={index} />
                        })}
                    </main>
                    :loader
                }
            </section>
            <Footer isMobile={dataStore.mobile} />
        </>
    );

    return dataStore.mobile ? mobileView : browserView
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('https://.../posts')
    const posts = await res.json()

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            posts,
        },
    }
}
export default NewArrivalsAllPage;
