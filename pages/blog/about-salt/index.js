import PageHead from "../../../components/PageHead";
import AppWideContext from "../../../store/AppWideContext";
import React, {Fragment, useContext, useEffect, useState} from "react";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import Link from "next/link";
import Image from "next/image";


function BlogAboutSaltPage() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);

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
                                <Image src={WEBASSETS + blog.img} alt={blog.title} layout={`fill`} objectFit={`contain`}/>
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

    const mobileView = null;
    const browserView = (
        <>
            <div className="text-center mt-5 mb-20">
                <p className={`text-2xl font-700 font-cursive`}>About Salt</p>
                <p>Our Values</p>
            </div>
            <main className="grid grid-cols-3 gap-28">
                {showBlogPosts()}
            </main>
        </>
    );

    return (
        <Fragment>
            <PageHead url="/blog/about-salt" id="aboutsalt" isMobile={dataStore.mobile}/>
            <Header type={dataStore.mobile?"minimal":""} isMobile={dataStore.mobile}/>
            <CategoryHeaderImage category={category}/>
            <section className="container mb-10">
                {(dataStore.mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>);

}

export default BlogAboutSaltPage;
