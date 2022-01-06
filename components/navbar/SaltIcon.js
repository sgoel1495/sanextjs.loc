import Link from "next/link";
import Image from "next/image";

/**
 *
 * @param {isMobile} props
 * @constructor
 */

function SaltIcon(props) {
  const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;


  const mobileView = <div>
    <Link href="/">
      <a>
        <Image src={WEBASSETS + "/assets/images/salticon.png"} alt="salt icon"/>
      </a>
    </Link>
  </div>;

  const browserView = <div>
    <Link href="/">
      <a>
        <Image src={WEBASSETS + "/assets/images/salticon.png"} alt="salt icon"/>
      </a>
    </Link>
  </div>;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default SaltIcon;