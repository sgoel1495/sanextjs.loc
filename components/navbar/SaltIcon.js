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

    const browserView = (
        <>
            <Link href="/">
                <a>
                    {props.type === "a" &&
                    <span className={`relative w-6 h-6`}>
                        <Image
                            src={WEBASSETS + "/assets/images/salticon.png"}
                            alt="salt icon"
                            layout={`fill`}
                            objectFit={`contain`}
                        />
                    </span>
                    }
                    {props.type === "b" &&
                    <span className={`block relative h-12 w-24`}>
                        <Image
                            src={WEBASSETS + "/assets/images/SALT_logo.png"}
                            alt="salt icon"
                            layout={`fill`}
                            objectFit={`contain`}
                        />
                    </span>
                    }
                </a>
            </Link>
        </>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default SaltIcon;
