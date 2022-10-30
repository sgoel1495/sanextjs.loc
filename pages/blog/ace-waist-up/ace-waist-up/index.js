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
            img: "/assets/images/Ace-Waist-Up_300.jpg",
            text: "From V-neck blouses to printed dresses, here’s everything you need to nail at-home dressing as you continue to work-from-home"
        }, {
            img: "/assets/images/Ace-Waist-Up_img_1.jpg",
            link: "/Outerwear-Spunky-Beige-Ruchedsleeveblazer",
            text: "Working from home, or better known as #WFH has been the default status for many of us since 2020. To accustom ourselves and our lives to the 'new normal' and aid in social distancing, we continue to report from our desks at home."
        }, {
            img: "/assets/images/Ace-Waist-Up_img_2.jpg",
            link: "/Outerwear-Gallant-Suit-Set-FullSuitSet",
            text: "While we may have navigated our way to work from our couches, #WFH comes with its own set of complex questions around how to dress for the same. Enter a new fashion term: waist-up dressing."
        }, {
            img: "/assets/images/Ace-Waist-Up_img_3.jpg",
            link: "https://saltattire.com/Outerwear-Adroit-Suit-Set-FullSuitSet",
            text: "As the name suggests, the focus is on decking up your top half (not like you're standing upright in any of them) and creating looks that are ideal to spruce up makeshift office ensembles."
        }, {
            img: "/assets/images/Ace-Waist-Up_img_4.jpg",
            link: "/Outerwear-Feisty-Suit-Set-FullSuitSet",
            text: "Think linen dresses, formal blazers and blouses with interesting necklines and sleeves. Pro tip: don’t hold back from going all out in the accessory department."
        }, {
            img: "/assets/images/Ace-Waist-Up_img_5.jpg",
            link: "/Dresses-Havelock-StripedShiftDress",
            text: "The best bit? It not only saves you from creating together full looks but also becomes the easiest mood-boosting fix to your workwear woes. From dainty pendants to multi-layered necklaces and statement earrings, there are multiple options to pick from."
        }, {
            img: "/assets/images/Ace-Waist-Up_img_6.jpg",
            link: "/Dresses-Polperro-StripedFauxWrapDress",
            text: "The wear-anywhere blazer is your timeless utility player which can be a winning partner to pretty much everything in your closet. From crisp shirts with linen dresses and blouses, a gently oversized fitted blazer showcasing a longline cut promises an instant image boost."
        }, {
            img: "/assets/images/Ace-Waist-Up_img_7.jpg",
            link: "/Dresses-Sailors-Delight-SmockSleevesFlaredDress",
            text: "There are ample colours and options to pick from. If you’re in the market for stripes, consider something lightweight and in subtle hue like our blue summer stripes blazer showcasing white stripes or opt for our white double breasted blazer."
        }, {
            img: "/assets/images/Ace-Waist-Up_img_8.jpg",
            link: "/Dresses-Green-Ray-ShawlCollaredDress",
            text: "Need something more classic? There’s no going wrong with our Gritty fitted blazk blazer. You can throw it on your satin pajamas or simply wear it with your mini skirt."
        }, {
            img: "/assets/images/Ace-Waist-Up_img_9.jpg",
            link: "/Dresses-Procida-Boat-neckshiftdress",
            text: "Need something more cheerful to keep yourself motivated? A printed dress makes for a winning pick."
        }, {
            img: "/assets/images/Ace-Waist-Up_img_10.jpg",
            link: "/Dresses-Elixir-PleatedMidiShirtDress",
            text: "Pick from our Havelock stripe placements dress showcasing multi-hued stripes or Procida white dress showcasing blue micro florals. Bonus: the eye-catching prints make it interesting for a video call. Don't forget to layer it with a delicate necklace and hoop earrings."
        }, {
            img: "/assets/images/Ace-Waist-Up_img_11.jpg",
            link: "/Dresses-Aspire-Mididresswithboxpleat",
            text: "Dresses and blouses with interesting necklines is a no brainer.  Those who have a special spot for square necklines can totally bank upon Vogue dress which scores high on the fashion quotient. Scroll down to check out our edit of the best WFH separates you need to try this month."
        }, {
            img: "/assets/images/Ace-Waist-Up_img_12.jpg",
            link: "/Dresses-Vogue-Maroon-WideSquareNeckTuckDetailsDress"
        }
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
        let url = 'https://twitter.com/intent/tweet?url=' + `https://saltattire.com/blog/ace-waist-up/ace-waist-up`;
        window.open(url, 'TwitterWindow', "width = 1200, height = 600");
        return false;
    }
    const shareOnFB = () => {
        let url = 'https://www.facebook.com/dialog/share?app_id=253839508451663&display=popup&href=' + `https://saltattire.com/blog/ace-waist-up/ace-waist-up`;
        window.open(url, 'FacebookWindow', "width = 1200, height = 600");
        return false;
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText("https://saltattire.com/blog/ace-waist-up/ace-waist-up");
        setShow(true)
    }

    const browserView = <section className={"mt-24 container flex justify-center"}>
        <div className={"w-7/12"}>
            <Link href={"/blog"}>
                <a className={"underline font-600 mx-4"}>BACK</a>
            </Link>
            <div className={"text-4xl font-cursive text-center mx-8 capitalize mt-8"}>
                Ace waist-up dressing while you Work from home
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
            {
                content.map((item, index) =>
                    <div key={index}>
                        <div className={"px-20"}>
                            {
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
                            }
                        </div>

                        {
                            item.text && <p className={"p-6 text-xl font-500 tracking-wide text-[#111] font-cursive"}>
                                {item.text}
                            </p>
                        }
                    </div>
                )
            }
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
            <Link href={"/blog/ace-waist-up"}>
                <a className={"font-900 text-lg tracking-wide font-cursive"}>Ace Waist-Up</a>
            </Link>
            <p className={"font-cursive tracking-wider"}>Ace waist-up dressing while you Work from home</p>
        </div>
    </section>

    const mobileView = <section className={"mt-24 container"}>
        <Link href={"/blog"}>
            <a className={"underline font-600 mx-4"}>BACK</a>
        </Link>
        <div className={"text-3xl font-cursive text-center mx-8 capitalize mt-8"}>
            Ace waist-up dressing while you Work from home
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
        {
            content.map((item, index) =>
                <div key={index}>
                    {
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
                    }

                    {
                        item.text && <p className={"p-6 text-xl font-500 tracking-wide text-[#111] font-cursive"}>
                            {item.text}
                        </p>
                    }
                </div>
            )
        }
        <div className={"px-8 py-16"}>
            <Link href={"/blog/ace-waist-up"}>
                <a>
                    <div className={"text-3xl font-500 font-cursive tracking-wide"}>
                        Ace Waist-Up
                    </div>
                    <div className={"text-[#333] font-cursive tracking-wide py-4"}>
                        Ace waist-up dressing while you Work from home
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
            <PageHead url="/bolg/ace-waist-up/ace-waist-up" id="ace-waist-up" isMobile={isMobile}/>
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