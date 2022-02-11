import React from 'react';
import ParallaxBlock from "../common/parallax";

/**
 * @todo @Sambhav css pls
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

function Fabric(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    let oldValue, newValue = 0;
    const [scrollDirection, setScrollDirection] = React.useState(false)
    const scrollController = e => {
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
        return window.removeEventListener('scroll', scrollController);
    },[scrollDirection])

    const mobileView = null;
    const browserView = (
        <>
            <ParallaxBlock
                bgImage={WEBASSETS + "/assets/images/mimoto-7.jpg"}
                bodyStyle={`items-start gap-y-20`}
            >
                <div className={`font-cursive italic font-600 bg-white p-5 w-2/5 duration-200 ${scrollDirection ? 'translate-x-0': '-translate-x-full'}`}>
                    <p className={`text-[#be6a74] text-h4`}>“These fabrics are so flimsy. And the polyester ones are so heavy, for this weather.”</p>
                </div>
                <div className={`w-1/2 bg-white/70 p-6`}>
                    <p className={`px-10 font-cursive italic text-5xl text-[#794e4d]`}>Fabric</p>
                    <div className="bg-white/70 py-5 px-10 text-lg text-justify">
                        <p className={`mb-5`}>After traveling across various markets in search for that perfect fabric,(We must've crossed over 10 million steps on fitbit too!), we brought together a selection of fabrics which are aesthetically pleasing, feel good on your skin and are very comfortable for all day wear.</p>
                        <p>These are of premium quality, lightweight and durable.</p>
                        <p>Our polyesters are light weight, all weather, easy to maintain and wrinkle free.</p>
                    </div>
                </div>
            </ParallaxBlock>
            <div className={`h-[80vh] grid place-items-center content-center text-center font-600 font-cursive italic`}>
                <p className={`text-black/50 font-sans font-600 mb-10 not-italic`}>Store B: (A European brand)</p>
                <div>
                    <p className={`text-4xl`}>“Finally a good collection in terms of the design, style and some good prints too”</p>
                </div>
                <div>
                    <p className={`text-2xl text-black/70 mb-2`}>Radhika now picks a handful of clothes and goes to the trial room. On trying the dress,</p>
                    <p className={`text-4xl`}>“Isn’t this a Size M? Why is it so tight around my arms and then awkwardly loose on the bust”</p>
                </div>
                <div>
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
