import React from 'react';
import PageHead from "../../../../components/PageHead";
import Header from "../../../../components/navbar/Header";
import {connect} from "react-redux";
import Footer from "../../../../components/footer/Footer";
import Link from "next/link";
import Image from "next/image";
import {FaFacebookSquare, FaTwitter, FaShareAlt} from "react-icons/fa";
import Toast from "../../../../components/common/Toast";

const Index = ({isMobile}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const content = [
        {
            img: "/assets/images/styling_service_800.jpg",
            text: <>Need a Wardrobe Refresh or Need to decide what to wear for an event that&apos;s coming up?<br/>Not sure about the silhouette that will flatter you? or the color you
                should pick?<br/>Well, we&apos;ve got your back!</>,
        }, {
            text: <>We provide Styling Services too!<br/>Whether you need to pick for an event, your everyday clothing, or if you have any questions based on what style, color, or
                silhouette would suit you best, we have in-house stylists to answer your queries.</>,
            className: "-mt-3 pb-2 ",
            onlyText: true
        }, {
            text: <><Link href={"/get-appointment"} passHref><a target="_blank" rel="noreferrer"><u><b>Book Your Free Styling Appointment</b></u></a></Link> in Store Now, or Contact Us, email
                care@saltattire.com, call or whatsapp +91 9015904904 for a Virtual Styling Session!</>,
            className: "py-2",
            onlyText: true
        }, {
            heading: "Why Custom & Tailored Clothing?",
            img: "/assets/images/made-to-measure_800.jpg",
            text: "We believe that everyone is unique and has her own identity; what she does, what she wears, her body shape, and style, is unique, and hence she should not be expected to conform to a set of standard styles and sizes that are mass produced and available off the rack."
        }, {
            text: "This is why we provide Custom made garments that you can make based on your preferences, style, body shape and your measurements.",
            className: "-mt-3 pb-2 ",
            onlyText: true
        }, {
            text: <>You can Design Your Own Garment from scratch or Make Customizations to the items that we design for you.<br/>To get your garment tailor made online, you can
                simply enter 3 measurements and the garment will be tailor made for you. We also allow customizations, where you can Select Your Fabric, Select the Sleeve type,
                Sleeve length, Neckline, and the lengths of your garments based on your preferences.</>,
            className: "py-2",
            onlyText: true
        }, {
            text: "And what more, we provide Tailored Fits & Customizations at very affordable prices!",
            className: "py-2",
            onlyText: true
        }, {
            text: "So the next time you are in a mall or tempted to buy something from an e-commerce site, ask yourself, Why buy a garment off-the-rack when you can make your own unique garment tailored to your taste and needs ?",
            className: "py-2",
            onlyText: true
        }, {
            heading: "Free Alterations",
            img: "/assets/images/free_alteration_800.jpg",
            text: <>Received your garments but need some alterations for a better fit? We&apos;re here for you!<br/>Whether you want to adjust by 0.5&quot; or
                alter further, we will get it done for you! We offer upto two free alterations until the garment fits you perfectly. The reverse pickup and re-shipping of the
                garment will be done by us. So sit back, relax and get your garment altered hassle-free.</>,
        }, {
            heading: "Premium Fabric & Quality",
            img: "/assets/images/premium_fabric_quality_800.jpg",
            text: "The fabrics used are of premium quality. High Quality, premium fabrics that are breathable, wrinkle-free are used to give the garment a polished look. The fabrics range from lightweight to medium weight suiting fabrics, wool blends, poly crepe, to extremely breathable and summer friendly cottons, linens, cotton viscose etc.",
        }, {
            text: <>We take utmost care in making the garment, right from using the best quality threads, to accessories, whether its buttons,
                zippers, hooks and other elements. Apart from the fabric, design and fit, we go through strict quality control parameters to give you what you truly deserve.<br/>All
                our fabric is: Pre-Washed, to remove any stains and odor. Pre-Shrunk, to ensure you will never have to face any shrinkage issue. Pre-treated for color fastening
                to ensure there is no color bleeding. All our Clothing is modest, with no plunging necklines or high slits that would make you uncomfortable at work.</>,
            className: "-mt-3 pb-2 ",
            onlyText: true
        }, {
            heading: "No Inventory, No Mass Production",
            img: "/assets/images/minimal-wasteage_800.jpg",
            text: "The Fashion Industry is the second most polluting industry in the world (after petroleum).",
        }, {
            text: "Some hard Facts: There are about 150 Billion Garments made each year, of which a whopping 30% are unsold and end up in landfills or are incinerated.",
            className: "-mt-3 pb-2 ",
            onlyText: true
        }, {
            text: "About 12.8 million tons of clothing is sent to landfills annually. The Fashion & the apparel industry produces 1.2 billion tons of greenhouse gases annually.",
            className: "py-2",
            onlyText: true
        }, {
            text: "In recent times, one of the major Fast Fashion brands has been responsible for $4.3 billion of unsold inventory in a single year alone.",
            className: "py-2",
            onlyText: true
        }, {
            text: <>We, at SALT Attire, do not promote this aspect of fast fashion and are doing our bit to be part of the solution; we follow a No-Inventory Model.<br/>We hold
                absolutely No Inventory and this helps us create a sustainable manufacturing process</>,
            className: "py-2",
            onlyText: true
        }, {
            text: <>This is also the reason why your items take 7-10 days for delivery, Since your garments are made only once the order is
                received and hence the time taken to make.<br/>A 7 day shipping v/s a 2 day shipping, a small price to pay for the environment, isn&apos;t it?</>,
            className: "py-2",
            onlyText: true
        }, {
            heading: "Ethical & Fair Treatment",
            img: "/assets/images/ethical-fair_800.jpg",
            text: "We know that it is our duty to not only serve our customers but also our people who craft pieces for you. The people who make the clothes are as important as the people who wear them. The craftsmen tirelessly cutting, sewing, stitching your clothes are the real heroes behind the scenes.",
        }, {
            text: "All our garments are made in-house in our workshop. These garments are carefully cut, stitched and finished by our in-house team of tailors. All our tailors are given monthly wages, healthcare benefits, and work in good working conditions.  For example, the entire workshop is fully air-conditioned. The conditions our entire team works in is the same as that we would like to keep for ourselves.",
            className: "-mt-3 pb-2 ",
            onlyText: true
        }, {
            text: "All our garments are made in-house in our workshop. These garments are carefully cut, stitched and finished by our in-house team of tailors. All our tailors are given monthly wages, healthcare benefits, and work in good working conditions.  For example, the entire workshop is fully air-conditioned. The conditions our entire team works in is the same as that we would like to keep for ourselves.",
            className: "py-2",
            onlyText: true
        }, {
            text: "We believe in Ethical & Fair trade Clothing and have an answer to the popular movement #WhoMadeMyClothes.",
            className: "py-2",
            onlyText: true
        }, {
            text: "So the next time you are in a mall or tempted to buy something from an e-commerce site, ask yourself, why buy a garment which is probably made in a sweatshop when you can buy better quality, in-turn supporting your local community and being aware of #WhoMadeMyClothes?",
            className: "py-2",
            onlyText: true
        },
    ]
    const inputClass = "w-full border border-[#111]] placeholder:font-500 placeholder:text-black focus:bg-white focus:ring-transparent focus:border-black text-[15px] p-[5px] my-1"

    const [data, setData] = React.useReducer((state, e) => {
        state[e.target.name] = e.target.value;
    }, {})

    const [show, setShow] = React.useState(false)

    const save = (e) => {
        e.preventDefault()
    }

    const shareOnTwitter = () => {
        let url = 'https://twitter.com/intent/tweet?url=' + `https://saltattire.com/blog/about-salt/styling-service`;
        window.open(url, 'TwitterWindow', "width = 1200, height = 600");
        return false;
    }
    const shareOnFB = () => {
        let url = 'https://www.facebook.com/dialog/share?app_id=253839508451663&display=popup&href=' + `https://saltattire.com/blog/about-salt/styling-service`;
        window.open(url, 'FacebookWindow', "width = 1200, height = 600");
        return false;
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText("https://saltattire.com/blog/about-salt/styling-service");
        setShow(true)
    }

    const body = content.map((item, index) =>
            <div key={index}>
                {
                    item.heading && <div className={"font-cursive text-center mx-8 capitalize my-4 "+[isMobile?"text-3xl":"text-4xl"]}>
                        {item.heading}
                    </div>
                }
                <div className={isMobile?"":"px-20"}>
                    {
                        item.img ?
                            item.link ?
                                <Link href={item.link}>
                                    <a className={"block relative w-full aspect-square"}>
                                        <Image src={WEBASSETS + item.img} layout={`fill`} objectFit={`cover`}/>
                                    </a>
                                </Link>
                                :
                                <div className={"relative w-full aspect-square"}>
                                    <Image src={WEBASSETS + item.img} layout={`fill`} objectFit={`cover`}/>
                                </div>
                            :
                            <></>
                    }
                </div>

                {
                    item.text && <p className={"text-xl font-500 tracking-wide text-[#111] font-cursive " + [item.onlyText ? " px-6 " + item.className : " p-6"]}>
                        {item.text}
                    </p>
                }
            </div>
        )


    const browserView = <section className={"mt-24 container flex justify-center"}>
        <div className={"w-7/12"}>
            <Link href={"/blog"}>
                <a className={"underline font-600 mx-4"}>BACK</a>
            </Link>
            <div className={"text-4xl font-cursive text-center mx-8 capitalize mt-8"}>
                Styling Services
            </div>
            <div className={"flex items-center justify-end gap-4 mx-8 my-6"}>
                <button title="share on facebook" onClick={shareOnFB}>
                    <FaFacebookSquare className={"text-xl"}/>
                </button>
                <button title="share on twitter" onClick={shareOnTwitter}>
                    <FaTwitter className={"text-xl"}/>
                </button>
                <button onClick={copyToClipboard}>
                    <FaShareAlt className={"text-xl"}/>
                </button>
            </div>
            {body}
            <div className={"my-20"}>
                <p className={"text-center text-xl text-[#777] uppercase tracking-wide font-500 my-6"}>comment</p>
                <form onSubmit={save} className={"text-center"}>
                    <input className={inputClass} type="text" name="name" value={data["name"]} placeholder="Name" onChange={setData}/>
                    <input className={inputClass} type="email" name="email" value={data["email"]} placeholder="Email Id" onChange={setData}/>
                    <input className={inputClass} type="tel" name="phone" value={data["phone"]} placeholder="Phone" onChange={setData}/>
                    <textarea className={inputClass} name="comment" value={data["comment"]} placeholder="Comment" onChange={setData} rows={2}/>
                    <button className={"text-white bg-black px-4 py-1 text-sm"} type="submit">SUBMIT</button>
                </form>
                <div className={"my-12 text-center text-[#777]"}>
                    <p className={"uppercase text-xl text-center"}>
                        comment by users
                    </p>
                    <p className={"my-3"}>Be the first to comment on this blog.</p>
                </div>
            </div>
        </div>
        <div className={"fixed left-20 top-1/2 w-32"}>
            <Link href={"/blog/about-salt"}>
                <a className={"font-900 text-lg tracking-wide font-cursive"}>About Salt</a>
            </Link>
            <p className={"font-cursive tracking-wider"}>Our Values</p>
        </div>
    </section>

    const mobileView = <section className={"mt-24 container"}>
        <Link href={"/blog"}>
            <a className={"underline font-600 mx-4"}>BACK</a>
        </Link>
        <div className={"text-3xl font-cursive text-center mx-8 capitalize mt-8"}>
            Styling Services
        </div>
        <div className={"flex items-center gap-4 mx-8 my-6"}>
            <button title="share on facebook" onClick={shareOnFB}>
                <FaFacebookSquare className={"text-2xl"}/>
            </button>
            <button title="share on twitter" onClick={shareOnTwitter}>
                <FaTwitter className={"text-2xl"}/>
            </button>
            <button onClick={copyToClipboard}>
                <FaShareAlt className={"text-2xl"}/>
            </button>
        </div>
        {body}
        <div className={"px-8 py-16"}>
            <Link href={"/blog/about-salt"}>
                <a>
                    <div className={"text-3xl font-500 font-cursive tracking-wide"}>
                        About Salt
                    </div>
                    <div className={"text-[#333] font-cursive tracking-wide py-4"}>
                        Our Values
                    </div>
                </a>
            </Link>
            <div>
                <p className={"text-center text-lg uppercase tracking-wide font-900"}>comment</p>
                <form onSubmit={save} className={"text-center"}>
                    <input className={inputClass} type="text" name="name" value={data["name"]} placeholder="Name" onChange={setData}/>
                    <input className={inputClass} type="email" name="email" value={data["email"]} placeholder="Email Id" onChange={setData}/>
                    <input className={inputClass} type="tel" name="phone" value={data["phone"]} placeholder="Phone" onChange={setData}/>
                    <textarea className={inputClass} name="comment" value={data["comment"]} placeholder="Comment" onChange={setData} rows={2}/>
                    <button className={"text-white bg-black px-4 py-1 text-sm"} type="submit">SUBMIT</button>
                </form>
                <div className={"my-12"}>
                    <p className={"uppercase font-800 text-xl text-center"}>
                        comment by users
                    </p>
                    <p className={"my-3 font-800"}>Be the first to comment on this blog.</p>
                </div>
            </div>
        </div>
    </section>

    return (
        <>
            <PageHead url="/bolg/about-salt/styling-service" id="styling-service" isMobile={isMobile}/>
            <Header type={isMobile ? "minimal" : ""} isMobile={isMobile}/>
            {isMobile ? mobileView : browserView}
            {
                isMobile && <Footer isMobile={true}/>
            }
            <Toast show={show} hideToast={() => setShow(false)}>
                <span>Link copied to share</span>
            </Toast>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isMobile: state.appConfig.isMobile
    }
}

export default connect(mapStateToProps)(Index);