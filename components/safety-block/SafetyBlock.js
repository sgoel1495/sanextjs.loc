import Image from "next/image";
import React from "react";

/**
 * This is a band just above the nav
 * @params {isMobile} props
 */

function SafetyBlock(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const mobile = props.isMobile;

    const blockStyle = "flex flex-col gap-5 items-center";
    const blockTitleStyle = "uppercase" + [mobile ? ' tracking-wide' : ' tracking-normal'];
    const blockLeadStyle = "block leading-none" + [mobile ? ' text-[8px]' : ''];
    const blockLeadDescStyle = "block leading-none" + [mobile ? ' text-[4.9px]' : ' text-xs'];
    const blockDescStyle = "w-5/9" + [mobile ? ' hidden' : ''];
    const blockDescParaStyle = "text-sm text-left";

    return (
        <div id="safety-block" className={"bg-[#FFFAF7] py-10"}>
            <div className="container">
                <div className="mb-10 text-center">
                    <h3 className={[mobile ? 'text-[17px] ' : 'text-h3 '] + "text-[#d95c5c] font-600 uppercase"}>Your Safety is Our Priority!</h3>
                    <h4 className={[mobile ? 'text-[10px] ' : 'text-h4 '] + "text-[#767176] tracking-wide"}>Here&lsquo;s everything we are doing to ensure your safety.</h4>
                </div>
                <div className={"grid gap-5 text-center" + [mobile ? ' grid-cols-6 w-4/5 mx-auto' : ' grid-cols-5 w-full mx-0']}>
                    <div className={blockStyle + [mobile ? ' col-start-1 col-end-3' : ' col-end-2']}>
                        <Image className={"w-[80px] h-[80px]"} src={WEBASSETS + "/assets/images/icons/sanitization_employee_hygiene_v1.svg"} alt="hygiene" width="80" height="80"/>
                        <div className={blockTitleStyle}>
                            <span className={blockLeadStyle}>Everyone</span>
                            <span className={blockLeadDescStyle}>Wears A Mask</span>
                            <span className={blockLeadDescStyle}>&amp; Gloves</span>
                        </div>
                        <div className={blockDescStyle}>
                            <p className={blockDescParaStyle}>Our manufacturing facility <br/> is sanitized and fumigated <br/> twice daily to ensure a <br/> clean and healthy <br/> environment</p>
                        </div>
                    </div>
                    <div className={blockStyle + [mobile ? ' col-start-3 col-end-5' :  ' col-start-2 col-end-3']}>
                        <Image className={"w-[80px] h-[80px]"} src={WEBASSETS + "/assets/images/icons/sanitization_fumigation_v1.svg"} alt="fumigated" width="80" height="80"/>
                        <div className={blockTitleStyle}>
                            <span className={blockLeadStyle}>Fumigated</span>
                            <span className={blockLeadStyle}>&amp; Sanitized</span>
                            <span className={blockLeadDescStyle}>Twice a Day</span>
                        </div>
                        <div className={blockDescStyle}>
                            <p className={blockDescParaStyle + " mb-2"}>All employees wear <br/> masks &amp; maintain social <br/> distancing.</p>
                            <p className={blockDescParaStyle}>Their temperatures are <br/> checked twice a day. And <br/> every 3 hours, we ensure <br/> they wash &amp; sanitize</p>
                        </div>
                    </div>
                    <div className={blockStyle + [mobile ? ' col-start-5 col-end-7' : ' col-start-3 col-end-4']}>
                        <Image className={"w-[80px] h-[80px]"} src={WEBASSETS + "/assets/images/icons/uv_treatment_garments_v1.svg"} alt="uv treatment" width="80" height="80"/>
                        <div className={blockTitleStyle}>
                            <span className={blockLeadStyle}>Ultraviolet</span>
                            <span className={blockLeadStyle}>(UV-C 250nm)</span>
                            <span className={blockLeadDescStyle}>Disinfection</span>
                        </div>
                        <div className={blockDescStyle}>
                            <p className={blockDescParaStyle + " mb-2"}>We use chemical-free <br/> multi focal UV Light exposure,<br/> covering 100% of the <br/> surface of the items.</p>
                            <p className={blockDescParaStyle}>UV-C of the wavelength <br/> 253.7 nm is used here <br/> because at this wavelength <br/> the germicidal activity is <br/> maximum.</p>
                        </div>
                    </div>
                    <div className={blockStyle + [mobile ? ' col-start-2 col-end-4' : ' col-start-4 col-end-5']}>
                        <Image className={"w-[80px] h-[80px]"} src={WEBASSETS + "/assets/images/icons/garments_steamed_v1.svg"} alt="steamed" width="80" height="80"/>
                        <div className={blockTitleStyle}>
                            <span className={blockLeadStyle}>Freshly</span>
                            <span className={blockLeadStyle}>Steamed</span>
                            <span className={blockLeadDescStyle}>Before Dispatch</span>
                        </div>
                        <div className={blockDescStyle}>
                            <p className={blockDescParaStyle + " mb-2"}>All items are freshly <br/> steamed before they are <br/> dispatched.</p>
                            <p className={blockDescParaStyle}>We follow a 2-step process <br/>of UV-Disinfection <br/>followed by steaming of <br/> garments.</p>
                        </div>
                    </div>
                    <div className={blockStyle + [mobile ? ' col-start-4 col-end-6' : ' col-start-5 col-end-6']}>
                        <Image className={"w-[80px] h-[80px]"} src={WEBASSETS + "/assets/images/icons/contactless_delivery_v1.svg"} alt="contactless delivery" width="80" height="80"/>
                        <div className={blockTitleStyle}>
                            <span className={blockLeadStyle}>Zero</span>
                            <span className={blockLeadStyle}>Contact</span>
                            <span className={blockLeadDescStyle}>Delivery</span>
                        </div>
                        <div className={blockDescStyle}>
                            <p className={blockDescParaStyle + " mb-2"}>We have tied up with delivery<br/> services that provide <br/> contactless delivery, to <br/> ensure your safety.</p>
                            <p className={blockDescParaStyle}>If you still do not feel safe, <br/> you can collect the package<br/> and keep it at your<br/> doorstep (or outside) in<br/> quarantine
                                for 3 days and <br/>open it only after.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SafetyBlock;
