import SocialShare from "./SocialShare";
import Image from "next/image";
import React from "react";

/**
 * @todo @Sambhav Css
 * @todo clicks on social and share
 * @param props have isMobile, main
 * @constructor
 */

function WhyCustomTailoredClothing(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const mobileView = null;
    const browserView = (
        <section className={`flex flex-col gap-y-5 font-cursive text-2xl my-10`}>
            <p className={`text-4xl font-600 text-center`}>Why Custom & Tailored Clothing?</p>
            {(props.main)
                ? <SocialShare isMobile={false}/>
                : null
            }
            <span className="block relative w-4/5 aspect-square self-center">
                <Image src={WEBASSETS + "/assets/images/made-to-measure_800.jpg"} alt="Why Custom & Tailored Clothing?" layout={`fill`} objectFit={`cover`}/>
            </span>
            <p>
                We believe that everyone is unique and has her own identity; what she does, what she wears, her body shape, and style, is unique, and hence she should not be expected to conform to a
                set of standard styles and sizes that are mass produced and available off the rack.
            </p>
            <p>
                This is why we provide Custom made garments that you can make based on your preferences, style, body shape and your measurements.
            </p>
            <p>
                You can Design Your Own Garment from scratch or Make Customizations to the items that we design for you.
                To get your garment tailor made online, you can simply enter 3 measurements and the garment will be tailor made for you. We also allow customizations, where you can Select Your Fabric,
                Select the Sleeve type, Sleeve length, Neckline, and the lengths of your garments based on your preferences.
            </p>
            <p>
                And what more, we provide Tailored Fits & Customizations at very affordable prices!
            </p>
            <p>
                So the next time you are in a mall or tempted to buy something from an e-commerce site, ask yourself, Why buy a garment off-the-rack when you can make your own unique garment tailored to your taste and needs ?
            </p>
        </section>
    );

    return (props.isMobile) ? mobileView : browserView;
}

export default WhyCustomTailoredClothing;
