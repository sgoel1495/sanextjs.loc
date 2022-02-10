import Image from "next/image";

/**
 * @todo @Sambhav css pls
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

function Radhika(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const mobileView = null;
    const browserView = <div>
        <div>
            <Image src={WEBASSETS + "/assets/images/mimoto-2.jpg"} alt="mimoto-2" width="600" height="600"/>
            <h2>Once upon a time, One Indian girl, Radhika, lived and worked in New York.</h2>
            <h5>(And no, this is not the Radhika from Chetan Bhagat’s book. Although she is that smart, independent
                girl)</h5>
        </div>
        <div>
            <Image src={WEBASSETS + "/assets/images/mimoto-3.jpg"} alt="mimoto-2" width="600" height="600"/>
            <h2>So, Radhika also shopped in New York.</h2>
            <h5>She wore those impressive clothes to work, out at dinners or at fancy rooftops for work events !</h5>
        </div>
        <div>
            <Image src={WEBASSETS + "/assets/images/mimoto-4.jpg"} alt="mimoto-2" width="600" height="600"/>
            <h2>A few years later Radhika moved back to India (new land of opportunity),
                and one day, she wanted to shop! But where could she?</h2>
            <h5>There were so many options; International (mostly European) brands now in India, the e-commerce space
                was bursting with brands. In fact, there were many Indian brands too that promised to offer work-wear
                clothing.</h5>
        </div>
        <div>
            <Image src={WEBASSETS + "/assets/images/mimoto-5.jpg"} alt="mimoto-2" width="600" height="600"/>
            <h2>Enthusiastic and eager, One sunny weekend, Radhika stepped out to shop and visited the mall. A plush
                mall with so many brands, excited, Radhika enters the first store...</h2>
        </div>
        <div>
            <h5>Store A (An Indian brand)</h5>
            <h6>After looking through a few work-wear racks, she thinks</h6>
        </div>
        <div>
            <h2>“These styles are not even qualified for work-wear. Some of them are so sheer and the necklines too deep.
                And these designs are not even flattering”.</h2>
        </div>
    </div>;

    return props.isMobile ? mobileView : browserView

}

export default Radhika;