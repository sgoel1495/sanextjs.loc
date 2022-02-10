import Image from "next/image";

/**
 * @todo @Sambhav css pls
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

function FinishingDetails(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const mobileView = null;
    const browserView = <div>
        <Image src={WEBASSETS + "/assets/images/mimoto-10.jpg"} alt="mimoto-10" width="600" height="600"/>
        <div>
            <h2>Quality, Finishing & Details</h2>
            <p>We take utmost care in making the garment, right from using the best quality threads to the accessories, whether it be buttons, zippers, hooks, other elements.</p>
            <p>Apart from the fabric, design and fit, we go through strict quality control parameters to give you what you truly deserve.</p>
            <p>All our fabric is:</p>
            <div>
                <ul>
                    <li>Pre-washed, to remove any stains and odor</li>
                    <li>Pre-shrunk, to ensure you will never have to face any shrinkage issue.</li>
                    <br/>
                    <li>Our shirts are designed to be gaping free.</li>
                    <li>Pants and skirts are made with stretch fabric.</li>
                    <li>And we offer tailored fitting for pants and skirts.</li>
                </ul>
            </div>
            <p>To ensure our clothes are work-appropriate:</p>
            <p>All our clothing is modest with no plunging necklines or high slits that would make you uncomfortable at work. For any design that uses a sheer fabric, we provide you with a complimentary camisole.</p>
        </div>
        <div>
            <h6>After exiting a few more stores dejected and trying her hand at online shopping, Radhika turns to her friends for advice.</h6>
            <h2>“Where do you guys shop for business casuals in India?”,</h2>
            <h6>And to her surprise, despite so many brands, everyone had the same issues as her; Design, Fabric, Fit, or the overall quality!</h6>
        </div>
        <div>
            <h2>We hear you Radhika!</h2>
        </div>
    </div>;

    return props.isMobile ? mobileView : browserView

}

export default FinishingDetails;