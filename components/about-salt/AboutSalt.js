/**
 * @params {isMobile} props
 * @constructor
 */
import Link from "next/link";
import Image from "next/image";


function AboutSalt(props) {
  const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

  const mobileView = null;

  const browserView = <div>
    <hr/>
    <div>About SALT</div>

    <div id="about-salt-features">
      <div>
        <Link href="/blog/about-salt/why-custom-tailored-clothing"><a>
          <Image src={WEBASSETS + "/assets/images/Made-to-measure_300.jpg"} alt="free-delivery lazy"/>
          <span> MADE TO MEASURE </span>
          <span> Custom Clothing, Tailored to you </span>
        </a></Link>
      </div>

      <div>
        <Link href="/blog/about-salt/styling-service"><a>
          <Image src={WEBASSETS + "/assets/images/styling-services_300.jpg"} alt="free-delivery lazy"/>
          <span> STYLING SERVICES </span>
          <span> Free Styling Sessions In-Store or Online </span>
        </a></Link>
      </div>

      <div>
        <Link href="/blog/about-salt/free-alteration"><a>
          <Image src={WEBASSETS + "/assets/images/free-alteration_300.jpg"} alt="free-delivery lazy"/>
          <span> FREE ALTERATIONS </span>
          <span> Alterations available at no additional cost </span>
        </a></Link>
      </div>

      <div>
        <Link href="/blog/about-salt/premium-fabric-quality"><a>
          <Image src={WEBASSETS + "/assets/images/premium-fabric_300.jpg"} alt="free-delivery lazy"/>
          <span> PREMIUM FABRIC &amp; QUALITY </span>
          <span> Premium Quality Fabric &amp; Finishing </span>
        </a></Link>
      </div>

      <div>
        <Link href="/blog/about-salt/no-inventory-no-mass-production"><a>
          <Image src={WEBASSETS + "/assets/images/minimal-wasteage.jpg"} alt="free-delivery lazy"/>
          <span> MINIMAL WASTAGE </span>
          <span> No Inventory, No Mass Production </span>
        </a></Link>
      </div>
    </div>

    <div>
      <Link href="/get-appointment"><a>
        <Image src={WEBASSETS + "/assets/images/our_store_800_v1.jpg"} alt="free-delivery lazy"/>
        <span>Book An Appointment In Store</span>
        <span>Dlf Mega Mall, Gurgaon</span>
      </a></Link>
    </div>

    <div>
      <Link href="/get-virtual-appointment"><a>
        <span>Book A Virtual Styling Session</span>
        <span>Video Call</span>
      </a></Link>
    </div>
  </div>;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default AboutSalt;