import SocialShare from "./SocialShare";
import Image from "next/image";

/**
 * @todo @Sambhav Css
 * @todo clicks on social and share
 * @param props have isMobile, main
 * @constructor
 */

function FreeAlterations(props){
    const mobileView = null;
    const browserView = <div>
        <div>Free Alterations</div>
        {(props.main)
            ? <SocialShare isMobile={false}/>
            : null
        }
        <Image src={WEBASSETS + "/assets/images/free_alteration_800.jpg"} width="300" height="300" alt="Free Alterations" />
        <p>
            Received your garments but need some alterations for a better fit? We're here for you!
            Whether you want to adjust by 0.5" or alter further, we will get it done for you! We offer upto two free alterations until the garment fits you perfectly. The reverse pickup and re-shipping of the garment will be done by us. So sit back, relax and get your garment altered hassle-free.
        </p>
    </div>;

    return (props.isMobile)? mobileView : browserView;
}

export default FreeAlterations;