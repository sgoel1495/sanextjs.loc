import React from 'react';
import Image from "next/image";

const Index = (props) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    return (
        <div className="bg-[#e5d5c5] py-10">
            <span className="block uppercase tracking-wider text-3xl text-white px-5 font-black">about us</span>
            <span className="block uppercase text-white px-5">Why, How & What ?</span>
            <a href={"/blog/about-salt/why-custom-tailored-clothing"} className={"flex"}>
                <div className="pr-6 flex-1">
                    <span className={"block"}>
                        Uniquely made for you!
                    </span>
                    <span className={"block uppercase"}>
                        tailored to your measurements
                    </span>
                    <span className={"block uppercase"}>
                        customize attire to your taste
                    </span>
                    <span className={"block uppercase"}>
                        celebrate your uniqueness
                    </span>
                </div>
                <span className={"block relative flex-1 h-[71vw] w-full"}>
                    <Image src={WEBASSETS + "/assets/images/made-to-measure_800.jpg"} layout={`fill`} objectFit={`cover`}/>
                </span>
            </a>
            <div className={"flex"}>
                <a href={"/blog/about-salt/styling-service"} className={"flex-1"}>
                    <span className={"block relative h-[71vw] w-full"}>
                        <Image src={WEBASSETS + "/assets/images/styling_service_800.jpg"} layout={`fill`} objectFit={`cover`}/>
                    </span>
                </a>
                <div className="pr-6 flex-1">
                    <a href={"/blog/about-salt/styling-service"}>
                        <span className={"block"}>
                            Styled for you!
                        </span>
                        <span className={"block uppercase"}>
                            DISCOVER WHAT LOOKS GREAT ON YOU!
                        </span>
                        <span className={"block uppercase"}>
                            PERSONALISED STYLING
                        </span>
                        <span className={"block uppercase"}>
                           FASHION DESIGNERS GUIDE YOU
                        </span>
                    </a>
                    <a href={"#book_now_link"} className={"block uppercase"}>
                        Free consultation
                        <span className={"block underline"}>BOOK NOW</span>
                    </a>
                </div>

            </div>
            <a href={"/blog/about-salt/free-alteration"} className={"flex"}>
                <div className="pr-6 flex-1">
                    <span className={"block"}>
                        Great Fit
                    </span>
                    <span className={"block"}>
                        assured!
                    </span>
                    <span className={"block uppercase"}>
                        WE'RE NOT HAPPY
                    </span>
                    <span className={"block uppercase"}>
                         IF YOU'RE NOT HAPPY!
                    </span>
                    <span className={"block uppercase"}>
                        WE ALTER TILL YOU
                    </span>
                    <span className={"block uppercase"}>
                         GET A PERFECT FIT
                    </span>
                    <span className={"block uppercase"}>
                        DOORSTEP PICKUP
                    </span>
                    <span className={"block uppercase"}>
                        COMPLIMENTARY
                    </span>
                    <span className={"block uppercase"}>
                         SERVICE
                    </span>
                </div>
                <span className={"block relative flex-1 h-[71vw] w-full"}>
                    <Image src={WEBASSETS + "/assets/images/free_alteration_800.jpg"} layout={`fill`} objectFit={`cover`}/>
                </span>
            </a>
            <a href={"/blog/about-salt/premium-fabric-quality"} className={"flex"}>
                <span className={"block relative flex-1 h-[71vw] w-full"}>
                    <Image src={WEBASSETS + "/assets/images/premium_fabric_quality_800.jpg"} layout={`fill`} objectFit={`cover`}/>
                </span>
                <div className="pr-6 flex-1">
                    <span className={"block"}>
                        Premium
                    </span>
                    <span className={"block"}>
                        fabric
                    </span>
                    <span className={"block uppercase"}>
                        SUPERIOR FABRIC :
                    </span>
                    <span className={"block uppercase"}>
                        BREATHABLE &
                    </span>
                    <span className={"block uppercase"}>
                        COMFORTABLE
                    </span>
                    <span className={"block uppercase"}>
                        HIGH QUALITY TRIMS
                    </span>
                    <span className={"block uppercase"}>
                        (BUTTONS, ZIPPERS..ETC)
                    </span>
                    <span className={"block uppercase"}>
                        PRE-WASHED &
                    </span>
                    <span className={"block uppercase"}>
                        PRE-SHRUNK
                    </span>
                </div>
            </a>
            <a href={"/blog/about-salt/no-inventory-no-mass-production"} className={"flex"}>
                <div className="pr-6 flex-1">
                    <span className={"block"}>
                        Minimal
                    </span>
                    <span className={"block"}>
                        waste
                    </span>
                    <span className={"block uppercase"}>
                        not mass produced
                    </span>
                    <span className={"block uppercase"}>
                        Items made after
                    </span>
                    <span className={"block uppercase"}>
                        you place an order
                    </span>
                    <span className={"block uppercase"}>
                        sustainable
                    </span>
                    <span className={"block uppercase"}>
                        manufacturing
                    </span>
                    <span className={"block uppercase"}>
                        zero guilt
                    </span>
                    <span className={"block uppercase"}>
                        clothing
                    </span>
                </div>
                <span className={"block relative flex-1 h-[71vw] w-full"}>
                    <Image src={WEBASSETS + "/assets/images/minimal-wasteage_800.jpg"} layout={`fill`} objectFit={`cover`}/>
                </span>
            </a>
            <a href={"/blog/about-salt/ethical-fair-treatment"} className={"flex"}>
                <span className={"block relative flex-1 h-[71vw] w-full"}>
                    <Image src={WEBASSETS + "/assets/images/ethical-fair_800.jpg"} layout={`fill`} objectFit={`cover`}/>
                </span>
                <div className="pr-6 flex-1">
                    <span className={"block"}>
                        Ethical
                    </span>
                    <span className={"block"}>
                        production
                    </span>
                    <span className={"block uppercase"}>
                        tailor's workspace
                    </span>
                    <span className={"block uppercase"}>
                        is air-conditioned
                    </span>
                    <span className={"block uppercase"}>
                        no inventory means
                    </span>
                    <span className={"block uppercase"}>
                        no exploitation
                    </span>
                    <span className={"block uppercase"}>
                        fair wages
                    </span>
                    <span className={"block uppercase"}>
                        zero guilt
                    </span>
                    <span className={"block uppercase"}>
                        clothing!
                    </span>
                </div>
            </a>
        </div>
    );
};

export default Index;