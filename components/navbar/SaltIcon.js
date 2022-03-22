import Link from "next/link";
import Image from "next/image";

/**
 * @todo @Sambhav style the icon for type b
 * @param {isMobile} props
 * @constructor
 */

function SaltIcon(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    let sizeClass, logo;
    switch (props.type) {
        case "looksPage":
            sizeClass = "h-12 w-24"
            logo = "SALT_logo.png"
            break;
        default:
            sizeClass = "w-24 h-16"
            logo = "SALT_attire_logo.png"
    }
    const mobileView = <div>
        <Link href="/">
            <span className={`block relative cursor-pointer ${sizeClass}`}>
                <Image
                    src={WEBASSETS + `/assets/images/${logo}`}
                    alt="salt icon"
                    layout={`fill`}
                    priority={true}
                    objectFit={`contain`}
                />
            </span>
        </Link>
    </div>;

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
