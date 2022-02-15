import PageHead from "../../../components/PageHead";
import AppWideContext from "../../../store/AppWideContext";
import React, {Fragment, useContext, useEffect, useState} from "react";
import InfoBand from "../../../components/info-band/InfoBand";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import Link from "next/link";
import Image from "next/image";

/**
 * @todo @Sambhav css pls
 * @returns {JSX.Element}
 * @constructor
 */

function BlogAboutSaltPage(){
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const {dataStore} = useContext(AppWideContext);
    const [navControl, setNavControl] = useState(false);
    const controller = () => setNavControl(window.scrollY > 0);
    useEffect(() => {
        window.addEventListener("scroll", controller);
        return () => window.removeEventListener('scroll', controller)
    }, []);
    const category = "About Salt";

    const data = require("../../../store/blogData.json");
    const showBlogPosts = ()=>{
      let sbp = null;
      data.forEach(blog=>{
          sbp=<Fragment>
              {sbp}
              <Link href={blog.link}>
                  <a>
                      <Image src={WEBASSETS + blog.img} width="300" height="300" alt={blog.title} />
                      <div>{blog.category}</div>
                      <div>{blog.title}</div>
                  </a>
              </Link>
          </Fragment>;
      });
      return sbp;
    };

    const mobileView = null;
    const browserView = <div>
        <div>About Salt</div>
        <div>Our Values</div>
        {showBlogPosts()}
    </div>;

    return (
        <Fragment>
            <PageHead url="/blog/about-salt" id="aboutsalt" isMobile={dataStore.mobile}/>
            <div className={"navigator fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white' : ' bg-white/60']}>
                <InfoBand/>
                <Navbar isMobile={dataStore.mobile}/>
            </div>
            <CategoryHeaderImage category={category}/>
            {(dataStore.mobile) ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile}/>
        </Fragment>);

}
export default BlogAboutSaltPage;