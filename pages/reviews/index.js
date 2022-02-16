import {Fragment, useContext, useEffect, useState} from "react";
import PageHead from "../../components/PageHead";
import InfoBand from "../../components/info-band/InfoBand";
import Navbar from "../../components/navbar/Navbar";
import AppWideContext from "../../store/AppWideContext";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import Image from "next/image";
import useApiCall from "../../hooks/useApiCall";


function ReviewsPage() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [navControl, setNavControl] = useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => window.removeEventListener('scroll', controller)
    }, []);

    const [data, setData] = useState(null);
    const resp = useApiCall("reviews", dataStore.apiToken);
    useEffect(() => {
        if (resp
            && resp.hasOwnProperty("msg")
            && resp.msg == "Successfully Get"
            && resp.hasOwnProperty("reviews")
        )
            setData(resp.reviews);
    }, [resp]);

    console.log("GIFT CARD DATA", data);


    const showReviews = () => {
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
                                        <Image src={WEBASSETS + "/assets/images/fb-icon-color.png"} alt="fb" layout="fill" objectFit="contain" />
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

    const mobileView = null;
    const browserView = showReviews();

    return (
        <Fragment>
            <PageHead url="/reviews" id="reviews" isMobile={dataStore.mobile}/>
            <div className={"navigator fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white' : ' bg-white/60']}>
                <InfoBand/>
                <Navbar isMobile={dataStore.mobile}/>
            </div>
            <div className="grid place-items-center mt-28 mb-10">
                <div className={"border-[5px] border-black/10 py-3 px-6 uppercase tracking-wide"}>
                    <h4 className={`text-h4 font-600 text-center`}>Reviews</h4>
                </div>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
                {(dataStore.mobile) ? mobileView : browserView}
            </section>
        </Fragment>
    );
}

export default ReviewsPage;