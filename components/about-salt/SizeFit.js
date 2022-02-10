import Image from "next/image";

/**
 * @todo @Sambhav css pls
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

function SizeFit(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const mobileView = null;
    const browserView = <div>
        <Image src={WEBASSETS + "/assets/images/mimoto-8.jpg"} alt="mimoto-8" width="600" height="600"/>
        <div>
            <h2>Size & Fit</h2>
            <p>While conducting our research, we discovered that most brands in India often follow size charts of UK or US. This leads to undesired consequences in fit and the look of the clothing item. If you found a dress or a top which looked great on the hanger but after trying it on, the fit was not right, it was most likely a result of improper sizing.</p>
            <p>Our on ground team talked to over 500 women shoppers and understood their requirements for fit and comfort, especially when it comes to a professional setting and all-day clothing.</p>
            <p>We offer 3 kinds of fits: Fitted, Straight, Comfort.</p>
            <p>All our pants and skirts are tailored and are made from stretchable fabric. Our pants have elasticated waistbands at the back to fit your well on the waist and hips. Our dresses are made with stretch fabric with darts wherever required.</p>
        </div>
        <div>
            <h6>Store C: (Popular Luxury Clothing Brand)</h6>
            <h6>Radhika finally enters a high-end store. She tries out some tops and does like them.</h6>
            <h2>“This shirt fits well”</h2>
        </div>
        <div>
            <h6>she thinks. Looks at the price tag</h6>
            <h2>“Wow! This is double the price of what I would pay even in New York”.</h2>
        </div>
        <Image src={WEBASSETS + "/assets/images/mimoto-9.jpg"} alt="mimoto-9" width="600" height="600"/>
        <div>
            <h2>Affordable Luxury</h2>
            <p>Our pledge is to bring you premium fabrics, elegant designs and impeccable craftsmanship at a reasonable yet approachable price.</p>
        </div>
    </div>;

    return props.isMobile ? mobileView : browserView

}

export default SizeFit;