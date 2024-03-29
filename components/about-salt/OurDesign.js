import React, {useEffect, useState} from 'react';
import ParallaxBlock from "../common/ParallaxBlock";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useScrollDirection from "../../hooks/useScrollDirection";

/**
 * @todo @Sambhav css pls
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

function OurDesign(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const scrollDirection = useScrollDirection()
    /*
    let oldValue, newValue = 0;
    const [scrollDirection, setScrollDirection] = React.useState(false)

    function scrollController(_e) {
        newValue = window.scrollY;
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
     */

    // GSAP Animation
    gsap.registerPlugin(ScrollTrigger);

    let GSAPBlock = React.useRef(null);
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
                    start: "bottom bottom-=300",
                    end: "top top+=200",
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
                bgImage={WEBASSETS + "/assets/images/mimoto-6.jpg"}
                bodyStyle={`items-start pt-12`}
                verticalAlign={'justify-start'}
            >
                <div className={`bg-white mr-8 p-4 font-cursive italic font-600 duration-200 ${scrollDirection ? 'translate-x-0' : 'opacity-0 -translate-x-full'}`}>
                    <p className={`text-[10px] text-black/70`}>After looking through a few work-wear racks, she thinks</p>
                    <p className={`text-[11px] font-700 leading-none`}>&quot;These styles are not even qualified for work-wear.&quot;</p>
                </div>
                <div className={`bg-black/80 mr-8 text-white py-4`}>
                    <p className={`text-[19px] font-cursive italic px-8 leading-none mb-2`}>Our Designs</p>
                    <div className="pb-5 px-5 text-[12px] leading-[13px] text-justify bg-black/80">
                        <p className='mb-4'>
                            Our design team has a simple philosophy, design a nine to nine wardrobe for the contemporary working woman. We have anticipated your needs, your lifestyle, your schedule to
                            create designs which are functional, sophisticated and chic. We focus on clean cuts with finer detailing. We understand the need for functionality without compromising on the
                            aesthetic appeal.
                        </p><br />
                        <p>
                            Yes!, you can wear something comfortable and flattering into the office without a second thought. At Salt, we create elevated basics that are work appropriate; with no plunging necklines or high slits. Also, for any designs that require the clothing to be sheer, we
                            provide a camisole.
                        </p>
                    </div>
                </div>
            </ParallaxBlock>
            <div className={`h-screen grid content-start text-center px-12 pt-36 font-600 font-cursive italic`}>
                <div className='mb-10'>
                    <p className={`text-[13px] text-black/70`}>Radhika then adds further,</p>
                    <p className={`text-[19px] leading-none`}>“These natural fabrics are so flimsy. And the polyester fabrics are so heavy, for this weather”</p>
                </div>
                <div
                    ref={el => {
                        GSAPBlockAnimation = el
                    }}
                >
                    <p className={`text-[13px] text-black/70`}>She stumbles on some cotton,</p>
                    <p className={`text-[19px] leading-none`}>“Oh Crisp Cottons! But how will I even get through to ironing some of these and they’ll wrinkle so easily“</p>
                </div>
            </div>
        </>
    );
    const browserView = (
        <>
            <ParallaxBlock
                bgImage={WEBASSETS + "/assets/images/mimoto-6.jpg"}
                bodyStyle={`items-start gap-y-10`}
            >
                <div className={`bg-white p-5 w-2/5 font-cursive italic font-600 duration-200 ${scrollDirection ? 'translate-x-0' : 'opacity-0 -translate-x-full'}`}>
                    <p className={`text-h5 text-black/70`}>After looking through a few work-wear racks, she thinks</p>
                    <p className={`text-h3`}>&quot;These styles are not even qualified for work-wear.&quot;</p>
                </div>
                <div className={`bg-black/50 w-1/2 text-white p-5`}>
                    <p className={`text-h1 font-cursive italic`}>Our Designs</p>
                    <div className="py-5 pl-10 pr-8 text-lg text-justify bg-black/70">
                        <p>
                            Our design team has a simple philosophy, design a nine to nine wardrobe for the contemporary working woman. We have anticipated your needs, your lifestyle, your schedule to
                            create designs which are functional, sophisticated and chic. We focus on clean cuts with finer detailing.
                        </p>
                        <p className={`mb-5`}>
                            We understand the need for functionality without compromising on the
                            aesthetic appeal.
                        </p>
                        <p>
                            Yes!, you can wear something comfortable and flattering into the office without a second thought.
                        </p>
                        <p>
                            At Salt, we create elevated basics that are work appropriate; with no plunging necklines or high slits. Also, for any designs that require the clothing to be sheer, we
                            provide a camisole.
                        </p>
                    </div>
                </div>
            </ParallaxBlock>
            <div className={`h-screen grid place-items-center content-center text-center font-600 font-cursive italic`}>
                <div>
                    <p className={`text-2xl text-black/70 mb-2`}>Radhika then adds further,</p>
                    <p className={`text-4xl`}>“These natural fabrics are so flimsy. And the polyester fabrics are so heavy, for this weather”</p>
                </div>
                <div
                    ref={el => {
                        GSAPBlockAnimation = el
                    }}
                >
                    <p className={`text-2xl text-black/70 mb-2`}>She stumbles on some cotton,</p>
                    <p className={`text-4xl`}>“Oh Crisp Cottons! But how will I even get through to ironing some of these and they’ll wrinkle so easily“</p>
                </div>
            </div>
        </>
    );

    return props.isMobile ? mobileView : browserView

}

export default OurDesign;
