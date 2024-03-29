import React from 'react';
import Image from "next/image";
import ParallaxBlock from "../common/ParallaxBlock";

const AffordableLuxury = props => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const mobileView = (
        <ParallaxBlock
            bgImage={WEBASSETS + "/assets/images/mimoto-9.jpg"}
            bodyStyle={`items-start pt-28`}
            verticalAlign={'justify-start'}
        >
            <div className="absolute top-24 right-10">
                <span className={`block relative h-10 w-10`}>
                    <Image
                        src={WEBASSETS + `/assets/images/salt_logo_white.png`}
                        alt="salt icon"
                        layout={`fill`}
                        objectFit={`contain`}
                    />
                </span>
            </div>
            <div className={`bg-black/30 text-white pt-7 pb-3 pr-3 mr-8 w-11/12`}>
                <p className={`px-10 text-[19px] mb-5 font-cursive italic`}>Affordable Luxury</p>
                <div className="bg-black px-5 py-3 text-[12px] leading-[18px] tracking-wide">
                    <p className="mb-5">We understand the frustration you face when whatever you like costs a bomb and the ones with sane prices are not upto the mark</p>
                    <p>Our pledge is to bring you premium fabrics, elegant designs and impeccable craftsmanship at a reasonable yet approachable price.</p>
                </div>
            </div>
        </ParallaxBlock>
    );
    const browserView = (
        <ParallaxBlock
            bgImage={WEBASSETS + "/assets/images/mimoto-9.jpg"}
            bodyStyle={`items-start`}
        >
            <div className="absolute top-28 right-10">
                <span className={`block relative h-10 w-10`}>
                    <Image
                        src={WEBASSETS + `/assets/images/salt_logo_white.png`}
                        alt="salt icon"
                        layout={`fill`}
                        objectFit={`contain`}
                    />
                </span>
            </div>
            <div className={`bg-black/50 w-1/3 text-white py-5 pr-5`}>
                <p className={`px-10 text-5xl font-cursive italic`}>Affordable Luxury</p>
                <div className="bg-black px-10 py-5">
                    <p className="mb-5">We understand the frustration you face when whatever you like costs a bomb and the ones with sane prices are not upto the mark</p>
                    <p>Our pledge is to bring you premium fabrics, elegant designs and impeccable craftsmanship at a reasonable yet approachable price.</p>
                </div>
            </div>
        </ParallaxBlock>
    );

    return props.isMobile ? mobileView : browserView
};

export default AffordableLuxury;
