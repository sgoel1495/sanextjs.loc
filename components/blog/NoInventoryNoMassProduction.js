
import SocialShare from "./SocialShare";
import Image from "next/image";

/**
 * @todo @Sambhav Css
 * @todo clicks on social and share
 * @param props have isMobile, main
 * @constructor
 */

function NoInventoryNoMassProduction(props){
    const mobileView = null;
    const browserView = <div>
        <div>No Inventory, No Mass Production</div>
        {(props.main)
            ? <SocialShare isMobile={false}/>
            : null
        }
        <Image src={WEBASSETS + "/assets/images/minimal-wasteage_800.jpg"} width="300" height="300" alt="No Inventory, No Mass Production" />
        <p>
            The Fashion Industry is the second most polluting industry in the world (after petroleum).Some hard Facts: There are about 150 Billion Garments made each year, of which a whopping 30% are unsold and end up in landfills or are incinerated.About 12.8 million tons of clothing is sent to landfills annually. The Fashion & the apparel industry produces 1.2 billion tons of greenhouse gases annually.In recent times, one of the major Fast Fashion brands has been responsible for $4.3 billion of unsold inventory in a single year alone.We, at SALT Attire, do not promote this aspect of fast fashion and are doing our bit to be part of the solution; we follow a No-Inventory Model.
            We hold absolutely No Inventory and this helps us create a sustainable manufacturing processThis is also the reason why your items take 7-10 days for delivery, Since your garments are made only once the order is received and hence the time taken to make.
            A 7 day shipping v/s a 2 day shipping, a small price to pay for the environment, isn't it?
        </p>
    </div>;

    return (props.isMobile)? mobileView : browserView;
}

export default NoInventoryNoMassProduction;