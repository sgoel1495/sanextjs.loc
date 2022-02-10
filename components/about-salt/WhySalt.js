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
    const browserView = <div>
        <div>
            <h2>Why Salt ?</h2>
            <p>SALT Attire brings to you the sharpest assortment of women’s work wear of pants, shirts, dresses, skirts, and tops. The size, fit, fabric, and finishing of our clothes are subjected to multiple layers of test so that you get the most comfortable and most practical work wear that is one of India’s first collection of 9-9 clothes. We understand your need for functionality along with fashion when it comes to formal wear. And we also believe that shouldn’t need a trip to London or New York. Because fashion and functionality need not be mutually exclusive, right?</p>
            <p>Every piece of clothing that you pick up from the SALT collection is eligible to be worn both in office and for all your other official appointments. Hence, no lugging around extra clothes for that dinner party you might have to attend after office. This is one of the many ways in which we at SALT bring together the best of fashion along with complete functionality.</p>
            <p>Tailored fit pants, anti-gaping shirts, lightweight skirts, fuss-free tops, and the most flattering dresses- all made with the best quality lightweight polyester, rayon and pure cotton which are imported from the best sources. After all, what looks good to the eyes, must feel good the skin too.</p>
            <p>Simple, sophisticated, smart, and comfortable-is that similar to your sense of work wear? Then SALT Attire is made for you!</p>
        </div>
        <div>
            <Image src={WEBASSETS + "/assets/images/mimoto-11.jpg"} alt="mimoto-11" width="600" height="600"/>
        </div>
    </div>;

    return props.isMobile ? mobileView : browserView

}

export default WhySalt;