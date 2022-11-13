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
            img: "/assets/images/Decoding_800.jpg",
            text: "Equal parts easy-to-style and romantic, these linen ensembles are great for everything from work meetings to lunch dates and grocery runs"
        }, {
            img: "/assets/images/Decoding_img_1.jpg",
            link: "/Dresses-Flower-Child-SleevelessDresswithPleatdetail",
            text: "Staying comfortable is the top priority for most of us at the moment."
        }, {
            img: "/assets/images/Decoding_img_2.jpg",
            link: "/Dresses-Anchorage-FloralFitandFlaredDress",
            text: "Case in point: a well-stocked working-from-home wardrobe essential. Blame it on its transportive quality or the breezy look of the fabric, derived from the fibres of the flax plant, linen makes for the ideal fabric due to its absorbent and breathable qualities. With the given humidity and increasing temperatures in most parts of the country, it’s time to swap the denim essentials and sweatpants for something a little more breezy."
        }, {
            img: "/assets/images/Decoding_img_3.jpg",
            link: "https://saltattire.com/Dresses-Monaco-FloralMidiDress",
            text: "The easiest way to beat the heat? A linen ensemble. Whether you’re planning a Sunday tea party in your garden or to dine alfresco this summer or simply on the hunt for stylish options to wear to work—summary linen ensembles are essential."
        }, {
            img: "/assets/images/Decoding_img_4.jpg",
            link: "/Dresses-Antalya-FloralShiftDress",
            text: "Power blouses are your ticket to chic—for instance, our Malta, floral scallop sleeves top, is the ideal pick for an evening out with your friends. Featuring a a split neckline and a scalloped sleeve hem,the dreamy bloom print blouse will not only work well with a pair of flair jeans but you can also style it with a white skirt for a Sunday brunch."
        }, {
            img: "/assets/images/Decoding_img_5.jpg",
            link: "/Dresses-Seychelles-FloralA-LineDress",
            text: "For a little relaxed look, you can consider styling our Capri Floral High Low Tunic with matching Straight Fit Pants that’s available in multiple colours. Is playful, comfy and chic your personal style? Take notes from our Seychelles, Floral A-Line Dress and get your hands on Lima, Floral Boat Neck Top for a winning evening outfit."
        }, {
            img: "/assets/images/Decoding_img_6.jpg",
            link: "/Tops-Malta-FloralScallopSleevesTop",
            text: "If you’re in search of a great affordable dinner outfit, Salt Attire’s ,Monaco Floral Midi Dress will help you seal the deal. Featuring a surplice neckline with a snap button closure, a fabric belt, side pockets, and half-length sleeves, the dress can be styled with a pair of clear heels and hoop earrings."
        }, {
            img: "/assets/images/Decoding_img_7.jpg",
            link: "/Tops-Marseille-FloralV-NeckTop",
            text: "Want something more playful? A white linen dress is always a good decision in the summer months, and you’ll get endless wear out of our Flower ChildSleeveless Dress that comes with Pleat detail. While the pleats add a romantic touch to the ensemble, the neckline makes it modern."
        }, {
            img: "/assets/images/Decoding_img_8.jpg",
            link: "/Tunics-Bodrum-FloralShirtTunic",
            text: "Effortless yet smart, the linen collection at Salt Attire will cater to all of your wardrobe woes. Scroll down to take a closer peek at all the linen ensembles that deserve a spot in your closet now."
        }, {
            img: "/assets/images/Decoding_img_9.jpg",
            link: "/Tops-Lima-FloralBoatNeckTop",
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
        let url = 'https://twitter.com/intent/tweet?url=' + `https://saltattire.com/blog/decoding-the-best-looks-in-linen/decoding-the-best-looks-in-linen`;
        window.open(url, 'TwitterWindow', "width = 1200, height = 600");
        return false;
    }
    const shareOnFB = () => {
        let url = 'https://www.facebook.com/dialog/share?app_id=253839508451663&display=popup&href=' + `https://saltattire.com/blog/decoding-the-best-looks-in-linen/decoding-the-best-looks-in-linen`;
        window.open(url, 'FacebookWindow', "width = 1200, height = 600");
        return false;
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText("https://saltattire.com/blog/decoding-the-best-looks-in-linen/decoding-the-best-looks-in-linen");
        setShow(true)
    }

    const browserView = <section className={"mt-24 container flex justify-center"}>
        <div className={"w-7/12"}>
            <Link href={"/blog"}>
                <a className={"underline font-600 mx-4"}>BACK</a>
            </Link>
            <div className={"text-4xl font-cursive text-center mx-8 capitalize mt-8"}>
                Decoding The Best Looks In Linen
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
            <Link href={"/blog/decoding-the-best-looks-in-linen"}>
                <a className={"font-900 text-lg tracking-wide font-cursive"}>Decoding The Best Looks In Linen</a>
            </Link>
            <p className={"font-cursive tracking-wider"}>Pants to dresses; Best linen ensembles to own right now</p>
        </div>
    </section>

    const mobileView = <section className={"mt-24 container"}>
        <Link href={"/blog"}>
            <a className={"underline font-600 mx-4"}>BACK</a>
        </Link>
        <div className={"text-3xl font-cursive text-center mx-8 capitalize mt-8"}>
            Decoding The Best Looks In Linen
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
            <Link href={"/blog/decoding-the-best-looks-in-linen"}>
                <a>
                    <div className={"text-3xl font-500 font-cursive tracking-wide"}>
                        Decoding the best looks in linen
                    </div>
                    <div className={"text-[#333] font-cursive tracking-wide py-4"}>
                        Pants to dresses; Best linen ensembles to own right now
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
            <PageHead url="/bolg/decoding-the-best-looks-in-linen/decoding-the-best-looks-in-linen" id="decoding-the-best-looks-in-linen" isMobile={isMobile}/>
            <Header type={isMobile ? "minimal" : ""} isMobile={isMobile} currSwitch={true}/>
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