import Link from "next/link";
import Image from "next/image";
import React, {Fragment, useState} from "react";
import ReactDom from "react-dom";

/**
 * @todo No api for media buzz or testimonial. Hardcoded.
 * @params {isMobile} props
 * @constructor
 */

function CartModal(props) {
    /*
    @Sambahav Please complete the modal asy ou see correct
     */
    const {closeModal} = props;

    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const returnPolicy = <div>
        <Link href="#faq_slides">
            <a>
                <span>Our Return Policy</span>
                <span>Money Back Guarantee For Pre-paid.<br/>You can exchange the size, <br/>get a store credit or get a full refund For Pre-paid.<br/>No questions asked.</span>
           </a>
        </Link>

        <div id="faq_slides">
            <div>
                <Image src={WEBASSETS + "/assets/faq/S1.jpg"} alt="return policy" />
            </div>
            <div>
                <Image src={WEBASSETS + "/assets/faq/S2.jpg"} alt="return policy" />
            </div>
            <div>
                <Image src={WEBASSETS + "/assets/faq/S3.jpg"} alt="return policy" />
            </div>
            <div>
                <Image src={WEBASSETS + "/assets/faq/S4.jpg"} alt="return policy" />
            </div>
            <div>
                <Image src={WEBASSETS + "/assets/faq/S5.jpg"} alt="return policy" />
            </div>
            <div>
                <Image src={WEBASSETS + "/assets/faq/S6.jpg"} alt="return policy" />
            </div>
        </div>
    </div>;

    const mediaBuzzData  = [
        {
            link: "https://economictimes.indiatimes.com/small-biz/startups/newsbuzz/fashion-tech-firm-salt-attire-launches-its-offline-experience-store-in-gurugram/articleshow/70765514.cms",
            media: WEBASSETS + "/assets/images/media/the-economic-times/logo/economic_times.png",
            alt: "media-0011",
            headline: "The Economic Times"
        },
        {
            link: "http://www.newindianexpress.com/cities/delhi/2019/aug/21/salt-attire-one-stop-shop-for-all-your-clothing-needs-in-gurugram-2022068.html",
            media: WEBASSETS + "/assets/images/media/the-new-india-express/logo/the_new_india_express.png",
            alt: "media-0010",
            headline: "The New Indian Express"
        },
        {
            link: "https://yourstory.com/2017/09/dipti-tolanis-journey",
            media: WEBASSETS + "/assets/images/media/yourstory/logo/yourstory.png",
            alt: "media-0005",
            headline: "Yourstory"
        },
        {
            link: "https://www.business-standard.com/article/news-ians/turn-monotonous-office-wear-into-party-ready-look-119061200529_1.html",
            media: WEBASSETS + "/assets/images/media/business-standard/logo/business_standard.png",
            alt: "media-0006",
            headline: "Business Standard"
        },
        {
            link: "https://www.indiatoday.in/magazine/supplement/story/20181001-the-re-inventors-1345733-2018-09-21",
            media: WEBASSETS + "/assets/images/media/india-today/logo/india_today.png",
            alt: "media-0002",
            headline: "India Today"
        },
        {
            link: "https://www.bloombergquint.com/business/startup-street-how-a-hunt-for-workwear-turned-into-a-bespoke-clothing-startup",
            media: WEBASSETS + "/assets/images/media/bloomberg-quint/logo/bloomberg_quint.png",
            alt: "media-0007",
            headline: "Bloomberg Quint"
        }
    ];
    const mediaBuzz = ()=>{
        let showMediaBuzz = null;
        mediaBuzzData.forEach(ele=>{
            showMediaBuzz = <Fragment>
                {showMediaBuzz}
                <div>
                    <Link href={ele.link}>
                        <a>
                            <Image src={ele.media} alt={ele.alt} />
                            <span>- {ele.headline}</span>
                        </a>
                    </Link>
                </div>
            </Fragment>
        })

        return <div>
            <h1>Media Buzz</h1>
            {showMediaBuzz}
        </div>;
    }

    const testimonialsData  = [
        {
            link: "https://www.facebook.com/hiraldhaval.shah/posts/3789743831052915",
            name: "Hiral Dhaval Shah",
            time: "19/09/2020 14:30",
            comment: "Im in love with the fabric..the fit is perfect. Superb service and special thanks to Asine who helped me with an undelivered package !"
        },
        {
            link: "https://www.facebook.com/rachna.mohan.73/posts/3577322832286870",
            name: "Rachna Mohan",
            time: "27/07/2020 16:26",
            comment: "there cloth material is very good"
        },
        {
            link: "https://www.facebook.com/nita.bardhan/posts/3099842763435795",
            name: "Nita Bardhan",
            time: "06/07/2020 18:15",
            comment: "Yes most certainly 😊 The fabric , fitting and most importantly service is awesome."
        },
        {
            link: "https://www.facebook.com/indrayani.sakpal/posts/10157968363674230",
            name: "Indrayani Sakpal",
            time: "04/07/2020 16:32",
            comment: "The fabric is good with some different design also they are good in after sale service Thank you!!! 😊 So much I appreciate the acknowledge my query and refund policy I am glad with your response and continue to shoping with you .They are 100 percentage trustworthy."
        }
    ];
    const testimonials = ()=>{
        let showTestimonials = null;
        testimonialsData.forEach(ele=>{
            showTestimonials = <Fragment>
                {showTestimonials}
                <span>- {ele.comment}</span>
                <div>
                    <Link href={ele.link}>
                        <a>
                            <Image src={WEBASSETS + "/assets/images/fb-icon-color.png"} alt="fb" />
                            <span>- {ele.name}</span>
                            <span>- {ele.time}</span>
                        </a>
                    </Link>
                </div>
            </Fragment>
        })

        return <div>
            <h1>Testimonials</h1>
            {showTestimonials}
        </div>;
    }

    const mobileView = null;

    const browserView = (
        <div onClick={closeModal}>
            <h5>YOUR CART</h5>
            {!data &&
            <div>
                <Image id="emptycart" src={WEBASSETS + "/assets/images/empty_bag.png"} alt="empty_cart" />
                <h4>Hey, it feels so light!</h4>
                <h6>There is nothing in your cart. Let's add some items.</h6>
                <Link href="/new-arrivals/all">Continue Shopping</Link>
            </div>}
            {returnPolicy}
            {mediaBuzz()}
            {testimonials()}
        </div>);

    return props.isMobile ? mobileView : browserView
}


function SidebarMenuCart(props) {

    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [showSidebarMenu, setShowSidebarMenu] = useState(false);

    React.useEffect(() => {
        if (showSidebarMenu) document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = "unset"
    }, [showSidebarMenu])

    const closeModal = () => {
        setShowSidebarMenu(false);
    }
    const data = [];

    const mobileView = null;

    const browserView = (
        <>
            <div onClick={() => setShowSidebarMenu(true)} className={"ml-2"}>
                <Image src={WEBASSETS + "/assets/images/cart.png"} alt="menuicon" width="24" height="24"/>
            </div>
            {showSidebarMenu && ReactDom.createPortal(
                <CartModal data={data} closeModal={closeModal.bind(this)}/>,
                document.getElementById("cartside"))}
        </>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default SidebarMenuCart;


