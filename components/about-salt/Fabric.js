import Image from "next/image";

/**
 * @todo @Sambhav css pls
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

function Fabric(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const mobileView = null;
    const browserView = <div>
        <Image src={WEBASSETS + "/assets/images/mimoto-7.jpg"} alt="mimoto-7" width="600" height="600"/>
        <div>
            <h6>“These fabrics are so flimsy. And the polyester ones are so heavy, for this weather.”</h6>
            <h6>("These styles are not even qualified for work-wear."</h6>
        </div>
        <div>
            <h2>Fabric</h2>
            <p>After traveling across various markets in search for that perfect fabric,(We must've crossed over 10 million steps on fitbit too!), we brought together a selection of fabrics which are aesthetically pleasing, feel good on your skin and are very comfortable for all day wear.</p>
            <p>These are of premium quality, lightweight and durable. Our polyesters are light weight, all weather, easy to maintain and wrinkle free.</p>
        </div>
        <div>
            <h6>Store B: (A European brand)</h6>
            <h2>“Finally a good collection in terms of the design, style and some good prints too”</h2>
        </div>
        <div>
            <h6>Radhika now picks a handful of clothes and goes to the trial room. On trying the dress,</h6>
            <h2>“Isn’t this a Size M? Why is it so tight around my arms and then awkwardly loose on the bust”</h2>
        </div>
        <div>
            <h6>Dissuaded she moves on to try the pants</h6>
            <h2>This size is fitting me really tight from the hip and if I take a size bigger it will be loose”</h2>
        </div>
        <div>
            <h2>“Sigh!”</h2>
        </div>
    </div>;

    return props.isMobile ? mobileView : browserView

}

export default Fabric;