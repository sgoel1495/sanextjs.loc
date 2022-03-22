import SocialShare from "./SocialShare";
import Image from "next/image";
import React from "react";

function FreeAlterations(props){
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const mobileView = null;
    const browserView = (
        <section className={`flex flex-col gap-y-5 font-cursive text-2xl my-10`}>
            <p className={`text-4xl font-600 text-center`}>Free Alterations</p>
            {(props.main)
                ? <SocialShare isMobile={false}/>
                : null
            }
            <span className="block relative w-4/5 aspect-square self-center">
                <Image src={WEBASSETS + "/assets/images/free_alteration_800.jpg"} layout={`fill`} objectFit={`cover`} alt="Free Alterations" />
            </span>
            <p>
                Received your garments but need some alterations for a better fit? We&apos;re here for you!
                Whether you want to adjust by 0.5&quot; or alter further, we will get it done for you! We offer upto two free alterations until the garment fits you perfectly. The reverse pickup and re-shipping of the garment will be done by us. So sit back, relax and get your garment altered hassle-free.
            </p>
        </section>
    );

    return (props.isMobile)? mobileView : browserView;
}

export default FreeAlterations;
