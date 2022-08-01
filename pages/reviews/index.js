import {Fragment, useContext, useEffect, useState} from "react";
import PageHead from "../../components/PageHead";
import Header from "../../components/navbar/Header";
import AppWideContext from "../../store/AppWideContext";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import Image from "next/image";
import useApiCall from "../../hooks/useApiCall";
import {isMobile} from "react-device-detect";
import ProductCard from "./ProductCard";


function ReviewsPage() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [mobile, setMobile] = useState(false)
    const [data, setData] = useState(null);
    const resp = useApiCall("reviews", dataStore.apiToken);

    useEffect(() => {
        setMobile(isMobile)
    }, [])

    useEffect(() => {
        if (resp
            && resp.hasOwnProperty("msg")
            && resp.msg === "Successfully Get"
            && resp.hasOwnProperty("reviews")
        )
            setData(resp.reviews);
    }, [resp]);

    const showBrowserReviews = () => {
        let srd = null;
        if (data)
            data.forEach(review => {
                if (review.is_visible)
                    srd = <Fragment>
                        {srd}
                        <Link href={review.post_link}>
                            <a target="_blank" className={`py-8 px-6 bg-[#f8f8f8] row-span-${review.post_grid_height}`}>
                                {(review.post_img_path)
                                    ? <span className={`block relative w-full aspect-square`}>
                                        <Image src={WEBASSETS + "/assets/reviews/fb/" + review.post_img_path} alt={review.post_img_path} layout="fill" objectFit="cover"/>
                                    </span>
                                    : null
                                }
                                <p className="text-justify font-cursive mb-6">
                                    {review.post_comment}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className={`block relative w-6 h-6`}>
                                        <Image src={WEBASSETS + "/assets/images/fb-icon-color.png"} alt="fb" layout="fill" objectFit="contain"/>
                                    </span>
                                    <div>
                                        <p className={`text-right font-600 text-xs`}>- {review.post_user_name}</p>
                                        <p className={`text-right text-xs text-theme-500`}>{review.post_time}</p>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </Fragment>;
            });
        return srd;
    };
    const showMobileReviews = () => {
        let srd = null;
        if (data)
            data.forEach(review => {
                if (review.is_visible)
                    srd = <Fragment>
                        {srd}
                        <Link href={review.post_link}>
                            <a target="_blank" className={`py-8 px-6 bg-[#f8f8f8] row-span-${review.post_grid_height}`}>
                                {(review.post_img_path)
                                    ? <span className={`block relative w-full aspect-square`}>
                                        <Image src={WEBASSETS + "/assets/reviews/fb/" + review.post_img_path} alt={review.post_img_path} layout="fill" objectFit="cover"/>
                                    </span>
                                    : null
                                }
                                <p className="font-cursive mb-6">
                                    {review.post_comment}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className={`block relative w-6 h-6`}>
                                        <Image src={WEBASSETS + "/assets/images/fb-icon-color.png"} alt="fb" layout="fill" objectFit="contain"/>
                                    </span>
                                    <div>
                                        <p className={`text-right font-600 text-xs`}>- {review.post_user_name}</p>
                                        <p className={`text-right text-xs text-theme-500`}>{review.post_time}</p>
                                    </div>
                                </div>
                            </a>
                        </Link>
                        {
                            review.post_products && review.post_products.length > 0 &&
                            <div className={"pb-5"}>
                                <div className={"text-center p-4 font-200 text-sm"}>
                                    <span>Items She Bought:</span>
                                </div>
                                <div className={"flex overflow-y-scroll"}>
                                    {
                                        review.post_products.map((product) => {
                                            return <ProductCard product={product}/>
                                        })
                                    }
                                </div>
                            </div>
                        }
                    </Fragment>;
            });
        return srd;
    };

    const mobileView = showMobileReviews();
    const browserView = showBrowserReviews();

    return (
        <Fragment>
            <PageHead url="/reviews" id="reviews" isMobile={mobile}/>
            <Header type={mobile ? "minimal" : ""} isMobile={mobile}/>
            <div className={"grid place-items-center mb-10 " + [mobile ? "mt-36" : "mt-8"]}>
                <div className={"border-[5px] border-black/10 w-[170px] py-3 uppercase tracking-wide"}>
                    <h4 className={`text-h4 font-600 text-center`}>Reviews</h4>
                </div>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 px-2">
                {(mobile) ? mobileView : browserView}
            </section>
            {
                mobile && <Footer isMobile={true}/>
            }
        </Fragment>
    );
}

export default ReviewsPage;
