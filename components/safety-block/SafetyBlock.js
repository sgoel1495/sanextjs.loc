import Image from "next/image";

/**
 * This is a band just above the nav
 * @params none at this time
 */

function SafetyBlock() {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    return (
        <div id="safety-block" className={"bg-[#FFFAF7] py-10"}>
            <div className="container">
                <div className="mb-10 text-center">
                    <h3 className={"text-[17px] xl:text-h3 text-[#d95c5c] font-600 uppercase"}>Your Safety is Our Priority!</h3>
                    <h4 className={"text-[10px] xl:text-h4 text-[#767176] tracking-wide"}>Here&lsquo;s everything we are doing to ensure your safety.</h4>
                </div>
                <div className="grid grid-cols-6 xl:grid-cols-5 gap-5 text-center w-4/5 mx-auto xl:w-full xl:mx-0">
                    <div className={"flex flex-col gap-5 items-center col-start-1 col-end-3 xl:col-end-2"}>
                        <Image className={"w-[75px] md:w-[205px] xl:w-[80px] h-[80px]"} src={WEBASSETS + "/assets/images/icons/sanitization_employee_hygiene_v1.svg"} alt="hygiene" width="80" height="80"/>
                        <div className={"uppercase tracking-wide xl:tracking-normal"}>
                            <span className={"text-[8px] xl:text-base block leading-none"}>Everyone</span>
                            <span className={"text-[4.9px] xl:text-xs block leading-none"}>Wears A Mask</span>
                            <span className={"text-[4.9px] xl:text-xs block leading-none"}>&amp; Gloves</span>
                        </div>
                        <div className="w-5/9 hidden xl:block">
                            <p className={"text-sm text-left"}>Our manufacturing facility <br/> is sanitized and fumigated <br/> twice daily to ensure a <br/> clean and healthy <br/> environment</p>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-5 items-center col-start-3 col-end-5 xl:col-start-2 xl:col-end-3"}>
                        <Image className={"w-[80px] h-[80px]"} src={WEBASSETS + "/assets/images/icons/sanitization_fumigation_v1.svg"} alt="fumigated" width="80" height="80"/>
                        <div className={"uppercase tracking-wide xl:tracking-normal"}>
                            <span className={"text-[8px] xl:text-base block leading-none"}>Fumigated</span>
                            <span className={"text-[8px] xl:text-base block leading-none"}>&amp; Sanitized</span>
                            <span className={"text-[4.9px] xl:text-xs block leading-none"}>Twice a Day</span>
                        </div>
                        <div className="w-5/9 hidden xl:block">
                            <p className={"text-sm text-left mb-2"}>All employees wear <br/> masks &amp; maintain social <br/> distancing.</p>
                            <p className={"text-sm text-left"}>Their temperatures are <br/> checked twice a day. And <br/> every 3 hours, we ensure <br/> they wash &amp; sanitize</p>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-5 items-center col-start-5 col-end-7 xl:col-start-3 xl:col-end-4"}>
                        <Image className={"w-[80px] h-[80px]"} src={WEBASSETS + "/assets/images/icons/uv_treatment_garments_v1.svg"} alt="uv treatment" width="80" height="80"/>
                        <div className={"uppercase"}>
                            <span className={"text-[8px] xl:text-base block leading-none"}>Ultraviolet</span>
                            <span className={"text-[8px] xl:text-base block leading-none"}>(UV-C 250nm)</span>
                            <span className={"text-[4.9px] xl:text-xs block leading-none"}>Disinfection</span>
                        </div>
                        <div className="w-5/9 hidden xl:block">
                            <p className={"text-sm text-left mb-2"}>We use chemical-free <br/> multi focal UV Light exposure,<br/>  covering 100% of the <br/> surface of the items.</p>
                            <p className={"text-sm text-left"}>UV-C of the wavelength <br/> 253.7 nm is used here <br/> because at this wavelength <br/> the germicidal activity is <br/> maximum.</p>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-5 items-center col-start-2 col-end-4 xl:col-start-4 xl:col-end-5"}>
                        <Image className={"w-[80px] h-[80px]"} src={WEBASSETS + "/assets/images/icons/garments_steamed_v1.svg"} alt="steamed" width="80" height="80"/>
                        <div className={"uppercase"}>
                            <span className={"text-[8px] xl:text-base block leading-none"}>Freshly</span>
                            <span className={"text-[8px] xl:text-base block leading-none"}>Steamed</span>
                            <span className={"text-[4.9px] xl:text-xs block leading-none"}>Before Dispatch</span>
                        </div>
                        <div className="w-5/9 hidden xl:block">
                            <p className={"text-sm text-left mb-2"}>All items are freshly <br/> steamed before they are <br/> dispatched.</p>
                            <p className={"text-sm text-left"}>We follow a 2-step process <br/>of UV-Disinfection <br/>followed by steaming of <br/> garments.</p>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-5 items-center col-start-4 col-end-6 xl:col-start-5 xl:col-end-6"}>
                        <Image className={"w-[80px] h-[80px]"} src={WEBASSETS + "/assets/images/icons/contactless_delivery_v1.svg"} alt="contactless delivery" width="80" height="80"/>
                        <div className={"uppercase"}>
                            <span className={"text-[8px] xl:text-base block leading-none"}>Zero</span>
                            <span className={"text-[8px] xl:text-base block leading-none"}>Contact</span>
                            <span className={"text-[4.9px] xl:text-xs block leading-none"}>Delivery</span>
                        </div>
                        <div className="w-5/9 hidden xl:block">
                            <p className={"text-sm text-left mb-2"}>We have tied up with delivery<br/> services that provide <br/> contactless delivery, to <br/> ensure your safety.</p>
                            <p className={"text-sm text-left"}>If you still do not feel safe, <br/> you can collect the package<br/> and keep it at your<br/> doorstep (or outside) in<br/> quarantine for 3 days and <br/>open it only after.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SafetyBlock;
