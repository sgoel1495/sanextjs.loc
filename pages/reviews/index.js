import {Fragment, useContext, useEffect, useState} from "react";
import PageHead from "../../components/PageHead";
import InfoBand from "../../components/info-band/InfoBand";
import Navbar from "../../components/navbar/Navbar";
import AppWideContext from "../../store/AppWideContext";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import Image from "next/image";
import useApiCall from "../../hooks/useApiCall";

/**
 * @todo @Sambhav css
 * @returns {JSX.Element}
 * @constructor
 */

function ReviewsPage(){
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


    const showReviews = ()=>{
      let srd = null;
      if (data)
        data.forEach(review=>{
            if(review.is_visible)
              srd = <Fragment>
                  {srd}
                  <Link href={review.post_link}>
                      <a target="_blank">
                          {(review.post_img_path)
                              ?<Image src={WEBASSETS + "/assets/reviews/fb/" + review.post_img_path} alt={review.post_img_path} width="300" height="300"/>
                              :null}
                          <div>
                              {review.post_comment}
                          </div>
                          <div>
                              <Image src={WEBASSETS + "/assets/images/fb-icon-color.png"} alt="fb" width="300" height="300"/>
                              <div>- {review.post_user_name}</div>
                              <div>{review.post_time}</div>
                          </div>
                      </a>
                  </Link>
              </Fragment>;
      });

      return srd;
    };

    const mobileView = null;
    const browserView = <Fragment>
        <h1>Reviews</h1>
        <div>
            {showReviews()}
        </div>
    </Fragment>;

    return <Fragment>
        <PageHead url="/reviews" id="reviews" isMobile={dataStore.mobile}/>
        <div className={"navigator fixed top-0 right-0 left-0 z-10 duration-300 hover:bg-white transition-colors" + [navControl ? ' bg-white' : ' bg-white/60']}>
            <InfoBand/>
            <Navbar isMobile={dataStore.mobile}/>
        </div>
        {(dataStore.mobile) ? mobileView : browserView}
        <Footer isMobile={dataStore.mobile}/>
    </Fragment>;
}

export default ReviewsPage;