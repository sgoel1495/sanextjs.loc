import React from 'react';
import Image from "next/image";
import ParallaxBlock from "../common/ParallaxBlock";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";

/**
 * @todo @Sambhav css pls
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

function SizeFit(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    // GSAP Animation
    gsap.registerPlugin(ScrollTrigger);

    let GSAPBlockAnimation = React.useRef(null);

    React.useEffect(() => {
        gsap.fromTo(
            GSAPBlockAnimation,
            {
                y: -GSAPBlockAnimation.offsetHeight,
                opacity: 0
            },
            {
                scrollTrigger: {
                    trigger: GSAPBlockAnimation,
                    start: "bottom bottom-=150",
                    end: "top top+=300",
                    toggleActions: 'play none none reverse',
                    scrub: true
                },
                y: 0,
                opacity: 1
            },
        )
    })

    const mobileView = null;
    const browserView = (
        <>
            <ParallaxBlock
                bgImage={WEBASSETS + "/assets/images/mimoto-8.jpg"}
                bodyStyle={`items-start`}
            >
                <div className="absolute top-28 left-16">
                    <span className={`block relative h-10 w-10`}>
                        <Image
                            src={WEBASSETS + `/assets/images/salticon.png`}
                            alt="salt icon"
                            layout={`fill`}
                            objectFit={`contain`}
                        />
                    </span>
                </div>
                <div className={`w-1/2 bg-white/90 p-6`}>
                    <p className={`px-10 font-cursive italic text-5xl text-[#b7714f]`}>Size & Fit</p>
                    <div className="bg-white py-5 px-10 text-lg text-justify">
                        <p>
                            While conducting our research, we discovered that most brands in India often follow size charts of UK or US. This leads to undesired consequences in fit and the look of the
                            clothing item.
                        </p>
                        <p className={`mb-5`}>
                            If you found a dress or a top which looked great on the hanger but after trying it on, the fit was not right, it was most likely a result of improper sizing.
                        </p>
                        <p className={`mb-5`}>
                            Our on ground team talked to over 500 women shoppers and understood their requirements for fit and comfort, especially when it comes to a professional setting and all-day
                            clothing.
                        </p>
                        <p className={`mb-5`}>We offer 3 kinds of fits: Fitted, Straight, Comfort.</p>
                        <p>All our pants and skirts are tailored and are made from stretchable fabric. Our pants have elasticated waistbands at the back to fit your well on the waist and hips. Our
                            dresses are
                            made with stretch fabric with darts wherever required.</p>
                    </div>
                </div>
            </ParallaxBlock>
            <div className={`h-screen grid place-items-center content-center text-center font-600 font-cursive italic`}>
                <p className={`text-black/50 font-sans font-600 mb-10 not-italic`}>Store C: (Popular Luxury Clothing Brand)</p>
                <div className={`mb-5`}>
                    <p className={`text-2xl text-black/70 mb-2`}>Radhika finally enters a high-end store. She tries out some tops and does like them.</p>
                    <p className={`text-4xl`}>“This shirt fits well”</p>
                </div>
                <div ref={el => {GSAPBlockAnimation = el}}>
                    <p className={`text-2xl text-black/70 mb-2`}>she thinks. Looks at the price tag</p>
                    <p className={`text-4xl`}>“Wow! This is double the price of what I would pay even in New York”.</p>
                </div>
            </div>
        </>
    );

    return props.isMobile ? mobileView : browserView

}

export default SizeFit;
