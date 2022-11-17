import React, {useCallback, useEffect, useReducer, useState} from 'react';
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import HomePageHeaderSwiper from "../../../components/swipers/HomePageHeaderSwiper";
import Footer from "../../../components/footer/Footer";
import {apiCall} from "../../../helpers/apiCall";
import Image from "next/image";
import ProductCard from "../../../components/sale/ProductCard";
import {connect} from "react-redux";
import Loader from "../../../components/common/Loader";
import {useRouter} from "next/router";

function Index(props) {
    const router = useRouter();
    const loaderRef = React.useRef()
    const mobile = props.mobile;
    const [carousal] = useState(props.carousal);
    const [data, setData] = useState({
        new_items: []
    });
    const [selected, setSelected] = useReducer((state, e) => {
        if (e.target.checked) {
            return Array.from(new Set([...state, e.target.name]))
        } else {
            return state.filter(item => item !== e.target.name);
        }
    }, [])

    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [visibleData, setVisibleData] = useState([])
    const [loading, setLoading] = useState(false)

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
        apiCall("getSaleItems", props.apiToken, {sale_name: router.query.saleName.replace(/-/g, " "), limit: 18, skip: page * 18})
            .then(resp => {
                if (resp.new_items) {
                    setData({...resp, new_items: [...data.new_items, ...resp.new_items]})
                    setPage(page + 1)
                }
            })
            .catch(e => console.log(e.message))
            .finally(() => {
                setLoading(false)
            })
    }, [visibleData, loading, page, total, router.query.saleName])
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
        if (!router.query.saleName) {
            return
        }
        setLoading(true);
        apiCall("getSaleItems", props.apiToken, {sale_name: router.query.saleName.replace(/-/g, " "), limit: 18, skip: 0})
            .then(resp => {
                if (resp.new_items) {
                    setData(resp)
                    setPage(1)
                    setTotal(resp.product_count)
                }
            })
            .catch(e => console.log(e.message))
            .finally(() => {
                setLoading(false)
            })
    }, [router.query.saleName])

    useEffect(() => {
        if (selected.length) {
            setVisibleData(data.new_items.filter(item => item.is_visible && item.inv_sizes.some(s => selected.includes(s))))
        } else {
            setVisibleData(data.new_items.filter(item => item.is_visible))
        }
    }, [selected, data])

    const mobileView = <section className={"bg-[#faf4f0] pb-10"}>
        <span className={"block relative w-full aspect-square"}>
            <Image src={"https://saltattire.com/assets/images/mob/sale_v15.jpg"} layout={`fill`} objectFit={`cover`}
                   alt={"loader"}/>
        </span>
        <div className={"flex flex-col items-center"}>
            <h4 className={"text-m font-600"}>Filter By Size: </h4>
            <span className={"flex gap-3"}>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"XS"} onChange={setSelected}/>
                    <label className={"mx-1"}>XS</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"S"} onChange={setSelected}/>
                    <label className={"mx-1"}>S</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"M"} onChange={setSelected}/>
                    <label className={"mx-1"}>M</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"L"} onChange={setSelected}/>
                    <label className={"mx-1"}>L</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"XL"} onChange={setSelected}/>
                    <label className={"mx-1"}>XL</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"XXL"} onChange={setSelected}/>
                    <label className={"mx-1"}>XXL</label>
                </div>
            </span>
            <span className={"text-[#ff0000] text-xs font-700 opacity-75"}>NOT VALID FOR RETURN / EXCHANGE</span>
            <span className={"my-2 text-xl font-800"}>STEAL THE DEAL</span>
            <span className={"font-700 text-[#a76b2c]"}>READY <i>to</i> SHIP</span>
        </div>

        <div className={"grid grid-cols-2 gap-5 container py-5 px-5 "}>
            {visibleData.map((item, index) => <ProductCard prod={item} key={index} isMobile={true}/>)}
        </div>
        {
            total <= page * 18 || <div className={`flex justify-center bg-[#faf4f0]`} ref={loaderRef}>
                <Loader/>
            </div>
        }
    </section>

    const browserView = (
        <section className={"bg-[#faf4f0] pb-10"}>
        <span className={"block relative w-full aspect-[8/3]"}>
            <Image src={"https://saltattire.com/assets/videos/sale_v17.jpg"} layout={`fill`} objectFit={`cover`}
                   alt={"loader"}/>
        </span>
            <div className={"flex flex-col items-center"}>
                <h4 className={"text-m font-600"}>Filter By Size: </h4>
                <span className={"flex gap-3"}>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"XS"} onChange={setSelected}/>
                    <label className={"mx-1"}>XS</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"S"} onChange={setSelected}/>
                    <label className={"mx-1"}>S</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"M"} onChange={setSelected}/>
                    <label className={"mx-1"}>M</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"L"} onChange={setSelected}/>
                    <label className={"mx-1"}>L</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"XL"} onChange={setSelected}/>
                    <label className={"mx-1"}>XL</label>
                </div>
                <div className={"flex-inline gap-1"}>
                    <input type="checkbox" name={"XXL"} onChange={setSelected}/>
                    <label className={"mx-1"}>XXL</label>
                </div>
            </span>
                <span className={"text-[#ff0000] text-xs font-700 opacity-75"}>NOT VALID FOR RETURN / EXCHANGE</span>
                <span className={"my-2 text-xl font-800"}>STEAL THE DEAL</span>
                <span className={"font-700 text-[#a76b2c]"}>READY <i>to</i> SHIP</span>
            </div>

            <div className={"grid grid-cols-3 gap-5 container py-5 px-5 "}>
                {visibleData.map((item, index) => <ProductCard prod={item} key={index} isMobile={false}/>)}
            </div>
            {
                total <= page * 18 || <div className={`flex justify-center bg-[#faf4f0]`} ref={loaderRef}>
                    <Loader/>
                </div>
            }
        </section>
    );
    return <>
        <PageHead url="/end-of-season-sale" id="sale" isMobile={mobile}/>
        <Header type={mobile ? "shopMenu" : ""} isMobile={mobile}/>
        <HomePageHeaderSwiper page={"newArrival"} isMobile={mobile} slides={carousal}/>
        {mobile ? mobileView : browserView}
        <Footer isMobile={mobile}/>
    </>
}

const mapStateToProps = (state) => {
    return {
        mobile: state.appConfig.isMobile,
        apiToken: state.appConfig.apiToken,
    }
}

export default connect(mapStateToProps)(Index);
