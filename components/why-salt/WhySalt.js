/**
 * @params {isMobile} props
 * @constructor
 */
import {Fragment} from "react";
import Link from "next/link";
import Image from "next/image";

function WhySalt(props) {
  const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

  const mobileView = null;

  const browserView =
    <div>
      <div id="why-salt">
        <Link href="/salt/about-us/why-salt">
          <a>
            <div>
              <div>Why</div>
              <div>Salt</div>
              <div>?</div>
            </div>
            <div>
              <div>Elegant</div>
              <div>Thoughtful</div>
              <div>&amp; Classy</div>
              <div>Clothing from desk to dinner</div>
            </div>
          </a>
        </Link>
      </div>

      <div id="why-salt-features">
        <div>
          <Image src={WEBASSETS + "/assets/images/free-delivery.svg"} alt="free-delivery lazy"/>
        </div>
        <div><span> Free Shipping </span> <span> across India </span></div>

        <div>
          <Image src={WEBASSETS + "/assets/images/return.svg"} alt="return"/>
        </div>
        <div><span> 7-day </span> <span> Easy Return </span></div>

        <div>
          <Image src={WEBASSETS + "/assets/images/cod.svg"} alt="cod"/>
        </div>
        <div><span> COD </span> <span> Available </span></div>
      </div>

    </div>;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default WhySalt;