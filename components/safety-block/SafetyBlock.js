import Image from "next/image";

/**
 * This is a band just above the nav
 * @params none at this time
 */

function SafetyBlock() {
  const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

  return (
    <div id="safety-block">
      <div> Your Safety is Our Priority!</div>
      <div>Here&lsquo;s everything we are doing to ensure your safety.</div>

      <div>
        <div>
          <Image src={WEBASSETS + "/assets/images/icons/sanitization_employee_hygiene_v1.svg"} alt="hygiene"/>
        </div>
        <div>
          <span>Everyone</span>
          <span>Wears A Mask</span>
          <span>&amp; Gloves</span>
        </div>
        <div>
          <span>Our manufacturing facility <br/> is sanitized and fumigated <br/> twice daily to ensure a <br/> clean and healthy <br/> environment</span>
        </div>
      </div>

      <div>
        <div>
          <Image src={WEBASSETS + "/assets/images/icons/sanitization_fumigation_v1.svg"} alt="fumigated"/>
        </div>
        <div>
          <span>Fumigated</span>
          <span>&amp; Sanitized</span>
          <span>&amp; Twice a Day</span>
        </div>
        <div>
          <span>All employees wear <br/> masks &amp; maintain social <br/> distancing.</span>
          <span>Their temperatures are <br/> checked twice a day. And <br/> every 3 hours, we ensure <br/> they wash &amp; sanitize</span>
        </div>
      </div>

      <div>
        <div>
          <Image src={WEBASSETS + "/assets/images/icons/uv_treatment_garments_v1.svg"} alt="uv treatment"/>
        </div>
        <div>
          <span>Ultraviolet</span>
          <span>(UV-C 250)</span>
          <span>disinfection</span>
        </div>
        <div>
          <span>We use chemical-free <br/> multi focal UV Light exposure,<br/>  covering 100% of the <br/> surface of the items.</span>
          <span>UV-C of the wavelength <br/> 253.7 nm is used here <br/> because at this wavelength <br/> the germicidal activity is <br/> maximum.</span>
        </div>
      </div>

      <div>
        <div>
          <Image src={WEBASSETS + "/assets/images/icons/garments_steamed_v1.svg"} alt="steamed"/>
        </div>
        <div>
          <span>Freshly</span>
          <span>Steamed</span>
          <span>Before Dispatch</span>
        </div>
        <div>
          <span>All items are freshly <br/> steamed before they are <br/> dispatched.</span>
          <span>We follow a 2-step process <br/>of UV-Disinfection <br/>followed by steaming of <br/> garments.</span>
        </div>
      </div>

      <div>
        <div>
          <Image src={WEBASSETS + "/assets/images/icons/contactless_delivery_v1.svg"} alt="contactless delivery"/>
        </div>
        <div>
          <span>Zero</span>
          <span>Contact</span>
          <span>Delivery</span>
        </div>
        <div>
          <span>We have tied up with delivery<br/> services that provide <br/> contactless delivery, to <br/> ensure your safety.</span>
          <span>If you still do not feel safe, <br/> you can collect the package<br/> and keep it at your<br/> doorstep (or outside) in<br/> quarantine for 3 days and <br/>open it only after.</span>
        </div>
      </div>

    </div>
  )
}

export default SafetyBlock;
