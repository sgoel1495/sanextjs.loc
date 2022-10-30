import PageHead from "../../../components/PageHead";
import React, { Fragment } from "react";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import Link from "next/link";
import Image from "next/image";
import {connect} from "react-redux";

function BlogAboutSaltPage({appConfig}) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const category = "About Salt";

    const data = require("../../../store/blogData.json");

    const showBlogPosts = () => {
        let sbp = null;
        data.forEach(blog => {
            sbp = (
                <>
                    {sbp}
                    <Link href={blog.link}>
                        <a className={`block`}>
                            <span className="block relative w-full aspect-square">
                                <Image src={WEBASSETS + blog.img} alt={blog.title} layout={`fill`} objectFit={`contain`} />
                                <span className={"absolute bottom-0 right-12 translate-y-1/2 "}>
                                    <span className={"block relative h-12 aspect-square"}>
                                        <Image src={WEBASSETS + "/assets/images/black_arrow.svg"} layout={"fill"} objectFit={`cover`}/>
                                    </span>
                                </span>
                            </span>
                            <div className="px-4 py-2">
                                <p className={`text-sm font-500 mb-2 tracking-widest`}>{blog.category}</p>
                                <p className={`font-cursive text-h2`}>{blog.title}</p>
                            </div>
                        </a>
                    </Link>
                </>
            );
        });
        return sbp;
    };

    const mobileView = (
           <section className=" mx-auto mb-10">
    <div className="mb-20 mt-7 pl-12">
        <p className={`text-2xl font-700 font-cursive`}>About Salt</p>
        <p className='font-semibold'>Our Values</p>
    </div>
    <main className="grid grid-cols-1 gap-10">
        {showBlogPosts()}
    </main>
</section>);
    const browserView = (
        <section className="w-9/12 mx-auto mb-10">
            <div className="text-center mt-5 mb-20">
                <p className={`text-2xl font-700 font-cursive`}>About Salt</p>
                <p>Our Values</p>
            </div>
            <main className="grid grid-cols-3 gap-28">
                {showBlogPosts()}
            </main>
        </section>
    );

    return (
        <Fragment>
            <PageHead url="/blog/about-salt" id="aboutsalt" isMobile={appConfig.isMobile} />
            <Header type={appConfig.isMobile ? "minimal" : ""} isMobile={appConfig.isMobile} />
            <div className=" overflow-hidden">
            <CategoryHeaderImage category={category} />
            </div>
            {(appConfig.isMobile) ? mobileView : browserView}
            {
                appConfig.isMobile && <Footer isMobile={true} />
            }
        </Fragment>);

}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(BlogAboutSaltPage);
