
import SocialShare from "./SocialShare";
import Image from "next/image";
import React from "react";

function NoInventoryNoMassProduction(props){
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const mobileView = (
        <section className={`flex flex-col gap-y-5 font-cursive text-2xl my-10 px-4`}>
            <p className={`text-2xl font-400 text-center`}>No Inventory, No Mass Production</p>
            {(props.main)
                ? <SocialShare isMobile={true}/>
                : null
            }
            <span className="block relative w-4/5 aspect-square self-center">
                <Image src={WEBASSETS + "/assets/images/minimal-wasteage_800.jpg"} layout={`fill`} objectFit={`cover`} alt="No Inventory, No Mass Production" />
            </span>
            <p>
                The Fashion Industry is the second most polluting industry in the world (after petroleum).
                </p>
                <p>
                Some hard Facts: There are about 150 Billion Garments made each year, of which a whopping 30% are unsold and end up in landfills or are incinerated.
                </p>
                <p>About 12.8 million tons of clothing is sent to landfills annually. The Fashion & the apparel industry produces 1.2 billion tons of greenhouse gases annually.
                    </p>
                    <p>In recent times, one of the major Fast Fashion brands has been responsible for $4.3 billion of unsold inventory in a single year alone.
                        </p>
                        <p>
                            We, at SALT Attire, do not promote this aspect of fast fashion and are doing our bit to be part of the solution; we follow a No-Inventory Model.
                We hold absolutely No Inventory and this helps us create a sustainable manufacturing process.
                </p>
                <p>This is also the reason why your items take 7-10 days for delivery, Since your garments are made only once the order is received and hence the time taken to make.
                A 7 day shipping v/s a 2 day shipping, a small price to pay for the environment, isn&apos;t it?
            </p>
        </section>
    );

    const browserView = (
        <section className={`flex flex-col gap-y-5 font-cursive text-2xl my-10`}>
            <p className={`text-4xl font-600 text-center`}>No Inventory, No Mass Production</p>
            {(props.main)
                ? <SocialShare isMobile={false}/>
                : null
            }
            <span className="block relative w-4/5 aspect-square self-center">
                <Image src={WEBASSETS + "/assets/images/minimal-wasteage_800.jpg"} layout={`fill`} objectFit={`cover`} alt="No Inventory, No Mass Production" />
            </span>
            <p>
                The Fashion Industry is the second most polluting industry in the world (after petroleum).Some hard Facts: There are about 150 Billion Garments made each year, of which a whopping 30% are unsold and end up in landfills or are incinerated.About 12.8 million tons of clothing is sent to landfills annually. The Fashion & the apparel industry produces 1.2 billion tons of greenhouse gases annually.In recent times, one of the major Fast Fashion brands has been responsible for $4.3 billion of unsold inventory in a single year alone.We, at SALT Attire, do not promote this aspect of fast fashion and are doing our bit to be part of the solution; we follow a No-Inventory Model.
                We hold absolutely No Inventory and this helps us create a sustainable manufacturing processThis is also the reason why your items take 7-10 days for delivery, Since your garments are made only once the order is received and hence the time taken to make.
                A 7 day shipping v/s a 2 day shipping, a small price to pay for the environment, isn&apos;t it?
            </p>
        </section>
    );

    return (props.isMobile)? mobileView : browserView;
}

export default NoInventoryNoMassProduction;
