import Image from "next/image";

/**
 * @todo @Sambhav css pls
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

function OurDesign(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    const mobileView = null;
    const browserView = <div>
        <Image src={WEBASSETS + "/assets/images/mimoto-6.jpg"} alt="mimoto-6" width="600" height="600"/>
        <div>
            <h6>After looking through a few work-wear racks, she thinks</h6>
            <h6>"These styles are not even qualified for work-wear."</h6>
        </div>
        <div>
            <h2>Our Designs</h2>
            <p>Our design team has a simple philosophy, design a nine to nine wardrobe for the contemporary working woman. We have anticipated your needs, your lifestyle, your schedule to create designs which are functional, sophisticated and chic. We focus on clean cuts with finer detailing. We understand the need for functionality without compromising on the aesthetic appeal.</p>
            <p>Yes!, you can wear something comfortable and flattering into the office without a second thought. At Salt, we create elevated basics that are work appropriate; with no plunging necklines or high slits. Also, for any designs that require the clothing to be sheer, we provide a camisole.</p>
        </div>
        <div>
            <h6>Radhika then adds further,</h6>
            <h2>“These natural fabrics are so flimsy. And the polyester fabrics are so heavy, for this weather”
            </h2>
        </div>
        <div>
            <h6>She stumbles on some cotton,</h6>
            <h2>“Oh Crisp Cottons! But how will I even get through to ironing some of these and they’ll wrinkle so easily“</h2>
        </div>
    </div>;

    return props.isMobile ? mobileView : browserView

}

export default OurDesign;