import React from 'react';
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import {connect} from "react-redux";
import Image from "next/image";
import Link from "next/link";

const Index = ({isMobile}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    return (
        <>
            <PageHead url="/bolg/decoding-the-best-looks-in-linen" id="decoding-the-best-looks-in-linen" isMobile={isMobile}/>
            <Header type={isMobile ? "minimal" : ""} isMobile={isMobile}/>
            <div className={"relative w-full aspect-[12/5]"}>
                <Image src={WEBASSETS + "/assets/images/Decoding_banner.jpg"} layout={`fill`} objectFit={`cover`}/>
            </div>
            <div className={"pb-16"}>
                <div className={"px-12 py-6 " + [isMobile ? "" : "text-center"]}>
                    <p className={"text-2xl tracking-wider font-900 font-cursive"}>Decoding the best looks in linen</p>
                    <p className={"text-[#444] " + [isMobile ? "tracking-wider font-900" : ""]}>Pants to dresses; Best linen ensembles to own right now</p>
                </div>
                <div className={isMobile ? "" : "grid grid-cols-3 container gap-8"}>
                    <Link href={"/blog/decoding-the-best-looks-in-linen/decoding-the-best-looks-in-linen"}>
                        <a>
                    <span className={"block relative w-full aspect-square"}>
                        <Image src={WEBASSETS + "/assets/images/Decoding_300.jpg"} layout={"fill"} objectFit={`cover`}/>
                        <span className={"absolute bottom-0 right-12 translate-y-1/2 "}>
                            <span className={"block relative h-12 aspect-square"}>
                                <Image src={WEBASSETS + "/assets/images/black_arrow.svg"} layout={"fill"} objectFit={`cover`}/>
                            </span>
                        </span>
                    </span>
                            <div className={isMobile ? "mx-12" : "mx-3"}>
                                <div className={"text-[10px] text-[#222] uppercase my-4 " + [isMobile ? " mb-1 tracking-widest font-800" : ""]}>decoding the best looks in linen
                                </div>
                                <div className={"font-600 capitalize font-cursive tracking-wider " + [isMobile ? "text-lg font-900 tracking-wide" : "text-[28px]"]}>Decoding the
                                    best looks in linen
                                </div>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>

            {
                isMobile && <Footer isMobile={true}/>
            }

        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isMobile: state.appConfig.isMobile
    }
}

export default connect(mapStateToProps)(Index);