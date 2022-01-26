import Link from "next/link";
import Image from "next/image";

/**
 * @todo @Sambhav style the icon for type b
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

    let sizeClass, logo;
    switch (props.type) {
        case "looksPage":
            sizeClass = "h-12 w-24"
            logo = "SALT_logo.png"
            break;
        default:
            sizeClass = "w-6 h-6"
            logo = "salticon.png"
    }

    const browserView = (
        <>
            <Link href="/">
                <span className={`block relative cursor-pointer ${sizeClass}`}>
                    <Image
                        src={WEBASSETS + `/assets/images/${logo}`}
                        alt="salt icon"
                        layout={`fill`}
                        objectFit={`contain`}
                    />
                </span>
            </Link>
        </>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default SaltIcon;
