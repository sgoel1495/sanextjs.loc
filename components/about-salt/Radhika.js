import React from 'react';
import ParallaxBlock from "../common/ParallaxBlock";

/**
 * @todo @Sambhav css pls
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

function Radhika(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const mobileView = null;
    const browserView = (
        <>
            <ParallaxBlock
                bgImage={WEBASSETS + "/assets/images/mimoto-2.jpg"}
                bodyStyle={`items-end`}
            >
                <div className="bg-[#be997ff2] shadow-2xl w-10/12 pl-20 py-5">
                    <p className={`text-h2 font-cursive italic`}>Once upon a time, One Indian girl, Radhika, lived and worked in New York</p>
                    <p className={`text-h6 text-white`}>(And no, this is not the Radhika from Chetan Bhagat’s book. Although she is that smart, independent girl)</p>
                </div>
            </ParallaxBlock>
            <ParallaxBlock
                bgImage={WEBASSETS + "/assets/images/mimoto-3.jpg"}
                bodyStyle={`items-start`}
            >
                <div className="bg-[#5a3d3af2] shadow-2xl w-9/12 pl-20 py-5">
                    <p className={`text-5xl text-[#f3e8ab] font-cursive italic`}>So, Radhika also shopped in New York.</p>
                    <p className={`text-h6 text-white`}>She wore those impressive clothes to work, out at dinners or at fancy rooftops for work events!</p>
                </div>
            </ParallaxBlock>
            <ParallaxBlock
                bgImage={WEBASSETS + "/assets/images/mimoto-4.jpg"}
                bodyStyle={`items-end`}
            >
                <div className="bg-[#fffffff2] shadow-2xl w-10/12 pl-20 py-5">
                    <p className={`text-[#9a4222] text-4xl font-cursive italic`}>A few years later Radhika moved back to India (new land of opportunity),<br/>and one day, she wanted to shop! But where could she?</p>
                    <h5>There were so many options; International (mostly European) brands now in India, the e-commerce space was bursting with brands. In fact,<br/>there were many Indian brands too that promised to offer work-wear clothing.</h5>
                </div>
            </ParallaxBlock>
            <ParallaxBlock
                bgImage={WEBASSETS + "/assets/images/mimoto-5.jpg"}
                bodyStyle={`items-end`}
            >
                <div className="bg-[#e8cfaff2] p-8 w-11/12 shadow-2xl">
                    <p className={`text-h3`}>Enthusiastic and eager, One sunny weekend, Radhika stepped out to shop and visited the mall. A plush mall with so many brands, excited, Radhika enters the first store...</p>
                </div>
            </ParallaxBlock>
            <div className={`h-screen grid place-items-center content-center text-center`}>
                <p className={`text-black/50 font-600 mb-10`}>Store A (An Indian brand)</p>
                <p className={`text-black/50 font-600 font-cursive italic text-h3`}>After looking through a few work-wear racks, she thinks</p>
                <p className={`font-cursive italic text-5xl`}>“These styles are not even qualified for work-wear.<br/>Some of them are so sheer and the necklines too deep.<br/>And these designs are not even flattering”.</p>
            </div>
        </>
    );

    return props.isMobile ? mobileView : browserView

}

export default Radhika;
