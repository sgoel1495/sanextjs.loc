import React, {Fragment, useCallback, useEffect, useState} from 'react';
import PageHead from "../../components/PageHead";
import Footer from "../../components/footer/Footer";
import Image from "next/image";
import BlockHeader from "../../components/common/blockHeader";
import Header from "../../components/navbar/Header";
import {apiCall} from "../../helpers/apiCall";
import LooksItem from "../../components/looks-page/LooksItem";
import {connect} from "react-redux";
import Loader from "../../components/common/Loader";
import {useRouter} from "next/router";


function LooksPage(props) {
    const loaderRef = React.useRef()
    const router = useRouter();
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [data, setData] = useState(props.data);
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState({
        look_id: "", limit: 18, skip: 0
    })
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(data.look_count)

    React.useEffect(() => {
        let temp = router.asPath.split("#")
        if(temp.length>1){
            if(!data.look.filter(item=>item.look_id===temp[1]).length){
                fetchData()
            }
            else{
                document.getElementById(temp[1]).click()
            }
        }
    },[router.asPath,data])

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
        let tempScrollTop
        apiCall("getLooksData", props.appConfig.apiToken, {...query, skip: page * 18})
            .then(resp => {
                if (resp.response && resp.response.look) {
                    tempScrollTop=window.scrollY
                    setData({look: [...data.look, ...resp.response.look], prod: {...data.prod, ...resp.response.prod}})
                    setQuery({...query, skip: page * 18})
                    setPage(page + 1)

                }
            })
            .catch(e => console.log(e.message))
            .finally(() => {
                console.log(tempScrollTop)
                window.scrollTo(0,tempScrollTop)
                setLoading(false)
            })
    }, [data, loading, page, query, total])

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
                    <LooksItem data={data} isMobile={true}/>
                    {
                        total <= (page * 18) || <div className={"flex justify-center col-span-3"} ref={loaderRef}>
                            <Loader/>
                        </div>
                    }
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
                    <LooksItem data={data} isMobile={false}/>
                    {
                        total <= (page * 18) || <div className={"flex justify-center col-span-3"} ref={loaderRef}>
                            <Loader/>
                        </div>
                    }
                </main>
                : loader
            }
        </section>

    </Fragment>

    return <>
        <PageHead url="/looks" id="looks" isMobile={props.appConfig.mobile}/>
        <Header type={"shopMenu"} isMobile={props.appConfig.mobile}/>
        {props.appConfig.mobile ? mobileView : browserView}
        <Footer isMobile={props.appConfig.mobile}/>
    </>

}

export async function getStaticProps() {
    const fetchData = async () => {
        let gotData = false;
        const callObject = await apiCall("getLooksData", process.env.API_TOKEN, {look_id: "", limit: 18, skip: 0})
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
        },
        revalidate: 3600,
    }
}


const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig,
    }
}

export default connect(mapStateToProps)(LooksPage);