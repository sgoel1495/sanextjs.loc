import SocialShare from "./SocialShare";
import Image from "next/image";
import React from "react";

function PremiumFabricQuality(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const mobileView =  (
        <section className={`flex flex-col gap-y-5 font-cursive text-2xl my-10 px-4`}>
            <p className={`text-2xl font-400 text-center`}>Premium Fabric & Quality</p>
            {(props.main)
                ? <SocialShare isMobile={true}/>
                : null
            }
            <span className="block relative w-4/5 aspect-square self-center">
                <Image src={WEBASSETS + "/assets/images/premium_fabric_quality_800.jpg"} alt="Premium Fabric & Quality" layout={`fill`} objectFit={`cover`}/>
            </span>
            <p>
                The fabrics used are of premium quality. High Quality, premium fabrics that are breathable, wrinkle-free are used to give the garment a polished look. The fabrics range from
                lightweight to medium weight suiting fabrics, wool blends, poly crepe, to extremely breathable and summer friendly cottons, linens, cotton viscose etc.
                </p>
                <p>We take utmost care in making the garment, right from using the best quality threads, to accessories, whether its buttons, zippers, hooks and other elements. Apart from the fabric, design and fit, we go through strict
                quality control parameters to give you what you truly deserve. <br/>
                All our fabric is: Pre-Washed, to remove any stains and odor. Pre-Shrunk, to ensure you will never have to face any shrinkage issue. Pre-treated for color fastening to ensure there is
                no color bleeding. All our Clothing is modest, with no plunging necklines or high slits that would make you uncomfortable at work.
            </p>
        </section>
    );
    const browserView = (
        <section className={`flex flex-col gap-y-5 font-cursive text-2xl my-10`}>
            <p className={`text-4xl font-600 text-center`}>Premium Fabric & Quality</p>
            {(props.main)
                ? <SocialShare isMobile={false}/>
                : null
            }
            <span className="block relative w-4/5 aspect-square self-center">
                <Image src={WEBASSETS + "/assets/images/premium_fabric_quality_800.jpg"} alt="Premium Fabric & Quality" layout={`fill`} objectFit={`cover`}/>
            </span>
            <p>
                The fabrics used are of premium quality. High Quality, premium fabrics that are breathable, wrinkle-free are used to give the garment a polished look. The fabrics range from
                lightweight to medium weight suiting fabrics, wool blends, poly crepe, to extremely breathable and summer friendly cottons, linens, cotton viscose etc.We take utmost care in making the
                garment, right from using the best quality threads, to accessories, whether its buttons, zippers, hooks and other elements. Apart from the fabric, design and fit, we go through strict
                quality control parameters to give you what you truly deserve.
                All our fabric is: Pre-Washed, to remove any stains and odor. Pre-Shrunk, to ensure you will never have to face any shrinkage issue. Pre-treated for color fastening to ensure there is
                no color bleeding. All our Clothing is modest, with no plunging necklines or high slits that would make you uncomfortable at work.
            </p>
        </section>
    );

    return (props.isMobile) ? mobileView : browserView;
}

export default PremiumFabricQuality;
