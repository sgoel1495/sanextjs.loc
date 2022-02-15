import SocialShare from "./SocialShare";
import Image from "next/image";

/**
 * @todo @Sambhav Css
 * @todo clicks on social and share
 * @param props have isMobile, main
 * @constructor
 */

function PremiumFabricQuality(props){
    const mobileView = null;
    const browserView = <div>
        <div>Premium Fabric & Quality</div>
        {(props.main)
            ? <SocialShare isMobile={false}/>
            : null
        }
        <Image src={WEBASSETS + "/assets/images/premium_fabric_quality_800.jpg"} width="300" height="300" alt="Premium Fabric & Quality" />
        <p>
            The fabrics used are of premium quality. High Quality, premium fabrics that are breathable, wrinkle-free are used to give the garment a polished look. The fabrics range from lightweight to medium weight suiting fabrics, wool blends, poly crepe, to extremely breathable and summer friendly cottons, linens, cotton viscose etc.We take utmost care in making the garment, right from using the best quality threads, to accessories, whether its buttons, zippers, hooks and other elements. Apart from the fabric, design and fit, we go through strict quality control parameters to give you what you truly deserve.
            All our fabric is: Pre-Washed, to remove any stains and odor. Pre-Shrunk, to ensure you will never have to face any shrinkage issue. Pre-treated for color fastening to ensure there is no color bleeding. All our Clothing is modest, with no plunging necklines or high slits that would make you uncomfortable at work.
        </p>
    </div>;

    return (props.isMobile)? mobileView : browserView;
}

export default PremiumFabricQuality;