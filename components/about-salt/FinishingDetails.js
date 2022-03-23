import React from 'react';
import Image from "next/image";
import ParallaxBlock from "../common/ParallaxBlock";

/**
 * @todo @Sambhav css pls
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

function FinishingDetails(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const mobileView = null;
    const browserView = (
        <>
            <ParallaxBlock
                bgImage={WEBASSETS + "/assets/images/mimoto-10.jpg"}
                bodyStyle={`items-end`}
            >
                <div className="absolute top-28 right-10">
                    <span className={`block relative h-10 w-10`}>
                        <Image
                            src={WEBASSETS + `/assets/images/salticon.png`}
                            alt="salt icon"
                            layout={`fill`}
                            objectFit={`contain`}
                        />
                    </span>
                </div>
                <div className="bg-white/80 w-3/5 py-5 pl-5">
                    <p className={`text-5xl font-cursive italic text-[#794e4d]`}>Quality, Finishing & Details</p>
                    <div className="bg-white p-5">
                        <p className={`mb-5`}>We take utmost care in making the garment, right from using the best quality threads to the accessories, whether it be buttons, zippers, hooks, other
                            elements.</p>
                        <p className={`mb-5`}>Apart from the fabric, design and fit, we go through strict quality control parameters to give you what you truly deserve.</p>
                        <p>All our fabric is:</p>
                        <ul className={`ml-10`}>
                            <li>Pre-washed, to remove any stains and odor</li>
                            <li className={'mb-5'}>Pre-shrunk, to ensure you will never have to face any shrinkage issue.</li>
                            <li>Our shirts are designed to be gaping free.</li>
                            <li>Pants and skirts are made with stretch fabric.</li>
                            <li>And we offer tailored fitting for pants and skirts.</li>
                        </ul>
                        <p>To ensure our clothes are work-appropriate:</p>
                        <p>
                            All our clothing is modest with no plunging necklines or high slits that would make you uncomfortable at work. For any design that uses a sheer fabric, we provide you with
                            a
                            complimentary camisole.
                        </p>
                    </div>
                </div>
            </ParallaxBlock>
            <div className={`h-[50vh] grid place-items-center content-center text-center font-600 font-cursive italic`}>
                <p className={`text-2xl text-black/70 mb-2`}>After exiting a few more stores dejected and trying her hand at online shopping, Radhika turns to her friends for advice.</p>
                <p className={`text-4xl mb-2`}>“Where do you guys shop for business casuals in India?”,</p>
                <p className={`text-2xl text-black/70`}>And to her surprise, despite so many brands, everyone had the same issues as her; Design, Fabric, Fit, or the overall quality!</p>
            </div>
            <div className={`h-[80vh] grid place-items-center content-center text-center font-600 font-cursive italic`}>
                <p className={`text-6xl`}>We hear you</p>
                <p className={`text-6xl`}>Radhika!</p>
            </div>
        </>
    );

    return props.isMobile ? mobileView : browserView

}

export default FinishingDetails;
