import React from 'react';
import ParallaxBlock from "../common/ParallaxBlock";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

/**
 * @todo @Sambhav css pls
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

function Fabric(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    let oldValue, newValue = 0;
    const [scrollDirection, setScrollDirection] = React.useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function scrollController(_e){
        newValue = window.pageYOffset;
        if (oldValue < newValue) {
            setScrollDirection(true)
        } else if (oldValue > newValue) {
            setScrollDirection(false)
        }
        oldValue = newValue;
    }

    React.useEffect(() => {
        window.addEventListener('scroll', scrollController);
    }, [scrollController, scrollDirection]);

    // GSAP Animation
    gsap.registerPlugin(ScrollTrigger);

    let GSAPBlock1Animation = React.useRef(null);
    let GSAPBlock2Animation = React.useRef(null);

    React.useEffect(() => {
        gsap.fromTo(
            GSAPBlock1Animation,
            {
                y: -GSAPBlock1Animation.offsetHeight,
                opacity: 0
            },
            {
                scrollTrigger: {
                    trigger: GSAPBlock1Animation,
                    start: "bottom bottom-=150",
                    end: "top top+=300",
                    toggleActions: 'play none none reverse',
                    scrub: true
                },
                y: 0,
                opacity: 1
            },
        )
        gsap.fromTo(
            GSAPBlock2Animation,
            {
                y: -GSAPBlock2Animation.offsetHeight,
                opacity: 0
            },
            {
                scrollTrigger: {
                    trigger: GSAPBlock2Animation,
                    start: "bottom bottom-=300",
                    end: "top top+=150",
                    toggleActions: 'play none none reverse',
                    scrub: true
                },
                y: 0,
                opacity: 1
            },
        )
    })

    const mobileView = (
        <>
            <ParallaxBlock
                bgImage={WEBASSETS + "/assets/images/mimoto-7.jpg"}
                bodyStyle={`items-start pt-24 gap-y-3`}
                verticalAlign={'justify-start'}
            >
                <div className={`font-cursive italic font-600 bg-white p-4 mr-20 duration-200 ${scrollDirection ? 'translate-x-0' : '-translate-x-full opacity-0'}`}>
                    <p className={`text-[#be6a74] text-sm leading-[1.25]`}>“These fabrics are so flimsy. And the polyester ones are so heavy, for this weather.”</p>
                </div>
                <div className={`mr-8 bg-white/70 py-4 px-2`}>
                    <p className={`text-xl font-cursive italic px-5 font-600 leading-none text-[#794e4d]`}>Fabric</p>
                    <div className="bg-white/70 p-3 text-xs text-justify leading-3">
                        <p className={`mb-5`}>After traveling across various markets in search for that perfect fabric,(We must&apos;ve crossed over 10 million steps on fitbit too!), we brought together a
                            selection of fabrics which are aesthetically pleasing, feel good on your skin and are very comfortable for all day wear.</p>
                        <p>These are of premium quality, lightweight and durable. Our polyesters are light weight, all weather, easy to maintain and wrinkle free.</p>
                    </div>
                </div>
            </ParallaxBlock>
            <div className={`h-[80vh] grid place-items-center content-center text-center font-600 font-cursive italic px-12`}>
                <p className={`text-black/50 font-sans font-600 mb-10 not-italic text-xs`}>Store B: (A European brand)</p>
                <div className={`mb-5`}>
                    <p className={`text-lg`}>“Finally a good collection in terms of the design, style and some good prints too”</p>
                </div>
                <div
                    className={`mb-5`}
                    ref={el => {
                        GSAPBlock1Animation = el
                    }}
                >
                    <p className={`text-sm text-black/70 mb-2`}>Radhika now picks a handful of clothes and goes to the trial room. On trying the dress,</p>
                    <p className={`text-lg`}>“Isn’t this a Size M? Why is it so tight around my arms and then awkwardly loose on the bust”</p>
                </div>
                <div
                    ref={el => {
                        GSAPBlock2Animation = el
                    }}
                >
                    <p className={`text-sm text-black/70 mb-2`}>Dissuaded she moves on to try the pants</p>
                    <p className={`text-lg`}>This size is fitting me really tight from the hip and if I take a size bigger it will be loose”</p>
                </div>
            </div>
            <div className={`h-[80vh] grid place-items-center content-center text-center font-cursive italic`}>
                <p className={`text-5xl`}>“Sigh!”</p>
            </div>
        </>
    );
    const browserView = (
        <>
            <ParallaxBlock
                bgImage={WEBASSETS + "/assets/images/mimoto-7.jpg"}
                bodyStyle={`items-start gap-y-20`}
            >
                <div className={`font-cursive italic font-600 bg-white p-5 w-2/5 duration-200 ${scrollDirection ? 'translate-x-0' : '-translate-x-full opacity-0'}`}>
                    <p className={`text-[#be6a74] text-h4`}>“These fabrics are so flimsy. And the polyester ones are so heavy, for this weather.”</p>
                </div>
                <div className={`w-1/2 bg-white/70 p-6`}>
                    <p className={`px-10 font-cursive italic text-5xl text-[#794e4d]`}>Fabric</p>
                    <div className="bg-white/70 py-5 px-10 text-lg text-justify">
                        <p className={`mb-5`}>After traveling across various markets in search for that perfect fabric,(We must&apos;ve crossed over 10 million steps on fitbit too!), we brought together a
                            selection of fabrics which are aesthetically pleasing, feel good on your skin and are very comfortable for all day wear.</p>
                        <p>These are of premium quality, lightweight and durable.</p>
                        <p>Our polyesters are light weight, all weather, easy to maintain and wrinkle free.</p>
                    </div>
                </div>
            </ParallaxBlock>
            <div className={`h-[80vh] grid place-items-center content-center text-center font-600 font-cursive italic`}>
                <p className={`text-black/50 font-sans font-600 mb-10 not-italic`}>Store B: (A European brand)</p>
                <div className={`mb-5`}>
                    <p className={`text-4xl`}>“Finally a good collection in terms of the design, style and some good prints too”</p>
                </div>
                <div
                    className={`mb-5`}
                    ref={el => {
                        GSAPBlock1Animation = el
                    }}
                >
                    <p className={`text-2xl text-black/70 mb-2`}>Radhika now picks a handful of clothes and goes to the trial room. On trying the dress,</p>
                    <p className={`text-4xl`}>“Isn’t this a Size M? Why is it so tight around my arms and then awkwardly loose on the bust”</p>
                </div>
                <div
                    ref={el => {
                        GSAPBlock2Animation = el
                    }}
                >
                    <p className={`text-2xl text-black/70 mb-2`}>Dissuaded she moves on to try the pants</p>
                    <p className={`text-4xl`}>This size is fitting me really tight from the hip and if I take a size bigger it will be loose”</p>
                </div>
            </div>
            <div className={`h-[80vh] grid place-items-center content-center text-center font-600 font-cursive italic`}>
                <p className={`text-5xl`}>“Sigh!”</p>
            </div>
        </>
    );

    return props.isMobile ? mobileView : browserView

}

export default Fabric;
