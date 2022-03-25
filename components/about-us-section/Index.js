import React from 'react';
import Image from "next/image";

const ImageBlock = props => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    return (
        <div className={`relative h-[70vw] border-white border-4 shadow-sm` + [props.style]}>
            <Image
                src={WEBASSETS + props.src}
                alt={props.alt}
                layout={`fill`}
                objectFit={`cover`}
            />
        </div>
    )
};

const blockLeadClass = "block font-cursive italic leading-[.75] text-4xl";
const blockLeadParaClass = "block font-cursive italic leading-[.75] text-h2";
const blockChildClass = "uppercase tracking-wider text-[10px] leading-none";


const Index = (props) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    return (
        <div className="bg-[#e5d5c5] py-10">
            <h2 className="text-h2 font-900 uppercase text-white tracking-widest mx-4">about us</h2>
            <h2 className="text-h2 font-600 text-white font-cursive italic leading-none mx-4 mb-5">Why, How & What ?</h2>
            <a href={"/blog/about-salt/why-custom-tailored-clothing"} className={"grid grid-cols-2"}>
                <div className="text-right flex flex-col justify-evenly pr-5">
                    <div>
                        <p className={blockLeadClass}>Uniquely</p>
                        <p className={blockLeadParaClass}>made for you!</p>
                    </div>
                    <div className={blockChildClass}>
                        <p>tailored to <span className='font-900'>your</span></p>
                        <p>measurements</p>
                    </div>
                    <div className={blockChildClass}>
                        <p>customize attire</p>
                        <p>to <span className='font-900'>your</span> taste</p>
                    </div>
                    <div className={blockChildClass + " font-900"}>
                        <p>celebrate your</p>
                        <p>uniqueness</p>
                    </div>
                </div>
                <ImageBlock src={"/assets/images/made-to-measure_800.jpg"} alt='Uniquely made for you!' style=" -ml-[2px]" />
            </a>
            <div className={"grid grid-cols-2 -mt-[4px]"}>
                <a href={"/blog/about-salt/styling-service"}>
                    <ImageBlock src={"/assets/images/styling_service_800.jpg"} alt='Styled for you!' style=" -mr-[2px]" />
                </a>
                <div className="flex flex-col justify-evenly pl-5">
                    <a href={"/blog/about-salt/styling-service"}>
                        <div>
                            <p className={blockLeadClass}>Styled</p>
                            <p className={blockLeadParaClass}>for you!</p>
                        </div>
                    </a>
                    <a href={"/blog/about-salt/styling-service"}>
                        <div className={blockChildClass}>
                            <p>DISCOVER WHAT</p>
                            <p>LOOKS GREAT ON YOU!</p>
                        </div>
                    </a>
                    <a href={"/blog/about-salt/styling-service"}>
                        <div className={blockChildClass}>
                            <p>PERSONALISED STYLING</p>
                        </div>
                    </a>
                    <a href={"/blog/about-salt/styling-service"}>
                        <div className={blockChildClass}>
                            <p>FASHION DESIGNERS</p>
                            <p>GUIDE YOU</p>
                        </div>
                    </a>
                    <a href={"#book_now_link"} className={blockChildClass + ' font-900'}>
                        <p>Free consultation</p>
                        <p className={"underline"}>BOOK NOW</p>
                    </a>
                </div>
            </div>
            <a href={"/blog/about-salt/free-alteration"} className={"grid grid-cols-2 -mt-[4px]"}>
                <div className="text-right flex flex-col justify-evenly pr-5">
                    <div>
                        <p className={blockLeadClass}>Great Fit</p>
                        <p className={blockLeadParaClass}>assured!</p>
                    </div>
                    <div className={blockChildClass}>
                        <p>WE&apos;RE NOT HAPPY</p>
                        <p>IF YOU&apos;RE NOT HAPPY!</p>
                    </div>
                    <div className={blockChildClass}>
                        <p>WE ALTER TILL YOU</p>
                        <p>GET A PERFECT FIT</p>
                    </div>
                    <div className={blockChildClass}>
                        <p>DOORSTEP PICKUP</p>
                    </div>
                    <div className={blockChildClass + ' font-900'}>
                        <p>COMPLIMENTARY</p>
                        <p>SERVICE</p>
                    </div>
                </div>
                <ImageBlock src={"/assets/images/free_alteration_800.jpg"} alt="Great Fit assured!" style=" -ml-[2px]" />
            </a>
            <a href={"/blog/about-salt/premium-fabric-quality"} className={"grid grid-cols-2 -mt-[4px]"}>
                <ImageBlock src={"/assets/images/premium_fabric_quality_800.jpg"} alt="Premium fabric" style=" -mr-[2px]" />
                <div className="flex flex-col justify-evenly pl-5">
                    <div>
                        <p className={blockLeadClass}>Premium</p>
                        <p className={blockLeadParaClass}>fabric</p>
                    </div>
                    <div className={blockChildClass}>
                        <p className='font-900'>SUPERIOR FABRIC :</p>
                        <p>BREATHABLE &</p>
                        <p>COMFORTABLE</p>
                    </div>
                    <div className={blockChildClass}>
                        <p>HIGH QUALITY TRIMS</p>
                        <p>(BUTTONS, ZIPPERS..ETC)</p>
                    </div>
                    <div className={blockChildClass}>
                        <p>PRE-WASHED &</p>
                        <p>PRE-SHRUNK</p>
                    </div>
                </div>
            </a>
            <a href={"/blog/about-salt/no-inventory-no-mass-production"} className={"grid grid-cols-2 -mt-[4px]"}>
                <div className="text-right flex flex-col justify-evenly pr-5" alt="Minimal wastage" >
                    <div>
                        <p className={blockLeadClass}>Minimal</p>
                        <p className={blockLeadParaClass}>wastage</p>
                    </div>
                    <div className={blockChildClass}>
                        <p>not mass produced</p>
                    </div>
                    <div className={blockChildClass}>
                        <p>Items made after</p>
                        <p>you place an order</p>
                    </div>
                    <div className={blockChildClass}>
                        <p>sustainable</p>
                        <p>manufacturing</p>
                    </div>
                    <div className={blockChildClass + ' font-900'}>
                        <p>zero guilt</p>
                        <p>clothing!</p>
                    </div>
                </div>
                <ImageBlock src={"/assets/images/minimal-wasteage_800.jpg"} alt='Minimal Wastage' style=' -ml-[2px]' />
            </a>
            <a href={"/blog/about-salt/ethical-fair-treatment"} className={"grid grid-cols-2 -mt-[4px]"}>
                <ImageBlock src={"/assets/images/ethical-fair_800.jpg"} alt="Ethical Production" style=" -mr-[2px]" />
                <div className="flex flex-col justify-evenly pl-5">
                    <div>
                        <p className={blockLeadClass}>Ethical</p>
                        <p className={blockLeadParaClass}>production</p>
                    </div>
                    <div className={blockChildClass}>
                        <p>tailor&apos;s workspace</p>
                        <p>is air-conditioned</p>
                    </div>
                    <div className={blockChildClass}>
                        <p>no inventory means</p>
                        <p>no exploitation</p>
                    </div>
                    <div className={blockChildClass}>
                        <p>fair wages</p>
                    </div>
                    <div className={blockChildClass + ' font-900'}>
                        <p>zero guilt</p>
                        <p>clothing!</p>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default Index;