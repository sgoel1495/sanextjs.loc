import Link from "next/link";
import Image from "next/image";

/**
 *@todo @Sambhav style the icon for type b
 * @param {isMobile} props
 * @constructor
 */

function SaltIcon(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const mobileView = <div>
        <Link href="/">
            <a>
                <Image src={WEBASSETS + "/assets/images/salticon.png"} alt="salt icon" width="24" height="24"/>
            </a>
        </Link>
    </div>;

    const browserView = <div>
        <Link href="/">
            <a>
                {props.type=="a" && <Image src={WEBASSETS + "/assets/images/salticon.png"} alt="salt icon" width="24" height="24"/>}
                {props.type=="b" && <Image src={WEBASSETS + "/assets/images/SALT_logo.png"} alt="salt icon" width="24" height="24"/>}
            </a>
        </Link>
    </div>;

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default SaltIcon;
