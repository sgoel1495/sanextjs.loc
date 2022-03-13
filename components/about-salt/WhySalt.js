import React from 'react';
import ParallaxBlock from "../common/ParallaxBlock";
import Image from "next/image";

/**
 * @todo @Sambhav css pls
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

function WhySalt(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const mobileView = null;
    const browserView = (
        <ParallaxBlock
            bgImage={WEBASSETS + "/assets/images/mimoto-11.jpg"}
            bodyStyle={`items-start justify-between`}
        >
            <div className={`bg-[#f7f7f7] w-1/2 py-2 text-justify`}>
                <p className={`text-4xl text-center bg-black/80 text-white font-cursive italic py-3 w-4/5`}>Why Salt ?</p>
                <div className={`p-6`}>
                    <p>SALT Attire brings to you the sharpest assortment of women’s work wear of pants, shirts, dresses, skirts, and tops. The size, fit, fabric, and finishing of our clothes are subjected to multiple layers of test so that you get the most comfortable and most practical work wear that is one of India’s first collection of 9-9 clothes. We understand your need for functionality along with fashion when it comes to formal wear. And we also believe that shouldn’t need a trip to London or New York. Because fashion and functionality need not be mutually exclusive, right?</p>
                    <p className={`mb-4`}>Every piece of clothing that you pick up from the SALT collection is eligible to be worn both in office and for all your other official appointments. Hence, no lugging around extra clothes for that dinner party you might have to attend after office. This is one of the many ways in which we at SALT bring together the best of fashion along with complete functionality.</p>
                    <p className={`mb-4`}>Tailored fit pants, anti-gaping shirts, lightweight skirts, fuss-free tops, and the most flattering dresses- all made with the best quality lightweight polyester, rayon and pure cotton which are imported from the best sources. After all, what looks good to the eyes, must feel good the skin too.</p>
                    <p>Simple, sophisticated, smart, and comfortable-is that similar to your sense of work wear? Then SALT Attire is made for you!</p>
                </div>
                <span className={`block relative h-10 w-10 ml-auto mr-5`}>
                    <Image
                        src={WEBASSETS + `/assets/images/salticon.png`}
                        alt="salt icon"
                        layout={`fill`}
                        objectFit={`contain`}
                    />
                </span>
            </div>
        </ParallaxBlock>
    );

    return props.isMobile ? mobileView : browserView

}

export default WhySalt;
